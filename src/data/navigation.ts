export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navigationData: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "portfolio", label: "Portfolio", href: "#portfolio" },
  { id: "contact", label: "Contact", href: "#contact" },
];
