import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  InputNumber,
  Row,
  Col,
  Typography,
  Divider,
  Modal,
  notification,
} from "antd";
import { quanLyBongNuocServices } from "../../../services/QuanLyBongNuocService";
import { DOMAIN_STATIC_FILE } from "../../../utils/Settings/config";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCart,
} from "../../../redux/Actions/QuanLyBongNuocAction";
import { formatPrice } from "../../../utils/formatPrice";

const { Title, Text } = Typography;

const PopcornDrinks = () => {
  const [combos, setCombos] = useState([]);
  const listcombos = combos?.filter((item) => item.isActive === true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantities, setQuantities] = useState({});
  const cart = useSelector((state) => state.QuanLyBongNuocReducer.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await quanLyBongNuocServices.layDanhSachCombo("");
        setCombos(response.data);
      } catch (error) {
        console.error("Error fetching combos:", error);
      }
    };

    fetchCombos();
  }, []);

  const handleQuantityChange = (comboId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [comboId]: quantity,
    }));
  };

  const handleAddToCart = (combo, quantity) => {
    if (quantity > 0) {
      const currentQuantity = quantity;

      const existingCartItem = cart.find((item) => item.id === combo.id);

      if (existingCartItem) {
        const updatedCart = cart.map((item) =>
          item.id === combo.id
            ? { ...item, quantity: item.quantity + currentQuantity }
            : item
        );
        dispatch(updateCart(updatedCart));
      } else {
        const cartItem = {
          id: combo.id,
          name: combo.name,
          price: combo.price,
          quantity: currentQuantity,
        };
        dispatch(addToCart(cartItem));
      }

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [combo.id]: 0,
      }));

      setSelectedItem({ ...combo, quantity: currentQuantity });
      setModalVisible(true);
    } else {
      notification.error({
        message: "Vui lòng chọn số lượng hợp lệ!",
      });
    }
  };

  const resetQuantities = () => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      for (const key in newQuantities) {
        newQuantities[key] = 0;
      }
      return newQuantities;
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    resetQuantities(); // Reset quantities khi đóng modal
  };

  return (
    <div className="flex flex-col lg:flex-row from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen transition-all duration-500">
      <div className="flex-1 p-6 lg:w-7/12">
        <Title
          level={2}
          className="text-center mb-6 text-gray-800 dark:text-gray-100"
        >
          Chọn Combo Bỏng Nước
        </Title>
        <Divider className="border-gray-300 dark:border-gray-700" />
        <Row gutter={[24, 24]}>
          {listcombos.map((combo) => (
            <Col span={12} lg={8} key={combo.id}>
              <Card
                hoverable
                className="h-full shadow-xl rounded-xl bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-2xl transform hover:translate-y-1"
              >
                <div className="w-full h-40 relative">
                  <img
                    alt={combo.name}
                    src={`${DOMAIN_STATIC_FILE}${combo.imageUrl}`}
                    className="w-full h-full object-cover object-center rounded-t-lg transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-between h-full p-4">
                  <Card.Meta
                    title={
                      <Text
                        strong
                        className="text-lg text-gray-800 dark:text-gray-100"
                      >
                        {combo.name}
                      </Text>
                    }
                    description={
                      <div className="flex flex-col">
                        <Text className="text-lg font-semibold text-primary-500 dark:text-gray-300">
                          Giá: {formatPrice(combo.price)}
                        </Text>
                        <Text className="mt-2 text-gray-600 dark:text-gray-300">
                          {combo.description}
                        </Text>
                        <div className="flex items-center space-x-4 mt-4">
                          <InputNumber
                            min={0}
                            value={quantities[combo.id] || 0}
                            onChange={(value) =>
                              handleQuantityChange(combo.id, value)
                            }
                            className="w-auto rounded-lg border-gray-300 dark:border-gray-600 focus:border-primary-500"
                          />
                          <Button
                            type="primary"
                            onClick={() =>
                              handleAddToCart(combo, quantities[combo.id] || 0)
                            }
                            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg  py-2 transition-colors duration-300"
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          title="Sản phẩm đã được thêm vào giỏ hàng"
          visible={modalVisible}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Hủy
            </Button>,
            <Button key="ok" type="primary" onClick={handleModalClose}>
              OK
            </Button>,
          ]}
        >
          {selectedItem && (
            <div className="flex flex-col items-center">
              <img
                alt={selectedItem.name}
                src={`${DOMAIN_STATIC_FILE}${selectedItem.imageUrl}`}
                className="w-32 h-32 object-cover object-center mb-4 rounded-lg"
              />
              <Text strong className="text-lg text-gray-800 dark:text-gray-500">
                {selectedItem.name}
              </Text>
              <Text className="text-lg font-semibold text-primary-500 dark:text-gray-500">
                Giá: {formatPrice(selectedItem.price)}
              </Text>
              <Text className="text-md text-gray-600 dark:text-gray-500">
                Số lượng: {selectedItem.quantity}
              </Text>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PopcornDrinks;
