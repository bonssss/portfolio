import bugsight from "../assets/images/bugsight.webp";
import gym from "../assets/images/gym.webp";
import portfolio from "../assets/images/portfolio.webp";
import daas from "../assets/images/daas.webp";
import tiply from "../assets/images/tiply.webp";
import addisEats from "../assets/images/addiseats.webp";
import skillhub from "../assets/images/skillhub.webp";

export interface Project {
  number: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "BugScribe AI",
    description:
      "An AI-powered platform for creating, analyzing, and managing software bug reports with intelligent categorization and diagnostics.",
    category: "AI / QA",
    image: bugsight,
    technologies: [
      "React.js",
      "Supabase",
      "Python",
      "Gemini API",
    ],
    github: "https://github.com/bonssss/bugscribe-ai",
    demo: "https://bugscribe-ai.vercel.app/",
  },

  {
    number: "02",
    title: "Tiply",
    description:
      "Production-ready creator monetization platform featuring custom profile pages, Telebirr & CBE payment workflows, QR code tipping, and real-time supporter walls.",
    category: "FULLSTACK & BACKEND",
    image: tiply,
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    github: "https://github.com/bonssss/tipjar",
    demo: "#",
  },

  {
    number: "03",
    title: "Delivery AS A Service (DAAS)",
    description:
      "Enterprise-grade logistics platform powering B2B and government deliveries with real-time tracking, spatial queries, and smart routing.",
    category: "LOGISTICS & BACKEND",
    image: daas,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "PostGIS",
    ],
    github: "#",
    demo: "https://dev.daas.ambalaymaps.com/",
  },

  {
    number: "04",
    title: "Addis Eats",
    description:
      "Authentic Ethiopian food delivery platform built with Next.js App Router, featuring ISR dynamic routing, category filtering, cart state management, and mobile money checkout.",
    category: "FULLSTACK",
    image: addisEats,
    technologies: [
      "Next.js",
      "React 19",
      "Tailwind CSS",
      "Context API",
    ],
    github: "https://github.com/bonssss/addis-eats",
    demo: "#",
  },

  {
    number: "05",
    title: "SkillHub",
    description:
      "Interactive developer roadmap and learning hub featuring progress dashboards, skill tracking, curated resources, and personalized study paths.",
    category: "FRONTEND & ROADMAPS",
    image: skillhub,
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Lucide React",
    ],
    github: "https://github.com/bonssss/skillhub",
    demo: "#",
  },

  {
    number: "06",
    title: "Oli Fit Gym",
    description:
      "Modern, responsive web platform for Olyyad Gym featuring workout program showcases, membership details, and sleek UI.",
    category: "FRONTEND",
    image: gym,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    github: "#",
    demo: "https://gym-website-rho-sepia.vercel.app/",
  },

  {
    number: "07",
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing backend systems, QA automation workflows, and practical AI applications.",
    category: "FRONTEND",
    image: portfolio,
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
    ],
    github: "https://github.com/bonssss/portfolio",
    demo: "https://bons-dev-qa.vercel.app/",
  },
];
