# ⚡ rifqi.dev — Personal Portfolio Website

A production-ready, ultra-high fidelity personal portfolio website designed with a dark, minimalist, futuristic, and editorial aesthetic. Features realistic 3D hanging lanyard physics, smooth tab transitions, horizontal center-focused carousels, customizable modal previews, and cinematic motion design.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Motion & Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Vector SVGs
- **Interactive Micro-effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Typography**: Space Grotesk, Plus Jakarta Sans, JetBrains Mono

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be created inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Architecture

```
portfolio-website/
├── public/
│   ├── assets/
│   │   ├── profile/          # Profile portrait images
│   │   ├── projects/         # Project screenshot mockups
│   │   ├── certificates/     # Certificate credential assets
│   │   └── resume/           # Downloadable PDF CV/Resume
│   └── favicon.svg           # Website favicon
├── src/
│   ├── components/           # Reusable UI & motion components
│   │   ├── CustomCursor.tsx        # Interpolated mouse cursor
│   │   ├── Preloader.tsx           # Cinematic welcome screen
│   │   ├── Navbar.tsx              # Floating pill navigation
│   │   ├── HangingLanyard.tsx      # 3D ID lanyard with physics
│   │   ├── ProjectCard.tsx         # Showcase project card
│   │   ├── ProjectCarousel.tsx     # Horizontal project carousel
│   │   ├── ProjectDetailModal.tsx  # Editorial 2-column project view
│   │   ├── CertificateCard.tsx     # Certificate card
│   │   ├── CertificateCarousel.tsx # Horizontal certificate carousel
│   │   ├── CertificateModal.tsx    # Lightbox credential preview
│   │   ├── TechStackGrid.tsx       # Staggered tech cards grid
│   │   └── Footer.tsx              # Minimalist footer
│   ├── sections/             # Page sections
│   │   ├── HeroSection.tsx         # Hero section
│   │   ├── AboutSection.tsx        # About Me + metrics
│   │   ├── ExperienceSection.tsx   # Experience timeline
│   │   ├── PortfolioSection.tsx    # Showcase tab switcher
│   │   └── ContactSection.tsx      # Contact form + copy email
│   ├── data/                 # Centralized content files
│   │   ├── profile.ts              # Personal info, bio, stats
│   │   ├── projects.ts             # Projects showcase list
│   │   ├── certificates.ts         # Certificates credential list
│   │   ├── experience.ts           # Career & education milestones
│   │   ├── techStack.ts            # Technologies & proficiencies
│   │   ├── socials.ts              # Social links & handles
│   │   └── navigation.ts           # Navigation menu items
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Motion easing & transition constants
│   ├── App.tsx               # Root application component
│   ├── main.tsx              # React entrypoint
│   └── index.css             # Tailwind base & grid utilities
├── package.json
└── README.md
```

---

## ✏️ How to Customize Portfolio Content

All portfolio content is decoupled from UI components in `src/data/`:

### 1. Profile Portrait & Avatar
- Replace image file at: `public/assets/profile/profile.webp` (or `.png`/`.jpg`).
- Path configured in: `src/data/profile.ts` under `assets.portrait`.

### 2. Resume / CV File
- Replace PDF file at: `public/assets/resume/resume.pdf`.
- Path configured in: `src/data/profile.ts` under `assets.cvFile`.

### 3. Personal Bio, Name & Hero Typography
- Edit `src/data/profile.ts`:
  - `name`: First, middle, and last name.
  - `brand`: Domain/brand header (e.g. `rifqi.dev`).
  - `role`: Primary, secondary roles, command lines, and tech chips.
  - `bio`: Hero description, about description, and quote.
  - `stats`: Metric counts for projects, certificates, and completed works.

### 4. Projects Showcase & Details
- Add/edit projects in `src/data/projects.ts`:
  - Add screenshot mockups to `public/assets/projects/`.
  - Configure `title`, `shortDesc`, `fullDesc`, `category`, `technologies`, `stats`, `keyFeatures`, and `links` (`demo`, `github`).

### 5. Certificates & Credentials
- Add/edit certificates in `src/data/certificates.ts`:
  - Add certificate images to `public/assets/certificates/`.
  - Configure `title`, `issuer`, `date`, `category`, `credentialId`, and `skills`.

### 6. Experience & Education Timeline
- Edit `src/data/experience.ts`:
  - Configure `period`, `role`, `company`, `location`, `type`, `description`, `highlights`, and `technologies`.

### 7. Tech Stack Grid
- Edit `src/data/techStack.ts`:
  - Add or reorder technologies, skill levels, categories, and brand colors.

### 8. Social Media Links & Email
- Edit `src/data/socials.ts`:
  - Configure URLs, usernames, and icons for GitHub, LinkedIn, Instagram, Email, X/Twitter, and Discord.

---

## 🎨 Design Philosophy & Features

- **Dark Minimalist Palette**: Deep `#050505` base with subtle technical grid overlay (`rgba(255,255,255,0.035)`).
- **Hanging Lanyard Physics**: 3D interactive spring tilt and inertia reacting to cursor velocity and position.
- **Center Magnification**: Horizontal carousel cards dynamically scale and brighten as they center in view.
- **Preloader Sequence**: Cinematic staggered timeline with smooth easing curves.
- **Micro-Interactions**: Custom interpolated mouse cursor with dynamic interactive element scaling.
- **Accessibility & Responsiveness**: Supports `prefers-reduced-motion`, touch swiping on mobile, full keyboard ESC and arrow controls.

---

© 2026 Rifqi Muhammad Aliya. All rights reserved.
