import { useRef } from "react";
import type { Field } from "../types/formTypes/Field";

export default function useSnippetFieldDistributor(
    snippetTitle: string,
    language: string,
    snippetPreview: string,
): Field[] {
    const titleRef = useRef<HTMLInputElement>(null);
    const languageRef = useRef<HTMLInputElement>(null);
    const previewRef = useRef<HTMLTextAreaElement>(null);

    return [
        {
            type: "text",
            name: "title",
            ref: titleRef,
            currValue: snippetTitle,
        },
        {
            type: "singleTech",
            name: "language",
            ref: languageRef,
            currValue: language,
        },

        {
            type: "bigText",
            name: "preview",
            currValue: snippetPreview,
            ref: previewRef,
        },
    ];
}
