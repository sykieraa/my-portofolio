export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "event-01",
    period: "2025",
    role: "Participant",
    company: "GDG - DevFest Depok",
    location: "Universitas Indonesia",
    type: "Conference",
    description: "In this event, I got various interesting insights about technologies such as cloud computing, AI, and application development.",
    highlights: [
      "Explored the integration of Google Cloud technologies and AI models in modern application architecture",
      "Participated in hands-on workshops focused on optimizing web performance and developer workflows",
      "Networked with tech professionals, Google Developer Experts, and fellow engineers to discuss industry best practices",
    ],
    technologies: ["Google Cloud", "Artificial Intelligence", "GenAI"],
  },
  {
    "id": "event-02",
    "period": "2026",
    "role": "Participant",
    "company": "GDG - DevFest Bogor",
    "location": "Universitas Pakuan",
    "type": "Conference",
    "description": "Participated in the largest community-led tech festival in Bogor, gaining insights into mobile development, AI integration, and ecosystem advancements.",
    "highlights": [
      "Attended technical sessions led by Google Developer Experts regarding ecosystem updates",
      "Engaged in networking sessions with local tech communities and industry professionals in Bogor",
      "Learned about practical implementations of modern developer tools through keynote sessions"
    ],
    "technologies": ["Antigravity", "Google Technologies", "Artificial Intelligence"]
  },
  {
    "id": "event-03",
    "period": "2026",
    "role": "Participant",
    "company": "RPL Industry Insight",
    "location": "SMK Plus Pelita Nusantara",
    "type": "Seminar",
    "description": "Participated in a UI/UX seminar exploring the role of UI/UX in software development, Design Thinking, and the workflow from wireframing to mockups and prototypes.",
    "highlights": [
      "Learned the roles and differences between UI Designer and UX Designer in software development",
      "Explored the Design Thinking process, including Empathize, Define, and Ideate",
      "Learned how wireframes, mockups, and prototypes support the design and product development process"
    ],
    "technologies": [
      "Figma",
      "UI/UX Design",
      "Design Thinking",
      "Wireframing",
      "Prototyping"
    ]
  }
];
