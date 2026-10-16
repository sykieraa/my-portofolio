export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialId: string;
  image: string;
  skills: string[];
}

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-01",
    title: "CERTIFICATE WEBINAR INTRODUCTION TO CAPTURE THE FLAG",
    issuer: "ID-Networkers",
    date: "02 Agustus 2025",
    category: "Webinar",
    credentialId: "",
    image: "/assets/certificates/certificate-01.webp",
    skills: ["Capture the Flag", "Cybersecurity"],
  },
  {
    id: "cert-02",
    title: "CERTIFICATE COURSE SPEC-DRIVEN DEVELOPMENT WITH KIRO",
    issuer: "Dicoding",
    date: "07 Agustus 2026",
    category: "Course",
    credentialId: "GRX5W55ERZ0M",
    image: "/assets/certificates/certificate-02.webp",
    skills: ["Spec-Driven Development", "Kiro IDE", "AI Prompt Engineering",],
  },
  {
    id: "cert-03",
    title: "CERTIFICATE WEBINAR GAME DESIGN: FROM HOBBY TO HOOK",
    issuer: "CodeLamp",
    date: "24 Agustus 2025",
    category: "webinar",
    credentialId: "",
    image: "/assets/certificates/certificate-03.webp",
    skills: ["Game Design", "User Engagement"],
  },
  {
    id: "cert-04",
    title: "CERTIFICATE WEBINAR FROM VISION TO VERSION 1.0",
    issuer: "CodeLamp",
    date: "17 Agustus 2025",
    category: " Webinar",
    credentialId: "",
    image: "/assets/certificates/certificate-04.webp",
    skills: ["Game Development","Game Roadmapping"],
  },
  {
    id: "cert-05",
    title: "CERTIFICATE WEBINAR AI: CODING AI UNTUK MASA DEPAN EDUKASI DIGITAL",
    issuer: "PT Talenta Prestasi Indonesia",
    date: "23 Mei 2026",
    category: "Webinar",
    credentialId: "0139/WEBINAR.TAPRESNESIA/V/2026",
    image: "/assets/certificates/certificate-05.webp",
    skills: ["Artificial Intelligence", "AI Coding", "Digital Education"],
  },
  {
    id: "cert-06",
    title: "CERTIFICATE BLOCKCHAINS, BROKEN CHAINS",
    issuer: "CodeLamp",
    date: "21 September 2025",
    category: "Webinar",
    credentialId: "",
    image: "/assets/certificates/certificate-06.webp",
    skills: ["Blockchain",],
  },
  {
    id: "cert-07",
    title: "CERTIFICATE DevCoach 242 - Git & Github",
    issuer: "Dicoding Event",
    date: "11 September 2026",
    category: "Webinar",
    credentialId: "",
    image: "/assets/certificates/certificate-07.webp",
    skills: ["Git", "GitHub"],
  },
];
