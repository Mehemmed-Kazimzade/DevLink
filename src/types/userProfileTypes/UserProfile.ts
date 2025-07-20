import type { Certification } from "./Certification";
import type { Project } from "./Project";
import type { Skill } from "./Skill";
import type { UserInfo } from "./UserInfo";

export interface UserProfile {
    userInfo: UserInfo | null,
    projects: Project[] | null,
    certifications: Certification[] | null,
    skill: Skill[] | null,
}