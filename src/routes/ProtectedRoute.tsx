import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

export default function ProtectedRoute() {
    const [isValid, setIsValid] = useState<null | boolean>(null);

    const helper = () => {
        localStorage.removeItem('token');
        setIsValid(false);
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if(!token) {
                helper();
                return;
            }

            try {
                const decoded = jwtDecode(token);
                if(decoded.exp && decoded.exp * 1000 < Date.now()) {

                    const response = await axios.post("http://localhost:8080/api/v1/auth/refresh/", {}, { withCredentials: true });
                    if(response.status === 200) {
                        console.log('yes');
                        localStorage.setItem("token", response.data.token);
                        setIsValid(true);
                    }

                    else helper();

                    return;
                };

                const response = await fetch("http://localhost:8080/api/v1/test/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 401 || response.status === 403) helper();
                else setIsValid(true);
            }
            catch(e) {
                helper();
            }
        }

        checkAuth();

    }, []);

    if (isValid === null) return <LoadingSpinner />;
    if (isValid === false) return <Navigate to={"/login/"} />;

    return <Outlet />
}