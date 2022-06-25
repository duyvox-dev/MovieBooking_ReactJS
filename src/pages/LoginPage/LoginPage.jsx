import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { showMessage } from "../../utils/messageUtils";
import { login } from "../../redux/authReducer";
import Spinner from "../../components/Spinner";
import { clearMessage } from "../../redux/messageReducer";
import Lottie from "lottie-react";
import bgLoginAnimation from "../../assets/bg-login.json";
import Logo from "../../components/HeaderTemplate/Logo";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { loading, isLoggedIn, accessToken } = useSelector(
        (state) => state.auth
    );
    const message = useSelector((state) => state.message);

    const handleLogin = (loginData) => {
        dispatch(login(loginData));
    };

    useEffect(() => {
        if (accessToken) {
            if (state) navigate(state);
            else navigate("/");
        }
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
        <div className="w-full min-h-screen">
            <div className="container max-w-[900px] mx-auto pt-10   flex gap-10 items-center">
                {loading && <Spinner size="large" />}
                <div className="w-1/2">
                    <Lottie animationData={bgLoginAnimation} />;
                </div>
                <div className="w-1/2">
                    <div className="flex justify-center mb-5">
                        <Logo></Logo>
                    </div>

                    <LoginForm
                        handleLogin={handleLogin}
                        message={message.info}
                    />
                </div>
            </div>
        </div>
    );
}
