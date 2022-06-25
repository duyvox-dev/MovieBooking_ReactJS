import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useMatch, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Dropdown, Menu, message, Space } from "antd";
import { logout } from "../../redux/authReducer";
export default function UserNav() {
    const { userInfo, isLoggedIn } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();
    const onClickUserDropdown = ({ key }) => {
        if (key === "account") navigate("/account");
        else if (key === "logout") {
            dispatch(logout());
            navigate("/");
        }
    };

    const menu = (
        <Menu onClick={onClickUserDropdown}>
            <Menu.Item key="account">Account</Menu.Item>
            <Menu.Item key="logout">Đăng xuất</Menu.Item>
        </Menu>
    );
    return (
        <div>
            {isLoggedIn ? (
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className="flex gap-4 items-center">
                                <Avatar size="large" icon={<UserOutlined />} />
                                <span className="text-yellow-500 text-lg capitalize	">
                                    Hi, {userInfo.hoTen}
                                </span>
                            </div>
                        </Space>
                    </a>
                </Dropdown>
            ) : (
                <div className="flex gap-2">
                    <NavLink to="/login">
                        <button className="bg-yellow-500 hover:bg-yellow-400   rounded-md py-2 px-5 text-black text-lg font-semibold duration-300 ease-in-out">
                            Đăng Nhập / Đăng Ký
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
    );
}
