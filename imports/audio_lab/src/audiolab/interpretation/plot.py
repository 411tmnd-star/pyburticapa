"""A review plot: the interpretations drawn over the curves they came from."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from matplotlib.figure import Figure

from audiolab.interpretation.context import AnalysisContext
from audiolab.interpretation.schema import SongInterpretation

PASSAGE_COLORS = {
    "energy_build": "#2a9d8f",
    "high_energy_passage": "#e9c46a",
    "sparse_passage": "#4361ee",
}
CHANGE_STYLES = {
    "bass_entry": ("#e63946", "-"),
    "energy_drop": ("#6a4c93", "-"),
    "rhythmic_density_change": ("#00b4d8", "-"),
    "transition_candidate": ("#222222", "--"),
}


def plot_interpretation(
    ctx: AnalysisContext, model: SongInterpretation, out_path: str | Path, dpi: int = 120
) -> None:
    """Loudness, band energy, onset rate and novelty, with passages shaded and changes marked."""
    fig = Figure(figsize=(15, 10), dpi=dpi)
    ax_loud, ax_band, ax_rate, ax_nov = fig.subplots(4, 1, sharex=True)
    t = ctx.times

    if ctx.has_curve("rms_db"):
        ax_loud.plot(t, ctx.curve("rms_db"), lw=0.5, color="#bbbbbb", label="loudness")
        ax_loud.plot(t, ctx.smoothed_db("rms_db", 1.0), lw=1.2, color="#264653", label="smoothed 1 s")
    ax_loud.set_ylabel("dB re loudest")
    ax_loud.set_title("Overall loudness (shaded = passages)")
    ax_loud.legend(loc="lower right", ncol=2)

    for key, color in (("band_bass_db", "#e63946"), ("band_mid_db", "#2a9d8f"), ("band_high_db", "#4361ee")):
        if ctx.has_curve(key):
            ax_band.plot(t, ctx.curve(key), lw=0.7, color=color, label=key.split("_")[1])
    ax_band.set_ylim(-60, 3)
    ax_band.set_ylabel("band energy (dB)")
    ax_band.set_title("Band energy")
    ax_band.legend(loc="lower right", ncol=3)

    if len(ctx.onset_times):
        grid = np.arange(0, ctx.duration, 0.5)
        counts = np.array([np.sum((ctx.onset_times >= g - 1.0) & (ctx.onset_times < g + 1.0)) for g in grid]) / 2.0
        ax_rate.plot(grid, counts, lw=1.0, color="#6a4c93")
    ax_rate.set_ylabel("onsets / s")
    ax_rate.set_title("Onset rate (2 s window)")

    if ctx.has_curve("novelty"):
        ax_nov.plot(ctx.curve("beat_times"), ctx.curve("novelty"), lw=1.0, color="#6a4c93")
    ax_nov.set_ylabel("novelty")
    ax_nov.set_title("Section novelty")
    ax_nov.set_xlabel("time (s)")

    labelled: set[str] = set()
    for it in model.interpretations:
        if it.kind == "passage":
            color = PASSAGE_COLORS.get(it.label, "#999999")
            for ax in (ax_loud, ax_band, ax_rate):
                ax.axvspan(it.start_s, it.end_s, color=color, alpha=0.18, lw=0)
            ax_loud.text(
                (it.start_s + it.end_s) / 2, 0.98, it.label.replace("_", " "),
                transform=ax_loud.get_xaxis_transform(), ha="center", va="top", fontsize=7, color=color,
            )
        else:
            color, style = CHANGE_STYLES.get(it.label, ("#999999", "-"))
            for ax in (ax_loud, ax_band, ax_rate, ax_nov):
                ax.axvline(it.start_s, color=color, ls=style, lw=1.0, alpha=0.85)
            labelled.add(it.label)

    handles = [
        fig.axes[0].plot([], [], color=CHANGE_STYLES[l][0], ls=CHANGE_STYLES[l][1], label=l)[0]
        for l in CHANGE_STYLES
        if l in labelled
    ]
    if handles:
        ax_nov.legend(handles=handles, loc="upper right", ncol=len(handles), fontsize=8)
    fig.tight_layout()
    fig.savefig(out_path)
