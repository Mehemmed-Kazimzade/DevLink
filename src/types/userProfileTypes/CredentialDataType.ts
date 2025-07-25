import type { Certification } from "./Certification";
import type { Project } from "./Project";
import type { Skill } from "./Skill";
import type { Snippet } from "./Snippet";
import type { UserInfo } from "./UserInfo";

export interface CredentialDataType {
    certification?: Certification[],
    project?: Project[],
    skill?: Skill[],
    snippet?: Snippet[],
    userInfo: UserInfo,
}