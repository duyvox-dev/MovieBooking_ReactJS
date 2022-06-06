import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, message } from "antd";
import { userService } from "../../../service/userSerivce";
import { localStoreService } from "../../../service/localStoreService";
export default function SignUpForm() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

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
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mật Khẩu"
                name="matkhau"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Nhập lại Mật Khẩu"
                name="confirmMatkhau"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Họ tên"
                name="hoTen"
                rules={[
                    {
                        required: true,
                        message: "Please input your name",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
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
