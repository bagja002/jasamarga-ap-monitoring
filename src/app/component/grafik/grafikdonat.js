import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChartt = ({ data1, data2 , selectValue }) => {
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
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += `${parseFloat(context.parsed).toFixed(2)}%`;
                  }
                  return label;
                }
              }
            }
          }
        }
        
      });
    };

    initChart(); // Panggil fungsi untuk menginisialisasi grafik saat komponen dimuat
   
    // Cleanup: Hancurkan grafik saat komponen dibongkar
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    
  }, [data1, data2, selectValue]);


  return <canvas style={{ position: "relative", left: "50px" }} ref={chartRef} />;
};

export default DoughnutChartt;
