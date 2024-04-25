import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrices = [];
  const coinTimestamps = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrices.push(coinHistory?.data?.history[i].price);
    // Format timestamp properly
    coinTimestamps.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrices,
        fill: false,
        backgroundColor: '#fff',
        borderColor: '#0071bd',
        borderWidth:2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          color: '#fff', 
        },
      },
      x: {
        ticks: {
          color: '#fff', 
        },
      },
    },
  };
  

  return (
    <div className='mx-8 py-16'>
      <Line data={data} options={options} />
      <p className="text-center font-normal text-gray-300 mt-4">
        Current {coinName} Price: $ {currentPrice}
      </p>
    </div>
  );
};

export default LineChart;
