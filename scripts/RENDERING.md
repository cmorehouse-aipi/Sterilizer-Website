# Device render pipeline

The rotating device on the home page is **not** made from a `.blend` file — there isn't one.
Each `render-device*.py` script in this folder builds the entire Blender scene in code
(model, materials, lighting, camera), renders a frame sequence, and the frames get encoded
into the scroll-scrubbed video with ffmpeg. The scripts are the source of truth; edit them
to change the model.

## Requirements

- **Blender 4.x or 5.x** on the command line (`brew install blender` or blender.org).
  The scripts tolerate the API renames between 4.x and 5.x.
- **ffmpeg** (`brew install ffmpeg`).

Everything else is in this repo: the studio HDRI (`hdri/studio_small_08_1k.exr`) and the
pre-rendered wordmark texture (`_wordmark.png` — delete it to force a re-render of the
wordmark with different text/spacing).

## The blue hero model (the one on the front page)

```bash
# 1. Render — builds the scene and writes 208 PNG frames of a full 360° turn
#    (plus forth-device-hero.png and forth-device.glb). Takes a while: 512
#    Cycles samples per frame at 1600×2400.
blender -b -P scripts/render-device.py

# 2. Encode. -g 1 = every frame is a keyframe, which is what makes the scroll
#    scrubbing in HeroDeviceRotator.tsx smooth in BOTH directions — do not drop it.
#    The webm MUST keep alpha (yuva420p + -auto-alt-ref 0): the page background
#    shows through the video. Gotcha: ffprobe reports the finished webm as plain
#    yuv420p — VP9 stores alpha in a side-stream; decode with -c:v libvpx-vp9
#    to see the rgba. Encoding without alpha = black box around the device.
ffmpeg -y -framerate 60 -i "public/renderings/forth-device-frame-%02d.png" \
  -vf scale=800:1200 -pix_fmt yuva420p -c:v libvpx-vp9 -auto-alt-ref 0 \
  -g 1 -b:v 0 -crf 33 -an "public/renderings/forth-device-rotation.webm"
#    H.264 can't carry alpha, so the mp4 fallback composites the frames over
#    the home page's background color (#f8f4ee):
ffmpeg -y -framerate 60 -i "public/renderings/forth-device-frame-%02d.png" \
  -f lavfi -i "color=0xf8f4ee:s=800x1200:r=60" -filter_complex \
  "[0]scale=800:1200[fg];[1][fg]overlay=shortest=1" -pix_fmt yuv420p \
  -c:v libx264 -g 1 -crf 24 -movflags +faststart -an \
  "public/renderings/forth-device-rotation.mp4"

# 3. Clean up intermediate frames — keep frame-00, it's the <video> poster.
find public/renderings -name "forth-device-frame-*.png" ! -name "*frame-00.png" -delete
```

Commit the updated `forth-device-rotation.webm`, `forth-device-rotation.mp4`, and
`forth-device-frame-00.png`.

## GPU rendering

`FORTH_RENDER_GPU=1 blender -b -P scripts/render-device.py` renders on the GPU (Metal on
macOS, OptiX/CUDA/HIP on NVIDIA/AMD). Gains depend heavily on hardware: an M3 Pro is only
~1.35× faster than its own CPU, while big NVIDIA cards are 25×+. **Render a full sequence
on one device type** — CPU and GPU frames are visually identical (SSIM 0.9994) but not
pixel-identical, and mixing them within a sequence risks frame-to-frame shimmer in the
scrubbed video.

## Color variants

`render-device-{coral,sage,sun,midnight-coarse,transparent}.py` are one-off variants of the
same scene (each documents its own encode command in its docstring). Only their frame-00 /
hero stills are used on the site today.

## Coupling with the frontend

[`app/components/HeroDeviceRotator.tsx`](../app/components/HeroDeviceRotator.tsx) scrubs
`video.currentTime` on scroll. `FULL_ROTATION_MS` there is the time to traverse the whole
clip — 3000 ms for the 208-frame 360° turn (≈ 69 visible frame changes/sec). If you
change the rotation arc or frame count in `render-device.py`, retune it: sweep time sets
both apparent spin speed and scrub fluidity (frames ÷ sweep seconds = frame cadence).

## Want an actual .blend?

Run the scene-building part of the script inside Blender's GUI (Scripting workspace →
open `render-device.py` → comment out the render loop in `main()` → Run), or add
`bpy.ops.wm.save_as_mainfile(filepath="/tmp/forth-device.blend")` before the render loop.
The .blend is a build artifact here, not a source file — keep changes in the script.
