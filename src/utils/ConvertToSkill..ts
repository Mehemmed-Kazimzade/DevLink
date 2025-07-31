import type { Skill } from "../types/userProfileTypes/Skill";

export default function ConvertToSkill(skills: string[]): Skill[] {
    const convertedSkills: Skill[] = [];

    skills.forEach((s) => convertedSkills.push({ skillName: s }));

    return convertedSkills;
}
