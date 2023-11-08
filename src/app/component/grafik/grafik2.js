import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Komitmen", "Realisasi"],
        datasets: [
          {
            data: [30, 70],
            backgroundColor: ["#002060", "#FFC000"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }, []);

  return <canvas style={{position:"relative", left:"50px"}} ref={chartRef} />;
};

export default DoughnutChart;
