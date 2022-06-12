import React from "react";

import { Form, Input, Button, Checkbox } from "antd";
export default function LoginForm({ handleLogin }) {
    const onFinish = (values) => {
        handleLogin(values);
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
