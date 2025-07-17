import { Route } from "react-router-dom";
import Login from "../pages/authPages/Login";
import Register from "../pages/authPages/Register";
import Logout from "../pages/authPages/Logout";
import LogoutSuccess from "../pages/authPages/LogoutSuccess";
import PasswordReset from "../pages/authPages/PasswordReset";
import SixDigits from "../pages/authPages/SixDigits";

export default [
    <Route path="/login/" element={<Login />} />,
    <Route path="/register/" element={<Register />} />,
    <Route path="/logout/" element={<Logout />} />,
    <Route path="/logoutSuccess/" element={<LogoutSuccess />} />,
    <Route path="/passwordReset/" element={<PasswordReset />} />,
    <Route path="/codeChecking/" element={<SixDigits />} />
];