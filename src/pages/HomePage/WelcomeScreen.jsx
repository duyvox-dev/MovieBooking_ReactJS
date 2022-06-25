import React from "react";
import Lottie from "lottie-react";
import bgLoginAnimation from "../../assets/bg-login.json";
export default function WelcomeScreen() {
    return (
        <div>
            <div className="fixed inset-0 overflow-y-auto z-10  bg-zinc-900">
                <div className="min-h-screen flex justify-center items-center">
                    <div className="w-1/2 h-1/2">
                        <Lottie animationData={bgLoginAnimation} />;
                    </div>
                </div>
            </div>
        </div>
    );
}
