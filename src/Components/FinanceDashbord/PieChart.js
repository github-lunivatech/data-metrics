
import React from 'react'
import { ChartColor } from '../Common/ChartColor'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement,
  Title
} from 'chart.js';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Title
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const PieChart = (props) => {
  const labels= props.labels
  const dataPie = {
    labels,
    datasets: [
      {
        type: 'pie',
        label: 'financeData',
        backgroundColor: ChartColor,
        data: props.data,
        borderColor: [
          'rgba(255, 255, 132, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='financeCards' >
      <h3>Paymet Report</h3>
      <Pie options={options} data={dataPie}/>
    </div>
  )
}

export default PieChart 
