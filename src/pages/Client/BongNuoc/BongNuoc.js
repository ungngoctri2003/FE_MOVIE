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
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;

const PopcornDrinks = () => {
  const [combos, setCombos] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleQuantityChange = (quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: quantity,
    });
  };

  const handleAddToCart = (combo) => {
    setSelectedItem(combo);
    setModalVisible(true);
  };

  const handleSelectCombo = () => {
    if (selectedItem) {
      setSelectedItem(null);
      console.log("check selectedItem", selectedItem);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row  from-gray-50 to-gray-200  dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen transition-all duration-500">
      {/* Phần hiển thị sản phẩm */}

      <div className="flex-1 p-6 lg:w-7/12">
        <Title
          level={2}
          className="text-center mb-6 text-gray-800 dark:text-gray-100"
        >
          Chọn Combo Bỏng Nước
        </Title>
        <Divider className="border-gray-300 dark:border-gray-700" />
        <Row gutter={[24, 24]}>
          {combos.map((combo) => (
            <Col span={12} lg={8} key={combo.id}>
              <Card
                onClick={() => handleSelectCombo(combo)}
                hoverable
                cover={
                  <div className="w-full h-40 relative">
                    <img
                      alt={combo.name}
                      src={`${DOMAIN_STATIC_FILE}${combo.imageUrl}`}
                      className="w-full h-full object-cover object-center rounded-t-lg transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                }
                className="shadow-xl rounded-xl bg-white dark:bg-gray-800 transition-all duration-500 hover:shadow-2xl transform hover:translate-y-1"
              >
                {/* Nội dung của Card */}
                <Card.Meta
                  title={
                    <Text
                      strong
                      className="text-lg text-gray-800 dark:text-gray-100"
                    >
                      {}
                    </Text>
                  }
                  description={
                    <div className="flex flex-col">
                      <Text className="text-lg font-semibold text-primary-500 dark:text-gray-300">
                        Tên combo: {combo.name} $
                      </Text>
                      <Text className="text-lg font-semibold text-primary-500 dark:text-gray-300">
                        Giá: {combo.price} $
                      </Text>
                      <Text className="mt-2 text-gray-600 dark:text-gray-300">
                        {combo.description}
                      </Text>
                      <div className="flex items-center space-x-4 mt-4">
                        <InputNumber
                          min={0}
                          defaultValue={0}
                          onChange={(value) =>
                            handleQuantityChange(combo.id, value)
                          }
                          className="w-24 rounded-lg border-gray-300 dark:border-gray-600 focus:border-primary-500"
                        />
                        <Button
                          type="primary"
                          onClick={() => handleAddToCart(combo)}
                          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg px-4 py-2 transition-colors duration-300"
                        >
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PopcornDrinks;
