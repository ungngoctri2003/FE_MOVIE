import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { DatePicker, Table, Statistic, Row, Col } from "antd";
import moment from "moment";
import * as XLSX from "xlsx/xlsx.mjs";
import { quanLyComboServices } from "./../../../services/QuanLyComboService";
import { formatPrice } from "../../../utils/formatPrice";

export default function HomeCombo() {
  const [ticketsSold, setTicketsSold] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [state, setState] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [dataByDay, setDataByDay] = useState([]);

  const fetchData = async (year) => {
    try {
      const result = await quanLyComboServices.toTalComboTheoThang(year);
      if (result.status === 200) {
        let arr = [];
        result.data.forEach((element) => {
          arr = [...arr, element.total];
        });
        setState(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataByDay = async (year, month) => {
    try {
      const result = await quanLyComboServices.toTalComboTheoNgay(year, month);
      if (result.status === 200) {
        let arr = [];
        result.data.forEach((element) => {
          arr = [...arr, element.total];
        });
        setDataByDay(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm fetch dữ liệu vé bán từ API
  const fetchTicketsSold = async (date) => {
    const year = date.year();
    const month = date.month() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const day = date.date();
    try {
      const result = await quanLyComboServices.layComboTheoNgay(
        year,
        month,
        day
      );
      if (result.status === 200) {
        setTicketsSold(result.data.combos);
        setTotalAmount(result.data.totalAmount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Mã Combo",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      title: "Tên Combo",
      dataIndex: "comboName",
      key: "comboName",
      width: "15%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => formatPrice(text),
      width: "15%",
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
    },
    {
      title: "Tên phim",
      dataIndex: "nameFilm",
      key: "nameFilm",
      width: "15%",
    },
    {
      title: "Người mua",
      dataIndex: "userName",
      key: "userName",
      width: "15%",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm"),
      width: "16%",
    },
  ];
  useEffect(() => {
    fetchData(selectedYear);
    fetchDataByDay(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);
  useEffect(() => {
    fetchTicketsSold(selectedDate); // Gọi API khi component được render lần đầu
  }, []);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchTicketsSold(date);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Hàm xuất báo cáo doanh thu theo tháng
  const exportExcelByMonth = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      state.map((total, index) => ({
        Tháng: `Tháng ${index + 1}`,
        DoanhThu: total,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Báo cáo doanh thu theo tháng"
    );

    // Xuất file Excel
    XLSX.writeFile(workbook, `BaoCaoDoanhThu_Theo_Thang_${selectedYear}.xlsx`);
  };

  // Hàm xuất báo cáo doanh thu theo ngày
  const exportExcelByDay = () => {
    console.log("ticketsSold:  ", ticketsSold);
    // Tạo worksheet từ dữ liệu doanh thu theo ngày
    const worksheet = XLSX.utils.json_to_sheet(
      ticketsSold.map((combo) => ({
        "Mã Combo": combo.id,
        "Tên Combo": combo.comboName,
        Giá: formatPrice(combo.price),
        "Số Lượng": combo.quantity,
        "Tên phim": combo.movieTitle, // Đảm bảo rằng `movieTitle` có trong dữ liệu
        "Người mua": combo.userName,
        "Ngày Tạo": moment(combo.createdAt).format("DD/MM/YYYY HH:mm"),
      }))
    );

    // Tạo workbook và thêm worksheet
    const workbook = XLSX.utils.book_new();

    // Tên sheet ngắn gọn và không chứa ký tự không hợp lệ
    const sheetName = `DoanhThu_${moment(selectedDate).format("DDMMYYYY")}`;

    // Thay thế ký tự không hợp lệ trong tên sheet
    const sanitizedSheetName = sheetName.replace(/[\\/:*?[|\]]/g, "_");

    XLSX.utils.book_append_sheet(workbook, worksheet, sanitizedSheetName);

    // Xuất file Excel
    XLSX.writeFile(
      workbook,
      `BaoCaoDoanhThu_${moment(selectedDate).format("DD_MM_YYYY")}.xlsx`
    );
  };

  return (
    <div className="px-10">
      <div className="">
        <h1 className="text-center text-4xl my-2">Combo Đã Bán Theo Ngày</h1>

        <Row className="mb-4" justify="center">
          <Col>
            <DatePicker
              defaultValue={selectedDate}
              onChange={handleDateChange}
              format="DD/MM/YYYY"
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded ml-4 mb-2"
              onClick={exportExcelByDay}
            >
              Xuất báo cáo ngày
            </button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={ticketsSold}
          rowKey="id"
          pagination={false}
        />

        <Row className="mt-4" justify="center">
          <Col>
            <Statistic
              title="Tổng Tiền Đã Bán"
              value={totalAmount}
              suffix="VND"
            />
          </Col>
        </Row>
      </div>

      {/* Biểu đồ doanh thu theo ngày trong tháng */}

      <div className="mt-10">
        <h4 className="text-center text-4xl">
          Doanh Thu Trong Tháng {selectedMonth}
        </h4>
        <div className="my-5 text-center">
          <label htmlFor="month" className="mr-2 ml-4">
            Chọn Tháng:
          </label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                Tháng {month}
              </option>
            ))}
          </select>
        </div>
        <Line
          data={{
            labels: Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`),
            datasets: [
              {
                label: "Số tiền kiếm được ($)",
                borderColor: "#3e95cd",
                backgroundColor: "rgba(62, 149, 205, 0.2)",
                data: dataByDay,
                fill: true,
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: {
              display: true,
              text: `Doanh Thu Trong Tháng ${selectedMonth}, ${selectedYear}`,
            },
          }}
        />
      </div>
      <h1 className="text-center text-4xl my-2">
        Doanh Thu Bán Combo Của Web Theo Năm
      </h1>
      <div className="text-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2 mb-2"
          onClick={exportExcelByMonth}
        >
          Xuất báo cáo tháng
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={exportExcelByDay}
        >
          Xuất báo cáo ngày trong tháng
        </button>
      </div>
      <h3 className="text-center text-2xl"></h3>
      <div className="flex justify-center mb-4">
        <label htmlFor="year" className="mr-2">
          Chọn Năm:
        </label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Biểu đồ doanh thu theo tháng */}
      <Bar
        data={{
          labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          datasets: [
            {
              label: "Số tiền kiếm được ($)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#ffee58",
                "#f4511e",
                "#78909c",
                "#00e676",
                "#880e4f",
                "#006064",
                "#f50057",
              ],
              data: state,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: `Số tiền kiếm được trong năm ${selectedYear}`,
          },
        }}
      />
      {/* Các nút xuất báo cáo Excel */}
    </div>
  );
}
