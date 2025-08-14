import { useDispatch } from "react-redux";
import HasQuestionExpired from "../utils/HasQuestionExpired";
import useGetCredentials from "../api/useGetCredentials";
import type { QuestionDto } from "../types/questions";
import { cacheQuestion } from "../slices/cachedQuestionSlice";

const pendingRequests: Record<string, Promise<any>> = {};

export default function useFetchQuestionsIfNeeded() {
    const dispatch = useDispatch();

    return async (
        questionSlug: string,
        lastFetched: Record<string, number>
    ) => {
        if (!HasQuestionExpired(lastFetched[questionSlug])) return;

        if (questionSlug in pendingRequests) {
            return pendingRequests[questionSlug];
        }

        const promise = useGetCredentials<QuestionDto>(
            `http://localhost:8080/api/v1/question/${questionSlug}`
        ).then((res) => {
            dispatch(cacheQuestion({ id: questionSlug, data: res.data }));
            delete pendingRequests[questionSlug];
            return res;
        });

        pendingRequests[questionSlug] = promise;
        return promise;
    };
}
