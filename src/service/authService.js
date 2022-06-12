import axios from "axios";
import { getRequestConfig } from "../utils/serverUtils";
import { localStoreService } from "./localStoreService";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const authService = {
    login: (dataLogin) => {
        const config = getRequestConfig();
        return axios({
            method: "POST",
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
            data: dataLogin,
            ...config,
        });
    },
    register: (dataRegister) => {
        const config = getRequestConfig();
        return axios({
            method: "POST",
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangKy`,
            data: dataRegister,
            ...config,
        });
    },
    logout: () => {
        localStoreService.removeUserLocal();
    },
};
