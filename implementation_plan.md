# Gifa's Cells Birthday Website Implementation Plan

Create a visually stunning, responsive, interactive Gifa's Cells-themed birthday website using HTML5, CSS3, and JavaScript.

## User Review Required

> [!NOTE]
> The website will come pre-loaded with SVG/Canvas-rendered cell illustrations and stylish polaroid image placeholders. You can either replace the image files directly in the `images/` directory or use the live drag-and-drop photo uploader built right into the gallery!

## Proposed Changes

### Core Web Files

#### [NEW] [index.html](file:///c:/Project/index.html)
- **Hero Section**: Animated title with Gifa's Cells aesthetic, floating Love Cell & Mind Village backdrop, customizable birthday countdown, and interactive Love Meter.
- **Mind Village (Cell Cards)**: Interactive cards for key cells (Love Cell, Hungry Cell, Rational Cell, Emotional Cell, Fashion Cell, Naughty Cell) featuring unique birthday wishes and popups.
- **Memory Cell Photo Gallery**: Polaroid-style photo frames with customizable text tags and image placeholders (`images/hero_photo.jpg`, `images/memory_1.jpg`, etc.). Includes a real-time photo replacement control panel.
- **Interactive Love Letter & Gift Box**: Tap to unwrap a secret letter from Emotional Cell with confetti animations.
- **Birthday Cell Quiz / Mood Selector**: Fun interactive feature to test "Which Cell is running your birthday mind today?".

#### [NEW] [styles.css](file:///c:/Project/styles.css)
- **Theme & Palette**: Soft pastel blues, romantic pinks, sunny yellow accents (`#FF8EAC`, `#FFD166`, `#4EA8DE`, `#70C1B3`).
- **Visual Design**: Glassmorphic floating cards, rounded webtoon-inspired badges, cell speech bubbles, smooth micro-interactions, floating heart animations, and mobile-friendly responsive grid layout.
- **Typography**: Google Fonts integration ('Fredoka', 'Quicksand', 'Nunito') for cute webtoon style lettering.

#### [NEW] [script.js](file:///c:/Project/script.js)
- **Cell Interactions**: Animated speech bubbles, sound effects (Web Audio API synth tones for cute clicks), and love meter booster.
- **Confetti & Particle Engine**: Custom canvas confetti burst when opening gifts or reaching 100% Love Meter.
- **Live Image Uploader / Swapper**: JavaScript file handling allowing live previewing of uploaded custom photos over the placeholder frames, with easy instructions on setting permanent paths.
- **Countdown Timer & Quiz Logic**: Dynamic timer counting down to her birthday or up from her birthday.

#### [NEW] [images/](file:///c:/Project/images/)
- Default stylish SVG placeholder images generated for:
  - `images/hero_photo.png` (Main couple / Birthday Girl photo placeholder)
  - `images/memory_1.png` - `images/memory_6.png` (Gallery memory photo placeholders)
  - `images/love_cell.svg`, `images/hungry_cell.svg`, `images/rational_cell.svg`, `images/emotional_cell.svg` (Custom Cell graphics)

#### [NEW] [README.md](file:///c:/Project/README.md)
- Easy instructions for replacing placeholder images with real photos and customizing text (names, dates, personal letter).

## Verification Plan

### Manual Verification
- Open `index.html` in a web browser to verify all visual styles, animations, cell cards, love meter, and photo gallery placeholders work smoothly.
- Test responsive layout across desktop and mobile screens.
- Test live drag-and-drop / upload feature to ensure photos swap seamlessly into placeholders.
