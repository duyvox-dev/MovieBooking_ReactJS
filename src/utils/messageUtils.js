import { message } from "antd";
export const showMessage = (messageData) => {
    const { type, info } = messageData;
    if (type === "success") {
        message.success(info);
    } else if (type === "error") {
        message.error(info);
    }
};
