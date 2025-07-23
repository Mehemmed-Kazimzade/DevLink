import type React from "react";

export interface Field {
    type: string,
    currValue: string,
    values?: string[],
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>
}