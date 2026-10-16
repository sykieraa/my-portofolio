export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  icon: string;
  color?: string;
}

export const socialsData: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/sykieraa",
    handle: "@sykieraa",
    icon: "Github",
    color: "#FFFFFF",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/syakira-aisya-f-9a1694405",
    handle: "Syakira Aisya Fiandifa",
    icon: "Linkedin",
    color: "#0A66C2",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/sykieraa_s",
    handle: "@sykieraa_s",
    icon: "Instagram",
    color: "#E4405F",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:syakira.a.fnd@gmail.com",
    handle: "syakira.a.fnd@gmail.com",
    icon: "Mail",
    color: "#3B82F6",
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.com/users/cellyn1sse_41186",
    handle: "cellyn1sse_41186",
    icon: "MessageSquare",
    color: "#5865F2",
  },
];
