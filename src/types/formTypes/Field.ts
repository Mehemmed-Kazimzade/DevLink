import type React from "react";
import type { TechnologiesRef } from "../../components/Technologies";

export interface Field {
    type: string,
    name: string,
    currValue: string,
    values?: string[],
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | TechnologiesRef | null>
}