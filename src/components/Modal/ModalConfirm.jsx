import React from "react";
import Modal from "./Modal";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
export default function ModalConfirm({ isOpen, onClose, modalDetail }) {
    const navigate = useNavigate();
    const handleNavigate = (path, redirect) => {
        if (!redirect) navigate(path);
        else navigate(path, { state: redirect });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <Dialog.Title
                    as="h3"
                    className="text-2xl text-center font-semibold  text-slate-200"
                >
                    {modalDetail.message}
                </Dialog.Title>

                <div className="flex justify-end gap-5 mt-10">
                    {modalDetail.actions.map((action) => {
                        return (
                            <button
                                type="button"
                                className={
                                    "rounded-md border border-transparent  px-4 py-2 text-lg  font-semibold " +
                                    (action.type == "normal"
                                        ? "bg-gray-500/50  hover:bg-gray-500/40 text-slate-200"
                                        : "bg-yellow-500 hover:bg-yellow-400 text-gray-900")
                                }
                                onClick={() => {
                                    if (action.redirect)
                                        handleNavigate(
                                            action.path,
                                            action.redirect
                                        );
                                    else handleNavigate(action.path);
                                }}
                            >
                                {action.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </Modal>
    );
}
