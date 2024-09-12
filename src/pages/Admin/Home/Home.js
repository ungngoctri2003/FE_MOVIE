import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { DatePicker, Table, Statistic, Row, Col } from "antd";
import moment from "moment";
import * as XLSX from "xlsx/xlsx.mjs";
import { quanLyTicketServices } from "./../../../services/QuanLyTicketServices";
import { formatPrice } from "../../../utils/formatPrice";

export default function HomeTicketsSold() {
  const [ticketsSold, setTicketsSold] = useState([]);
  console.log("check", ticketsSold);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [state, setState] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [dataByDay, setDataByDay] = useState([]);

  // Fetch data for monthly revenue
  const fetchData = async (year) => {
    try {
      const result = await quanLyTicketServices.toTal(year);
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

  // Fetch data for daily revenue
  const fetchDataByDay = async (year, month) => {
    try {
      const result = await quanLyTicketServices.toTalByDay(year, month);
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

  // Fetch ticket data for a specific date
  const fetchTicketsSold = async (date) => {
    const year = date.year();
    const month = date.month() + 1; // Months start from 0
    const day = date.date();
    try {
      const result = await quanLyTicketServices.layTicketTheoNgay(
        year,
        month,
        day
      );
      if (result.status === 200) {
        console.log("API Response:", result.data);
        setTicketsSold(result.data.combos);
        setTotalAmount(result.data.totalAmount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Người Mua",
      dataIndex: "userName",
      key: "userName",
      width: "15%",
    },
    {
      title: "Tên Phim",
      dataIndex: "nameFilm",
      key: "nameFilm",
      width: "15%",
    },
    {
      title: "Tên Ghế",
      dataIndex: "seatNames",
      key: "seatNames",
      width: "15%",
    },
    {
      title: "Show chiếu",
      dataIndex: "showDate",
      key: "showDate",
      render: (text) => {
        return <p>{moment(text).format("DD/MM/YYYY hh:mm A")}</p>;
      },
      width: "16%",
    },
    {
      title: "Rạp",
      dataIndex: "cinemaName",
      key: "cinemaName",
      width: "15%",
    },
    {
      title: "Phòng",
      dataIndex: "roomName",
      key: "roomName",
      width: "15%",
    },
    {
      title: "Giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => formatPrice(text), // Giả sử bạn có hàm formatPrice để định dạng giá
      width: "15%",
    },
  ];

  useEffect(() => {
    fetchData(selectedYear);
    fetchDataByDay(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchTicketsSold(selectedDate); // Fetch tickets on component mount
  }, [selectedDate]);

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

  // Export monthly revenue report
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

    // Export Excel file
    XLSX.writeFile(workbook, `BaoCaoDoanhThu_Theo_Thang_${selectedYear}.xlsx`);
  };

  // Export daily revenue report
  const exportExcelByDay = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      ticketsSold.map((ticket) => ({
        "Người Mua": ticket.userName,
        "Tên Phim": ticket.nameFilm,
        Ghế: ticket.seatNames,
        Rạp: ticket.cinemaName,
        Phòng: ticket.roomName,
        Giá: formatPrice(ticket.price),
        "Ngày Tạo": moment(ticket.createdAt).format("DD/MM/YYYY HH:mm"),
      }))
    );

    const workbook = XLSX.utils.book_new();
    const sheetName = `DoanhThu_${moment(selectedDate).format("DDMMYYYY")}`;
    const sanitizedSheetName = sheetName.replace(/[\\/:*?[|\]]/g, "_");
    XLSX.utils.book_append_sheet(workbook, worksheet, sanitizedSheetName);

    // Export Excel file
    XLSX.writeFile(
      workbook,
      `BaoCaoDoanhThu_${moment(selectedDate).format("DD_MM_YYYY")}.xlsx`
    );
  };

  return (
    <div className="px-10">
      <div>
        <h1 className="text-center text-4xl my-2">Vé Đã Bán Theo Ngày</h1>

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

      <div className="mt-10">
        <h4 className="text-center text-4xl">
          Doanh Thu Trong Tháng {selectedMonth}
        </h4>
        <div className="my-5 text-center">
          <label htmlFor="month" className="mr-2 ml-4 ">
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
        {/* Biểu đồ doanh thu theo ngày */}
        <Line
          data={{
            labels: dataByDay.map((_, index) => `Ngày ${index + 1}`),
            datasets: [
              {
                label: "Doanh Thu Theo Ngày",
                data: dataByDay,
                fill: false,
                backgroundColor: "#742774",
                borderColor: "#742774",
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <h1 className="text-center text-4xl my-2">
        Doanh Thu Bán Vé Của Web Theo Năm
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
              label: "Doanh Thu Theo Tháng",
              data: state,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
