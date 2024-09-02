import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, message, Spin, DatePicker } from "antd";
import { feedbackServices } from "../../../services/FeedbackService";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    fetchFeedbacks(); // Lấy dữ liệu ban đầu
  }, []);

  const fetchFeedbacks = async (dates) => {
    setLoading(true);
    try {
      const data = {};
      if (dates && dates[0] && dates[1]) {
        data.startDate = dates[0].format("YYYY-MM-DD");
        data.endDate = dates[1].format("YYYY-MM-DD");
      }
      const response = await feedbackServices.getFeedbacks(data); // Sử dụng body thay vì query
      setFeedbacks(response?.data?.feedbacks || []);
    } catch (error) {
      console.error("Lỗi khi lấy phản hồi:", error);
      message.error("Lỗi khi lấy phản hồi");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchFeedbacks(dateRange);
  };

  const handleReply = async () => {
    if (!selectedFeedback || !reply.trim()) return;

    setSending(true);
    try {
      await feedbackServices.replyFeedback({
        id: selectedFeedback.id,
        email: selectedFeedback.email,
        replyMessage: reply,
      });
      message.success("Tin nhắn đã được gửi thành công");
      setReply("");
      setIsModalVisible(false);
      fetchFeedbacks(); // Làm mới danh sách sau khi phản hồi
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
      message.error("Lỗi khi gửi phản hồi");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await feedbackServices.deleteFeedback(id);
      message.success("Đã xóa phản hồi thành công");
      fetchFeedbacks(); // Làm mới lại danh sách phản hồi sau khi xóa
    } catch (error) {
      console.error("Lỗi khi xóa phản hồi:", error);
      message.error("Lỗi khi xóa phản hồi");
    } finally {
      setLoading(false);
    }
  };

  const showReplyModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setReply("");
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Cụm rạp",
      dataIndex: "cumRap",
      key: "cumRap",
    },
    {
      title: "Rạp chiếu",
      dataIndex: "rapChieu",
      key: "rapChieu",
    },
    {
      title: "Ngày nhận",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "message",
      render: (text) => (
        <div
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            maxWidth: "400px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => showReplyModal(record)}>
            Phản hồi
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 16, marginTop: 6 }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "20px",
          fontSize: "25px",
        }}
      >
        DANH SÁCH PHẢN HỒI
      </h3>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(dates) => setDateRange(dates)}
        />

        <Button
          type="primary"
          onClick={handleSearch}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          Tìm kiếm
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table columns={columns} dataSource={feedbacks} rowKey="id" />
      </Spin>

      <Modal
        title="Phản hồi khách hàng"
        visible={isModalVisible}
        onOk={handleReply}
        onCancel={handleCancel}
        okText={sending ? <Spin /> : "Gửi"}
        cancelText="Hủy"
        okButtonProps={{ disabled: sending }}
      >
        <p>
          <strong>Tên:</strong> {selectedFeedback?.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedFeedback?.email}
        </p>
        <p>
          <strong>Cụm rạp:</strong> {selectedFeedback?.cumRap}
        </p>
        <p>
          <strong>Rạp chiếu:</strong> {selectedFeedback?.rapChieu}
        </p>
        <p>
          <strong>Ngày nhận:</strong> {selectedFeedback?.createdAt}
        </p>
        <p>
          <strong>Nội dung:</strong> {selectedFeedback?.message}
        </p>
        <Input.TextArea
          placeholder="Nhập phản hồi của bạn"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
        />
      </Modal>
    </div>
  );
}
