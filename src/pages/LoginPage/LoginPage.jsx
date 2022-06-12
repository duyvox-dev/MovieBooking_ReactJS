import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { showMessage } from "../../utils/messageUtils";
import { login } from "../../redux/authReducer";
import Spinner from "../../components/Spinner";
import { clearMessage } from "../../redux/messageReducer";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isLoggedIn, accessToken } = useSelector(
        (state) => state.auth
    );
    const message = useSelector((state) => state.message);

    const handleLogin = (loginData) => {
        dispatch(login(loginData));
    };

    useEffect(() => {
        if (accessToken) navigate("/");
    }, [accessToken]);

    useEffect(() => {
        showMessage(message);
        dispatch(clearMessage());
    }, [message]);
    useEffect(() => {
        dispatch(clearMessage());
    }, []);
    document.title = "Movie - Login";
    return (
        <div className="container">
            {loading && <Spinner size="large" />}
            <div className="mx-auto w-[500px]">
                <LoginForm handleLogin={handleLogin} />
            </div>
        </div>
    );
}
