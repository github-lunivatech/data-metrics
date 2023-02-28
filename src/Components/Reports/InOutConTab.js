import React, { useState, useEffect } from 'react';
import PageHeader from '../Common/pageHeader';
import { useDispatch } from 'react-redux';
import { getTotalGoodsInOutApi } from '../../services/itemNewItemService';
import Filter from '../Common/Filter'

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
  Title,
  registerables
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Table } from 'antd';
import { getActualConsumApi } from '../../services/stockService';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Title,
  ...registerables
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Goods In / Out',
      position: 'bottom'
    },

  },
};

const InOutConTab = () => {
  const dispatch = useDispatch();
  const [label, setlabel] = useState([]);
  const [inData, setInData] = useState([]);
  const [outData, setOutData] = useState([]);
  const [allGoodsList, setAllGoodsList] = useState([]);
  const [consumptionList, setconsumptionList] = useState([]);

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'ItemName',
      key: 'ItemName',
    },
    {
      title: 'Total Goods In',
      dataIndex: 'TotalGoodsIn',
      key: 'TotalGoodsIn',
    },
    {
      title: 'Total Goods Out',
      dataIndex: 'TotalGoodsOut',
      key: 'TotalGoodsOut',
    }
  ]

  useEffect(() => {
    getLabData()
  }, [])

  const getLabData = () => {
    let newLabel = [];
    let inData = [];
    let outData = [];
    dispatch(getTotalGoodsInOutApi((val) => {
      setAllGoodsList(val)
      val.forEach(ele => {
        let itemName = ele?.ItemName
        if (ele?.ItemName === null)
          itemName = 'N/A'
        newLabel.push(itemName);
        inData.push(ele?.TotalGoodsIn);
        outData.push(ele?.TotalGoodsOut);
      });
      setlabel(newLabel);
      setInData(inData);
      setOutData(outData);
    }))
  }

  const labels = label;

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    getConsuData(data);
  }

  const getConsuData = (data) => {
    dispatch(
      getActualConsumApi(data, (val) => {
        let labels = label;
        let datas = val;
        if (datas !== null && datas !== undefined) {
          const filledMonths = datas.map((month) => month.ItemName);
          const dataset = labels.map(month => {
            const indexOfFilledData = filledMonths.indexOf(month);
            if (indexOfFilledData !== -1) {
              return datas[indexOfFilledData].Consumption;
            }
            return 0;
          });
          setconsumptionList(dataset)
        }

      })
    )
  }

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Goods In',
        backgroundColor: 'rgb(77, 190, 143)',
        data: inData,
        borderWidth: 2
      },
      {
        label: 'Goods Out',
        backgroundColor: 'rgb(184, 176, 71)',
        data: outData,
        borderWidth: 2
      },
      {
        type: 'line',
        label: 'Consumption',
        backgroundColor: '#e95b29',
        fill: false,
        borderColor: '#e95b29',
        tension: 0.1,
        data: consumptionList,
        borderWidth: 2,
      }
    ],
  };


  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Total Goods In and Goods Out"
          csvLinkTitle='Export csv'
          csvData={allGoodsList}
          csvDataName='toalReport.csv'
        />
        <Filter
          dateRange
          dateRet={dataRet}
          serchButton
        />
      </div>
      <div className="financeCards">
        <Bar options={options} data={dataBar} />
      </div>
      <div className="tableisRes">
        <Table
          columns={columns}
          dataSource={allGoodsList}
        />
      </div>
    </>
  )
}

export default InOutConTab