import { Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;
export default function ShowTime({ showTimeList }) {
    const renderShowTime = () => {
        return showTimeList.map((cinemaGroup) => {
            return (
                <TabPane
                    tab={
                        <img
                            src={cinemaGroup.logo}
                            className="rounded-full w-[90px] h-[90px] mb-2"
                        />
                    }
                    key={cinemaGroup.tenHeThongRap}
                >
                    <Tabs tabPosition="left">
                        {cinemaGroup.cumRapChieu.map((cinema) => {
                            return (
                                <TabPane
                                    key={cinema.maCumRap}
                                    tab={
                                        <div className="flex gap-5 items-center justify-center ">
                                            <div>
                                                <img
                                                    src={cinema.hinhAnh}
                                                    alt=""
                                                    className="w-[60px] h-[60px] rounded-full"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-yellow-500 font-semibold text-left text-lg">
                                                    {cinema.tenCumRap}
                                                </h3>
                                                <p className="text-slate-200 text-left ">
                                                    {cinema.diaChi}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="flex gap-10">
                                        {cinema.lichChieuPhim.map(
                                            (showTime) => {
                                                return (
                                                    <Link
                                                        key={
                                                            showTime.maLichChieu
                                                        }
                                                        to={`/purchase/${showTime.maLichChieu}`}
                                                    >
                                                        <div className="py-2 px-5 bg-zinc-800  text-slate-200 text-xl hover:bg-yellow-400 hover:text-gray-900 duration-300 ease-in-out group">
                                                            <span>
                                                                {moment(
                                                                    showTime.ngayChieuGioChieu
                                                                ).format(
                                                                    "DD/MM/YYYY"
                                                                )}
                                                            </span>
                                                            <span> - </span>
                                                            <span className="text-yellow-500 font-bold group-hover:text-gray-900">
                                                                {moment(
                                                                    showTime.ngayChieuGioChieu
                                                                ).format(
                                                                    "HH:mm"
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </div>
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </TabPane>
            );
        });
    };
    return (
        <div>
            <div className="">
                <h2 className="text-slate-200 text-3xl text-center font-bold">
                    Lịch Chiếu
                </h2>
                <div className="mt-10">
                    <Tabs centered>{renderShowTime()}</Tabs>
                </div>
            </div>
        </div>
    );
}
