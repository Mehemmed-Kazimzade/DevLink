import { useParams } from "react-router-dom";
import QuestionsContainer from "../../components/questions/QuestionsContainer";
import { useSelector } from "react-redux";
import type { RootState } from "../../slices/store";

export default function Questions() {
    const { userSlug } = useParams<{ userSlug: string }>() ?? "";
    const { questions, loading, error } = useSelector((state: RootState) => state.questions);

    const questionsFrom = userSlug?.split("-")[1] ?? "";

    return (
        

        <QuestionsContainer questionsFrom={questionsFrom} />
    )
}