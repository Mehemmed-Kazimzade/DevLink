import { useParams } from "react-router-dom";
import QuestionsContainer from "../../components/questions/QuestionsContainer";

export default function Questions() {
    const { userSlug } = useParams<{ userSlug: string }>();

    

    return (
        <QuestionsContainer />
    )
}