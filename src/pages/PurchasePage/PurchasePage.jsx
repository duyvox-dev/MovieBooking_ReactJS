import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../service/movieService";
import Spinner from "../../components/Spinner";
import useModal from "../../hook/useModal";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import SeatItem from "./SeatItem";
import { useRef } from "react";
export default function PurchasePage() {
    const location = useLocation();

    const { isVisibleModal, toggleModal } = useModal();
    const modalEl = useRef();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [movie, setMovie] = useState({});
    const [seats, setSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingSeats, setBookingSeats] = useState([]);
    const { id } = useParams();

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
            { type: "primary", path: "/acount", name: "Xem vé vừa đặt" },
        ],
    };
    const [modalDetail, setModalDeltail] = useState(modalDetailLogin);
    const getShowTimeDetail = async () => {
        try {
            setLoading(true);
            const res = await movieService.getShowTimeDetail(id);
            const data = res.data.content;
            setMovie(data.thongTinPhim);
            setSeats(data.danhSachGhe);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!isLoggedIn) {
            toggleModal();
        }
        getShowTimeDetail();
    }, []);
    const countTotalCost = () => {
        return bookingSeats
            .reduce((sum, seat) => {
                return sum + seat.giaVe;
            }, 0)
            .toLocaleString();
    };
    const isBooked = (seatCode) => {
        const seat = bookingSeats.find((seat) => seat.tenGhe === seatCode);
        if (!seat) return false;
        return true;
    };
    const bookSeat = (seatCode) => {
        const seatToBook = seats.find((seat) => seat.tenGhe === seatCode);
        if (seatToBook.taiKhoanNguoiDat) return false;
        else if (isBooked(seatCode)) {
            const newBookingSeat = bookingSeats.filter(
                (seat) => seat.tenGhe !== seatCode
            );
            setBookingSeats(newBookingSeat);
        } else {
            const seat = {
                giaVe: seatToBook.giaVe,
                tenGhe: seatToBook.tenGhe,
                maGhe: seatToBook.maGhe,
            };
            setBookingSeats([...bookingSeats, seat]);
        }
    };
    const renderSeat = () => {
        return seats.map((seat) => {
            if (isBooked(seat.tenGhe))
                return (
                    <SeatItem
                        type="booking"
                        bookSeat={bookSeat}
                        seatInfo={seat}
                    />
                );
            else if (seat.taiKhoanNguoiDat) {
                return (
                    <SeatItem
                        type="reserved"
                        bookSeat={bookSeat}
                        seatInfo={seat}
                    />
                );
            } else {
                return (
                    <SeatItem
                        type="available"
                        bookSeat={bookSeat}
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
        const bookTicket = async () => {
            try {
                setLoading(true);
                const res = await movieService.bookMovieTicket(data);
                const resData = res.data;
                setBookingSeats([]);
                await getShowTimeDetail();
                setLoading(false);
                setModalDeltail(modalDetailSuccessBooking);
                toggleModal();
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        bookTicket();
    };

    return (
        <div>
            {loading && <Spinner size="large" />}
            <ModalConfirm
                ref={modalEl}
                isOpen={isVisibleModal}
                modalDetail={modalDetail}
                onClose={() => {}}
            />

            <div className="container mx-auto py-10 px-5 min-h-screen">
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
                                    src={movie.hinhAnh}
                                    alt=""
                                    className="block mx-auto max-w-[80%] max-h-[200px]"
                                />
                            </div>
                            <div className="mt-10 text-lg">
                                <p className="">
                                    <span>Phim: </span>
                                    <span className="font-semibold text-yellow-500 text-2xl">
                                        {movie.tenPhim}
                                    </span>
                                </p>
                                <p className="">
                                    <span>Ngày: </span>
                                    <span className="font-semibold text-yellow-500">
                                        {movie?.ngayChieu}
                                    </span>
                                </p>
                                <p className="">
                                    <span>Giờ Chiếu: </span>
                                    <span className="font-semibold text-yellow-500">
                                        {movie?.gioChieu}
                                    </span>
                                </p>

                                <p className="">
                                    <span>Rạp: </span>
                                    <span className="font-semibold text-yellow-500">
                                        {movie.tenCumRap} - {movie.tenRap}
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
            </div>
        </div>
    );
}
