import type { Project } from "../types/userProfileTypes/Project";
import type { Skill } from "../types/userProfileTypes/Skill";
import type { UserInfo } from "../types/userProfileTypes/UserInfo";
import type { UserSkillResponse } from "../types/UserSkillResponse";
import createFetchThunk from "./thunkFactory";

export const fetchUserInfo = createFetchThunk<UserInfo>(
    "user/fetchUserInfo",
    "http://localhost:8080/api/v1/profile/getUserInfo/",
);

export const fetchUserSkills = createFetchThunk<Skill[]>(
    "user/fetchUserSkills",
    "http://localhost:8080/api/v1/userSkills/getTechStack/",
    (data: UserSkillResponse) => data.techStack
);

export const fetchProjects = createFetchThunk<Project[]>(
    "user/fetchProjects",
    "http://localhost:8080/api/v1/profile/getProject/",
    (data) => data.projects
)
