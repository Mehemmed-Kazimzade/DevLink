import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/logout/" element={<Logout />} />
        </Routes>
    )
}