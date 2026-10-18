# Design repos

Every repo collected so far (Video Stack Library, UI Specifics, and the laptop's `tool harness\prompts\` folder), grouped by what it is for. Licences were read from the repo where marked; "not checked" means exactly that. Clones live in a git-ignored `clones/` folder on the laptop, never in this repo.

Licence rule: **MIT, Apache-2.0, BSD, Unlicense**: copy what you need with the LICENSE beside it. **GPL / AGPL**: keep separate from closed work. **No licence / "no republishing as-is"**: study only, rebuild originally.

## Design and motion (feeds `ui_ux/`)

| Repo | Use it for | Licence |
|---|---|---|
| [mattdesl/canvas-sketch](https://github.com/mattdesl/canvas-sketch) | Generative art in the browser (marbling, covers) | MIT |
| [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) | Smooth scroll | MIT |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | Small animated UI primitives | MIT |
| [oframe/ogl](https://github.com/oframe/ogl) | Minimal WebGL (light 3D effects, glass) | Unlicense |
| [paper-design/shaders](https://github.com/paper-design/shaders) | Zero-dependency mesh gradients, grain, noise | Apache-2.0 |
| [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | Large animated component set (681 MB clone) | MIT |
| [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | Agent skill for scroll-driven sites | MIT |
| [basementstudio/scrollytelling](https://github.com/basementstudio/scrollytelling) | Scroll-driven scenes (React + GSAP) | MIT |
| [basementstudio/shader-lab](https://github.com/basementstudio/shader-lab) | Stack and animate shaders | Apache-2.0 |
| [theatre-js/theatre](https://github.com/theatre-js/theatre) | Keyframe motion editor for the web | core Apache-2.0, studio AGPL-3.0 (use core) |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Design-taste process skill | MIT |
| [Leonxlnx/tastecode](https://github.com/Leonxlnx/tastecode) | Desktop app around taste-skill | not checked, not cloned |
| [mengto/skills](https://github.com/mengto/skills) | Skills collection; the scroll-scrubbed sequence skill | MIT |
| [codrops/RainEffect](https://github.com/codrops/RainEffect) | WebGL rain on glass | Codrops licence: study, don't republish as-is |
| [Dream-Pixels-Forge/artisan_labs_dev](https://github.com/Dream-Pixels-Forge/artisan_labs_dev) | Video to frames mapped to scroll | no licence: study only |
| [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | Animated landing components (know the clichés) | not checked |
| [mrdoob/three.js](https://github.com/mrdoob/three.js) · [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) · [pmndrs/drei](https://github.com/pmndrs/drei) | 3D on the web, in React | not checked |
| [greensock/GSAP](https://github.com/greensock/GSAP) · [motiondivision/motion](https://github.com/motiondivision/motion) | Timeline and UI animation | not checked |
| [shadcn-ui/ui](https://github.com/shadcn-ui/ui) · [markdoc/markdoc](https://github.com/markdoc/markdoc) · [anthropics/skills](https://github.com/anthropics/skills) | Component registry, docs framework, agent skills | not checked |

### On the laptop, in `tool harness\prompts\`

| Repo | Use it for | Licence |
|---|---|---|
| `sl-glass-film` | Claude Code skill for frosted-glass product films (Remotion) | not checked; record on the laptop |
| `motion-graphics-skills` | Skill repo; its "nine looks" include liquid glass | not checked; record on the laptop |
| [gongnyang/awesome-ai-motion](https://github.com/gongnyang/awesome-ai-motion) | Effect and recipe collections | not checked; record on the laptop |

## AI image and video

| Repo | Use it for | Licence |
|---|---|---|
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | Node canvas for image and video models | GPL-3.0 |
| [kijai/ComfyUI-WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper) | Wan video models inside ComfyUI | Apache-2.0 |
| [lllyasviel/ControlNet](https://github.com/lllyasviel/ControlNet) | Keep a 3D layout while restyling (depth, edges) | not checked |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2) | Open image-to-video model | not checked, not cloned |

## 3D engine

| Repo | Use it for | Licence |
|---|---|---|
| [colmap/colmap](https://github.com/colmap/colmap) | Structure from motion, multi-view stereo | BSD |
| [alicevision/Meshroom](https://github.com/alicevision/Meshroom) | Photogrammetry: photos to textured mesh | MPL-2.0 |
| [maria-korosteleva/GarmentCode](https://github.com/maria-korosteleva/GarmentCode) | Parametric sewing patterns in Python (`pygarment`) | MIT |
| [aigc3d/LHM](https://github.com/aigc3d/LHM) | Single image to animatable human | code Apache-2.0, weights CC BY-NC 4.0 (internal tests only) |
| [google/model-viewer](https://github.com/google/model-viewer) | GLB viewer on the brand's site | Apache-2.0 |
| [supabase/supabase-py](https://github.com/supabase/supabase-py) | Database and storage client | MIT |
| [ahujasid/mcp-for-blender](https://github.com/ahujasid/mcp-for-blender) | Claude drives Blender over MCP | MIT |
| Anny | Parametric body model, the chosen body route | source claim: code Apache-2.0, data CC0; confirm on its repo |

## Other

| Repo | Note |
|---|---|
| [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | Proxy for running Claude Code on other providers. AGPL-3.0-only. Not used (Claude stays the model) |
| [knoxgraeme/tieline](https://github.com/knoxgraeme/tieline) | Cloned by mistake; unrelated. AGPL-3.0. Ignore |

## Our own

| Repo | What |
|---|---|
| 411tmnd-star/liquid-glass | WebGL glass ring and ripple; see [../rebuilds/liquid-glass/SOURCE.md](../rebuilds/liquid-glass/SOURCE.md) |
| 411tmnd-star/my-portfolio-next | Portfolio site |
| 411tmnd-star/bellas-luxxe-suite | Storefront |
| Better Style prototype | Landing page prototype (Vercel) |
