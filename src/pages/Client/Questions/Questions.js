import React from "react";

export default function Questions() {
  const faqData = [
    {
      question: "Làm thế nào để đặt vé xem phim?",
      answer:
        "Bạn có thể đặt vé trực tuyến thông qua trang web của rạp chiếu phim, ứng dụng di động, hoặc đến trực tiếp quầy vé tại rạp.",
    },
    {
      question: "Làm thế nào để biết thông tin về các bộ phim đang chiếu?",
      answer:
        "Trang web của rạp chiếu phim thường cung cấp thông tin về các bộ phim đang chiếu, bản đánh giá, và trailers",
    },
    {
      question: "Làm thế nào để liên hệ với rạp chiếu phim?",
      answer:
        " Thông tin liên hệ của rạp chiếu phim thường được hiển thị trên trang web của họ. Bạn cũng có thể tìm kiếm trên các trang mạng xã hội hoặc gọi điện thoại đến đường dây nóng của rạp.",
    },
    {
      question:
        " Làm thế nào để tìm địa chỉ và thông tin chi tiết về rạp chiếu phim?",
      answer:
        "Bạn có thể tìm thấy địa chỉ và thông tin chi tiết về rạp chiếu phim trên trang web của tôi hoặc thông qua các dịch vụ bản đồ trực tuyến.",
    },
    {
      question: "Rạp chiếu phim có chỗ đậu xe thuận tiện không?",
      answer:
        "Thông tin về chỗ đậu xe thường được cung cấp trên trang web của rạp chiếu phim. Một số rạp cung cấp chỗ đậu xe miễn phí, trong khi các rạp khác có thể có các lựa chọn trả phí.",
    },

    // Thêm các câu hỏi khác cần thiết
  ];

  return (
    <>
      <div className="max-w-3xl mx-auto pt-40">
        <h2 className="text-5xl font-semibold mb-6 dark:text-white">
          Câu Hỏi Thường Gặp
        </h2>
        {faqData.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white rounded-full p-2 mr-4">
                {index + 1}
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-justify dark:text-white">
                  {item.question}
                </h3>
                <p className="text-2xl text-gray-600 text-justify">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
