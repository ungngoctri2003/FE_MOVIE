import { baseServices } from "./baseServices";

export class FeedbackServices extends baseServices {
  constructor() {
    super();
  }

  // API để nhận phản hồi từ khách hàng
  createFeedback = (data) => {
    return this.post("/feedback", data);
  };

  // API để lấy danh sách phản hồi
  // getFeedbacks = () => {
  //   return this.get("/feedback");
  // };

  // API để lấy danh sách phản hồi
  getFeedbacks = (data) => {
    return this.post("/feedback/date-range", data); // Chuyển sang sử dụng POST với body
  };

  // API để xuất báo cáo phản hồi
  exportFeedbackReport = (data) => {
    return this.post("/feedback/export", data, { responseType: "blob" }); // Sử dụng POST và yêu cầu file nhị phân
  };
  // API để gửi phản hồi lại cho khách hàng
  replyFeedback = (data) => {
    return this.post("/feedback/reply", data);
  };
  deleteFeedback(id) {
    return this.delete(`/feedback/${id}`);
  }
}

export const feedbackServices = new FeedbackServices();
