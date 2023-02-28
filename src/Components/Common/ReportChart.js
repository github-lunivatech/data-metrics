import React from 'react'
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
import { Doughnut, Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Tabs } from 'antd';

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

//export options here
export const options = {
  responsive: true,
  plugins: {
      legend: {
          position: 'top',
      },
  },
};
//export options here

const { TabPane } = Tabs;

const ReportChart = ({ dataBar, dataDo }) => {
  return (
    <ReportChartContainer>
      <Tabs span={24} type='card'>
        <TabPane span={24} tab="Bar Graph" key="1" className='tabs'>
          <Bar options={options} data={dataBar} />
        </TabPane>
        <TabPane tab="Doughnut Graph" key="2" className='tabs'>
          <Doughnut options={options} data={dataDo} />
        </TabPane>
        <TabPane tab="Both" key="3" className='tabs'>
          <Bar options={options} data={dataBar} />
          <Doughnut options={options} data={dataDo} />
        </TabPane>
      </Tabs>
    </ReportChartContainer>
  )
}

export default ReportChart

const ReportChartContainer = styled.div`
 background-color: #fefefe;
  padding: 10px;
  display: flex;
  align-items: start;
  width: 100%;
  .tabs{
    width: 800px;
    background-color: #fefefe;
    @media(max-width: 800px){
      width: 400px;
    }
    @media(max-width: 500px){
      width: 300px;
    }
  }
  
`