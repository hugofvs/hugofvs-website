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
        name: "Project One",
        description: "A short description of what this project does and why it matters.",
        year: 2024,
        url: "https://example.com",
        urlLabel: "Live",
        image: "/images/projects/project-one.jpg",
    },
    {
        name: "Project Two",
        description: "A short description of what this project does and why it matters.",
        year: 2023,
        url: "https://github.com/hugofvs",
        urlLabel: "GitHub",
        image: "/images/projects/project-two.jpg",
    },
    {
        name: "Project Three",
        description: "A short description of what this project does and why it matters.",
        year: 2022,
        url: "https://example.com",
        urlLabel: "Live",
        image: "/images/projects/project-three.jpg",
    },
];
