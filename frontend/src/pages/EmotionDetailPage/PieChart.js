import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
position:relative;
width:45%;
height:80%;
min-width: 360px;
`;

export const options = {
  responsive: true,
  plugins: {
      legend: {
          position: 'top',
      },
      title: {
          display: true,
          text: '세부 감정 분포 그래프',
      },
  },
};

export const data = {
  labels: ['행복', '놀람', '중립', '혐오', '공포', '슬픔', '분노'],
  datasets: [
    {
      label: '세부 감정 개수',
      data: [12, 19, 3, 5, 2, 3, 25],
      backgroundColor: [
        'rgba(255, 165, 0, 0.2)',
        'rgba(153, 204, 255, 0.2)',
        'rgba(162, 162, 162, 0.2)',
        'rgba(102, 153, 0, 0.2)',
        'rgba(102, 51, 51, 0.4)',
        'rgba(0, 51, 204, 0.2)',
        'rgba(255, 0, 51, 0.2)',
      ],
      borderColor: [
        'rgba(255, 165, 0, 1)',
        'rgba(153, 204, 255, 1)',
        'rgba(162, 162, 162, 1)',
        'rgba(102, 153, 0, 1)',
        'rgba(102, 51, 51, 1)',
        'rgba(0, 51, 204, 1)',
        'rgba(255, 0, 51, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = (props) => {
    return (
        <PieChartContainer>
            <Pie options={options} data={data}/>
        </PieChartContainer>
    );
};

export default PieChart;