import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageHeader from '../Common/pageHeader';
import Filter from '../Common/Filter';
import { getGoodsInCountApi } from '../../services/labGoodsReceivedService'
import { getGoodsOutCountApi } from '../../services/labGoodsOutService';
import { useDispatch } from 'react-redux';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const InVsOutVsCon = () => {
  const dispatch = useDispatch();
  const [goodsInList, setGoodsInList] = useState([]);
  const [goodsInLister, setGoodsInLister] = useState([]);
  const [goodsOutList, setGoodsList] = useState([]);
  const [goodsOutLister, setGoodsOutLister] = useState([]);
  const [AllGoodsLabel, setAllGoodsLabel] = useState([])
  const [goodsInLabel, setGoodsInLabel] = useState([]);
  const [goodsOutLabel, setGoodsOutLabel] = useState([]);

  const getLabData = (data) => {
    dispatch(getGoodsInCountApi(data, (val) => {
      let pushedArr = []
      val.forEach(ele => {
        pushedArr.push(ele?.GoodsInDate)//.split('T')[0]
      })
      setGoodsInLabel(pushedArr);
      setGoodsInList(val);

    }))

    dispatch(getGoodsOutCountApi(data, (val) => {
      let pushedArr = []
      val.forEach(ele => {
        pushedArr.push(ele?.GoodsInDate)//.split('T')[0]
      })
      setGoodsOutLabel(pushedArr);
      setGoodsList(val);
    }))

    var array = goodsInLabel
    goodsOutLabel.forEach(ele => {
      if (!array.find(o => o === ele))
        array.push(ele)
    })
    setAllGoodsLabel(array)
  }

  const dubDa = (goodLister = [], isGoodOut = false) => {
    const labels = AllGoodsLabel;
    const data = goodLister;

    if (data !== null && data !== undefined) {
      const filledMonths = data.map((month) => month.GoodsInDate);
      const dataset = labels.map(month => {
        const indexOfFilledData = filledMonths.indexOf(month);
        if (indexOfFilledData !== -1) {
          return data[indexOfFilledData].GoodsInCount;
        }
        return null;
      });

      if (isGoodOut === true) {
        setGoodsOutLister(dataset);
      } else {
        setGoodsInLister(dataset)
      }
    }
  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    getLabData(data)
  }

  const labels = AllGoodsLabel;

  useEffect(() => {
    dubDa(goodsInList)
    dubDa(goodsOutList, true)
  }, [AllGoodsLabel])

  useEffect(() => {
  }, [goodsInLister, goodsOutLister])

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Consumption',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: [],
      },
      {
        type: 'bar',
        label: 'Goods Out',
        backgroundColor: 'rgb(75, 192, 192)',
        data: goodsOutList,
        borderColor: 'white',
        borderWidth: 2,
        label: 'Goods In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodsInLister,
      },
      {
        type: 'bar',
        label: 'Goods In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodsInList,
        label: 'Goods Out',
        backgroundColor: 'rgb(75, 192, 192)',
        data: goodsOutLister,
      },
    ],
  };

  return (
    <InVsOutVsContainer>
      <div className="maiTopContainer">
        <PageHeader pageTitle="Goods In Vs Goods Out Vs Consumption" />
        <Filter dateRange
          dateRet={dataRet}
          itemName
          notAll
        />
      </div>
      <Chart type='bar' data={data} />
    </InVsOutVsContainer>
  )
}

export default InVsOutVsCon;

const InVsOutVsContainer = styled.div`
 
`