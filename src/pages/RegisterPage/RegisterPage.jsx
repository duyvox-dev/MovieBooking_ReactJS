import React, { useEffect } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../../utils/messageUtils";
import { register } from "../../redux/authReducer";
import Spinner from "../../components/Spinner";
import { clearMessage } from "../../redux/messageReducer";

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
        <div>
            <div className="container">
                {loading && <Spinner size="large" />}

                <div className="mx-auto w-[500px]">
                    <RegisterForm handleRegister={handleRegister} />
                </div>
            </div>
        </div>
    );
}
// export default React.memo(Header) // pure component
