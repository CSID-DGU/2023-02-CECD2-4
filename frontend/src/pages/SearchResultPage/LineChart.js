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

const LineChart = ({chart_data}) => {
    return (
        <LineChartContainer>
            <Line options={options} data={chart_data}/>
        </LineChartContainer>
    );
};

export default LineChart;