import React from "react";
import ReactModal from "react-modal";

export default function TrailerModal({ src, isVisible, hide }) {
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        hide();
    }
    const customStyles = {
        content: {
            width: "90vw",
            height: "90vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <div className="">
            <ReactModal
                isOpen={isVisible}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                className="p-0 absolute top-0 left-0"
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={src}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullscreen
                    tabindex="-1"
                ></iframe>
            </ReactModal>
        </div>
    );
}
