import React from "react";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import UserNav from "./UserNav";
export default function HeaderTemplate() {
    return (
        <div className=" w-full bg-slate-200">
            <div className="container py-5 flex justify-around items-center">
                <Logo />
                <HeaderNav />
                <UserNav />
            </div>
        </div>
    );
}
