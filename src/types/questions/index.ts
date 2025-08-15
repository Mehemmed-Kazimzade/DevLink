export type VoteType = 'UP' | 'DOWN' | 'STATIC';

export type UserDto = {
  id: number;
  fullName: string;
  userSlug: string;
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
  user: UserDto | undefined;
};

export type AnswerDto = {
  id: number;
  isAccepted: boolean;
  content: string;
  currentUserVote: VoteType;
  user: UserDto;
  upVotes: number;
  downVotes: number;
  comments: CommentDto[];
  createdAt: string;
  lastEdited: string;
};

export type QuestionStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

export type QuestionDto = {
  id: number;
  questionTitle: string;
  questionBody: string;
  views: number;
  tags: string[];
  votes: number;
  questionSlug: string;
  isResolved: boolean;
  questionStatus: QuestionStatus;
  createdAt: string;  // ISO timestamp
  updatedAt: string;  // ISO timestamp
  answersCount: number;
  user: UserDto;
  comments: CommentDto[];
  answers: AnswerDto[];
};

export type QuestionResponse = {
  questions: QuestionDto[]
}
