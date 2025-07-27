import type React from "react";

export interface Certification {
    title: string,
    issuer: string,
    issued_at: string,
    url: string,
    icon: React.ReactNode,
}