# Forth device - glass body with photoreal internals. Blender 3.x/4.x compatible.
# Device axis = Z. Camera looks along +Y. Output: forth-device-glass-v2.png next to this file.
import bpy, bmesh, os, random, math
from math import radians, atan, sin, cos, pi

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "forth-device-glass-v2.png")
rnd = random.Random(11)

# ---------- clean ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
scn = bpy.context.scene

# ---------- helpers ----------
def setin(node, names, val):
    for n in names:
        if n in node.inputs:
            node.inputs[n].default_value = val
            return

def new_mat(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    return m, bsdf

def smooth(obj, angle=35):
    try:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        try:
            bpy.ops.object.shade_smooth_by_angle(angle=radians(angle))
        except Exception:
            bpy.ops.object.shade_smooth()
            if hasattr(obj.data, "use_auto_smooth"):
                obj.data.use_auto_smooth = True
                obj.data.auto_smooth_angle = radians(angle)
        obj.select_set(False)
    except Exception:
        pass

def cube(name, cx, cy, cz, sx, sy, sz, mat, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(location=(cx, cy, cz))
    o = bpy.context.object
    o.name = name
    o.scale = (sx / 2, sy / 2, sz / 2)
    bpy.ops.object.transform_apply(scale=True)
    if bevel > 0:
        b = o.modifiers.new("b", "BEVEL")
        b.width = bevel; b.segments = 3
        smooth(o, 40)
    o.data.materials.append(mat)
    return o

def cyl(name, loc, r, depth, mat, axis="Z", verts=64, rot=None):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc)
    o = bpy.context.object
    o.name = name
    if axis == "Y":
        o.rotation_euler = (radians(90), 0, 0)
    elif axis == "X":
        o.rotation_euler = (0, radians(90), 0)
    if rot:
        o.rotation_euler = rot
    bpy.ops.object.transform_apply(rotation=True)
    smooth(o, 35)
    o.data.materials.append(mat)
    return o

def text(body, loc, size, mat, align_face="front", spacing=1.0, name="txt", extrude=0.004):
    bpy.ops.object.text_add(location=loc)
    o = bpy.context.object
    o.name = name
    o.data.body = body
    o.data.size = size
    o.data.space_character = spacing
    o.data.extrude = extrude
    o.data.align_x = "CENTER"; o.data.align_y = "CENTER"
    for fp in (r"C:\Windows\Fonts\segoeuil.ttf", r"C:\Windows\Fonts\arial.ttf"):
        try:
            o.data.font = bpy.data.fonts.load(fp)
            break
        except Exception:
            pass
    if align_face == "front":   # face -Y (camera)
        o.rotation_euler = (radians(90), 0, 0)
    elif align_face == "up":
        o.rotation_euler = (0, 0, 0)
    o.data.materials.append(mat)
    return o

# ---------- materials ----------
m_glass, b = new_mat("glass")
b.inputs["Base Color"].default_value = (0.93, 0.96, 0.99, 1)
b.inputs["Roughness"].default_value = 0.04
setin(b, ["Transmission Weight", "Transmission"], 1.0)
b.inputs["IOR"].default_value = 1.5

m_dome, b = new_mat("dome_frosted")
b.inputs["Base Color"].default_value = (0.86, 0.91, 0.98, 1)
b.inputs["Roughness"].default_value = 0.5
setin(b, ["Transmission Weight", "Transmission"], 0.55)
b.inputs["IOR"].default_value = 1.45

def anodized(name, col, rough=0.48, noise=900):
    m, b = new_mat(name)
    b.inputs["Base Color"].default_value = (*col, 1)
    b.inputs["Metallic"].default_value = 0.75
    b.inputs["Roughness"].default_value = rough
    nt = m.node_tree
    nz = nt.nodes.new("ShaderNodeTexNoise"); nz.inputs["Scale"].default_value = noise
    bp = nt.nodes.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.12
    bp.inputs["Distance"].default_value = 0.002
    nt.links.new(nz.outputs["Fac"], bp.inputs["Height"])
    nt.links.new(bp.outputs["Normal"], b.inputs["Normal"])
    return m

m_navy = anodized("navy_anodized", (0.055, 0.075, 0.13))
m_seal = anodized("navy_seal", (0.045, 0.06, 0.105))

m_pcb, b = new_mat("pcb")
b.inputs["Base Color"].default_value = (0.030, 0.16, 0.065, 1)
b.inputs["Roughness"].default_value = 0.32
setin(b, ["Specular IOR Level", "Specular"], 0.6)
nt = m_pcb.node_tree
wv = nt.nodes.new("ShaderNodeTexWave"); wv.inputs["Scale"].default_value = 260
wv.inputs["Distortion"].default_value = 4
bp = nt.nodes.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.04
nt.links.new(wv.outputs["Fac"], bp.inputs["Height"])
nt.links.new(bp.outputs["Normal"], b.inputs["Normal"])

m_trace, b = new_mat("trace")   # copper under mask: raised lighter green
b.inputs["Base Color"].default_value = (0.10, 0.34, 0.13, 1)
b.inputs["Roughness"].default_value = 0.28
setin(b, ["Specular IOR Level", "Specular"], 0.7)

m_gold, b = new_mat("gold")
b.inputs["Base Color"].default_value = (0.85, 0.63, 0.25, 1)
b.inputs["Metallic"].default_value = 1.0
b.inputs["Roughness"].default_value = 0.22

m_copper, b = new_mat("copper")
b.inputs["Base Color"].default_value = (0.75, 0.42, 0.26, 1)
b.inputs["Metallic"].default_value = 1.0
b.inputs["Roughness"].default_value = 0.3
nt = m_copper.node_tree
wv = nt.nodes.new("ShaderNodeTexWave"); wv.inputs["Scale"].default_value = 120
bp = nt.nodes.new("ShaderNodeBump"); bp.inputs["Strength"].default_value = 0.25
nt.links.new(wv.outputs["Fac"], bp.inputs["Height"])
nt.links.new(bp.outputs["Normal"], b.inputs["Normal"])

m_ic, b = new_mat("ic_epoxy")
b.inputs["Base Color"].default_value = (0.020, 0.022, 0.028, 1)
b.inputs["Roughness"].default_value = 0.35
setin(b, ["Specular IOR Level", "Specular"], 0.55)

m_silk, b = new_mat("silkscreen")
b.inputs["Base Color"].default_value = (0.92, 0.94, 0.95, 1)
b.inputs["Roughness"].default_value = 0.6

m_steel, b = new_mat("battery_steel")
b.inputs["Base Color"].default_value = (0.72, 0.74, 0.77, 1)
b.inputs["Metallic"].default_value = 1.0
b.inputs["Roughness"].default_value = 0.28
setin(b, ["Anisotropic"], 0.75)

m_wrap = anodized("battery_wrap", (0.30, 0.35, 0.44), rough=0.38, noise=500)

m_paint, b = new_mat("white_paint")
b.inputs["Base Color"].default_value = (0.95, 0.96, 0.97, 1)
b.inputs["Roughness"].default_value = 0.45
setin(b, ["Emission Strength"], 0.6)
setin(b, ["Emission Color", "Emission"], (1, 1, 1, 1))

m_led, b = new_mat("uvled")
b.inputs["Base Color"].default_value = (0.85, 0.85, 0.95, 1)
b.inputs["Roughness"].default_value = 0.1
setin(b, ["Emission Strength"], 2.0)
setin(b, ["Emission Color", "Emission"], (0.55, 0.35, 1.0, 1))

m_cer, b = new_mat("ceramic")
b.inputs["Base Color"].default_value = (0.9, 0.9, 0.88, 1)
b.inputs["Roughness"].default_value = 0.5

m_wire_r = new_mat("wire_red")[0]
m_wire_r.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.45, 0.03, 0.03, 1)
m_wire_k = new_mat("wire_blk")[0]
m_wire_k.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (0.02, 0.02, 0.025, 1)

# ---------- glass tube (explicit thin shell: outer wall, inner wall, rims) ----------
def glass_shell(r_out=1.0, r_in=0.94, z0=-3.0, z1=3.0, nseg=160):
    mesh = bpy.data.meshes.new("glass_shell")
    bm = bmesh.new()
    vo0, vo1, vi0, vi1 = [], [], [], []
    for i in range(nseg):
        a = i / nseg * 2 * pi
        s, c = sin(a), cos(a)
        vo0.append(bm.verts.new((r_out * s, r_out * c, z0)))
        vo1.append(bm.verts.new((r_out * s, r_out * c, z1)))
        vi0.append(bm.verts.new((r_in * s, r_in * c, z0)))
        vi1.append(bm.verts.new((r_in * s, r_in * c, z1)))
    for i in range(nseg):
        j = (i + 1) % nseg
        bm.faces.new((vo0[i], vo0[j], vo1[j], vo1[i]))   # outer wall
        bm.faces.new((vi1[i], vi1[j], vi0[j], vi0[i]))   # inner wall
        bm.faces.new((vo1[i], vo1[j], vi1[j], vi1[i]))   # top rim
        bm.faces.new((vi0[i], vi0[j], vo0[j], vo0[i]))   # bottom rim
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh); bm.free()
    o = bpy.data.objects.new("glass_tube", mesh)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(m_glass)
    smooth(o, 35)
    return o

glass_shell()

# (FORTH decal removed per client)

# ---------- domes (exact match to the hero render: subdivision-2 icosphere
# hemisphere, flat facets, beveled edge accents — see forth-website/scripts/
# render-device.py make_cap) ----------
m_dome_edge, b = new_mat("dome_edge")
b.inputs["Base Color"].default_value = (0.90, 0.94, 1.0, 1)
b.inputs["Roughness"].default_value = 0.30
setin(b, ["Transmission Weight", "Transmission"], 0.45)
b.inputs["IOR"].default_value = 1.46

def dome(sign):
    z0 = sign * 3.0
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=1.0, location=(0, 0, z0))
    o = bpy.context.object
    o.name = "dome"
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.bisect(plane_co=(0.0, 0.0, z0),
                        plane_no=(0.0, 0.0, 1.0 if sign > 0 else -1.0),
                        clear_inner=True, use_fill=True)
    bpy.ops.object.mode_set(mode="OBJECT")
    bpy.ops.object.shade_flat()
    eb = o.modifiers.new("EdgeAccent", "BEVEL")
    eb.width = 0.006
    eb.segments = 2
    eb.limit_method = "NONE"
    eb.material = 1
    o.data.materials.append(m_dome)       # slot 0: facets
    o.data.materials.append(m_dome_edge)  # slot 1: chamfer accents
    return o

dome(+1); dome(-1)

# navy anodized end rings + seal plates (the original body finish)
for s in (1, -1):
    cyl("ring", (0, 0, s * 2.93), 0.985, 0.16, m_navy)
    cyl("seal", (0, 0, s * 3.03), 0.97, 0.06, m_seal)

# ---------- driver PCBs at ends ----------
for s in (1, -1):
    d = cyl("driver", (0, 0, s * 2.80), 0.88, 0.06, m_pcb)
    zf = s * 2.80 + s * 0.031  # outward face
    for a0 in (0.4, 1.97, 3.54, 5.11):
        cyl("screw", (0.62 * sin(a0), 0.62 * cos(a0), zf), 0.045, 0.02, m_steel, verts=24)
    for a0 in (0.0, 2.09, 4.19):  # UV LED packages
        x, y = 0.34 * sin(a0), 0.34 * cos(a0)
        cube("ledbase", x, y, zf + s * 0.012, 0.13, 0.13, 0.03, m_cer, bevel=0.004)
        cyl("leddie", (x, y, zf + s * 0.03), 0.038, 0.015, m_led, verts=24)
    for a0 in (1.0, 3.1, 5.2):  # gold pads
        cube("dpad", 0.72 * sin(a0), 0.72 * cos(a0), zf, 0.07, 0.07, 0.012, m_gold)

# ---------- main PCB ----------
pcb = cube("main_pcb", 0, -0.25, 0, 1.04, 0.06, 5.44, m_pcb)
FY = -0.281  # front surface

# traces: manhattan runs
for i in range(46):
    x = rnd.uniform(-0.46, 0.46)
    z = rnd.uniform(-2.55, 2.55)
    L = rnd.uniform(0.25, 1.3)
    if z + L > 2.66: L = 2.66 - z
    cube("tr", x, FY, z + L / 2, 0.011, 0.004, L, m_trace)
    if rnd.random() < 0.75:
        J = rnd.uniform(0.08, 0.4) * (1 if rnd.random() < 0.5 else -1)
        if abs(x + J) < 0.49:
            cube("trj", x + J / 2, FY, z + L, abs(J), 0.004, 0.011, m_trace)
# vias
for i in range(34):
    cyl("via", (rnd.uniform(-0.45, 0.45), FY, rnd.uniform(-2.6, 2.6)), 0.016, 0.008, m_gold, axis="Y", verts=16)
# mount holes (gold ring + dark center)
for z in (2.45, -2.45):
    cyl("mh_ring", (0, FY, z), 0.13, 0.014, m_gold, axis="Y", verts=32)
    cyl("mh_hole", (0, FY - 0.002, z), 0.055, 0.02, m_ic, axis="Y", verts=24)

# ICs with pins
def ic(x, z, sx, sz, label, lsize=0.055):
    h = 0.055
    cube("ic", x, FY - h / 2, z, sx, h, sz, m_ic, bevel=0.008)
    npins = max(3, int(sz / 0.055))
    for k in range(npins):
        zz = z - sz / 2 + (k + 0.5) * sz / npins
        for sxn in (-1, 1):
            cube("pin", x + sxn * (sx / 2 + 0.012), FY - 0.012, zz, 0.024, 0.024, 0.028, m_gold)
    if label:
        text(label, (x, FY - h - 0.005, z), lsize, m_silk, "front", name="iclab", extrude=0.001)

ic(-0.09, 0.98, 0.38, 0.45, "FORTH\nU1  DRV\n265nm", 0.05)
ic(-0.20, 2.02, 0.30, 0.25, "U2")
ic(0.21, 2.07, 0.18, 0.25, "U3")
ic(-0.20, -0.49, 0.20, 0.22, "U4")
ic(0.21, -0.83, 0.26, 0.23, "U5")

# small passives (0603 style): ceramic body + tin ends
for i in range(26):
    x = rnd.uniform(-0.44, 0.44); z = rnd.uniform(-2.4, 2.4)
    if abs(x + 0.09) < 0.3 and abs(z - 1.0) < 0.35: continue
    w, d = 0.055, 0.028
    cube("pas", x, FY - 0.012, z, w, 0.024, d, m_cer)
    cube("pe1", x - w / 2 + 0.006, FY - 0.012, z, 0.012, 0.026, d, m_steel)
    cube("pe2", x + w / 2 - 0.006, FY - 0.012, z, 0.012, 0.026, d, m_steel)

# electrolytic capacitors (aluminum can + shrink sleeve + polarity stripe + vent scores)
m_alu, b = new_mat("cap_aluminum")
b.inputs["Base Color"].default_value = (0.80, 0.81, 0.83, 1)
b.inputs["Metallic"].default_value = 1.0
b.inputs["Roughness"].default_value = 0.24

m_sleeve, b = new_mat("cap_sleeve")
b.inputs["Base Color"].default_value = (0.016, 0.045, 0.14, 1)   # deep blue PVC
b.inputs["Roughness"].default_value = 0.22
setin(b, ["Specular IOR Level", "Specular"], 0.65)

m_stripe, b = new_mat("cap_stripe")
b.inputs["Base Color"].default_value = (0.82, 0.84, 0.86, 1)
b.inputs["Roughness"].default_value = 0.35

CY = -0.37   # cap axis y
for xc, lab in ((-0.30, "220µF"), (-0.02, "220µF"), (0.26, "100µF")):
    zc = 0.10
    # aluminum can
    cyl("cap_can", (xc, CY, zc), 0.080, 0.52, m_alu, verts=48)
    # seal crimp groove near base (bottom end)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.076, minor_radius=0.009,
                                     location=(xc, CY, zc - 0.20))
    t = bpy.context.object; t.data.materials.append(m_alu); smooth(t, 40)
    # shrink sleeve covers most of can, exposed aluminum at top
    cyl("cap_sleeve", (xc, CY, zc - 0.035), 0.086, 0.40, m_sleeve, verts=48)
    # polarity stripe (negative marker) along front-left of sleeve
    cube("cap_stripe", xc - 0.062, CY - 0.055, zc - 0.035, 0.030, 0.012, 0.38, m_stripe)
    text("−", (xc - 0.062, CY - 0.0665, zc + 0.13), 0.045, m_sleeve, "front", name="capminus", extrude=0.0005)
    # printed marking on sleeve front
    t = text(lab + "\n16V", (xc + 0.012, CY - 0.088, zc - 0.04), 0.042, m_stripe, "front",
             name="caplab", extrude=0.0005)
    t.rotation_euler = (radians(90), radians(90), 0)   # print runs along the can
    # exposed top with pressure-relief vent scores (K-pattern)
    cyl("cap_top", (xc, CY, zc + 0.262), 0.074, 0.012, m_alu, verts=48)
    cube("vent1", xc, CY, zc + 0.268, 0.012, 0.10, 0.006, m_sleeve)
    cube("vent2", xc, CY, zc + 0.268, 0.10, 0.012, 0.006, m_sleeve)
    # rubber seal visible at bottom
    cyl("cap_seal", (xc, CY, zc - 0.262), 0.070, 0.010, m_ic, verts=32)

# toroid inductors with copper "winding" bump
for z in (2.42, -2.42):
    bpy.ops.mesh.primitive_torus_add(major_radius=0.115, minor_radius=0.048,
                                     location=(0, -0.34, z), rotation=(radians(90), 0, 0))
    t = bpy.context.object; t.data.materials.append(m_copper); smooth(t, 60)
    cyl("tcore", (0, -0.34, z), 0.045, 0.05, m_ic, axis="Y", verts=24)

# charging contact block
cube("cblock", 0, FY - 0.03, -1.85, 0.92, 0.06, 0.22, m_navy, bevel=0.01)
for k in range(7):
    x = -0.36 + k * 0.12
    cube("cpad", x, FY - 0.062, -1.85, 0.075, 0.012, 0.13, m_gold, bevel=0.004)

# silkscreen labels
text("FORTH  REV-C", (0.02, FY - 0.004, 2.62), 0.05, m_silk, "front", name="silk1", extrude=0.001)
text("C1   C2   C3", (-0.02, FY - 0.004, -0.24), 0.045, m_silk, "front", name="silk2", extrude=0.001)
text("J1", (-0.40, FY - 0.004, -1.62), 0.05, m_silk, "front", name="silk3", extrude=0.001)
text("L2", (0.20, FY - 0.004, -2.42), 0.045, m_silk, "front", name="silk4", extrude=0.001)

# ---------- battery ----------
cube("battery", 0, 0.44, 0, 1.48, 0.56, 5.0, m_steel, bevel=0.06)
cube("batwrap", 0, 0.44, 0, 1.50, 0.58, 4.6, m_wrap, bevel=0.06)
text("Li-ion 3.7V", (-0.66, 0.14, 0), 0.09, m_silk, "front", name="batlab", extrude=0.001)
bpy.context.object.rotation_euler = (radians(90), radians(90), 0)  # vertical along visible sliver

# ---------- wires ----------
def wire(p0, p1, p2, mat, r=0.021):
    cu = bpy.data.curves.new("wire", "CURVE")
    cu.dimensions = "3D"; cu.bevel_depth = r; cu.bevel_resolution = 6
    sp = cu.splines.new("BEZIER"); sp.bezier_points.add(2)
    for bp, co in zip(sp.bezier_points, (p0, p1, p2)):
        bp.co = co; bp.handle_left_type = bp.handle_right_type = "AUTO"
    o = bpy.data.objects.new("wire", cu)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(mat)

wire((-0.18, -0.30, 2.70), (-0.30, -0.42, 2.74), (-0.25, -0.30, 2.79), m_wire_r)
wire((0.14, -0.30, 2.70), (0.28, -0.44, 2.73), (0.30, -0.28, 2.79), m_wire_k)
wire((-0.18, -0.30, -2.70), (-0.32, -0.42, -2.74), (-0.28, -0.28, -2.79), m_wire_r)
wire((0.14, -0.30, -2.70), (0.26, -0.44, -2.73), (0.28, -0.28, -2.79), m_wire_k)

# ---------- lights ----------
def area(loc, rot, sx, sy, e):
    bpy.ops.object.light_add(type="AREA", location=loc, rotation=rot)
    L = bpy.context.object
    L.data.shape = "RECTANGLE"; L.data.size = sx; L.data.size_y = sy
    L.data.energy = e
    return L

_key = area((-7, -6, 0.6), (radians(90), 0, radians(-50)), 4.5, 10, 480)  # key (very broad, low)
_key.visible_glossy = False   # lights the internals but leaves NO specular stripe on the glass
_fill = area((6, -5, 1.0), (radians(90), 0, radians(52)), 7, 10, 45)      # fill (minimal)
_fill.visible_glossy = False
area((0, -3, 9), (radians(20), 0, 0), 6, 6, 560)                          # top
area((3, 7, 2), (radians(75), 0, radians(160)), 5, 7, 110)                # back rim (minimal)

world = bpy.data.worlds.new("w"); scn.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Strength"].default_value = 0.42
nt = world.node_tree
tc = nt.nodes.new("ShaderNodeTexCoord")
mp = nt.nodes.new("ShaderNodeMapping"); mp.inputs["Rotation"].default_value = (0, radians(-90), 0)
gr = nt.nodes.new("ShaderNodeTexGradient")
cr = nt.nodes.new("ShaderNodeValToRGB")
cr.color_ramp.elements[0].color = (0.02, 0.022, 0.03, 1)
cr.color_ramp.elements[1].color = (0.55, 0.58, 0.63, 1)
nt.links.new(tc.outputs["Generated"], mp.inputs["Vector"])
nt.links.new(mp.outputs["Vector"], gr.inputs["Vector"])
nt.links.new(gr.outputs["Fac"], cr.inputs["Fac"])
nt.links.new(cr.outputs["Color"], bg.inputs["Color"])

# ---------- camera ----------
bpy.ops.object.camera_add(location=(0, -40, 0), rotation=(radians(90), 0, 0))
cam = bpy.context.object
cam.data.sensor_fit = "VERTICAL"
cam.data.angle_y = 2 * atan(4.00 / 40)  # hemispherical domes: total half-height 4.0, fills frame like Midnight
scn.camera = cam

# ---------- render settings ----------
scn.render.engine = "CYCLES"
scn.cycles.samples = 320
scn.cycles.use_denoising = True
scn.cycles.max_bounces = 16
scn.cycles.transmission_bounces = 16
scn.cycles.transparent_max_bounces = 12
scn.render.film_transparent = True
scn.render.resolution_x = 1600
scn.render.resolution_y = 2400
scn.render.image_settings.file_format = "PNG"
scn.render.image_settings.color_mode = "RGBA"
scn.render.filepath = OUT
try:
    scn.view_settings.view_transform = "Standard"
except Exception:
    pass
# try GPU
try:
    prefs = bpy.context.preferences.addons["cycles"].preferences
    for dt in ("OPTIX", "CUDA", "HIP", "METAL"):
        try:
            prefs.compute_device_type = dt
            prefs.get_devices()
            n = 0
            for d in prefs.devices:
                d.use = True; n += 1
            if n:
                scn.cycles.device = "GPU"
                print("GPU:", dt)
                break
        except Exception:
            continue
except Exception:
    pass

print("rendering to", OUT)
bpy.ops.render.render(write_still=True)
print("DONE")

# publish to the site (Website root + renderings/) so the page picks it up
import shutil
_root = os.path.dirname(os.path.dirname(OUT))
for _dst in (os.path.join(_root, "public", "renderings", "forth-device-glass-frame-00.png"),
             os.path.join(_root, "public", "renderings", "forth-device-glass-hero.png")):
    try:
        shutil.copyfile(OUT, _dst)
        print("PUBLISHED", _dst)
    except Exception as _e:
        print("publish failed:", _dst, _e)
