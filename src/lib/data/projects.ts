export type Project = {
  name: string;
  description: string;
  year: number;
  url: string;
  urlLabel: string;
  image: string; // path relative to /static, e.g. /images/projects/my-project.jpg
};

export const projects: Project[] = [
  {
    name: "Cracel Type",
    description:
      "Cracel Type is a Lisbon-based type foundry website presenting original typefaces, detailed specimen previews, and brand narrative through a clean, typography-driven design.",
    year: 2024,
    url: "https://craceltype.com",
    urlLabel: "Live",
    image: "/images/projects/cracel-landing.png",
  },
  {
    name: "Project Two",
    description:
      "A short description of what this project does and why it matters.",
    year: 2023,
    url: "https://github.com/hugofvs",
    urlLabel: "GitHub",
    image: "/images/projects/project-two.jpg",
  },
  {
    name: "Project Three",
    description:
      "A short description of what this project does and why it matters.",
    year: 2022,
    url: "https://example.com",
    urlLabel: "Live",
    image: "/images/projects/project-three.jpg",
  },
];
