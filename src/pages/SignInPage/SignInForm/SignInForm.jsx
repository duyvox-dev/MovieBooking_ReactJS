import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Checkbox, message } from "antd";
import { userService } from "../../../service/userSerivce";
import { localStoreService } from "../../../service/localStoreService";
export default function SignInForm() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log("Success:", values);
        userService
            .login(values)
            .then((res) => {
                message.success("Login successfully");
                localStoreService.setUserLocal(res.data.content);
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 2000);
            })
            .catch((err) => {
                message.error("Login fail");
            });
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
