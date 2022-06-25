import React from "react";
import { NavLink } from "react-router-dom";
import { truncate, lowerCaselizeString } from "../../utils/stringFormatUtils";
export default function MovieCard({ data }) {
    return (
        <div className="relative group px-5 py-5 md:h-[400px] mr-7 bg-zinc-800 rounded-md">
            <div className=" flex flex-col cursor-pointer h-full">
                <div className="h-3/4">
                    <img
                        src={data.hinhAnh}
                        alt=""
                        className="block h-full max-h-[100%] w-full object-fill  rounded-md"
                    />
                </div>
                <div className="flex-1 pt-3">
                    <p className="text-slate-200 text-lg font-bold capitalize	">
                        <span>{lowerCaselizeString(data.tenPhim)}</span>
                    </p>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/80 p-10 hidden group-hover:block group-hover:transition-transform duration-300 ease-in-out">
                <p className="text-slate-50 md:text-md lg:text-lg">
                    {truncate(data.moTa, 120)}
                </p>

                <div className="absolute bottom-10 left-0 w-full">
                    <NavLink to={`/detail/${data.maPhim}`}>
                        <button className="block mx-auto py-3  w-[80%] text-gray-900 bg-yellow-500   hover:bg-yellow-400  rounded-xl font-semibold text-xl duration-300 ease-linear">
                            {data.sapChieu ? "Xem Chi Tiết" : "Mua Vé"}
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
