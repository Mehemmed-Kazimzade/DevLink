import { useRef } from "react";
import type { Field } from "../types/formTypes/Field";

export default function useProjectFieldDistributor(
    projectTitle: string,
    projectDescription: string,
    projectTechStack: string[]
): Field[] {
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const techStackRef = useRef<HTMLInputElement>(null);

    return [
        {
            type: "text",
            name: "title",
            ref: titleRef,
            currValue: projectTitle,
        },
        {
            type: "bigText",
            name: "description",
            ref: descriptionRef,
            currValue: projectDescription,
        },
        {
            type: "technology",
            name: "techStack",
            ref: techStackRef,
            currValue: "",
            values: projectTechStack,
        },
    ];
}
