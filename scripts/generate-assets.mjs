import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public/assets');

const dirs = [
  path.join(publicDir, 'profile'),
  path.join(publicDir, 'projects'),
  path.join(publicDir, 'certificates'),
  path.join(publicDir, 'resume'),
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// 1. Profile Portrait SVG
const profileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141416"/>
      <stop offset="50%" stop-color="#222227"/>
      <stop offset="100%" stop-color="#0a0a0c"/>
    </linearGradient>
    <radialGradient id="spotlight" cx="65%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
    </radialGradient>
    <linearGradient id="suit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1c1f"/>
      <stop offset="100%" stop-color="#08080a"/>
    </linearGradient>
    <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b8b8be"/>
      <stop offset="50%" stop-color="#8a8a92"/>
      <stop offset="100%" stop-color="#4a4a52"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>
  
  <!-- Studio Background -->
  <rect width="600" height="750" fill="url(#bg-grad)"/>
  <rect width="600" height="750" fill="url(#spotlight)"/>
  
  <!-- Diagonal Light Beam -->
  <polygon points="150,0 450,0 600,600 300,750" fill="#ffffff" fill-opacity="0.04"/>
  
  <!-- Character Silhouette / Portrait Representation (Black & White Editorial Style) -->
  <g transform="translate(300, 420)" filter="url(#shadow)">
    <!-- Shoulders & Suit -->
    <path d="M-220,280 C-210,140 -120,90 -50,80 L-20,120 L20,120 L50,80 C120,90 210,140 220,280 Z" fill="url(#suit)"/>
    
    <!-- White Inner Shirt Collar -->
    <polygon points="-35,80 0,140 35,80 15,70 -15,70" fill="#e2e8f0"/>
    <polygon points="-10,95 0,165 10,95 0,85" fill="#111115"/>
    
    <!-- Neck -->
    <path d="M-40,20 C-40,60 -30,85 0,85 C30,85 40,60 40,20 Z" fill="url(#skin)"/>
    
    <!-- Head & Face -->
    <ellipse cx="0" cy="-40" rx="65" ry="85" fill="url(#skin)"/>
    
    <!-- Hair (Clean Modern crop) -->
    <path d="M-68,-60 C-65,-125 -20,-140 20,-135 C65,-130 75,-90 68,-50 C60,-45 55,-70 30,-90 C-10,-95 -45,-75 -68,-60 Z" fill="#0c0c0e"/>
    
    <!-- Facial Features (Chiseled monochrome shadows) -->
    <!-- Eyebrows -->
    <path d="M-45,-45 Q-25,-55 -10,-48" stroke="#18181b" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M10,-48 Q25,-55 45,-45" stroke="#18181b" stroke-width="4" stroke-linecap="round" fill="none"/>
    
    <!-- Eyes -->
    <ellipse cx="-26" cy="-35" rx="9" ry="4" fill="#09090b"/>
    <ellipse cx="26" cy="-35" rx="9" ry="4" fill="#09090b"/>
    <circle cx="-24" cy="-36" r="1.5" fill="#ffffff" fill-opacity="0.8"/>
    <circle cx="28" cy="-36" r="1.5" fill="#ffffff" fill-opacity="0.8"/>
    
    <!-- Nose -->
    <path d="M-2,-30 L-5,-5 L5,-5" stroke="#27272a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    
    <!-- Lips -->
    <path d="M-20,15 Q0,22 20,15" stroke="#18181b" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M-12,24 Q0,28 12,24" stroke="#27272a" stroke-width="2" stroke-linecap="round" fill="none"/>
    
    <!-- Jawline Shadow -->
    <path d="M-60,-30 C-60,30 -40,65 0,70 C40,65 60,30 60,-30" stroke="#1c1c20" stroke-width="2" fill="none"/>
    
    <!-- Ears -->
    <path d="M-65,-45 C-75,-35 -75,-15 -62,-5" fill="url(#skin)"/>
    <path d="M65,-45 C75,-35 75,-15 62,-5" fill="url(#skin)"/>
  </g>
  
  <!-- Subtle Vignette Frame -->
  <rect width="600" height="750" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'profile/profile.svg'), profileSvg);
fs.writeFileSync(path.join(publicDir, 'profile/profile.webp'), profileSvg);

// 2. Project Mockups
const projects = [
  {
    id: '01',
    title: 'Developer Portfolio & 3D Interactive Card',
    category: 'Creative Dev / Portfolio',
    color: '#3B82F6',
    desc: 'Interactive personal portfolio with hanging lanyard physics, smooth tab transitions, and cinematic motion design.'
  },
  {
    id: '02',
    title: 'SaaS Analytics & Cloud Intelligence Dashboard',
    category: 'Fullstack / Web Application',
    color: '#8B5CF6',
    desc: 'High-performance cloud monitoring dashboard with real-time telemetry metrics and customizable widgets.'
  },
  {
    id: '03',
    title: 'Modern E-Commerce Experience & Checkout',
    category: 'Frontend / E-Commerce',
    color: '#10B981',
    desc: 'Ultra-fast headless commerce storefront with lightning search, cart state persistence, and Stripe integration.'
  },
  {
    id: '04',
    title: 'AI Prompt Engineering Studio & Workspace',
    category: 'AI / Developer Tools',
    color: '#F59E0B',
    desc: 'Collaborative prompt playground with token analysis, multi-model evaluation, and version control.'
  },
  {
    id: '05',
    title: 'Fintech Mobile Banking App & Ledger',
    category: 'Mobile / React Native / PWA',
    color: '#EC4899',
    desc: 'Encrypted peer-to-peer transaction portal with instant QR settlements and predictive spending insights.'
  },
  {
    id: '06',
    title: 'Interactive 3D Product Configurator',
    category: 'Three.js / WebGL',
    color: '#06B6D4',
    desc: 'Real-time WebGL product visualizer with physical material shaders, dynamic lighting, and CAD export.'
  }
];

projects.forEach((p, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const projectSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
    <defs>
      <linearGradient id="bg-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0d"/>
        <stop offset="100%" stop-color="#141419"/>
      </linearGradient>
      <linearGradient id="glow-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.color}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="transparent"/>
      </linearGradient>
    </defs>
    
    <rect width="1200" height="750" fill="url(#bg-${num})"/>
    
    <!-- Grid Pattern -->
    <g opacity="0.1">
      <path d="M0,0 H1200 V750 H0 Z" fill="none"/>
      ${Array.from({length: 25}, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="750" stroke="#fff" stroke-width="1"/>`).join('')}
      ${Array.from({length: 16}, (_, i) => `<line x1="0" y1="${i * 50}" x2="1200" y2="${i * 50}" stroke="#fff" stroke-width="1"/>`).join('')}
    </g>
    
    <!-- Glow Orb -->
    <circle cx="950" cy="200" r="300" fill="url(#glow-${num})"/>
    
    <!-- Browser Mockup Window -->
    <rect x="100" y="80" width="1000" height="590" rx="16" fill="#111116" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    
    <!-- Window Header -->
    <path d="M100,96 Q100,80 116,80 L1084,80 Q1100,80 1100,96 L1100,130 L100,130 Z" fill="#181820"/>
    <circle cx="130" cy="105" r="5" fill="#EF4444" opacity="0.8"/>
    <circle cx="148" cy="105" r="5" fill="#F59E0B" opacity="0.8"/>
    <circle cx="166" cy="105" r="5" fill="#10B981" opacity="0.8"/>
    
    <rect x="350" y="93" width="500" height="24" rx="12" fill="#0d0d10" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <text x="600" y="109" fill="#71717A" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="middle">https://rifqi.dev/projects/${p.id}</text>
    
    <!-- Window Body UI -->
    <!-- Sidebar -->
    <rect x="100" y="130" width="200" height="540" fill="#131318"/>
    <rect x="125" y="160" width="150" height="28" rx="6" fill="${p.color}" fill-opacity="0.15" stroke="${p.color}" stroke-opacity="0.3"/>
    <rect x="125" y="205" width="120" height="12" rx="3" fill="#27272A"/>
    <rect x="125" y="230" width="140" height="12" rx="3" fill="#27272A"/>
    <rect x="125" y="255" width="100" height="12" rx="3" fill="#27272A"/>
    <rect x="125" y="280" width="130" height="12" rx="3" fill="#27272A"/>
    
    <!-- Main Content Area -->
    <g transform="translate(340, 165)">
      <!-- Hero Headline in Mockup -->
      <rect x="0" y="0" width="140" height="18" rx="4" fill="${p.color}" fill-opacity="0.3"/>
      <text x="10" y="13" fill="${p.color}" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold">${p.category.toUpperCase()}</text>
      
      <text x="0" y="55" fill="#FFFFFF" font-family="'Space Grotesk', sans-serif" font-size="32" font-weight="bold">${p.title}</text>
      
      <!-- Cards grid inside UI -->
      <rect x="0" y="90" width="220" height="160" rx="12" fill="#181822" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="35" cy="125" r="16" fill="${p.color}" fill-opacity="0.2"/>
      <rect x="25" y="160" width="120" height="14" rx="4" fill="#FFFFFF" fill-opacity="0.8"/>
      <rect x="25" y="185" width="170" height="10" rx="3" fill="#52525B"/>
      <rect x="25" y="202" width="140" height="10" rx="3" fill="#52525B"/>
      
      <rect x="240" y="90" width="220" height="160" rx="12" fill="#181822" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="275" cy="125" r="16" fill="#3B82F6" fill-opacity="0.2"/>
      <rect x="265" y="160" width="120" height="14" rx="4" fill="#FFFFFF" fill-opacity="0.8"/>
      <rect x="265" y="185" width="170" height="10" rx="3" fill="#52525B"/>
      <rect x="265" y="202" width="140" height="10" rx="3" fill="#52525B"/>
      
      <rect x="480" y="90" width="240" height="160" rx="12" fill="#181822" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="515" cy="125" r="16" fill="#10B981" fill-opacity="0.2"/>
      <rect x="505" y="160" width="120" height="14" rx="4" fill="#FFFFFF" fill-opacity="0.8"/>
      <rect x="505" y="185" width="180" height="10" rx="3" fill="#52525B"/>
      <rect x="505" y="202" width="150" height="10" rx="3" fill="#52525B"/>
      
      <!-- Big Visual Area -->
      <rect x="0" y="270" width="720" height="180" rx="12" fill="#16161D" stroke="rgba(255,255,255,0.06)"/>
      
      <!-- Mockup Chart line -->
      <path d="M30,400 Q150,330 270,360 T510,310 T690,290" fill="none" stroke="${p.color}" stroke-width="4"/>
      <path d="M30,400 Q150,330 270,360 T510,310 T690,290 L690,430 L30,430 Z" fill="${p.color}" fill-opacity="0.08"/>
    </g>
    
    <!-- Subtle Border Overlay -->
    <rect x="0" y="0" width="1200" height="750" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  </svg>`;
  
  fs.writeFileSync(path.join(publicDir, `projects/project-${num}.svg`), projectSvg);
  fs.writeFileSync(path.join(publicDir, `projects/project-${num}.webp`), projectSvg);
});

// 3. Certificates (10 Realistic Certificates matching PT Cakrawala Global Yaksa, Dicoding, etc.)
const certs = [
  {
    title: 'SERTIFIKAT PKL PT CAKRAWALA GLOBAL YAKSA',
    issuer: 'PT Cakrawala Global Yaksa',
    date: 'Desember 2025',
    category: 'Industrial Internship / Frontend Engineering',
    id: 'CGY-PKL-2025-089',
    color: '#0284C7'
  },
  {
    title: 'BELAJAR MEMBUAT FRONT-END WEB UNTUK PEMULA',
    issuer: 'Dicoding Academy Indonesia',
    date: 'Januari 2026',
    category: 'Frontend Development',
    id: 'DICODING-FE-77491',
    color: '#2563EB'
  },
  {
    title: 'MENJADI REACT WEB DEVELOPER EXPERT',
    issuer: 'Dicoding Academy Indonesia',
    date: 'Maret 2026',
    category: 'React.js & State Management',
    id: 'DICODING-REACT-99201',
    color: '#06B6D4'
  },
  {
    title: 'SERTIFIKASI KOMPETENSI REKAYASA PERANGKAT LUNAK',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    date: 'Februari 2026',
    category: 'National Competence Certification',
    id: 'BNSP-RPL-2026-4412',
    color: '#DC2626'
  },
  {
    title: 'ADVANCED TYPESCRIPT & MODERN JAVASCRIPT',
    issuer: 'Meta Front-End Professional Certificate',
    date: 'November 2025',
    category: 'JavaScript & TypeScript',
    id: 'META-TS-88402',
    color: '#3B82F6'
  },
  {
    title: 'TAILWIND CSS MASTERCLASS & DESIGN SYSTEMS',
    issuer: 'Frontend Masters',
    date: 'Oktober 2025',
    category: 'UI/UX & CSS Architecture',
    id: 'FM-CSS-2025-103',
    color: '#0EA5E9'
  },
  {
    title: 'WEB ACCESSIBILITY & PERFORMANCE OPTIMIZATION',
    issuer: 'Google Developers Training',
    date: 'Agustus 2025',
    category: 'Web Performance & a11y',
    id: 'GOOGLE-A11Y-5519',
    color: '#10B981'
  },
  {
    title: 'FULLSTACK WEB DEVELOPMENT WITH LARAVEL & REACT',
    issuer: 'BuildWithAngga (BWA)',
    date: 'Juni 2025',
    category: 'Fullstack Development',
    id: 'BWA-LARA-REACT-661',
    color: '#F43F5E'
  },
  {
    title: 'GIT & GITHUB COLLABORATIVE WORKFLOWS',
    issuer: 'GitHub Education',
    date: 'Mei 2025',
    category: 'Version Control & DevOps',
    id: 'GH-ED-2025-3310',
    color: '#6366F1'
  },
  {
    title: 'CLOUD PRACTITIONER FOUNDATIONS',
    issuer: 'Amazon Web Services (AWS)',
    date: 'April 2025',
    category: 'Cloud Computing & Infrastructure',
    id: 'AWS-CPF-2025-9018',
    color: '#F59E0B'
  },
  {
    title: 'UI/UX DESIGN & INTERACTION SYSTEMS WITH FIGMA',
    issuer: 'Interaction Design Foundation',
    date: 'Maret 2025',
    category: 'UI/UX Design',
    id: 'IXDF-FIGMA-2025-11',
    color: '#8B5CF6'
  }
];

certs.forEach((c, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const certSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="cert-border-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c.color}"/>
        <stop offset="50%" stop-color="#475569"/>
        <stop offset="100%" stop-color="${c.color}"/>
      </linearGradient>
      <radialGradient id="cert-seal-${num}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fbbf24"/>
        <stop offset="70%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#92400e"/>
      </radialGradient>
    </defs>
    
    <!-- White Certificate Paper with Elegant Margin -->
    <rect width="1000" height="700" fill="#FFFFFF"/>
    
    <!-- Elegant Geometric Border -->
    <rect x="25" y="25" width="950" height="650" fill="none" stroke="${c.color}" stroke-width="4"/>
    <rect x="35" y="35" width="930" height="630" fill="none" stroke="#0F172A" stroke-width="1.5"/>
    <rect x="42" y="42" width="916" height="616" fill="none" stroke="${c.color}" stroke-width="0.75" stroke-dasharray="6,4"/>
    
    <!-- Corner Decorative Accents -->
    <path d="M25,65 L65,25 M25,85 L85,25 M975,65 L935,25 M975,85 L915,25" stroke="${c.color}" stroke-width="2"/>
    <path d="M25,635 L65,675 M25,615 L85,675 M975,635 L935,675 M975,615 L915,675" stroke="${c.color}" stroke-width="2"/>
    
    <!-- Institution / Logo Header -->
    <g transform="translate(500, 110)" text-anchor="middle">
      <circle cx="0" cy="-20" r="28" fill="${c.color}" fill-opacity="0.1" stroke="${c.color}" stroke-width="2"/>
      <text x="0" y="-12" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="bold" fill="${c.color}">${c.issuer.substring(0, 3).toUpperCase()}</text>
      
      <text x="0" y="25" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="bold" fill="#0F172A" letter-spacing="3">${c.issuer.toUpperCase()}</text>
      <text x="0" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" fill="#64748B" letter-spacing="2">CERTIFICATE OF ACHIEVEMENT & EXCELLENCE</text>
    </g>
    
    <!-- Horizontal Divider -->
    <line x1="200" y1="185" x2="800" y2="185" stroke="#CBD5E1" stroke-width="1.5"/>
    
    <!-- Certificate Main Body -->
    <g transform="translate(500, 240)" text-anchor="middle">
      <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#64748B" font-style="italic">This is proudly awarded to</text>
      
      <!-- Student Name -->
      <text x="0" y="55" font-family="'Space Grotesk', sans-serif" font-size="38" font-weight="bold" fill="#0F172A" letter-spacing="1">RIFQI MUHAMMAD ALIYA</text>
      <line x1="220" y1="75" x2="780" y2="75" stroke="${c.color}" stroke-width="2"/>
      
      <!-- Statement -->
      <text x="0" y="115" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#475569">has successfully demonstrated exceptional competence in the program</text>
      <text x="0" y="145" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="bold" fill="${c.color}">${c.title}</text>
      
      <text x="0" y="180" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#64748B">Category: ${c.category} • Issued: ${c.date}</text>
    </g>
    
    <!-- Signatures & Official Gold Seal -->
    <g transform="translate(180, 560)" text-anchor="middle">
      <!-- Signature Line 1 -->
      <path d="M-60,-15 Q-20,-45 0,-10 T60,-15" stroke="#1E293B" stroke-width="2" fill="none"/>
      <line x1="-90" y1="0" x2="90" y2="0" stroke="#94A3B8" stroke-width="1.5"/>
      <text x="0" y="20" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="bold" fill="#0F172A">Program Director</text>
      <text x="0" y="36" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#64748B">Lead Instructor & Assessor</text>
    </g>
    
    <!-- Gold Wax Seal in Center -->
    <g transform="translate(500, 540)">
      <circle cx="0" cy="0" r="46" fill="url(#cert-seal-${num})"/>
      <circle cx="0" cy="0" r="38" fill="none" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4,2"/>
      <!-- Star / Ribbon in seal -->
      <path d="M-15,35 L-25,75 L0,55 L25,75 L15,35 Z" fill="#B45309" opacity="0.8"/>
      <text x="0" y="6" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">VERIFIED</text>
    </g>
    
    <g transform="translate(820, 560)" text-anchor="middle">
      <!-- Signature Line 2 -->
      <path d="M-50,-25 Q0,-50 30,-5 T70,-20" stroke="#1E293B" stroke-width="2" fill="none"/>
      <line x1="-90" y1="0" x2="90" y2="0" stroke="#94A3B8" stroke-width="1.5"/>
      <text x="0" y="20" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="bold" fill="#0F172A">Head of Certification</text>
      <text x="0" y="36" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#64748B">Credential ID: ${c.id}</text>
    </g>
    
    <!-- Tiny Security Barcode / Hash at bottom -->
    <text x="500" y="660" font-family="'JetBrains Mono', monospace" font-size="10" fill="#94A3B8" text-anchor="middle">AUTHENTICITY VERIFICATION KEY: SHA256-${c.id}-SECURE-ISSUANCE</text>
  </svg>`;
  
  fs.writeFileSync(path.join(publicDir, `certificates/certificate-${num}.svg`), certSvg);
  fs.writeFileSync(path.join(publicDir, `certificates/certificate-${num}.webp`), certSvg);
});

// 4. Resume PDF dummy
const resumeContent = `%PDF-1.4
%âãÏÓ
1 0 obj
<< /Title (Rifqi Muhammad Aliya - Resume)
   /Author (Rifqi Muhammad Aliya)
   /Creator (Portfolio System) >>
endobj
2 0 obj
<< /Type /Catalog
   /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages
   /Kids [4 0 R]
   /Count 1 >>
endobj
4 0 obj
<< /Type /Page
   /Parent 3 0 R
   /Resources << /Font << /F1 5 0 R >> >>
   /MediaBox [0 0 612 792]
   /Contents 6 0 R >>
endobj
5 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica-Bold >>
endobj
6 0 obj
<< /Length 200 >>
stream
BT
/F1 24 Tf
50 720 Td
(RIFQI MUHAMMAD ALIYA - FRONTEND DEVELOPER) Tj
/F1 12 Tf
0 -30 Td
(Email: rifqidev.contact@gmail.com | Portfolio: rifqi.dev) Tj
0 -20 Td
(Fresh Graduate SMK RPL 2026 - Modern Frontend & UI/UX Developer) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000015 00000 n 
0000000125 00000 n 
0000000174 00000 n 
0000000233 00000 n 
0000000353 00000 n 
0000000438 00000 n 
trailer
<< /Size 7
   /Root 2 0 R
   /Info 1 0 R >>
startxref
690
%%EOF`;

fs.writeFileSync(path.join(publicDir, 'resume/resume.pdf'), resumeContent);

console.log('All portfolio assets generated successfully!');
