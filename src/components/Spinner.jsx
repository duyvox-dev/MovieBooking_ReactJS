import React from "react";
import { Spin } from "antd";
export default function Spinner({ size }) {
    return (
        <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center">
            <Spin size={size} />
        </div>
    );
}
