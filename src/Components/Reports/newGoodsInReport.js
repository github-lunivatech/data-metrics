import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { getGoodsInCountApi } from '../../services/labGoodsReceivedService'
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
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
import ReportChart from '../Common/ReportChart';
import { ChartColor } from '../Common/ChartColor';

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

const columns = [
  {
    title: 'Reagent Id',
    dataIndex: 'ItemId',
    key: 'itemId',
  },
  {
    title: 'Reagent Name',
    dataIndex: 'ItemName',
    key: 'itemName',
  },
  {
    title: 'Reagent In Count',
    dataIndex: 'GoodsInCount',
    key: 'Total',
    render: (text, record) => (
      `${text} ${record.Unit !== null ? record.Unit : ''}`
    )
  },
  {
    title: 'Reagent In Date',
    dataIndex: 'GoodsInDate',
    key: 'GoodsInDate',
    render: (text) => {
      return text.split('T')[0]
    }
  }
]

const NewGoodsInReport = () => {
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([]);
  const [goodsInName, setGoodsInName] = useState([]);
  const [goodLister, setgoodLister] = useState([]);
  const [newGoodsList, setnewGoodsList] = useState([]);

  const graphData = (data) => {
    dispatch(getGoodsInCountApi(data, (val) => {
      let PushedGoodsName = []
      setgoodsList(val)
      setnewGoodsList(val);
      val.forEach(ele => {
        PushedGoodsName.push(ele?.ItemName)
      })

      var filteredArray = PushedGoodsName.filter(function (item, pos) {
        return PushedGoodsName.indexOf(item) === pos;
      });

      setGoodsInName(filteredArray)
    }))
  }

  useEffect(() => {
    retunDa()
  }, [goodsInName])

  const retunDa = () => {
    const retDaa = groupData(goodsList).children

    let mainArrDataset = []
    let secondaryDataset = []

    retDaa.forEach(ele => {
      let totArr = []
      let repData = []
      let counter = 1
      ele.children.forEach(el => {
        totArr.push(el.GoodsInCount)

        repData.push({
          label: 'Dataset ' + counter++,
          data: el.GoodsInCount,
        })
      })
      let arraySum = totArr.reduce((a, b) => a + b, 0);
      mainArrDataset.push(arraySum);

      secondaryDataset.push(repData);
    })
    groupData2(secondaryDataset);
    setgoodLister(mainArrDataset)

  }

  const groupData = (d) => {
    let g = Object.entries(d.reduce((r, c) => (r[c.ItemName] = [...r[c.ItemName] || [], c], r), {}))
    return g.reduce((r, c) => (
      r.children.push(
        { children: c[1] }), r), { children: [] }
    )
  }

  const groupData2 = (d) => {
    // let finalData = []
    d.forEach(ele => {
      ele.forEach(el => {
      })
    })
    // let g = Object.entries(d.reduce((r, c) => (r[c.label] = [...r[c.label] || [], c], r), {}))
    // return g.reduce((r, c) => (
    //   r.children.push(
    //     { children: c[1] }), r), { children: [] }
    // )
  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    graphData(data);
  }

  const labels = goodsInName;
  const dataDo = {
    labels,
    datasets: [
      {
        label: 'Reagent In',
        backgroundColor: ChartColor,
        data: goodLister,
        borderColor: [
          'rgba(255, 255, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Reagent In',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodLister,
        borderWidth: 2
      },
    ],
  };

  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewGoodsList(goodsList)
    } else {
      setnewGoodsList(val)
    }
  }

  return (
    <NewGoodsInContainer>
      <div className="maiTopContainer">
        <PageHeader

          pageTitle='Reagent In Report'
          csvLinkTitle='Export csv'
          csvData={newGoodsList}
          csvDataName='ReagentInReport.csv'
        />
        <Filter
          dateRange
          dateRet={dataRet}
          itemName
          onSearch
          toCompareData={goodsList}
          forGoodsIn
          dataReturn={handleSearch}
          serchButton
        />
      </div>
      <div className="tableisRes financeCards">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newGoodsList}
        />
      </div>
      {goodsInName.length !== 0 ?
        <div className="financeCards">
          <ReportChart
            dataBar={dataBar}
            dataDo={dataDo}
          ></ReportChart>
        </div>
        : ''}
    </NewGoodsInContainer>
  )
}

export default NewGoodsInReport

const NewGoodsInContainer = styled.div`
  
`