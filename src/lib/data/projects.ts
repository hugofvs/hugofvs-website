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
    urlLabel: "",
    image: "/images/projects/cracel-landing.png",
  },
  {
    name: "Elipse Studio",
    description: "Elipse is a creative studio focused on digital products.",
    year: 2025,
    url: "https://elipse.studio/",
    urlLabel: "",
    image: "/images/projects/elipse-landing.png",
  },
  {
    name: "Hottest Ones",
    description: "The ultimate portuguese startups directory.",
    year: 2025,
    url: "https://hottestones.com/",
    urlLabel: "",
    image: "/images/projects/hottestones-landing.png",
  },
];
