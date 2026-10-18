"""The signal math of the mapping layer: pure numpy, no file access, no knowledge of songs.

Conventions
- A signal is a float array on the output grid plus a boolean `valid` mask of the same length.
  Invalid samples are places where the input does not exist (e.g. before the first beat); they are
  never silently treated as zero.
- Every function is deterministic for identical inputs.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np

EPS = 1e-9


@dataclass(frozen=True)
class NormalizationResult:
    method: str
    low: float
    high: float
    low_value: float  # the input value mapped to 0
    high_value: float  # the input value mapped to 1
    degenerate: bool  # input had (almost) no range; output is all zeros


def normalize(values: np.ndarray, valid: np.ndarray, method: str, low: float, high: float):
    """Linear map of [low_value, high_value] onto [0, 1], clipped.

    percentile: low_value/high_value are the low/high percentiles of the valid values.
    fixed: low_value/high_value are low/high themselves.
    """
    values = np.asarray(values, dtype=float)
    if method == "percentile":
        pool = values[valid]
        if pool.size == 0:
            return np.zeros_like(values), NormalizationResult(method, low, high, float("nan"), float("nan"), True)
        lo, hi = (float(v) for v in np.percentile(pool, [low, high]))
    elif method == "fixed":
        lo, hi = float(low), float(high)
    else:
        raise ValueError(f"unknown normalization method {method!r}")
    if hi - lo <= EPS:
        return np.zeros_like(values), NormalizationResult(method, low, high, lo, hi, True)
    out = np.clip((values - lo) / (hi - lo), 0.0, 1.0)
    return out, NormalizationResult(method, low, high, lo, hi, False)


def moving_average(values: np.ndarray, width: int, power_domain_db: bool, align: str = "centered") -> np.ndarray:
    """Moving average over `width` samples; edges average over the samples that exist. For dB
    curves the average is taken in the power domain, as the interpretation layer does.

    centered: sample i averages i - width//2 .. i + (width-1)//2 (looks ahead by half the width).
    trailing: sample i averages i - width + 1 .. i (only the past; lags by about half the width).
    """
    if width <= 1:
        return np.asarray(values, dtype=float)
    x = 10.0 ** (np.asarray(values, dtype=float) / 10.0) if power_domain_db else np.asarray(values, dtype=float)
    if align == "centered":
        kernel = np.ones(width)
        out = np.convolve(x, kernel, mode="same") / np.convolve(np.ones_like(x), kernel, mode="same")
    elif align == "trailing":
        c = np.concatenate([[0.0], np.cumsum(x)])
        i = np.arange(len(x))
        lo = np.maximum(0, i - width + 1)
        out = (c[i + 1] - c[lo]) / (i + 1 - lo)
    else:
        raise ValueError(f"unknown align {align!r}")
    return 10.0 * np.log10(out + 1e-12) if power_domain_db else out


def relative_to_baseline(fast: np.ndarray, slow: np.ndarray, mode: str) -> np.ndarray:
    """Deviation of a signal from its slower baseline, in the signal's own units."""
    diff = np.asarray(fast, dtype=float) - np.asarray(slow, dtype=float)
    if mode == "above":
        return np.maximum(diff, 0.0)
    if mode == "absolute":
        return np.abs(diff)
    raise ValueError(f"unknown baseline mode {mode!r}")


def resample(src_t: np.ndarray, src_v: np.ndarray, out_t: np.ndarray, tail_s: float):
    """Linear interpolation onto the output grid. Valid only inside [first source time, last
    source time + tail_s]; outside, np.interp would hold the edge value, so those samples are
    marked invalid instead."""
    out = np.interp(out_t, src_t, src_v)
    valid = (out_t >= src_t[0] - EPS) & (out_t <= src_t[-1] + tail_s + EPS)
    return out, valid


def _ease(x: np.ndarray, shape: str) -> np.ndarray:
    x = np.clip(x, 0.0, 1.0)
    return x if shape == "linear" else x * x * (3.0 - 2.0 * x)


def gate(t: np.ndarray, start: float, rise_s: float, fall_from: float, fall_s: float, shape: str) -> np.ndarray:
    """0 before `start`, rising to 1 over rise_s, 1 until `fall_from`, then falling to 0 over
    fall_s. Written as rise * fall so short spans and zero-length phases stay continuous. The rise
    stops at `fall_from`, so a span shorter than its rise falls from the level it reached instead of
    continuing to climb after it has ended."""
    if rise_s > 0:
        rise = _ease((np.minimum(t, fall_from) - start) / rise_s, shape)
    else:
        rise = (t >= start).astype(float)
    if fall_s > 0:
        fall = 1.0 - _ease((t - fall_from) / fall_s, shape)
    else:
        fall = (t <= fall_from).astype(float)
    return np.where(t < start, 0.0, rise * fall)


@dataclass(frozen=True)
class Timing:
    start: float
    peak: float
    end: float


def event_timing(event_time: float, attack_s: float, hold_s: float, release_s: float, peak_offset_s: float) -> Timing:
    peak = event_time + peak_offset_s
    return Timing(start=peak - attack_s, peak=peak, end=peak + hold_s + release_s)


def passage_timing(start_s: float, end_s: float, attack_s: float, release_s: float) -> Timing:
    return Timing(start=start_s, peak=min(start_s + attack_s, end_s), end=end_s + release_s)


def render_events(
    t: np.ndarray,
    timings: list[Timing],
    strengths: list[float],
    rises: list[float],
    fall_froms: list[float],
    falls: list[float],
    shape: str,
    overlap: str,
) -> np.ndarray:
    """Sum or max of the event envelopes, clipped to [0, 1]. Only the samples an event touches
    are computed, so long songs with many events stay cheap."""
    out = np.zeros_like(t, dtype=float)
    for tm, s, rise, fall_from, fall in zip(timings, strengths, rises, fall_froms, falls):
        i0 = int(np.searchsorted(t, tm.start, side="left"))
        i1 = int(np.searchsorted(t, tm.end, side="right"))
        if i1 <= i0:
            continue
        env = s * gate(t[i0:i1], tm.start, rise, fall_from, fall, shape)
        if overlap == "sum":
            out[i0:i1] += env
        else:
            np.maximum(out[i0:i1], env, out=out[i0:i1])
    return np.clip(out, 0.0, 1.0)


def follower(x: np.ndarray, dt: float, attack_s: float, release_s: float) -> np.ndarray:
    """One-pole attack/release follower, starting at x[0] (no fade-in at the start of the song)."""
    if attack_s <= 0 and release_s <= 0:
        return np.asarray(x, dtype=float).copy()
    a_up = 1.0 if attack_s <= 0 else 1.0 - np.exp(-dt / attack_s)
    a_down = 1.0 if release_s <= 0 else 1.0 - np.exp(-dt / release_s)
    y = np.empty_like(x, dtype=float)
    y[0] = x[0]
    for i in range(1, len(x)):
        a = a_up if x[i] > y[i - 1] else a_down
        y[i] = y[i - 1] + a * (x[i] - y[i - 1])
    return y


def combine(signals: list[np.ndarray], valids: list[np.ndarray], weights: list[float], method: str, rest: float):
    """Combine rule signals into one channel. Only valid samples take part.

    weighted_mean: sum(w*x) / sum(w) over the rules valid at that sample.
    max:           max(w*x) over valid rules.
    sum:           sum(w*x) over valid rules, clipped to 1.
    Samples where no rule is valid get `rest` and are marked invalid in the returned mask.
    """
    x = np.vstack(signals)
    v = np.vstack(valids)
    w = np.asarray(weights, dtype=float)[:, None]
    any_valid = v.any(axis=0)
    if method == "weighted_mean":
        den = (w * v).sum(axis=0)
        num = (w * x * v).sum(axis=0)
        out = np.where(den > 0, num / np.where(den > 0, den, 1.0), rest)
    elif method == "max":
        out = np.where(any_valid, np.where(v, w * x, -np.inf).max(axis=0), rest)
    elif method == "sum":
        out = np.where(any_valid, (w * x * v).sum(axis=0), rest)
    else:
        raise ValueError(f"unknown combine method {method!r}")
    return np.clip(out, 0.0, 1.0), any_valid


def onset_rate(
    t: np.ndarray, onset_times: np.ndarray, window_s: float, duration: float, align: str = "centered"
) -> np.ndarray:
    """Onsets per second in [t - w/2, t + w/2) (centered) or [t - w, t) (trailing), using only the
    part of the window inside the audio."""
    if align == "centered":
        lo, hi = t - window_s / 2, t + window_s / 2
    elif align == "trailing":
        lo, hi = t - window_s, t
    else:
        raise ValueError(f"unknown align {align!r}")
    lo = np.clip(lo, 0.0, duration)
    hi = np.clip(hi, 0.0, duration)
    sorted_onsets = np.sort(onset_times)
    counts = np.searchsorted(sorted_onsets, hi, side="left") - np.searchsorted(sorted_onsets, lo, side="left")
    length = np.maximum(hi - lo, EPS)
    return counts / length
