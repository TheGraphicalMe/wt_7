# Tori Tradez — Client Website

A pixel-accurate clone of [toritradez.com](https://toritradez.com) built with industry-standard tooling.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Styling | Tailwind CSS v3 |
| Bundler | Vite |
| Routing | React Router DOM v6 |
| Linting | ESLint |

## Project Structure

```
toritradez/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, fonts, icons
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx    # Fixed responsive navbar
│   │   │   └── Footer.jsx    # Multi-column footer
│   │   ├── ui/
│   │   │   ├── Button.jsx    # Multi-variant button component
│   │   │   ├── SectionLabel.jsx  # Uppercase mono section labels
│   │   │   └── TickerTape.jsx    # Animated market ticker
│   │   └── sections/
│   │       ├── Hero.jsx      # Full-screen hero with parallax bg
│   │       ├── Resources.jsx # Free resources grid
│   │       ├── Programs.jsx  # Program cards
│   │       ├── FAQ.jsx       # Accordion FAQ
│   │       ├── About.jsx     # About with stats
│   │       └── Blog.jsx      # Blog post grid
│   ├── data/
│   │   ├── faqData.js        # FAQ content
│   │   ├── blogData.js       # Blog post content
│   │   └── programsData.js   # Programs content
│   ├── hooks/
│   │   └── useScrollReveal.js  # IntersectionObserver hook
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles + Tailwind directives
├── tailwind.config.js        # Custom theme (colors, fonts, animations)
├── vite.config.js            # Vite config with @ alias
├── postcss.config.js
├── .eslintrc.cjs
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Customisation

- **Colors** → `tailwind.config.js` under `theme.extend.colors`
- **Content** → `src/data/` (faqData, blogData, programsData)
- **Fonts** → `index.html` Google Fonts link + `tailwind.config.js` fontFamily
- **Images** → Replace Framer CDN URLs in data files or components

## Deployment

Recommended: **Vercel** (zero-config for Vite + React)

```bash
npm install -g vercel
vercel
```
