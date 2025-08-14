import { Route } from "react-router-dom";
import Questions from "../pages/questions/Questions";
import QuestionPost from "../components/questions/QuestionPost";
import QuestionDetailPage from "../components/questions/QuestionDetail";

export default [
    <Route element={<Questions />} path="/QA/questions/" />,
    <Route element={<QuestionDetailPage />} path="/QA/questions/{questionSlug}/" />,
    <Route element={<QuestionPost />} path="/QA/questionPost/" />
];