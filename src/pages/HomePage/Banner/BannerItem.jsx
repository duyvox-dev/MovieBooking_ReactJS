import React from "react";
import { FaRegPlayCircle } from "react-icons/fa";

export default function BannerItem({ data }) {
    return (
        <div className="max-h-[500px] relative group">
            <img src={data.hinhAnh} alt="" className="h-full w-full" />
            <div
                className="h-full w-full absolute  top-0 left-0"
                style={{ backgroundColor: "#00000050" }}
            >
                <div className="h-full w-full flex justify-center items-center">
                    <div className="cursor-pointer">
                        <FaRegPlayCircle className="text-[70px] text-white hidden group-hover:block shadow-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
