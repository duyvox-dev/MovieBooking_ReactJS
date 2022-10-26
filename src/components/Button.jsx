import React from "react";

export default function Button({ children }) {
    return (
        <button className="bg-rose-500 text-white py-1 px-8 inline-block rounded cursor-pointer outline-none font-bold text-base border-none active:bg-rose-700 active:scale-90 ">
            {children}
        </button>
    );
}
