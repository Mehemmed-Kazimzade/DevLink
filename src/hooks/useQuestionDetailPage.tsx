import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../slices/store";
import HasQuestionExpired from "../utils/HasQuestionExpired";
import { fetchViewedQuestion } from "../stateManagement/thunks";
import { setViewedQuestion } from "../slices/cachedQuestionSlice";
import { getViewedQuestion } from "../constants/urls";
import { useEffect, useState } from "react";

export default function useQuestionDetailPage() {
    const { questionSlug } = useParams<{ questionSlug: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const cachedQuestion = useSelector(
        (state: RootState) => state.cachedQuestions.byId[questionSlug || ""]
    );
    const lastFetched = useSelector(
        (state: RootState) =>
            state.cachedQuestions.lastFetched[questionSlug || ""]
    );
    const question = useSelector((state: RootState) => state.cachedQuestions.viewedQuestion);

    const [commentsToShow, setCommentsToShow] = useState<number>(3);

    useEffect(() => {
        if (!cachedQuestion || HasQuestionExpired(lastFetched)) {
            dispatch(fetchViewedQuestion(getViewedQuestion + questionSlug));
        } else dispatch(setViewedQuestion(cachedQuestion));
    
    }, [questionSlug, cachedQuestion, lastFetched, dispatch]);

    return { question, commentsToShow, setCommentsToShow}
}