import type { UserInfo } from "../userProfileTypes/UserInfo";

export type VoteType = 'UP' | 'DOWN' | 'STATIC';

export type UserDto = {
  id: number;
  fullName: string;
  profileImageUrl: string; // base64 image string
};

export type AnswerVoteDto = {
  id: number;
  voteType: VoteType;
  user: UserDto;
};

export type CommentDto = {
  id: number;
  content: string;
  user: UserDto;
};

export type AnswerDto = {
  content: string;
  currentUserVote: VoteType;
  user: UserDto;
  upVotes: number;
  downVotes: number;
  comments: CommentDto[];
};

export type QuestionStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

export type QuestionDto = {
  id: number;
  questionTitle: string;
  questionBody: string;
  views: number;
  tags: string[];
  votes: number;
  isResolved: boolean;
  questionStatus: QuestionStatus;
  createdAt: string;  // ISO timestamp
  updatedAt: string;  // ISO timestamp
  answersCount: number;
  userDto: UserDto;
  comments: CommentDto[];
  answers: AnswerDto[];
};
