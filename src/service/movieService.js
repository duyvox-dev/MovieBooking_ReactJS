import axios from "axios";
import { getRequestConfig } from "../utils/serverUtils";

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
    getMovieListByPage: (pageNumber) => {
        const config = getRequestConfig();
        const formData = new FormData();
        formData.append("soTrang", pageNumber);
        return axios({
            method: "GET",
            url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhimPhanTrang`,
            formData,
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
    getMovieDetail: (movieCode) => {
        const config = getRequestConfig();

        const formData = new FormData();
        formData.append("MaPhim", movieCode);
        return axios.get({
            url: `${BASE_URL}/
            /api/QuanLyPhim/LayThongTinPhim`,
            formData,
            ...config,
        });
    },
};
