export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  featured: boolean;
  image: string;
  technologies: string[];
  stats: Array<{ label: string; value: string }>;
  keyFeatures: string[];
  links: {
    demo?: string;
    video?: string;
    github?: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "project-01",
    title: "Dino Advanture",
    shortDesc: "Endless runner 2D dengan sistem obstacle, dan day-night theme cycle berbasis skor pemain.",
    fullDesc: "Mendukung kontrol keyboard dan touch untuk pengalaman cross-platform di desktop maupun Android. Dibangun dengan Godot Engine dan GDScript.",
    category: "Game 2D",
    featured: true,
    image: "/assets/projects/01.png",
    technologies: ["Godot Engine", "GDScript"],
    stats: [
      { label: "Game Engine", value: "Godot v4.7" },
      { label: "Framerate", value: "60 FPS" },
      { label: "Platform", value: "Cross-Platform" },
    ],
    keyFeatures: [
      "Procedural obstacle spawning dengan exclusive spawn-logic (ground obstacle dan flying obstacle tidak pernah muncul bersamaan untuk menjaga fairness)",
      "Progressive difficulty system berbasis skor, mempengaruhi kecepatan game dan variasi obstacle secara dinamis",
      "Dynamic day-night theme cycle dengan color modulation pada background, ground, obstacle, dan karakter utama",
      "State management lengkap untuk game loop (start, running, pause, game over, restart) dengan process-mode handling untuk pause-safe UI",
      "Cross-platform input system — keyboard untuk desktop, touch-button dan tap-to-start untuk Android, tanpa duplikasi logic gameplay",
    ],
    links: {
      video: "/assets/videos/DinoAdvanture-DemoVD.mp4",
      github: "",
    },
  },
  {
    id: "project-02",
    title: "TPC",
    shortDesc: "Touchless Presentation Controller — Aplikasi pengendali presentasi berbasis gesture.",
    fullDesc: "A touchless presentation controller that enables users to control PowerPoint slides using hand gestures through real-time computer vision. Built with Python, OpenCV, and MediaPipe, with a desktop interface designed for simple and intuitive presentation control.",
    category: "Application",
    featured: true,
    image: "/assets/projects/02.png",
    technologies: ["Python", "OpenCV", "MediaPipe", "PyWebview", "HTML", "CSS", "JavaScript"],
    stats: [
      { label: "Detection", value: "Real-Time" },
      { label: "Control", value: "Hand-Gesture" },
      { label: "Framerate", value: "60 FPS" },
    ],
    keyFeatures: [
      "Detects predefined hand gestures through the camera using computer vision.",
      "Navigate presentation slides without using a mouse, keyboard, or physical clicker.",
      "Use hand gestures to move forward or backward through PowerPoint slides.",
      "Choose a .pptx file, launch the presentation, activate the camera, and control slides from one application.",
      "Displays the camera feed and system status while presentation mode is active.",
    ],
    links: {
      video: "/assets/videos/TPC-DemoVD.mp4",
      github: "https://github.com/sykieraa/Touchless-Presentation-Controller",
    },
  },
  {
    id: "project-03",
    title: "E-Kantin",
    shortDesc: "A web-based school canteen ordering system for students, vendors, and administrators.",
    fullDesc: "E-Kantin is a web application designed to simplify school canteen operations through digital product management, student ordering, transaction tracking, and canteen status management. It provides separate workflows for students, sellers, and administrators.",
    category: "Full-Stack Web Application",
    featured: true,
    image: "/assets/projects/03.png",
    technologies: ["Laravel", "PHP", "Blade", "Tailwind CSS", "MySQL"],
    stats: [
    { label: "Order Management", value: "Digital" },
    { label: "User Roles", value: "3" },
    { label: "Platform", value: "Web App" },
    ],
    keyFeatures: [
    "Role-based authentication for students, sellers, and administrators",
    "Digital food and beverage ordering for students",
    "Product and inventory management for canteen sellers",
    "Order history and transaction tracking",
    "Canteen operating status management",
    "Cloudinary integration for product image uploads",
    ],
    links: {
      demo: "",
      github: "https://github.com/sykieraa/E-Kantin",
    },
  },
];
