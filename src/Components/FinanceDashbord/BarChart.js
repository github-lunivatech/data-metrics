
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
import { Bar } from 'react-chartjs-2';

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
    title: {
      display: true,
      text: 'Paymet Report',
      position: 'bottom'
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

const BarChart = (props) => {
  const labels= props.labels
  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'paid',
        backgroundColor: ChartColor[2],
        data: props.data1,
        borderColor: [
          '#3bf3cb',

        ],
        borderWidth: 1,
      },
      {
        type: 'bar',
        label: 'unpid',
        backgroundColor: ChartColor[1],
        data: props.data2,
        borderColor: [
          '#3bf3cb',

        ],
        borderWidth: 1,
      },
      
    ],
  };

  const conffig ={
    type: 'bar'
  }


  return (
    <div>
      <Bar options={options} data={dataBar}/>
    </div>
  )
}

export default BarChart
