import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../slices/store";
import { setFullName, setId } from "../slices/userSlice";

interface jwtPayload extends JwtPayload {
    fullName: string,
    id: number,
}

export default function ProtectedRoute() {
    const [isValid, setIsValid] = useState<null | boolean>(null);
    const fullName = useSelector((state: RootState) => state.user.fullName);
    const id = useSelector((state: RootState ) => state.user.id);
    const dispatch = useDispatch();

    const helper = () => {
        localStorage.removeItem('token');
        setIsValid(false);
    }

    const setFullNameIfEmpty = (token: string) => {
        const decoded = jwtDecode<jwtPayload>(token);
        if (!fullName) {
            const temp = decoded.fullName;
            const fullName = temp.charAt(0).toUpperCase() + temp.slice(1);
            dispatch(setFullName(fullName));
        }

        if (!id || id === -1) dispatch(setId(decoded.id));
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
                        localStorage.setItem("token", response.data.token);
                        setFullNameIfEmpty(response.data.token);
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
                else{
                    setFullNameIfEmpty(token);
                    setIsValid(true)
                };
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