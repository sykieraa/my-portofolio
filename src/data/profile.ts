export interface ProfileData {
  brand: string;
  name: {
    first: string;
    middle: string;
    last: string;
    full: string;
  };
  role: {
    primary: string;
    secondary: string;
    badge: string;
    techPills: string[];
  };
  availability: {
    status: string;
    available: boolean;
  };
  bio: {
    hero: string;
    about: string;
    quote: string;
  };
  assets: {
    portrait: string;
    about: string;
    portraitAlt: string;
    cvFile: string;
  };
}

export const profileData: ProfileData = {
  brand: "Sykieraa",
  name: {
    first: "Hi, I'm",
    middle: "Syakiraa",
    last: "",
    full: "Syakira Aisya Fiandifa",
  },
  role: {
    primary: "Syakira Aisya",
    secondary: "Fiandifa",
    badge: "Student | SMK Plus Pelita Nusantara",
    techPills: ["Typescript", "React", "Laravel", "Python", "PHP", "JavaScript"],
  },
  availability: {
    status: "Available to Learn",
    available: true,
  },
  bio: {
    hero: "I am currently studying web and app development, and learning through real projects to develop skills and explore technology.",
    about: "I am a student at Plus Pelita Nusantara Vocational High School, majoring in Software Engineering. Currently, I am learning the fundamentals of development using Laravel, Python, and PHP, as well as web interface creation using HTML, CSS, JavaScript, TypeScript, and React. ",
    quote: "Eat, Sleep, Code, Repeat.",
  },
  assets: {
    portrait: "/assets/profile/profile.jpeg",
    about: "/assets/profile/about.jpeg",
    portraitAlt: "Syakira Aisya Fiandifa - Student",
    cvFile: "/assets/resume/resume.pdf",
  },
};
