import React from "react";

import { Form, Input, Button } from "antd";
export default function RegisterForm({ handleRegister }) {
    const onFinish = (values) => {
        handleRegister(values);
    };

    const onFinishFailed = (errorInfo) => {};

    return (
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
                label="Tài Khoản"
                name="taikhoan"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập username!",
                    },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mật Khẩu"
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
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Nhập lại Mật Khẩu"
                name="confirmMatkhau"
                dependencies={["matkhau"]}
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("matkhau") === value) {
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
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Họ tên"
                name="hoTen"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập họ tên",
                    },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="soDt"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                    },
                    {
                        pattern:
                            "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
                        message: "Vui lòng nhập đúng định dạng sô điện thoại",
                    },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
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
                <Input />
            </Form.Item>
            <Form.Item>
                <Button
                    className="rounded px-7 py-2 bg-sky-500 text-white"
                    htmlType="submit"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
