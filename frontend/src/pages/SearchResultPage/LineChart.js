import React, {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled  from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartContainer = styled.div`
position:relative;
width:45%;
height:85%;
min-width: 360px;
`;

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        axis: 'y',
        afterDataLimits: (scale) => {
          scale.max = scale.max * 1.2;
        }
      }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '긍정/중립/부정 변화 그래프',
        },
    },
};

/*const labels = ['2023.10.01', '2023.10.02', '2023.10.03', '2023.10.04', '2023.10.05', '2023.10.06', '2023.10.07'];
export const data = {
  labels,
  datasets: [
    {
      label: '긍정',
      data: [3, 10 , 7, 12, 15, 9, 8],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '중립',
      data: [17, 25 , 21, 23, 14, 16, 12],
      borderColor: 'rgb(162, 162, 162)',
      backgroundColor: 'rgba(162, 162, 162, 0.5)',
    },
    {
      label: '부정',
      data: [80, 65 , 72, 65, 71, 75, 80],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};*/

const LineChart = ({chart_data}) => {
    return (
        <LineChartContainer>
            <Line options={options} data={chart_data}/>
        </LineChartContainer>
    );
};

export default LineChart;