import React, { useState, useEffect } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import useModal from "../../hook/useModal";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import SeatItem from "./SeatItem";
import {
    bookMovieTicket,
    getCheckoutDetail,
    bookSeat,
} from "../../redux/checkoutReducer";
import { isEmptyObject } from "../../utils/objectUtils";
import { clearMessage } from "../../redux/messageReducer";
export default function PurchasePage() {
    const location = useLocation();
    const { id } = useParams();
    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const { movieInfo, seats, loading, bookingSeats } = useSelector(
        (state) => state.checkout
    );
    const { isVisibleModal, toggleModal } = useModal();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { userInfo } = useSelector((state) => state.auth);
    const modalDetailLogin = {
        message: "Vui lòng đăng nhập để đặt vé",
        actions: [
            { type: "normal", path: "/", name: "Quay về trang chủ" },
            {
                type: "primary",
                path: "/login",
                redirect: location.pathname,
                name: "Đăng nhập",
            },
        ],
    };
    const modalDetailSuccessBooking = {
        message: "Đặt vé thành công",
        actions: [
            { type: "normal", path: "/", name: "Quay về trang chủ" },
            { type: "primary", path: "/account", name: "Xem vé vừa đặt" },
        ],
    };
    const [modalDetail, setModalDeltail] = useState(modalDetailLogin);

    useEffect(() => {
        dispatch(getCheckoutDetail(id));
        if (!isLoggedIn) {
            toggleModal();
        }
        const processOthersBooking = (rawData) => {
            const list = [];
            rawData.forEach((item) => {
                if (
                    item.taiKhoan !== userInfo.taiKhoan &&
                    item.maLichChieu == id
                ) {
                    const bookingSeatArray = JSON.parse(item.danhSachGhe);
                    list = list.concat(bookingSeatArray);
                }
            });
            return list;
        };
    }, []);

    useEffect(() => {
        if (message.type == "success") {
            setModalDeltail(modalDetailSuccessBooking);
            toggleModal();
            clearMessage();
        }
    }, [message]);

    const countTotalCost = () => {
        return bookingSeats
            .reduce((sum, seat) => {
                return sum + seat.giaVe;
            }, 0)
            .toLocaleString();
    };
    const isBooked = (seatCode) => {
        const seat = bookingSeats.find((seat) => seat.maGhe === seatCode);
        if (!seat) return false;
        return true;
    };
    const handleBookSeat = (seatCode) => {
        dispatch(bookSeat(seatCode));
    };
    const renderSeat = () => {
        return seats.map((seat) => {
            if (isBooked(seat.maGhe))
                return (
                    <SeatItem
                        key={seat.maGhe}
                        type="booking"
                        bookSeat={handleBookSeat}
                        seatInfo={seat}
                    />
                );
            else {
                return (
                    <SeatItem
                        key={seat.maGhe}
                        type={seat.type}
                        bookSeat={handleBookSeat}
                        seatInfo={seat}
                    />
                );
            }
        });
    };
    const handleCheckout = () => {
        if (bookingSeats.length == 0) return;
        const newBookingSeats = bookingSeats.map((seat) => {
            return {
                maGhe: seat.maGhe,
                giaVe: seat.giaVe,
            };
        });
        const data = {
            maLichChieu: id,
            danhSachVe: newBookingSeats,
        };
        dispatch(bookMovieTicket(data));
    };

    return (
        <div>
            {loading && <Spinner size="large" />}
            <ModalConfirm
                isOpen={isVisibleModal}
                modalDetail={modalDetail}
                onClose={() => {}}
            />

            <div className="container mx-auto py-10 px-5 min-h-screen">
                {!isEmptyObject(movieInfo) ? (
                    <div className="flex gap-5">
                        <div className="w-[60%] text-slate-200">
                            <div>
                                <p className="p-2 bg-zinc-800 text-slate-200 uppercase text-2xl text-center">
                                    Màn Hình
                                </p>
                            </div>
                            <div className="flex items-center justify-center mb-5 gap-5 text-lg">
                                <div className="flex gap-2 items-center">
                                    <span className="bg-white w-[20px] h-[20px] rounded-full"></span>
                                    <span>Ghế đã được đặt</span>
                                </div>
                                <div className="flex gap-2  items-center">
                                    <span className="bg-yellow-400 w-[20px] h-[20px] rounded-full"></span>
                                    <span>Ghế đang đặt</span>
                                </div>
                                <div className="flex gap-2  items-center">
                                    <span className="bg-zinc-700 w-[20px] h-[20px] rounded-full"></span>
                                    <span>Ghế chưa được đặt</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-10 gap-5">
                                {renderSeat()}
                            </div>
                        </div>
                        <div className="w-[40%] text-slate-200">
                            <div className=" rounded-lg bg-zinc-800 p-10">
                                <div>
                                    <img
                                        src={movieInfo.hinhAnh}
                                        alt=""
                                        className="block mx-auto max-w-[80%] max-h-[200px]"
                                    />
                                </div>
                                <div className="mt-10 text-lg">
                                    <p className="">
                                        <span>Phim: </span>
                                        <span className="font-semibold text-yellow-500 text-2xl">
                                            {movieInfo.tenPhim}
                                        </span>
                                    </p>
                                    <p className="">
                                        <span>Ngày: </span>
                                        <span className="font-semibold text-yellow-500">
                                            {movieInfo?.ngayChieu}
                                        </span>
                                    </p>
                                    <p className="">
                                        <span>Giờ Chiếu: </span>
                                        <span className="font-semibold text-yellow-500">
                                            {movieInfo?.gioChieu}
                                        </span>
                                    </p>

                                    <p className="">
                                        <span>Rạp: </span>
                                        <span className="font-semibold text-yellow-500">
                                            {movieInfo.tenCumRap} -{" "}
                                            {movieInfo.tenRap}
                                        </span>
                                    </p>
                                    <p className="">
                                        <span>Ghế đặt: </span>
                                        <span className="font-semibold text-yellow-500">
                                            {bookingSeats.map((seat) => {
                                                return (
                                                    <span className="mr-2">
                                                        {seat.tenGhe}
                                                    </span>
                                                );
                                            })}
                                        </span>
                                    </p>
                                    <p className="">
                                        <span>Tổng tiền: </span>
                                        <span className="font-semibold text-yellow-500">
                                            {countTotalCost()}
                                            <span className="ml-2">VND</span>
                                        </span>
                                    </p>
                                    <button
                                        className="block w-full bg-yellow-500 hover:bg-yellow-400   rounded-md py-2 px-5 text-black text-lg font-semibold duration-300 ease-in-out"
                                        onClick={() => {
                                            handleCheckout();
                                        }}
                                    >
                                        Thanh Toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {!loading ? (
                            <div className="w-full">
                                <p className="text-4xl text-slate-200 text-center">
                                    Không tìm thấy phim này, vui lòng quay trở
                                    lại
                                    <NavLink to="/">
                                        <span className="text-yellow-500 block text-center">
                                            Trang chủ
                                        </span>
                                    </NavLink>
                                </p>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
