import { useSearchParams } from "react-router-dom";
import QuestionsContainer from "../../components/questions/QuestionsContainer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../slices/store";
import LoadingSpinner from "../../components/LoadingSpinner";
import { fetchQuestions } from "../../stateManagement/thunks";
import { useEffect } from "react";
import type { AppDispatch } from "../../slices/store";
import { getQuestions } from "../../constants/urls";

export default function Questions() {
    const [ searchParams ] = useSearchParams();
    const userSlug = searchParams.get("userSlug") ?? "";
    const { loading } = useSelector((state: RootState) => state.questions);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchQuestions(`${getQuestions}?userSlug=${userSlug}`));
    }, []);

    const questionsFrom = userSlug?.split("-")[1] ?? "community";

    return <>
        {loading ? <LoadingSpinner /> :
        <QuestionsContainer questionsFrom={questionsFrom} />}
    </>
}