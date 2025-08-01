import type { Skill } from "./Skill";

export interface Project {
    id: number,
    title: string,
    description: string,
    techStack: Skill[],
    liveUrl: string | null,
    repoUrl: string | null,
}