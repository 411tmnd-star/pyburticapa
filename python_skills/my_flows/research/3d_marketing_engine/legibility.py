#!/usr/bin/env python3
"""legibility.py - how big is one pixel on the subject, and what detail can the render show?

Before modelling a detail (a panel gap, a bolt, a knurl), check it can be seen at the render
resolution. One pixel covers  mm_per_pixel = distance * sensor_width / (focal_length * width_px)

  python3 -I legibility.py                         # the three cameras of the robot audit
  python3 -I legibility.py --width 960 --sensor 36 --focal 85 --distance 11.59 14.76 --feature-mm 3

Reads nothing, writes nothing, standard library only.
Exit: 0 always (it reports; you decide). 2 on bad arguments.
"""
import argparse
import sys

MIN_PIXELS = 3.0  # a feature needs about 3 px to read as a shape (shell edge, dark gap, inner frame)

# (name, focal mm, nearest m, farthest m): the production's cameras at 960 x 540, 36 mm sensor
AUDIT_CAMERAS = [
    ("CINE_HeroCam", 85.0, 11.59, 14.76),
    ("ENV_EstablishingCam", 35.0, 10.23, 10.38),
    ("Camera (legacy)", 50.0, 3.20, 5.82),
]


def mm_per_pixel(distance_m: float, focal_mm: float, sensor_mm: float, width_px: int) -> float:
    """Millimetres of subject covered by one pixel, at the given distance."""
    if min(distance_m, focal_mm, sensor_mm, width_px) <= 0:
        raise ValueError("distance, focal length, sensor width and pixel width must be positive")
    return distance_m * 1000.0 * sensor_mm / (focal_mm * width_px)


def pixels(feature_mm: float, mm_px: float) -> float:
    """How many pixels a feature of the given size covers."""
    return feature_mm / mm_px


def smallest_feature_mm(mm_px: float, min_px: float = MIN_PIXELS) -> float:
    """The smallest feature that still covers min_px pixels."""
    return mm_px * min_px


def band(name, focal, near, far, sensor, width, feature_mm, min_px=MIN_PIXELS):
    a, b = mm_per_pixel(near, focal, sensor, width), mm_per_pixel(far, focal, sensor, width)
    return {
        "camera": name, "focal_mm": focal, "distance_m": (near, far),
        "mm_per_px": (a, b),
        "feature_px": (pixels(feature_mm, b), pixels(feature_mm, a)),
        "smallest_mm": (smallest_feature_mm(a, min_px), smallest_feature_mm(b, min_px)),
    }


def show(rows, feature_mm, min_px):
    print(f"{'camera':<22}{'lens':>7}{'distance m':>16}{'mm / px':>14}{f'{feature_mm:g} mm reads as':>20}{f'smallest {min_px:g} px feature':>26}")
    for r in rows:
        d = f"{r['distance_m'][0]:.2f} - {r['distance_m'][1]:.2f}"
        m = f"{r['mm_per_px'][0]:.2f} - {r['mm_per_px'][1]:.2f}"
        f = f"{r['feature_px'][0]:.2f} - {r['feature_px'][1]:.2f} px"
        s = f"{r['smallest_mm'][0]:.1f} - {r['smallest_mm'][1]:.1f} mm"
        print(f"{r['camera']:<22}{r['focal_mm']:>5g}mm{d:>16}{m:>14}{f:>20}{s:>26}")


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--width", type=int, default=960, help="render width in pixels (default 960)")
    ap.add_argument("--sensor", type=float, default=36.0, help="sensor width in mm (default 36, Blender's)")
    ap.add_argument("--focal", type=float, help="lens in mm; with --distance, checks one camera")
    ap.add_argument("--distance", type=float, nargs=2, metavar=("NEAR", "FAR"), help="subject distance range in metres")
    ap.add_argument("--feature-mm", type=float, default=3.0, help="feature size to test (default 3)")
    ap.add_argument("--min-px", type=float, default=MIN_PIXELS, help="pixels a feature needs to read (default 3)")
    a = ap.parse_args(argv)
    try:
        if a.focal and a.distance:
            cams = [("camera", a.focal, a.distance[0], a.distance[1])]
        elif a.focal or a.distance:
            ap.error("--focal and --distance go together")
        else:
            cams = AUDIT_CAMERAS
        rows = [band(n, f, lo, hi, a.sensor, a.width, a.feature_mm, a.min_px) for n, f, lo, hi in cams]
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return 2
    show(rows, a.feature_mm, a.min_px)
    return 0


if __name__ == "__main__":
    sys.exit(main())
