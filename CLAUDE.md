# Claude Code Project Context

## Project Overview
This is an interactive visualization tool that displays Claude Code's capabilities (agents, tools, commands, skills, integrations, and configuration options) in a visually engaging space-themed interface.

## Tech Stack
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Vanilla CSS with custom theming system
- **Visualization**: Canvas-based rendering with vanilla JavaScript

## Project Structure
```
nextjs-app/
├── app/                    # Next.js app router
│   └── layout.tsx          # Root layout
├── public/                 # Static assets served by Next.js
│   ├── index.html          # Main visualizer page
│   ├── combos.html         # Capability combos page
│   ├── best-practices.html # Best practices page
│   ├── app.js              # Main visualizer logic (CapabilitiesVisualizer class)
│   ├── data.js             # Capabilities data and SVG icons
│   ├── themes.js           # Theme switching logic
│   ├── styles.css          # Main styles
│   ├── themes.css          # Theme definitions
│   └── reference-images/   # Theme reference images
├── screenshot.js           # Puppeteer screenshot utility
└── package.json
```

## Key Files
- `public/app.js` - Main `CapabilitiesVisualizer` class with canvas rendering, physics simulation, and node interactions
- `public/data.js` - All capability definitions with icons, descriptions, usage examples, and connections
- `public/themes.js` - Theme management (Space, Ocean, Forest, Cyberpunk, Dungeon)
- `public/styles.css` - Core styling including the side panel, search, and filter bar

## Running the Project
```bash
cd nextjs-app
npm install
npm run dev      # Runs on http://localhost:3002
```

## Architecture Notes
- The visualization uses HTML5 Canvas for connection lines and effects
- Nodes are DOM elements positioned absolutely over the canvas
- Physics simulation handles node repulsion/attraction
- Side panel shows detailed capability information when a node is selected

## Common Tasks
- **Add a new capability**: Edit `public/data.js`, add entry to `CAPABILITIES` array
- **Modify themes**: Edit `public/themes.css` for colors, `public/themes.js` for theme logic
- **Change physics behavior**: Modify `this.physics` object in `public/app.js`
