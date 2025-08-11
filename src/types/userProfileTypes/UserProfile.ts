import type { Project } from "./Project";
import type { Skill } from "./Skill";
import type { Snippet } from "./Snippet";
import type { UserInfo } from "./UserInfo";

export interface UserProfile {
    fullName: string, 
    userSlug: string, 
    userInfo: UserInfo | null,
    projects: Project[] | null,
    snippets: Snippet[] | null,
    skills: Skill[] | null,
}