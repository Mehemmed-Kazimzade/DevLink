import type React from "react";
import type { MUIIconType } from "../MuiIcon";

export interface Certification {
    title: string,
    issuer: string,
    issued_at: string,
    url: string,
    icon: React.ReactNode,
}