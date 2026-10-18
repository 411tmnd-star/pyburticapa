"""
diorama_blockout.py — Blender (bpy) blockout of an ORIGINAL miniature night scene
("noodle cart under lanterns") with a camera that follows the same shot grammar
as the 56th (final) version of the opening film shown in the design talk:

  S1 0.0-2.0s  low lateral track through foreground plants (parallax, shallow focus)
  S2 2.0-3.0s  foreground trunk wipes across frame (hides the move)
  S3 3.0-5.0s  low dolly-in toward the hero (the cart + fire/lantern glow)
  S4 5.0-6.5s  big foreground leaf sweeps across (second natural wipe)
  S5 6.5-9.5s  slow arc around the hero, revealing the secondary prop on the right
  S6 9.5-11.5s pull back; second trunk wipe
  S7 11.5-13s  camera clears the trunk -> 3D title revealed in the sky
  S8 13-20s    hold on the hero wide, very slow push, ambient loops

Why this grammar: the first version ("a little jilted") changed speed abruptly,
flew through geometry and jumped scale. The final hides every transition behind
something in the foreground and keeps one continuous, slow camera.

Run headless (renders clay frames with Workbench):
    blender -b -P diorama_blockout.py -- --out ./clay --every 4
or with Blender-as-a-module:
    python diorama_blockout.py --out ./clay --every 4

Then hand the clay frames (or depth passes) to your style step
(ComfyUI + ControlNet depth, or a node canvas like Figma Weave) and the
styled keyframes to an image-to-video model, one shot at a time.
"""
import math, os, sys, argparse
import bpy
from mathutils import Vector

FPS = 24
SECONDS = 20
RES = (640, 360)


def args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    p = argparse.ArgumentParser()
    p.add_argument("--out", default="./clay")
    p.add_argument("--every", type=int, default=4, help="render every Nth frame")
    p.add_argument("--no-render", action="store_true")
    p.add_argument("--save", default="", help="optional path to save the .blend")
    return p.parse_args(argv)


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    s = bpy.context.scene
    s.render.fps = FPS
    s.frame_start, s.frame_end = 1, FPS * SECONDS
    s.render.resolution_x, s.render.resolution_y = RES
    return s


def mat(name, rgb, rough=0.9):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*rgb, 1)          # what Workbench shows in MATERIAL color mode
    m.roughness = rough
    return m


def add(kind, name, loc, scale=(1, 1, 1), rot=(0, 0, 0), m=None, **kw):
    ops = {
        "cube": bpy.ops.mesh.primitive_cube_add,
        "cyl": bpy.ops.mesh.primitive_cylinder_add,
        "cone": bpy.ops.mesh.primitive_cone_add,
        "sphere": bpy.ops.mesh.primitive_uv_sphere_add,
        "plane": bpy.ops.mesh.primitive_plane_add,
        "torus": bpy.ops.mesh.primitive_torus_add,
    }
    ops[kind](location=loc, rotation=rot, **kw)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    if m:
        o.data.materials.append(m)
    return o


def build_scene():
    M = {
        "ground": mat("ground_felt", (0.20, 0.13, 0.09)),
        "rug": mat("rug_knit", (0.42, 0.10, 0.10)),
        "rug2": mat("rug_dots", (0.55, 0.42, 0.12)),
        "wood": mat("wood", (0.33, 0.17, 0.08)),
        "cart": mat("cart_red", (0.62, 0.12, 0.10)),
        "awning": mat("awning_cream", (0.86, 0.78, 0.62)),
        "lantern": mat("lantern_glow", (1.0, 0.55, 0.15)),
        "leaf": mat("leaf_teal", (0.10, 0.36, 0.33)),
        "leaf2": mat("leaf_sage", (0.45, 0.55, 0.36)),
        "mush": mat("mushroom_lilac", (0.55, 0.45, 0.62)),
        "trunk": mat("trunk", (0.30, 0.16, 0.10)),
        "pine": mat("pine", (0.06, 0.24, 0.20)),
        "sky": mat("sky", (0.18, 0.14, 0.36)),
        "bike": mat("bike_blue", (0.15, 0.30, 0.62)),
        "title": mat("title_cream", (0.95, 0.90, 0.80)),
    }
    add("plane", "Ground", (0, 0, 0), (14, 14, 1), m=M["ground"])
    add("cyl", "Rug_Knit", (0, 0, 0.01), (2.2, 2.2, 0.01), m=M["rug"], vertices=48)
    add("cube", "Rug_Dots", (-2.6, 0.8, 0.01), (1.0, 0.7, 0.01), m=M["rug2"])

    # hero: noodle cart with awning, pot and three lanterns
    add("cube", "Cart_Body", (0, 1.2, 0.55), (1.0, 0.45, 0.4), m=M["cart"])
    add("cube", "Cart_Top", (0, 1.2, 0.98), (1.05, 0.5, 0.03), m=M["wood"])
    for x in (-0.8, 0.8):
        add("cyl", f"Cart_Post{x}", (x, 1.2, 1.4), (0.04, 0.04, 0.45), m=M["wood"])
    add("cube", "Awning", (0, 1.15, 1.88), (1.2, 0.65, 0.04), rot=(math.radians(-12), 0, 0), m=M["awning"])
    add("cyl", "Pot", (0.35, 1.15, 1.12), (0.22, 0.22, 0.14), m=M["wood"])
    add("torus", "Wheel_L", (-0.7, 0.72, 0.32), (0.32, 0.32, 0.32), rot=(0, math.radians(90), 0), m=M["wood"])
    add("torus", "Wheel_R", (0.7, 0.72, 0.32), (0.32, 0.32, 0.32), rot=(0, math.radians(90), 0), m=M["wood"])
    lanterns = []
    for i, x in enumerate((-0.7, 0.0, 0.7)):
        lanterns.append(add("sphere", f"Lantern_{i}", (x, 0.75, 1.62), (0.16, 0.16, 0.2), m=M["lantern"], segments=24, ring_count=12))

    # stools in front of the cart
    for i, x in enumerate((-0.9, 0.9)):
        add("cyl", f"Stool_{i}", (x, -0.3, 0.25), (0.22, 0.22, 0.25), m=M["wood"])

    # secondary prop (revealed in S5/S7): a parked bicycle on the right
    add("torus", "Bike_W1", (3.0, 0.0, 0.42), (0.42, 0.42, 0.42), rot=(math.radians(90), 0, math.radians(20)), m=M["bike"])
    add("torus", "Bike_W2", (3.9, 0.35, 0.42), (0.42, 0.42, 0.42), rot=(math.radians(90), 0, math.radians(20)), m=M["bike"])
    add("cube", "Bike_Frame", (3.45, 0.18, 0.75), (0.5, 0.03, 0.03), rot=(0, 0, math.radians(20)), m=M["bike"])

    # foreground band the camera tracks through (S1): mushrooms + plants
    import random
    random.seed(7)
    for i in range(26):
        x = -5.2 + i * 0.42 + random.uniform(-0.1, 0.1)
        y = -3.2 + random.uniform(-0.4, 0.4)
        h = random.uniform(0.25, 0.7)
        add("cyl", f"Mush_Stem_{i}", (x, y, h / 2), (0.05, 0.05, h / 2), m=M["awning"])
        add("sphere", f"Mush_Cap_{i}", (x, y, h), (0.22, 0.22, 0.09), m=M["mush"], segments=16, ring_count=8)
        add("cone", f"Plant_{i}", (x + 0.2, y - 0.3, 0.35), (0.25, 0.06, 0.6), rot=(0, random.uniform(-.4, .4), random.uniform(0, 3)), m=M["leaf2"] if i % 2 else M["leaf"])

    # wipe objects: two trunks and one giant leaf placed on the camera path
    add("cyl", "Trunk_Wipe_1", (-1.6, -2.1, 2.0), (0.35, 0.35, 2.0), m=M["trunk"])
    add("cyl", "Trunk_Wipe_2", (0.4, -2.4, 2.0), (0.22, 0.22, 2.0), m=M["trunk"])
    add("plane", "Leaf_Wipe", (-1.2, -1.2, 0.62), (0.45, 0.16, 1), rot=(math.radians(80), 0, math.radians(15)), m=M["leaf"])

    # backdrop: pine ring + sky dome
    for i in range(30):
        a = i / 30 * math.tau
        r = 7.5 + (i % 3) * 0.6
        add("cone", f"Pine_{i}", (math.cos(a) * r, math.sin(a) * r + 2, 1.6 + (i % 4) * 0.3), (0.9, 0.9, 1.8 + (i % 4) * 0.3), m=M["pine"])
    add("sphere", "Sky", (0, 2, 0), (20, 20, 12), m=M["sky"], segments=32, ring_count=16)
    bpy.context.active_object.data.polygons.foreach_set("use_smooth", [True] * len(bpy.context.active_object.data.polygons))

    # 3D title placed in the sky, revealed in S7
    bpy.ops.object.text_add(location=(-0.9, 5.5, 3.9), rotation=(math.radians(90), 0, 0))
    t = bpy.context.active_object
    t.name = "Title"
    t.data.body = "YOUR\nSUMMIT"
    t.data.extrude = 0.05
    t.data.size = 0.9
    t.data.materials.append(M["title"])
    return lanterns


def fcurves_of(ob):
    """F-curves of an object's action: Action.fcurves before Blender 4.4, layers/strips/channelbags after."""
    act = ob.animation_data.action
    if hasattr(act, "fcurves"):
        return list(act.fcurves)
    out = []
    for layer in act.layers:
        for strip in layer.strips:
            for slot in act.slots:
                bag = strip.channelbag(slot)
                if bag:
                    out += list(bag.fcurves)
    return out


def keyframe_camera(scene):
    cam_data = bpy.data.cameras.new("Cam")
    cam_data.lens = 35
    cam_data.dof.use_dof = True
    cam_data.dof.aperture_fstop = 1.8
    cam = bpy.data.objects.new("Cam", cam_data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    target = bpy.data.objects.new("CamTarget", None)
    scene.collection.objects.link(target)
    track = cam.constraints.new("TRACK_TO")
    track.target = target
    track.track_axis, track.up_axis = "TRACK_NEGATIVE_Z", "UP_Y"
    cam_data.dof.focus_object = target

    # (seconds, camera location, look-at target) — one continuous path, no cuts
    beats = [
        (0.0,  (-5.0, -4.2, 0.45), (-3.0, -3.0, 0.35)),   # S1 start: low, in the foreground band
        (2.0,  (-2.4, -3.6, 0.45), (-0.6, -1.4, 0.40)),   # S1 end / S2 trunk passes between
        (3.0,  (-1.2, -3.2, 0.50), (0.0, 0.8, 0.80)),     # S3 start: hero in view
        (5.0,  (-0.6, -2.8, 0.70), (0.0, 1.0, 1.10)),     # S3 end: close on the cart
        (6.5,  (0.0, -2.7, 0.75), (0.1, 1.0, 1.15)),      # S4 leaf crosses
        (9.5,  (1.5, -2.5, 0.90), (0.3, 1.0, 1.20)),      # S5 arc right, bike enters
        (11.5, (-0.6, -3.6, 1.10), (0.3, 1.4, 1.60)),     # S6 pull back + sideways: trunk 2 crosses frame
        (13.0, (-1.8, -5.0, 1.40), (0.2, 2.2, 2.20)),     # S7 cleared: title + whole scene
        (20.0, (-1.7, -4.7, 1.38), (0.2, 2.2, 2.15)),     # S8 hold, ~4% push
    ]
    for sec, loc, tgt in beats:
        f = 1 + round(sec * FPS)
        cam.location = loc
        cam.keyframe_insert("location", frame=f)
        target.location = tgt
        target.keyframe_insert("location", frame=f)
    # Bezier with auto-clamped handles = no overshoot, no sudden speed spikes
    for ob in (cam, target):
        for fc in fcurves_of(ob):
            for kp in fc.keyframe_points:
                kp.interpolation = "BEZIER"
                kp.handle_left_type = kp.handle_right_type = "AUTO_CLAMPED"
    return cam


def animate_ambient(lanterns):
    # lantern sway: small rotation loop, 2s period, phase-shifted per lantern
    for i, l in enumerate(lanterns):
        for f in range(1, FPS * SECONDS + 1, FPS):
            l.rotation_euler = (math.radians(4 * math.sin((f / FPS + i * 0.7) * math.pi)), 0, 0)
            l.keyframe_insert("rotation_euler", frame=f)
    # Film-set "cheat": once a wipe object has done its job, it leaves the set,
    # so it never blocks a later framing (crews move flats between setups).
    # (name, enters the set at, leaves the set at) — each enters while out of frame
    # the title stays hidden until the camera clears the second trunk (S7), as the shot plan says
    title = bpy.data.objects["Title"]
    for sec, hidden in ((0.0, True), (11.9, False)):
        title.hide_render = hidden
        title.keyframe_insert("hide_render", frame=1 + round(sec * FPS))
    for name, enter_at, gone_at in (("Trunk_Wipe_1", 0.0, 4.0), ("Leaf_Wipe", 0.0, 6.4), ("Trunk_Wipe_2", 9.4, 12.4)):
        ob = bpy.data.objects[name]
        keys = [(0.0, enter_at > 0), (enter_at, False), (gone_at, True)] if enter_at > 0 else [(0.0, False), (gone_at, True)]
        for sec, hidden in keys:
            ob.hide_render = hidden
            ob.keyframe_insert("hide_render", frame=1 + round(sec * FPS))
    leaf = bpy.data.objects["Leaf_Wipe"]
    # the leaf is pushed ACROSS the lens in about one second during S4 (5.2-6.2s),
    # instead of the camera flying through it: a quick, readable wipe
    for sec, x in ((5.2, -1.2), (6.2, 0.9)):
        leaf.location.x = x
        leaf.keyframe_insert("location", frame=1 + round(sec * FPS))


def setup_render(scene):
    scene.render.engine = "BLENDER_WORKBENCH"
    sh = scene.display.shading
    sh.light = "STUDIO"
    sh.color_type = "MATERIAL"
    sh.show_cavity = True
    sh.show_shadows = True
    sh.use_dof = True            # Workbench ignores the camera's depth of field unless this is on
    scene.render.image_settings.file_format = "PNG"
    try:
        scene.display.render_aa = "8"
    except Exception:
        pass


def main():
    a = args()
    scene = reset()
    lanterns = build_scene()
    keyframe_camera(scene)
    animate_ambient(lanterns)
    setup_render(scene)
    if a.save:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.save))
    if a.no_render:
        return
    os.makedirs(a.out, exist_ok=True)
    for f in range(scene.frame_start, scene.frame_end + 1, a.every):
        scene.frame_set(f)
        scene.render.filepath = os.path.join(os.path.abspath(a.out), f"clay_{f:04d}.png")
        bpy.ops.render.render(write_still=True)
    print("rendered to", a.out)


if __name__ == "__main__":
    main()
