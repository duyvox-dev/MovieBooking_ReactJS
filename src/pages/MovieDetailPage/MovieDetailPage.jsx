// this page will load the detail description, trailer and scheduleTime of movie
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { NavLink } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { FaYoutube } from "react-icons/fa";
import { Rate } from "antd";
import { lowerCaselizeString } from "../../utils/stringFormatUtils";
import ShowTime from "./ShowTime";
// import TrailerModal from "../../components/TrailerModal/TrailerModal";
import TrailerModal from "../../components/Modal/TrailerModal";
import useModal from "../../hook/useModal";
import {
    animateScroll as scroll,
    scroller,
    Element,
    Button,
} from "react-scroll";

export default function MovieDetailPage() {
    const { isVisibleModal, toggleModal } = useModal();
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [showTimeList, setShowTimeList] = useState();
    const [loading, setLoading] = useState(false);
    let rawData = null;
    useEffect(() => {
        setLoading(true);
        const processRawData = () => {
            const movieData = {
                maPhim: rawData?.maPhim,
                tenPhim: rawData?.tenPhim,
                hinhAnh: rawData?.hinhAnh,
                trailer: rawData?.trailer,
                moTa: rawData?.moTa,
                ngayKhoiChieu: rawData?.ngayKhoiChieu,
                danhGia: rawData?.danhGia,
                sapChieu: rawData?.sapChieu,
                dangChieu: rawData?.dangChieu,
            };
            setMovie(movieData);
            setShowTimeList(rawData.heThongRapChieu);
        };
        movieService
            .getMovieDetailAndShowTime(id)
            .then((res) => {
                rawData = res.data.content;
                processRawData();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);
    const handleShowTrailer = () => {
        toggleModal();
    };
    const scrollTo = (element) => {
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 0,
            smooth: "easeInOutQuart",
        });
    };
    document.title = `Movie Time`;
    return (
        <div>
            <div className="container mx-auto py-10 px-5 min-h-screen">
                {loading && <Spinner size="large" />}
                {movie ? (
                    <div className="">
                        <TrailerModal
                            src={movie?.trailer}
                            isOpen={isVisibleModal}
                            onClose={toggleModal}
                        />
                        <div className="flex gap-10 ">
                            <div className="w-1/3">
                                <img
                                    src={movie?.hinhAnh}
                                    alt=""
                                    className="block w-full rounded-lg h-[500px]"
                                />
                            </div>
                            <div className="w-2/3 flex flex-col">
                                <div className="flex-1">
                                    <h1 className="text-4xl text-yellow-500 font-bold capitalize">
                                        {lowerCaselizeString(movie?.tenPhim)}
                                    </h1>
                                    <p className="text-slate-200 text-xl font-semibold">
                                        <span className="text-slate-300 ">
                                            Khởi chiếu:
                                        </span>
                                        <span className="text-yellow-500 ml-5 text-2xl font-bold">
                                            {moment(
                                                movie?.ngayKhoiChieu
                                            ).format("DD MMM YYYY")}
                                        </span>
                                    </p>
                                    <p className="text-slate-300 text-lg italic">
                                        {movie?.moTa}
                                    </p>
                                    <div className="flex gap-2 items-center text-slate-300 text-xl font-semibold">
                                        <span className="">Đánh giá:</span>
                                        <div>
                                            <Rate
                                                disabled
                                                allowHalf
                                                defaultValue={movie.danhGia / 2}
                                            />
                                            <span className="ml-2">
                                                ({movie.danhGia / 2} / 5)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-10 flex gap-5">
                                    <button
                                        className=" py-2 px-5   text-slate-200 bg-red-600     hover:bg-red-700  rounded-md font-semibold text-xl duration-300 ease-linear flex gap-2 justify-center items-center"
                                        onClick={handleShowTrailer}
                                    >
                                        <FaYoutube></FaYoutube>
                                        <span>Xem trailer</span>
                                    </button>

                                    <button
                                        to="showTimeContainer"
                                        className=" py-2 px-5   text-gray-900 bg-yellow-500     hover:bg-yellow-400  rounded-md font-semibold text-xl duration-300 ease-linear flex gap-2 justify-center items-center"
                                        onClick={() => {
                                            scrollTo("showTimeContainer");
                                        }}
                                    >
                                        <span>Mua vé</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Element name="showTimeContainer" className="py-10">
                            <ShowTime showTimeList={showTimeList} />
                        </Element>
                    </div>
                ) : (
                    <div className="w-full">
                        <p className="text-4xl text-slate-200 text-center">
                            Không tìm thấy phim này, vui lòng quay trở lại
                            <NavLink to="/">
                                <span className="text-yellow-500 block text-center">
                                    Trang chủ
                                </span>
                            </NavLink>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
