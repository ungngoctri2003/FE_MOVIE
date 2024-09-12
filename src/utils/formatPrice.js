export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
};
export const formatDiem = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price) + " ĐIỂM";
};
