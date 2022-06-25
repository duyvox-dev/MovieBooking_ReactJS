import React, { useEffect } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../../utils/messageUtils";
import { register } from "../../redux/authReducer";
import Spinner from "../../components/Spinner";
import { clearMessage } from "../../redux/messageReducer";
import Lottie from "lottie-react";
import bgLoginAnimation from "../../assets/bg-login.json";
import Logo from "../../components/HeaderTemplate/Logo";
export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isLoggedIn, isRegisterred, accessToken } = useSelector(
        (state) => state.auth
    );
    const message = useSelector((state) => state.message);

    useEffect(() => {
        if (accessToken) navigate("/");
    }, [accessToken]);

    useEffect(() => {
        if (isRegisterred) navigate("/login");
    }, [isRegisterred]);

    useEffect(() => {
        showMessage(message);
        dispatch(clearMessage());
    }, [message]);

    useEffect(() => {
        dispatch(clearMessage());
    }, []);
    const handleRegister = (registerData) => {
        dispatch(register(registerData));
    };
    return (
        <div className="w-full min-h-screen h-full">
            <div className="container max-w-[900px] mx-auto py-10   flex gap-10 items-center">
                {loading && <Spinner size="large" />}
                <div className="w-1/2">
                    <Lottie animationData={bgLoginAnimation} />;
                </div>
                <div className="w-1/2">
                    <div className="flex justify-center mb-5">
                        <Logo></Logo>
                    </div>

                    <RegisterForm handleRegister={handleRegister} />
                </div>
            </div>
        </div>
    );
}
// export default React.memo(Header) // pure component
