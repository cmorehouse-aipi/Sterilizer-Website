"""
Transparent shell variant — shows internal PCB, battery, and electronic components.
Clear glass body with dark navy tint reveals internal electronics.
Based on render-device.py (midnight) structure.
Run: blender -b -P scripts/render-device-transparent.py
Output: public/renderings/forth-device-transparent-frame-00.png
"""
import bpy
import math
import os

REPO_ROOT         = r"c:\Users\Stephen\Documents\GitHub\Sterilizer-Website"
OUT_DIR           = os.path.join(REPO_ROOT, "public", "renderings")
HDRI_PATH         = os.path.join(REPO_ROOT, "scripts", "hdri", "studio_small_08_1k.exr")

RES_X, RES_Y = 1600, 2400
SAMPLES      = 256

BODY_LENGTH = 6.4
BODY_RADIUS = 1.10
CAP_RADIUS  = 1.10

# ── Glass shell ───────────────────────────────────────────────────────────────
SHELL_TINT  = (0.005, 0.008, 0.02, 1.0)    # near-zero tint — water-clear with breath of blue
SHELL_TRANS = 0.995
SHELL_ROUGH = 0.03
SHELL_IOR   = 1.08                          # low IOR — minimal refraction, less light loss

# ── Caps (identical to midnight standard) ────────────────────────────────────
CAP_BASE      = (0.55,  0.72,  0.92,  1.0)
CAP_EDGE      = (0.85,  0.93,  1.0,   1.0)
CAP_EMIT      = (0.45,  0.70,  1.0,   1.0)
CAP_EDGE_EMIT = (0.55,  0.80,  1.0,   1.0)

# ── Internals ─────────────────────────────────────────────────────────────────
PCB_GREEN = (0.05,  0.22,  0.05,  1.0)   # bright FR4 green — visible through glass
GOLD      = (0.72,  0.48,  0.06,  1.0)   # bright gold traces
CHIP_DARK = (0.12,  0.12,  0.14,  1.0)   # IC package — lighter so it reads through glass
CAP_TAN   = (0.45,  0.30,  0.08,  1.0)   # electrolytic capacitor — warm tan
BATT_GREY = (0.38,  0.40,  0.44,  1.0)   # battery casing — light metallic grey
BATT_BLUE = (0.08,  0.14,  0.60,  1.0)   # battery label — bright blue


def set_principled(bsdf, **kwargs):
    aliases = {
        "Transmission":  ["Transmission Weight", "Transmission"],
        "Coat":          ["Coat Weight", "Clearcoat"],
        "CoatRoughness": ["Coat Roughness", "Clearcoat Roughness"],
        "Sheen":         ["Sheen Weight", "Sheen"],
    }
    for key, value in kwargs.items():
        for n in aliases.get(key, [key]):
            if n in bsdf.inputs:
                bsdf.inputs[n].default_value = value
                break


def _make_mat(name, color, metallic=0.0, roughness=0.5):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat


def make_body():
    bpy.ops.mesh.primitive_cylinder_add(
        radius=BODY_RADIUS, depth=BODY_LENGTH, vertices=192, location=(0, 0, 0)
    )
    obj = bpy.context.active_object
    obj.name = "Body"

    bevel = obj.modifiers.new(name="Bevel", type='BEVEL')
    bevel.width = 0.04
    bevel.segments = 6
    bevel.limit_method = 'ANGLE'

    bpy.ops.object.shade_smooth()

    # Thin-surface transparent shader: Transparent BSDF + Glossy, mixed by Fresnel.
    # Avoids volumetric glass absorption — internals read clearly through the shell.
    mat = bpy.data.materials.new("BodyGlass")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_MATERIAL':
            nodes.remove(node)

    output = nodes['Material Output']

    # Slightly tinted transparent layer
    transparent = nodes.new('ShaderNodeBsdfTransparent')
    transparent.inputs["Color"].default_value = (0.88, 0.93, 1.0, 1.0)  # cool glass tint

    # Sharp gloss for surface highlights
    glossy = nodes.new('ShaderNodeBsdfGlossy')
    glossy.inputs["Color"].default_value = (0.95, 0.97, 1.0, 1.0)
    glossy.inputs["Roughness"].default_value = 0.04

    # Fresnel — more reflective at grazing angles, transparent facing straight on
    fresnel = nodes.new('ShaderNodeFresnel')
    fresnel.inputs["IOR"].default_value = 1.45

    mix = nodes.new('ShaderNodeMixShader')
    links.new(fresnel.outputs["Fac"], mix.inputs["Fac"])
    links.new(transparent.outputs["BSDF"], mix.inputs[1])
    links.new(glossy.outputs["BSDF"], mix.inputs[2])
    links.new(mix.outputs["Shader"], output.inputs["Surface"])

    obj.data.materials.append(mat)
    return obj


def make_cap(z_offset, name, top=True):
    bpy.ops.mesh.primitive_ico_sphere_add(
        subdivisions=2, radius=CAP_RADIUS, location=(0, 0, z_offset)
    )
    obj = bpy.context.active_object
    obj.name = name

    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.bisect(
        plane_co=(0.0, 0.0, z_offset),
        plane_no=(0.0, 0.0, 1.0 if top else -1.0),
        clear_inner=True,
        use_fill=True,
    )
    bpy.ops.object.mode_set(mode='OBJECT')
    bpy.ops.object.shade_flat()

    edge_bevel = obj.modifiers.new(name="EdgeAccent", type='BEVEL')
    edge_bevel.width = 0.006
    edge_bevel.segments = 2
    edge_bevel.limit_method = 'NONE'
    edge_bevel.material = 1

    mat = bpy.data.materials.new(f"CapMat_{name}")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = CAP_BASE
    set_principled(bsdf, Roughness=0.22, IOR=1.46, Transmission=0.25)
    if "Emission Color"    in bsdf.inputs: bsdf.inputs["Emission Color"].default_value    = CAP_EMIT
    if "Emission Strength" in bsdf.inputs: bsdf.inputs["Emission Strength"].default_value = 0.15
    obj.data.materials.append(mat)

    edge_mat = bpy.data.materials.new(f"CapEdgeMat_{name}")
    edge_mat.use_nodes = True
    edge_bsdf = edge_mat.node_tree.nodes["Principled BSDF"]
    edge_bsdf.inputs["Base Color"].default_value = CAP_EDGE
    set_principled(edge_bsdf, Roughness=0.10, IOR=1.46, Transmission=0.20)
    if "Emission Color"    in edge_bsdf.inputs: edge_bsdf.inputs["Emission Color"].default_value    = CAP_EDGE_EMIT
    if "Emission Strength" in edge_bsdf.inputs: edge_bsdf.inputs["Emission Strength"].default_value = 0.45
    obj.data.materials.append(edge_mat)
    return obj


def make_internals():
    # Device long axis = Z, body from -3.2 to +3.2.
    # PCB runs full length (right side from camera), battery full length (left side).
    # Coil at bottom end only.

    # ── PCB — full body length ─────────────────────────────────────────────────
    PCB_W, PCB_T, PCB_L = 1.20, 0.055, 6.00
    PCB_X, PCB_Y = 0.0, 0.0

    bpy.ops.mesh.primitive_cube_add(size=1, location=(PCB_X, PCB_Y, 0))
    pcb = bpy.context.active_object
    pcb.name = "PCB"
    pcb.scale = (PCB_W, PCB_T, PCB_L)
    bpy.ops.object.transform_apply(scale=True)
    pcb.data.materials.append(_make_mat("PCBMat", PCB_GREEN, roughness=0.55))

    # Gold trace lines running full PCB length
    trace_y = PCB_Y - PCB_T / 2 - 0.001
    for x_off, width in [(-0.25, 0.018), (-0.10, 0.012), (0.08, 0.015), (0.22, 0.012), (0.32, 0.018)]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(PCB_X + x_off, trace_y, 0))
        t = bpy.context.active_object
        t.name = f"Trace_{x_off}"
        t.scale = (width, 0.001, PCB_L * 0.94)
        bpy.ops.object.transform_apply(scale=True)
        t.data.materials.append(_make_mat(f"TraceMat_{x_off}", GOLD, metallic=0.9, roughness=0.2))

    # Horizontal traces distributed along full length
    for z_off in [2.20, 1.20, 0.10, -0.90, -2.00]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(PCB_X, trace_y, z_off))
        ht = bpy.context.active_object
        ht.name = f"HTrace_{z_off}"
        ht.scale = (PCB_W * 0.82, 0.001, 0.010)
        bpy.ops.object.transform_apply(scale=True)
        ht.data.materials.append(_make_mat(f"HTraceMat_{z_off}", GOLD, metallic=0.9, roughness=0.2))

    # ── Battery pack — full body length, stops above coil ─────────────────────
    BAT_W, BAT_H, BAT_L = 1.20, 0.65, 5.80
    BAT_X, BAT_Y = 0.0, 0.35
    bat_z_center = 0.0

    bpy.ops.mesh.primitive_cube_add(size=1, location=(BAT_X, BAT_Y, bat_z_center))
    bat = bpy.context.active_object
    bat.name = "Battery"
    bat.scale = (BAT_W, BAT_H, BAT_L)
    bpy.ops.object.transform_apply(scale=True)
    bev = bat.modifiers.new("BatBevel", 'BEVEL')
    bev.width = 0.025
    bev.segments = 3
    bev.limit_method = 'ANGLE'
    bat.data.materials.append(_make_mat("BatteryMat", BATT_GREY, metallic=0.75, roughness=0.35))

    # Battery label (blue stripe on camera-facing side)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(BAT_X, BAT_Y - BAT_H / 2 - 0.001, bat_z_center))
    label = bpy.context.active_object
    label.name = "BatteryLabel"
    label.scale = (BAT_W - 0.01, 0.001, BAT_L * 0.55)
    bpy.ops.object.transform_apply(scale=True)
    label.data.materials.append(_make_mat("BattLabelMat", BATT_BLUE, roughness=0.7))

    # -- UV Driver ICs (QFP, upper PCB zone) --------------------------------
    chip_y = trace_y - 0.008
    pin_mat     = _make_mat("PinMat",    GOLD,      metallic=0.9, roughness=0.25)
    ic_body_mat = _make_mat("ICBodyMat", CHIP_DARK, roughness=0.4)

    for ic_i, ic_x in enumerate([PCB_X - 0.18, PCB_X + 0.18]):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(ic_x, chip_y, 2.44))
        ic = bpy.context.active_object; ic.name = f"UVDriverIC_{ic_i+1}"
        ic.scale = (0.168, 0.018, 0.307); bpy.ops.object.transform_apply(scale=True)
        ic.data.materials.append(ic_body_mat)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.012, depth=0.002, vertices=8,
            location=(ic_x - 0.14, chip_y - 0.019, 2.71))
        bpy.context.active_object.data.materials.append(
            _make_mat(f"DotMat_{ic_i}", (0.4, 0.4, 0.42, 1.0), roughness=0.5))
        for z_off in [-0.22, -0.11, 0.0, 0.11, 0.22]:
            for side, sx in [("L", -0.178), ("R", 0.178)]:
                bpy.ops.mesh.primitive_cube_add(size=1, location=(ic_x + sx, chip_y, 2.44 + z_off))
                p = bpy.context.active_object; p.name = f"ICPin_{ic_i}_{z_off}_{side}"
                p.scale = (0.010, 0.007, 0.018); bpy.ops.object.transform_apply(scale=True)
                p.data.materials.append(pin_mat)

    # Toroidal inductor (near top of PCB, between the two UV driver ICs)
    bpy.ops.mesh.primitive_torus_add(location=(PCB_X, chip_y - 0.046, 2.72),
        major_radius=0.13, minor_radius=0.055, major_segments=24, minor_segments=8)
    toroid = bpy.context.active_object; toroid.name = "ToroidInductor"
    toroid.rotation_euler = (math.pi / 2, 0, 0)
    bpy.ops.object.transform_apply(rotation=True)
    toroid.data.materials.append(_make_mat("ToroidMat", (0.35, 0.25, 0.08, 1.0), metallic=0.5, roughness=0.6))
    bpy.ops.mesh.primitive_torus_add(location=(PCB_X, chip_y - 0.046, 2.72),
        major_radius=0.13, minor_radius=0.026, major_segments=24, minor_segments=4)
    bpy.context.active_object.name = "ToroidWinding"
    bpy.context.active_object.rotation_euler = (math.pi / 2, 0, 0)
    bpy.ops.object.transform_apply(rotation=True)
    bpy.context.active_object.data.materials.append(_make_mat("WindingMat", GOLD, metallic=0.9, roughness=0.2))

    # Bottom UV driver ICs (mirror of top layout, just above bottom UV disc)
    for ic_i, ic_x in enumerate([PCB_X - 0.18, PCB_X + 0.18]):
        bpy.ops.mesh.primitive_cube_add(size=1, location=(ic_x, chip_y, -2.65))
        ic = bpy.context.active_object; ic.name = f"BotUVDriverIC_{ic_i+1}"
        ic.scale = (0.168, 0.018, 0.307); bpy.ops.object.transform_apply(scale=True)
        ic.data.materials.append(ic_body_mat)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.012, depth=0.002, vertices=8,
            location=(ic_x - 0.14, chip_y - 0.019, -2.88))
        bpy.context.active_object.data.materials.append(
            _make_mat(f"BotDotMat_{ic_i}", (0.4, 0.4, 0.42, 1.0), roughness=0.5))
        for z_off in [-0.22, -0.11, 0.0, 0.11, 0.22]:
            for side, sx in [("L", -0.178), ("R", 0.178)]:
                bpy.ops.mesh.primitive_cube_add(size=1, location=(ic_x + sx, chip_y, -2.65 + z_off))
                p = bpy.context.active_object; p.name = f"BotICPin_{ic_i}_{z_off}_{side}"
                p.scale = (0.010, 0.007, 0.018); bpy.ops.object.transform_apply(scale=True)
                p.data.materials.append(pin_mat)

    # Bottom toroidal inductor (between the two bottom UV driver ICs)
    bpy.ops.mesh.primitive_torus_add(location=(PCB_X, chip_y - 0.046, -2.72),
        major_radius=0.13, minor_radius=0.055, major_segments=24, minor_segments=8)
    bot_toroid = bpy.context.active_object; bot_toroid.name = "BotToroidInductor"
    bot_toroid.rotation_euler = (math.pi / 2, 0, 0)
    bpy.ops.object.transform_apply(rotation=True)
    bot_toroid.data.materials.append(_make_mat("BotToroidMat", (0.35, 0.25, 0.08, 1.0), metallic=0.5, roughness=0.6))
    bpy.ops.mesh.primitive_torus_add(location=(PCB_X, chip_y - 0.046, -2.72),
        major_radius=0.13, minor_radius=0.026, major_segments=24, minor_segments=4)
    bpy.context.active_object.name = "BotToroidWinding"
    bpy.context.active_object.rotation_euler = (math.pi / 2, 0, 0)
    bpy.ops.object.transform_apply(rotation=True)
    bpy.context.active_object.data.materials.append(_make_mat("BotWindingMat", GOLD, metallic=0.9, roughness=0.2))

    # -- MCU + PWR IC (upper-middle zone) -------------------------------------
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.215, chip_y, 1.35))
    mcu = bpy.context.active_object; mcu.name = "MCU"
    mcu.scale = (0.232, 0.020, 0.354); bpy.ops.object.transform_apply(scale=True)
    mcu.data.materials.append(ic_body_mat)
    for z_off in [-0.22, -0.11, 0.0, 0.11, 0.22]:
        for side, sx in [("L", -0.242), ("R", 0.242)]:
            bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.215 + sx, chip_y, 1.35 + z_off))
            p = bpy.context.active_object; p.name = f"MCUPin_{z_off}_{side}"
            p.scale = (0.010, 0.007, 0.018); bpy.ops.object.transform_apply(scale=True)
            p.data.materials.append(pin_mat)

    bpy.ops.mesh.primitive_cube_add(size=1, location=(0.16, chip_y, 1.40))
    pwr = bpy.context.active_object; pwr.name = "PWRIC"
    pwr.scale = (0.116, 0.018, 0.237); bpy.ops.object.transform_apply(scale=True)
    pwr.data.materials.append(_make_mat("PWRMat", (0.20, 0.20, 0.28, 1.0), roughness=0.4))
    for z_off in [-0.14, 0.0, 0.14]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(0.16 - 0.126, chip_y, 1.40 + z_off))
        p = bpy.context.active_object; p.scale = (0.010, 0.007, 0.015); bpy.ops.object.transform_apply(scale=True)
        p.data.materials.append(pin_mat)

    # -- Three electrolytic caps (lower-middle zone) --------------------------
    cap_mat = _make_mat("CapacitorMat", CAP_TAN, roughness=0.65)
    CAP_R, CAP_D = 0.072, 0.45
    for cap_i, (cap_x, cap_z) in enumerate([(-0.356, 0.38), (-0.150, 0.38), (0.056, 0.38)]):
        bpy.ops.mesh.primitive_cylinder_add(radius=CAP_R, depth=CAP_D, vertices=12,
            location=(cap_x, chip_y - 0.06, cap_z))
        c = bpy.context.active_object; c.name = f"Cap_{cap_i}"
        c.data.materials.append(cap_mat)
        bpy.ops.mesh.primitive_cylinder_add(radius=CAP_R, depth=0.014, vertices=12,
            location=(cap_x, chip_y - 0.06, cap_z + CAP_D / 2 + 0.007))
        bpy.context.active_object.name = f"CapTop_{cap_i}"
        bpy.context.active_object.data.materials.append(
            _make_mat(f"CapTopMat_{cap_i}", (0.25, 0.22, 0.18, 1.0), roughness=0.5))

    # -- SMD passives (two rows) ----------------------------------------------
    smd_mat = _make_mat("SMDMat", CHIP_DARK, roughness=0.5)
    for x_off, z_pos in [(-0.28, -0.05), (-0.10, -0.05), (0.06, -0.05), (0.22, -0.05), (0.38, -0.05),
                          (-0.28, -0.65), (-0.10, -0.65), (0.10, -0.65), (0.28, -0.65),
                          (-0.28, -1.20), (0.10, -1.20), (0.38, -1.20)]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(PCB_X + x_off, chip_y + 0.007, z_pos))
        s = bpy.context.active_object; s.name = f"SMD_{x_off}_{z_pos}"
        s.scale = (0.038, 0.004, 0.024); bpy.ops.object.transform_apply(scale=True)
        s.data.materials.append(smd_mat)

    # -- Motion sensor SOP (lower PCB zone) -----------------------------------
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.292, chip_y, -0.83))
    sensor = bpy.context.active_object; sensor.name = "MotionSensor"
    sensor.scale = (0.142, 0.018, 0.166); bpy.ops.object.transform_apply(scale=True)
    sensor.data.materials.append(_make_mat("SensorMat", (0.18, 0.18, 0.26, 1.0), roughness=0.4))
    for z_off in [-0.09, 0.06]:
        for side, sx in [("L", -0.152), ("R", 0.152)]:
            bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.292 + sx, chip_y, -0.83 + z_off))
            p = bpy.context.active_object; p.scale = (0.010, 0.007, 0.012); bpy.ops.object.transform_apply(scale=True)
            p.data.materials.append(pin_mat)

    # -- Multi-pin emitter connector (bottom PCB zone) ------------------------
    bpy.ops.mesh.primitive_cube_add(size=1, location=(PCB_X, chip_y - 0.014, -2.10))
    conn = bpy.context.active_object; conn.name = "Connector"
    conn.scale = (PCB_W * 0.92, 0.046, 0.213); bpy.ops.object.transform_apply(scale=True)
    conn.data.materials.append(_make_mat("ConnectorMat", (0.20, 0.22, 0.28, 1.0), roughness=0.6))
    conn_gold = _make_mat("ConnPinMat", GOLD, metallic=0.9, roughness=0.2)
    for pin_i in range(7):
        px = PCB_X - 0.33 + pin_i * 0.11
        bpy.ops.mesh.primitive_cube_add(size=1, location=(px, chip_y - 0.048, -2.10))
        cp = bpy.context.active_object; cp.name = f"ConnPin_{pin_i}"
        cp.scale = (0.020, 0.036, 0.068); bpy.ops.object.transform_apply(scale=True)
        cp.data.materials.append(conn_gold)

    # ── Magnetic charging contacts    # ── Magnetic charging contacts (right side, +X face) ─────────────────────
    # Oval recess pocket with three gold contact pads inside, centered on shell
    CHARGE_Z = 0.0
    contact_mat = _make_mat("ContactMat",       (0.72, 0.58, 0.30, 1.0), metallic=0.95, roughness=0.10)
    recess_mat  = _make_mat("ContactRecessMat", (0.07, 0.08, 0.10, 1.0), metallic=0.20, roughness=0.85)

    # Oval recess — front face flush with body surface, pocket extends inward
    # depth=0.020 → half-length=0.010; center at BODY_RADIUS-0.010 → front face at BODY_RADIUS
    bpy.ops.mesh.primitive_cylinder_add(radius=0.065, depth=0.020, vertices=32,
        location=(BODY_RADIUS - 0.010, 0.0, CHARGE_Z))
    recess = bpy.context.active_object
    recess.name = "ContactRecess"
    recess.rotation_euler = (0, math.pi / 2, 0)
    bpy.ops.object.transform_apply(rotation=True)
    recess.scale = (1.0, 2.6, 1.0)
    bpy.ops.object.transform_apply(scale=True)
    recess.data.materials.append(recess_mat)

    # Three gold pads — depth=0.008 → half-length=0.004; center at BODY_RADIUS-0.009
    # → pad face at BODY_RADIUS-0.005 (5 mm proud of recess floor, 5 mm below body surface)
    for i, y_off in enumerate([-0.072, 0.0, 0.072]):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.026, depth=0.008, vertices=24,
            location=(BODY_RADIUS - 0.009, y_off, CHARGE_Z))
        pad = bpy.context.active_object
        pad.name = f"ContactPad_{i + 1}"
        pad.rotation_euler = (0, math.pi / 2, 0)
        bpy.ops.object.transform_apply(rotation=True)
        pad.data.materials.append(contact_mat)

    # ── UV driver PCBs — circular discs at each end, just inside domes ────────
    pcb_mat = _make_mat("UVDriverPCBMat", PCB_GREEN, roughness=0.55)
    led_ring_mat = _make_mat("UVLEDRingMat", (0.70, 0.80, 0.95, 1.0), roughness=0.3)
    cob_mat = _make_mat("COBMat", (0.12, 0.12, 0.15, 1.0), roughness=0.3)

    # Top UV driver PCB (edge-on disc, just inside top dome)
    top_pcb_z = BODY_LENGTH / 2 - 0.20
    bpy.ops.mesh.primitive_cylinder_add(radius=0.95, depth=0.08, vertices=48, location=(0, 0, top_pcb_z))
    top_pcb = bpy.context.active_object
    top_pcb.name = "TopUVDriverPCB"
    top_pcb.data.materials.append(pcb_mat)
    bpy.ops.mesh.primitive_torus_add(location=(0, 0, top_pcb_z + 0.045),
        major_radius=0.62, minor_radius=0.025, major_segments=36, minor_segments=6)
    bpy.context.active_object.name = "TopLEDRing"
    bpy.context.active_object.data.materials.append(led_ring_mat)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=0.025, vertices=16, location=(0, 0, top_pcb_z + 0.052))
    bpy.context.active_object.name = "TopCOB"
    bpy.context.active_object.data.materials.append(cob_mat)

    # Bottom UV driver PCB (interior face with transformer detail)
    bot_pcb_z = -BODY_LENGTH / 2 + 0.20
    bpy.ops.mesh.primitive_cylinder_add(radius=0.95, depth=0.08, vertices=48, location=(0, 0, bot_pcb_z))
    bot_pcb = bpy.context.active_object
    bot_pcb.name = "BotUVDriverPCB"
    bot_pcb.data.materials.append(pcb_mat)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.10, 0, bot_pcb_z - 0.06))
    xfmr = bpy.context.active_object; xfmr.name = "Transformer"
    xfmr.scale = (0.28, 0.22, 0.048); bpy.ops.object.transform_apply(scale=True)
    xfmr.data.materials.append(_make_mat("XfmrMat", (0.10, 0.08, 0.10, 1.0), roughness=0.5))
    for x_off in [-0.10, 0.10]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.10 + x_off, 0, bot_pcb_z - 0.062))
        ww = bpy.context.active_object
        ww.scale = (0.075, 0.12, 0.045); bpy.ops.object.transform_apply(scale=True)
        ww.data.materials.append(_make_mat(f"WWMat_{x_off}", (0.05, 0.04, 0.05, 1.0), roughness=0.7))
    for x_off, y_off in [(-0.38, 0.28), (0.38, 0.28), (-0.38, -0.28), (0.38, -0.28)]:
        bpy.ops.mesh.primitive_cylinder_add(radius=0.055, depth=0.025, vertices=8,
            location=(x_off, y_off, bot_pcb_z - 0.055))
        bpy.context.active_object.data.materials.append(_make_mat(f"PadMat_{x_off}{y_off}", (0.06, 0.12, 0.06, 1.0), roughness=0.6))



def make_softbox(name, location, rot_euler, scale_yz, color, strength):
    bpy.ops.mesh.primitive_plane_add(size=1, location=location)
    plane = bpy.context.active_object
    plane.name = name
    plane.rotation_euler = rot_euler
    bpy.ops.object.transform_apply(rotation=True)
    plane.scale = (1.0, scale_yz[0], scale_yz[1])
    bpy.ops.object.transform_apply(scale=True)
    mat = bpy.data.materials.new(f"SoftboxMat_{name}")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_MATERIAL':
            nodes.remove(node)
    em = nodes.new('ShaderNodeEmission')
    em.inputs["Color"].default_value = (*color, 1.0)
    em.inputs["Strength"].default_value = strength
    links.new(em.outputs["Emission"], nodes['Material Output'].inputs["Surface"])
    plane.data.materials.append(mat)
    plane.visible_camera = False
    plane.visible_shadow = False


def make_internals_light():
    """Thin emissive plane inside the body — illuminates internal components directly."""
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0.0, 0.35, 0.0))
    plane = bpy.context.active_object
    plane.name = "InteriorFill"
    plane.scale = (0.5, 0.001, BODY_LENGTH * 0.45)
    bpy.ops.object.transform_apply(scale=True)
    mat = bpy.data.materials.new("InteriorFillMat")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_MATERIAL':
            nodes.remove(node)
    em = nodes.new('ShaderNodeEmission')
    em.inputs["Color"].default_value = (0.95, 0.97, 1.0, 1.0)
    em.inputs["Strength"].default_value = 0.42
    links.new(em.outputs["Emission"], nodes['Material Output'].inputs["Surface"])
    plane.data.materials.append(mat)
    plane.visible_camera = False
    plane.visible_shadow = False


def make_lighting():
    # Key light
    make_softbox("KeyBox",    (-5.0, -4.5, 3.0),  (math.radians(-22), math.radians(82), 0), (4.0, 8.0),   (1.0, 0.97, 0.93), 50)
    # Front fill (camera side)
    make_softbox("FrontFill", (0.0,  -9.0, -0.5), (math.radians(90),  0, 0),                (10.0, 14.0), (0.96, 0.97, 1.0),  22)
    # Back light — transmits through device, backlights internals from behind
    make_softbox("BackLight", (0.0,  10.0, 0.0),  (math.radians(-90), 0, 0),                (8.0,  14.0), (0.94, 0.96, 1.0),   6)
    # Top fill
    make_softbox("TopFill",   (0.0,  -3.0, 9.0),  (math.radians(-20), 0, 0),                (6.0,  6.0),  (1.0,  1.0,  1.0),  12)
    # Interior fill — lights components from inside the body
    make_internals_light()


def make_camera():
    angle    = math.radians(14)
    distance = 26.0
    bpy.ops.object.camera_add(location=(-distance * math.sin(angle), -distance * math.cos(angle), 0))
    cam = bpy.context.active_object
    bpy.ops.object.empty_add(location=(0, 0, 0))
    target = bpy.context.active_object
    target.name = "CamTarget"
    constraint = cam.constraints.new(type='TRACK_TO')
    constraint.target = target
    constraint.track_axis = 'TRACK_NEGATIVE_Z'
    constraint.up_axis = 'UP_Y'
    cam.data.lens = 110
    cam.data.sensor_width = 36
    bpy.context.scene.camera = cam
    return cam


def configure_render():
    scene = bpy.context.scene
    scene.render.engine                      = 'CYCLES'
    scene.cycles.samples                     = SAMPLES
    scene.cycles.use_denoising              = True
    scene.cycles.caustics_reflective        = False
    scene.cycles.caustics_refractive        = False
    scene.render.resolution_x               = RES_X
    scene.render.resolution_y               = RES_Y
    scene.render.resolution_percentage      = 100
    scene.render.film_transparent           = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode  = 'RGBA'
    scene.render.image_settings.compression = 15
    scene.view_settings.view_transform      = 'Filmic'
    scene.view_settings.look                = 'High Contrast'

    world = bpy.data.worlds.new("World") if not bpy.data.worlds else bpy.data.worlds[0]
    scene.world = world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    for node in list(nodes):
        if node.type != 'OUTPUT_WORLD':
            nodes.remove(node)
    output   = nodes['World Output']
    env_tex  = nodes.new('ShaderNodeTexEnvironment')
    env_tex.image = bpy.data.images.load(HDRI_PATH)
    mapping  = nodes.new('ShaderNodeMapping')
    mapping.inputs["Rotation"].default_value[2] = math.radians(120)
    tex_coord = nodes.new('ShaderNodeTexCoord')
    links.new(tex_coord.outputs["Generated"], mapping.inputs["Vector"])
    links.new(mapping.outputs["Vector"],      env_tex.inputs["Vector"])
    bg = nodes.new('ShaderNodeBackground')
    bg.inputs["Strength"].default_value = 1.0
    links.new(env_tex.outputs["Color"], bg.inputs["Color"])
    links.new(bg.outputs["Background"], output.inputs["Surface"])

    try:
        comp_tree = bpy.data.node_groups.new(name="CompositorTree", type='CompositorNodeTree')
        if hasattr(scene, "compositing_node_group"):
            scene.compositing_node_group = comp_tree
        if hasattr(comp_tree, "interface"):
            comp_tree.interface.new_socket(name="Image", in_out='OUTPUT', socket_type='NodeSocketColor')
        cnodes = comp_tree.nodes
        clinks = comp_tree.links
        rl    = cnodes.new('CompositorNodeRLayers')
        glare = cnodes.new('CompositorNodeGlare')
        for attr, val in [('glare_type','FOG_GLOW'),('mode','FOG_GLOW'),('quality','HIGH'),
                           ('size', 5),('threshold', 1.0),('mix', -0.4),('bloom_size', 5)]:
            try: setattr(glare, attr, val)
            except (TypeError, AttributeError): pass
        set_alpha = cnodes.new('CompositorNodeSetAlpha')
        out       = cnodes.new('NodeGroupOutput')
        clinks.new(rl.outputs['Image'],        glare.inputs['Image'])
        clinks.new(glare.outputs['Image'],     set_alpha.inputs['Image'])
        clinks.new(rl.outputs['Alpha'],        set_alpha.inputs['Alpha'])
        clinks.new(set_alpha.outputs['Image'], out.inputs[0])
    except Exception as e:
        print(f"[transparent] Compositor skipped: {e}")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)

    make_body()
    make_cap( BODY_LENGTH / 2,  "TopCap", top=True)
    make_cap(-BODY_LENGTH / 2,  "BotCap", top=False)

    pre_internal = set(obj.name for obj in bpy.data.objects)
    make_internals()
    internal_objs = [obj for obj in bpy.data.objects if obj.name not in pre_internal]

    make_lighting()
    make_camera()
    configure_render()

    # Rotate internals around device long axis (Z) so battery is visible behind PCB.
    # Shell is cylindrical — 22° rotation is invisible on the shell.
    bpy.ops.object.empty_add(location=(0, 0, 0))
    internals_root = bpy.context.active_object
    internals_root.name = "InternalsRoot"
    internals_root.rotation_euler = (0, 0, math.radians(22))
    for obj in internal_objs:
        obj.parent = internals_root

    bpy.ops.object.empty_add(location=(0, 0, 0))
    device_root = bpy.context.active_object
    device_root.name = "DeviceRoot"

    NON_DEVICE = {"DeviceRoot", "InternalsRoot", "CamTarget", "KeyBox", "FrontFill"}
    for obj in list(bpy.data.objects):
        if obj.name in NON_DEVICE: continue
        if obj.type in ('CAMERA', 'LIGHT', 'EMPTY'): continue
        if obj.name.startswith("Halo_") or obj.name.startswith("Softbox"): continue
        if obj.parent is not None: continue  # already parented to InternalsRoot
        obj.parent = device_root

    frame_path = os.path.join(OUT_DIR, "forth-device-transparent-frame-00.png")
    bpy.context.scene.render.filepath = frame_path
    bpy.ops.render.render(write_still=True)
    print(f"[transparent] Done → {frame_path}")


if __name__ == "__main__":
    main()