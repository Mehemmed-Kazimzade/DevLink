import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProtectedRoute() {
    const [isValid, setIsValid] = useState<null | boolean>(null);

    const helper = () => {
        localStorage.removeItem('token');
        setIsValid(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) return setIsValid(false);

        try {
            const decoded = jwtDecode(token);
            if(decoded.exp && decoded.exp * 1000 < Date.now()) {
                helper();
                return;
            };

            fetch("http://localhost:8080/api/v1/test/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                if (res.status === 401 || res.status === 403) {
                    helper();
                }

                else{
                    setIsValid(true);
                }

            }).catch(() => helper());
        } catch(e) {
            helper();
        }
    }, []);

    if (isValid === null) return <LoadingSpinner />;
    if (isValid === false) return <Navigate to={"/login/"} />;

    return <Outlet />
}