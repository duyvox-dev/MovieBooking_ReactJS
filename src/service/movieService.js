import axios from "axios";
import { getRequestConfig } from "../utils/serverUtils";
import { localStoreService } from "./localStoreService";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const movieService = {
    getMovieList: () => {
        const config = getRequestConfig();
        return axios({
            method: "GET",
            url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhim`,
            ...config,
        });
    },

    getBannerList: () => {
        const config = getRequestConfig();

        return axios({
            method: "GET",
            url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachBanner`,
            ...config,
        });
    },

    getMovieDetailAndShowTime: (movieCode) => {
        const config = getRequestConfig();
        return axios({
            method: "GET",
            url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`,
            ...config,
        });
    },
    getShowTimeDetail: (showTimeCode) => {
        const config = getRequestConfig();
        return axios({
            method: "GET",
            url: `${BASE_URL}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeCode}`,
            ...config,
        });
    },
    bookMovieTicket: (data) => {
        const config = getRequestConfig(
            localStoreService.getUserLocal().accessToken
        );
        return axios({
            method: "POST",
            url: `${BASE_URL}/api/QuanLyDatVe/DatVe`,
            data,
            ...config,
        });
    },
};
