import React from "react";
import { NavLink } from "react-router-dom";
import { Form } from "antd";
const inputStyle =
    "w-full py-2 px-5 rounded-md outline-none text-yellow-500 text-lg bg-zinc-800 placeholder:text-yellow-600";
export default function LoginForm({ handleLogin }) {
    const onFinish = (values) => {
        handleLogin(values);
    };

    const onFinishFailed = (errorInfo) => {};

    return (
        <div>
            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="taikhoan"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tài khoản!",
                        },
                    ]}
                >
                    <input
                        type="text"
                        className={inputStyle}
                        placeholder="Tài Khoản"
                    />
                </Form.Item>

                <Form.Item
                    name="matkhau"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                        },
                    ]}
                >
                    {/* <Input.Password placeholder="Mật khẩu" /> */}
                    <input
                        type="password"
                        className={inputStyle}
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-400   rounded-md py-2 px-5 text-black text-lg font-semibold duration-300 ease-in-out"
                        size="large"
                        type="primary"
                    >
                        Đăng Nhập
                    </button>
                </Form.Item>
            </Form>
            <h2 className="text-white text-xl text-right">
                <span>Chưa có tài khoản?</span>
                <NavLink to="/register">
                    <span className="ml-2 text-yellow-500">Đăng Ký Ngay</span>
                </NavLink>
            </h2>
        </div>
    );
}
