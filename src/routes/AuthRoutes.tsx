import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import LogoutSuccess from "../pages/LogoutSuccess";
import PasswordReset from "../pages/PasswordReset";

export default [
    <Route path="/login/" element={<Login />} />,
    <Route path="/register/" element={<Register />} />,
    <Route path="/logout/" element={<Logout />} />,
    <Route path="/logoutSuccess/" element={<LogoutSuccess />} />,
    <Route path="/passwordReset/" element={<PasswordReset />} />,
];