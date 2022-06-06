import { BASE_URL } from "./configURL";
import axios from "axios";
const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;
export const userService = {
    login: (dataLogin) => {
        return axios({
            method: "POST",
            url: `${BASE_URL}/api/QuanLyNguoiDung/DangNhap`,
            data: dataLogin,
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT,
            },
        });
    },
};
