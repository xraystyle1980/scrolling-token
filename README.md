# Scrolling Token Demo

A modern web demo showcasing a 3D token that responds to scroll interactions using Three.js and GSAP. Built with Next.js and TypeScript.

## Features

- 🎨 Interactive 3D token model using Three.js
- 📜 Smooth scroll-based animations powered by GSAP
- 🎭 Dynamic lighting and post-processing effects
- 📱 Responsive design for all devices
- ⚡ Built with Next.js for optimal performance

## Tech Stack

- **Framework:** Next.js 14
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Animations:** GSAP, SplitType
- **Styling:** CSS Modules
- **Type Safety:** TypeScript
- **Development:** ESLint, PostCSS, Autoprefixer

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd scrolling-token
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
scrolling-token/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── fonts/              # Custom fonts
│   └── globals.css         # Global styles
├── components/             # Shared components
│   ├── sections/           # Page sections
│   ├── ui-components/      # UI elements
│   └── utils/              # Utility components
├── public/                 # Static assets
│   ├── fonts/              # Font files
│   ├── images/             # Image assets
│   └── models/             # 3D models
└── styles/                 # CSS modules
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
