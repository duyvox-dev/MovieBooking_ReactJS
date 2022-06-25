// import React, { useRef } from "react";
// import { useEffect } from "react";
// export default function TrailerModal({ src, isVisible, toggleModal }) {
//     const youtubeVideo = useRef();
//     useEffect(() => {
//         youtubeVideo.current.src = src;
//     }, [isVisible]);
//     return (
//         <div>
//             <div
//                 className={`${
//                     !isVisible ? "hidden " : "block"
//                 }   w-screen h-screen top-0 left-0 fixed z-50`}
//             >
//                 <div
//                     className="w-full h-full bg-zinc-900/80"
//                     onClick={toggleModal}
//                 ></div>
//                 <div
//                     className={`${
//                         !isVisible ? "hidden " : null
//                     } w-[80%] h-[80%] p-5 rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute`}
//                 >
//                     <div className="w-full h-full">
//                         <iframe
//                             ref={youtubeVideo}
//                             width="100%"
//                             height="100%"
//                             src={src}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                             // tabindex="-1"
//                         ></iframe>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React from "react";
import Modal from "./Modal";
export default function TrailerModal({ isOpen, onClose, src }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isTrailerModal={true}>
            <div className="w-full h-full">
                <iframe
                    width="100%"
                    height="100%"
                    src={src}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </Modal>
    );
}
