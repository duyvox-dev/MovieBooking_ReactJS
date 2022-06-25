import React from "react";

import { NavLink } from "react-router-dom";
import { Form } from "antd";
const inputStyle =
    "w-full py-2 px-5 rounded-md outline-none text-yellow-500 text-lg bg-zinc-800 placeholder:text-yellow-600";
const labelStyle = "text-yellow-500 text-md";
export default function RegisterForm({ handleRegister }) {
    const onFinish = (values) => {
        handleRegister(values);
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
                    label={<span className={labelStyle}>Tài Khoản</span>}
                    name="taikhoan"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập username!",
                        },
                    ]}
                    hasFeedback
                >
                    <input type="text" className={inputStyle} />
                </Form.Item>

                <Form.Item
                    label={<span className={labelStyle}>Mật khẩu</span>}
                    name="matkhau"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                        },
                        {
                            pattern:
                                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$",
                            message:
                                "Độ dài ít nhất là 8, bao gồm số, chữ thường, chữ IN HOA, ký tự",
                        },
                    ]}
                >
                    <input type="password" className={inputStyle} />
                </Form.Item>
                <Form.Item
                    label={
                        <span className={labelStyle}>Nhập lại mật khẩu</span>
                    }
                    name="confirmMatkhau"
                    dependencies={["matkhau"]}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("matkhau") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu không trùng khớp!")
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <input type="password" className={inputStyle} />
                </Form.Item>
                <Form.Item
                    label={<span className={labelStyle}>Họ tên</span>}
                    name="hoTen"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập họ tên",
                        },
                    ]}
                    hasFeedback
                >
                    <input type="text" className={inputStyle} />
                </Form.Item>
                <Form.Item
                    label={<span className={labelStyle}>Số điện thoại</span>}
                    name="soDt"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                        },
                        {
                            pattern:
                                "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
                            message:
                                "Vui lòng nhập đúng định dạng sô điện thoại",
                        },
                    ]}
                    hasFeedback
                >
                    <input type="text" className={inputStyle} />
                </Form.Item>
                <Form.Item
                    label={<span className={labelStyle}>Email</span>}
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message:
                                "Vui lòng nhập đúng định dạng email: ví dụ(email@email.domain)!",
                        },
                        {
                            required: true,
                            message: "Vui lòng nhập email!",
                        },
                    ]}
                    hasFeedback
                >
                    <input type="email" className={inputStyle} />
                </Form.Item>
                <Form.Item>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-400   rounded-md py-2 px-5 text-black text-lg font-semibold duration-300 ease-in-out"
                        size="large"
                        type="primary"
                    >
                        Đăng Ký
                    </button>
                </Form.Item>
            </Form>
            <h2 className="text-white text-xl text-right">
                <span>Đã có tài khoản ?</span>
                <NavLink to="/login">
                    <span className="ml-2 text-yellow-500">Đăng Nhập Ngay</span>
                </NavLink>
            </h2>
        </div>
    );
}
