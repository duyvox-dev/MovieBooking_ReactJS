import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space } from "antd";
import { logout } from "../../redux/authReducer";
export default function UserNav() {
    const { userInfo, isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOpenUserMenu = () => {};
    const handleLoginBtnClick = () => {};
    const handleRegisterBtnCLick = () => {};
    const onClickUserDropdown = ({ key }) => {
        if (key === "account") navigate("/account");
        else if (key === "logout") dispatch(logout());
    };
    const menu = (
        <Menu
            onClick={onClickUserDropdown}
            items={[
                {
                    label: "Tài Khoản",
                    key: "account",
                },
                {
                    label: "Đăng Xuất",
                    key: "logout",
                },
            ]}
        />
    );
    return (
        <div>
            {isLoggedIn ? (
                <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className="flex gap-2 items-center">
                                <Avatar size="large" icon={<UserOutlined />} />
                                <span>{userInfo.hoTen}</span>
                            </div>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            ) : (
                <div className="flex gap-2">
                    <NavLink to="/login">
                        <button
                            className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 px-5 text-white "
                            onClick={handleLoginBtnClick}
                        >
                            Đăng Nhập
                        </button>
                    </NavLink>
                    <NavLink to="/register">
                        <button
                            className="bg-white border-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 px-5 text-sky-500 hover:text-white"
                            onClick={handleRegisterBtnCLick}
                        >
                            Đăng Ký
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    );
}
