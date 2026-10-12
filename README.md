# Anubhav Sethi — Portfolio

A high-performance, dark-themed portfolio website built with Next.js, Framer Motion, and CSS Modules.

## Quick Start

### Prerequisites
- Node.js 18+ installed ([download here](https://nodejs.org))
- VS Code

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
portfolio/
├── components/         # All UI components
│   ├── Cursor.jsx      # Custom animated cursor
│   ├── Navbar.jsx      # Sticky navigation
│   ├── Hero.jsx        # Landing section
│   ├── About.jsx       # About + philosophy
│   ├── Projects.jsx    # Filterable project grid
│   ├── ProjectCard.jsx # Individual project card
│   ├── Skills.jsx      # Skills & tools
│   ├── Contact.jsx     # Contact section
│   └── Footer.jsx      # Footer
├── data/
│   └── projects.js     # ← Edit your projects here
├── hooks/
│   ├── useInView.js    # Scroll visibility detection
│   └── useScrollProgress.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js        # Main page
├── public/
│   └── images/         # ← Add your project images here
└── styles/
    └── globals.css     # Global styles & CSS variables
```

---

## Customization

### Update your projects
Edit `data/projects.js`. Each project has this shape:

```js
{
  id: 1,
  title: "Project Name",
  description: "Short description of the project.",
  image: "/images/your-image.jpg",   // Add to public/images/
  tags: ["UI/UX", "Branding"],       // Used for filtering
  link: "https://your-case-study.com",
  featured: true,                    // spans 2 columns if true
  color: "#0e1a12",                  // card background color
}
```

### Add your project images
Drop images into `public/images/` and update the `image` field in `data/projects.js`.

Recommended size: **1200×675px** (16:9), WebP format for best performance.

### Update contact links
Edit `components/Contact.jsx` — update the `href` values for LinkedIn, Behance, Dribbble, and the email address.

### Update social links in footer
Edit `components/Footer.jsx` — update the `href` values in the `socials` array.

### Change accent color
In `styles/globals.css`, find:
```css
--accent: #C8F04E;
```
Replace with any color you like. The whole site will update automatically.

---

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel (free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your repo → Deploy

Done. Live in ~60 seconds.
