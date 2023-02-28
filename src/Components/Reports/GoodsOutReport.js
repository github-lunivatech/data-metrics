import { Table } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getGoodsOutApi, getGoodsOutCountApi } from '../../services/labGoodsOutService';
import ReportChart from '../Common/ReportChart';
import { ChartColor } from '../Common/ChartColor';

const columns = [
  {
    title: 'Test Name',
    dataIndex: 'Testname',
    key: 'Testname',
  },
  {
    title: 'Item Name',
    dataIndex: 'ItemName',
    key: 'itemName',
  },
  {
    title: 'Quantity',
    dataIndex: 'Quantity',
    key: 'Quantity',
  },
  {
    title: 'Goods Out Date',
    dataIndex: 'GoodsOutDate',
    key: 'GoodsOutDate',
    render: (text) => {
      return text.split('T')[0]
    }
  },
  {
    title: 'Is Active',
    dataIndex: 'IsActive',
    key: 'IsActive',
    render: (text) => {
      if (text === true) {
        return 'Active'
      }
      return 'Inactive'
    }
  },
  {
    title: 'Remarks',
    dataIndex: 'Remarks',
    key: 'Remarks',
  }
]

const Index = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([])
  const [goodsOutList, setGoodsOutList] = useState([]);
  const [goodsLabel, setgoodslabel] = useState([])

  const getLabData = (data) => {
    dispatch(getGoodsOutApi(data, (val) => {
      setgoodsList(val)
    }))
    let newData = {
      ...data,
      itemid: 0
    }
    dispatch(getGoodsOutCountApi(newData, (val) => {
    }))
  }
  const getGoodsOutList = (data) => {
    dispatch(getGoodsOutCountApi(data, (val) => {
      let pushedArr = []
      let pushedGoodsOut = []

      val.forEach(ele => {
        pushedArr.push(ele?.GoodsInDate.split('T')[0])
        pushedGoodsOut.push(ele?.GoodsInCount)
      })
      setgoodslabel(pushedArr);
      setGoodsOutList(pushedGoodsOut);
    }))
  }

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    getLabData(data);
    getGoodsOutList(data);
  }
  const labels = goodsLabel;

  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Goods Out',
        backgroundColor: 'rgb(53, 162, 235)',
        data: goodsOutList,
        borderWidth: 2
      },
    ],
  };
  const dataDo = {
    labels,
    datasets: [
      {

        label: 'Goods Out',
        backgroundColor: ChartColor,
        data: goodsOutList,
        borderColor: [
          'rgba(255, 255, 132, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <GoodsOutContainer>
      <PageHeader
        pageTitle='Goods Out Report'
      // csvLinkTitle='Export csv'
      // goodsOut
      ></PageHeader>
      <Filter
        dateRange
        dateRet={dataRet}
        itemName
      />
      <div className="tableisRes">
        <Table
          columns={columns}
          dataSource={goodsList}
        />
      </div>
      {goodsLabel.length !== 0 ?
        <ReportChart
          dataBar={dataBar}
          dataDo={dataDo}
        ></ReportChart>
        : ''}
    </GoodsOutContainer>
  )
}

export default Index

const GoodsOutContainer = styled.div`
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  overflow: hidden;
  margin-bottom: 50px;
`