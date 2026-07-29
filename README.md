# 🧠 Gifa's Cells Birthday Website 🎂✨

An interactive, responsive webtoon-inspired birthday website themed around **Gifa's Cells**!

---

## ✨ Features

- **Love Meter Booster**: Clickable booster button with interactive sound effects, glowing progress bar, floating heart particles, and confetti explosions.
- **Mind Village Cell Board**: Interactive cards for 6 iconic cells (**Love Cell**, **Hungry Cell**, **Rational Cell**, **Emotional Cell**, **Fashion Cell**, **Naughty Cell**) with animated speech bubbles, cute dialogues, poke counters, and audio tones.
- **Memory Cell Photo Gallery**: Polaroid-style photo frames with handwritten titles and customizable memory tags.
- **Live Drag-and-Drop Photo Replacer**: Upload photos directly in the browser live with instant preview and auto-saving via `LocalStorage`!
- **3D Secret Gift Box & Love Letter**: Interactive unwrapping animation revealing a parchment love letter modal with sound effects and confetti.
- **"Which Cell are You Today?" Quiz**: Fun interactive mood scanner quiz awarding custom cell badges.
- **Custom Sound & Theme Controls**: Web Audio API synthesized sound effects (chimes, pops, fanfare) with sound and dark/light mode toggles.

---

## 🚀 How to Run & View

1. Double-click `index.html` or open it in any modern web browser (Chrome, Edge, Safari, Firefox).
2. Or run a lightweight local dev server (e.g. `npx serve` or VS Code Live Server).

---

## 🖼️ How to Replace Photos & Customize Text

### 1. Live Browser Upload (Quickest)
- Click any photo frame or the **"📸 Open Live Photo Uploader"** button in the Memory Gallery.
- Select the photo frame slot you want to update (Hero photo or Memory #01 - #06).
- Drag and drop your photo or choose a local file. The site will instantly display your photo and save it in your browser!

### 2. Permanent File Replacement
To make your custom photos permanent across all devices:
- Replace the files in the `images/` directory with your own images (PNG/JPG):
  - `images/hero_photo.png` or `hero_photo.svg` (Hero birthday girl photo)
  - `images/memory_1.png` - `images/memory_6.png` (Gallery memory photos)

### 3. Customizing Birthday Message & Name
- Open `index.html` in a text editor:
  - Edit the hero title in `<h1 class="hero-title">` to include her real name.
  - Edit the secret love letter content inside `<div class="letter-body">`.
  - Customize the polaroid caption tags in `<div class="polaroid-tag">`.

---

## 🎨 Color Palette & Design
- **Love Cell Pink**: `#FF8EAC` & `#FF477E`
- **Pastel Mind Blue**: `#4EA8DE`
- **Hungry Yellow**: `#FFD166`
- **Fresh Mint**: `#70C1B3`
- **Deep Slate**: `#2B2D42`
