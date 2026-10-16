export interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "languages";
  level: string;
  iconType: string;
  icon: string;
}

export const techStackData: TechItem[] = [
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: "Beginner",
    iconType: "react",
    icon: "/assets/icon/react.svg",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    level: "Beginner",
    iconType: "typescript",
    icon: "/assets/icon/typescript.svg",
  },
  {
    id: "html",
    name: "HTML",
    category: "frontend",
    level: "Advanced",
    iconType: "html",
    icon: "/assets/icon/html.svg",
  },
  {
    id: "css",
    name: "CSS",
    category: "frontend",
    level: "Advanced",
    iconType: "css",
    icon: "/assets/icon/css.svg",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    level: "Intermediate",
    iconType: "php",
    icon: "/assets/icon/php.svg",
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "backend",
    level: "Intermediate",
    iconType: "laravel",
    icon: "/assets/icon/laravel.svg",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    level: "Beginner",
    iconType: "javascript",
    icon: "/assets/icon/javascript.svg",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "backend",
    level: "Beginner",
    iconType: "mysql",
    icon: "/assets/icon/mysql.svg",
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    level: "Advanced",
    iconType: "python",
    icon: "/assets/icon/python.svg",
  },
  {
    id: "figma",
    name: "Figma",
    category: "tools",
    level: "Beginner",
    iconType: "figma",
    icon: "/assets/icon/figma.svg",
  },
];
