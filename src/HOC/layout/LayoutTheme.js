import React from "react";
import HeaderTemplate from "../../components/HeaderTemplate/HeaderTemplate";
export default function LayoutTheme({ Component }) {
    return (
        <div>
            <HeaderTemplate />
            <div>
                <Component />
            </div>
        </div>
    );
}
