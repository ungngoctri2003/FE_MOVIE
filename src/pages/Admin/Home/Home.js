import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import * as XLSX from "xlsx/xlsx.mjs";
import { quanLyTicketServices } from "./../../../services/QuanLyTicketServices";

export default function Home() {
  const [state, setState] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [dataByDay, setDataByDay] = useState([]);

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

  useEffect(() => {
    fetchData(selectedYear);
    fetchDataByDay(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

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

  // Hàm xuất báo cáo doanh thu theo ngày trong tháng
  const exportExcelByDay = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      dataByDay.map((total, index) => ({
        Ngày: `Ngày ${index + 1}`,
        DoanhThu: total,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Báo cáo doanh thu Tháng ${selectedMonth}`
    );

    // Xuất file Excel
    XLSX.writeFile(
      workbook,
      `BaoCaoDoanhThu_Theo_Ngay_Thang_${selectedMonth}_${selectedYear}.xlsx`
    );
  };

  return (
    <div className="px-20">
      <h1 className="text-center text-5xl my-2">Doanh Thu Của Web</h1>
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

      {/* Biểu đồ doanh thu theo ngày trong tháng */}
      <div className="mt-10">
        <h4 className="text-center text-3xl">
          Doanh Thu Theo Ngày Trong Tháng {selectedMonth}
        </h4>
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

      {/* Các nút xuất báo cáo Excel */}
    </div>
  );
}
