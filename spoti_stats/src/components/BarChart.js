import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function BarChart({aggregatedData}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Amount of your artists in each popularity barckets",
          },
        },
      };
      
      const labels = ["100-91","90-81","80-71","70-61","60-51","50-41","40-31","30-21","20-11","10-0"];
      
      const data = {
        labels,
        datasets: [
          {
            label: "Amount",
            data: aggregatedData,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
  return <div><Bar options={options} data={data} /></div>;
}
