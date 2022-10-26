// this page will load the detail description, trailer and scheduleTime of movie
import moment from "moment";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { FaYoutube } from "react-icons/fa";
import { Rate } from "antd";
import { lowerCaselizeString } from "../../utils/stringFormatUtils";
import ShowTime from "./ShowTime";
import TrailerModal from "../../components/Modal/TrailerModal";
import useModal from "../../hook/useModal";
import { isEmptyObject } from "../../utils/objectUtils";
import { animateScroll as scroll, scroller, Element } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail } from "../../redux/movieReducer";

export default function MovieDetailPage() {
    const { isVisibleModal, toggleModal } = useModal();
    const { id } = useParams();

    const dispatch = useDispatch();
    const { loading, movieDetail } = useSelector((state) => state.movie);

    useEffect(() => {
        dispatch(getMovieDetail(id));

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
                {!isEmptyObject(movieDetail) ? (
                    <div className="">
                        <TrailerModal
                            src={movieDetail.movieInfo.trailer}
                            isOpen={isVisibleModal}
                            onClose={toggleModal}
                        />
                        <div className="flex gap-10 ">
                            <div className="w-1/3">
                                <img
                                    src={movieDetail.movieInfo.hinhAnh}
                                    alt=""
                                    className="block w-full rounded-lg h-[500px]"
                                />
                            </div>
                            <div className="w-2/3 flex flex-col">
                                <div className="flex-1">
                                    <h1 className="text-4xl text-yellow-500 font-bold capitalize">
                                        {lowerCaselizeString(
                                            movieDetail.movieInfo.tenPhim
                                        )}
                                    </h1>
                                    <p className="text-slate-200 text-xl font-semibold">
                                        <span className="text-slate-300 ">
                                            Khởi chiếu:
                                        </span>
                                        <span className="text-yellow-500 ml-5 text-2xl font-bold">
                                            {moment(
                                                movieDetail?.movieInfo
                                                    ?.ngayKhoiChieu
                                            ).format("DD MMM YYYY")}
                                        </span>
                                    </p>
                                    <p className="text-slate-300 text-lg italic">
                                        {movieDetail.movieInfo.moTa}
                                    </p>
                                    <div className="flex gap-2 items-center text-slate-300 text-xl font-semibold">
                                        <span className="">Đánh giá:</span>
                                        <div>
                                            <Rate
                                                disabled
                                                allowHalf
                                                defaultValue={
                                                    movieDetail?.movieInfo
                                                        ?.danhGia / 2
                                                }
                                            />
                                            <span className="ml-2">
                                                (
                                                {movieDetail.movieInfo.danhGia /
                                                    2}
                                                / 5)
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
                            <ShowTime showTimeList={movieDetail.showTime} />
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
