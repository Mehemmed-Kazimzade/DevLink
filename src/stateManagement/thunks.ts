import type { QuestionDto } from "../types/questions";
import type { Project } from "../types/userProfileTypes/Project";
import type { Skill } from "../types/userProfileTypes/Skill";
import type { Snippet } from "../types/userProfileTypes/Snippet";
import type { UserInfo } from "../types/userProfileTypes/UserInfo";
import type { UserSkillResponse } from "../types/UserSkillResponse";
import createFetchThunk from "./thunkFactory";

export const fetchUserInfo = createFetchThunk<UserInfo>("user/fetchUserInfo");

export const fetchUserSkills = createFetchThunk<Skill[]>(
    "user/fetchUserSkills",
    (data: UserSkillResponse) => data.techStack
);

export const fetchSnippets = createFetchThunk<Snippet[]>(
    "user/fetchSnippets",
    (data) => data.snippets
);

export const fetchProjects = createFetchThunk<Project[]>(
    "user/fetchProjects",
    (data) => data.projects
);

export const fetchQuestions = createFetchThunk<QuestionDto[]>(
    "questions/fetchQuestions",
    (data) => data.questions
);

export const fetchViewedUserInfo = createFetchThunk<UserInfo>("user/fetchViewedUserInfo")

export const fetchViewedUserSkills = createFetchThunk<Skill[]>(
    "user/fetchViewedUserSkills",
    (data: UserSkillResponse) => data.techStack
)

export const fetchViewedUserSnippets = createFetchThunk<Snippet[]>(
    "user/fetchViewedUserSnippets",
    (data) => data.snippets
);

export const fetchViewedUserProjects = createFetchThunk<Project[]>(
    "user/fetchViewedUserProjects",
    (data) => data.projects
);