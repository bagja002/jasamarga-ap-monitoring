import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChartt = ({ data1, data2 }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null); // Menyimpan instance grafik
  
  useEffect(() => {
    // Fungsi untuk menginisialisasi atau memperbarui grafik
    const initChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Hancurkan grafik sebelum membuat yang baru
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Realisasi", "Belum Realisasi"],
          datasets: [
            {
              data: [data1, data2],
              backgroundColor: ["#002060", "#FFC000"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    };

    initChart(); // Panggil fungsi untuk menginisialisasi grafik saat komponen dimuat
    console.log("data 1 yaitu :", data1, "dan data 2 yaitu", data2)
    // Cleanup: Hancurkan grafik saat komponen dibongkar
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    
  }, [data1, data2]);


  return <canvas style={{ position: "relative", left: "50px" }} ref={chartRef} />;
};

export default DoughnutChartt;
