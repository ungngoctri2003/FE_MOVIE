import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { feedbackServices } from "../../../services/FeedbackService";

export default function FeedbackForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await feedbackServices.createFeedback(values);
      message.success("Cảm ơn bạn đã gửi phản hồi!");
      form.resetFields(); // Reset form sau khi gửi thành công
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
      message.error("Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Gửi Phản Hồi Của Bạn
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: "",
            email: "",
            cumRap: "",
            rapChieu: "",
            message: "",
          }}
        >
          <Form.Item
            label={<span className="dark:text-white">Tên của bạn</span>}
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
            className="dark:text-gray-300"
          >
            <Input
              placeholder="Nhập tên của bạn"
              size="large"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            label={<span className="dark:text-white">Email của bạn</span>}
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
            className="dark:text-gray-300"
          >
            <Input
              placeholder="Nhập email của bạn"
              size="large"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="dark:text-white">Cụm rạp bạn muốn phản ánh</span>
            }
            name="cumRap"
            rules={[{ required: true, message: "Vui lòng nhập cụm rạp" }]}
            className="dark:text-gray-300"
          >
            <Input
              placeholder="Nhập cụm rạp"
              size="large"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="dark:text-white">
                Rạp chiếu bạn muốn phản ánh
              </span>
            }
            name="rapChieu"
            rules={[{ required: true, message: "Vui lòng nhập rạp chiếu" }]}
            className="dark:text-gray-300"
          >
            <Input
              placeholder="Nhập rạp chiếu"
              size="large"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="dark:text-white">Nội dung phản hồi của bạn</span>
            }
            name="message"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung phản hồi" },
            ]}
            className="dark:text-gray-300"
          >
            <Input.TextArea
              placeholder="Nhập nội dung phản hồi"
              rows={4}
              size="large"
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full dark:bg-blue-600 dark:border-blue-600"
            >
              Gửi Phản Hồi
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
