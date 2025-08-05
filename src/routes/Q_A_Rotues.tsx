import { Route } from "react-router-dom";
import Questions from "../pages/questions/Questions";
import QuestionPost from "../components/questions/QuestionPost";

export default [
    <Route element={<Questions />} path="/QA/questions/" />,
    <Route element={<QuestionPost />} path="/QA/questionPost/" />
];