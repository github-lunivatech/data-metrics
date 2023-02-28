import React, { useState, useEffect } from 'react';
import PageHeader from '../Common/pageHeader';
import Filter from '../Common/Filter';
import { useDispatch } from 'react-redux';
import { getGoodsInCountApi } from '../../services/labGoodsReceivedService';
import { getGoodsOutCountApi } from '../../services/labGoodsOutService';
import { Col, Row, Table } from 'antd';
import { getTotalGoodsInOutApi } from '../../services/itemNewItemService';

const columns1 = [
  {
    title: 'Item Id',
    dataIndex: 'ItemId',
    key: 'ItemId',
  },
  {
    title: 'Goods In Count',
    dataIndex: 'GoodsInCount',
    key: 'GoodsInCount',
  },
  {
    title: 'Goods In Date',
    dataIndex: 'GoodsInDate',
    key: 'GoodsInDate',
    render: (text) => {
      return text.split('T')[0]
    }
  }
]
const columns2 = [
  {
    title: 'Item Id',
    dataIndex: 'ItemId',
    key: 'ItemId',
  },
  {
    title: 'Goods Out Count',
    dataIndex: 'GoodsInCount',
    key: 'GoodsInCount',
  },
  {
    title: 'Goods Out Date',
    dataIndex: 'GoodsInDate',
    key: 'GoodsInDate',
    render: (text) => {
      return text.split('T')[0]
    }
  }
]


const InOutCon = () => {
  const dispatch = useDispatch();
  const [goodsInList, setGoodsInList] = useState([]);
  const [goodsOutList, setGoodsOutList] = useState([]);

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      itemid: val?.itemid
    }
    getLabData(data)
  }

  const getLabData = (data) => {
    dispatch(getGoodsInCountApi(data, (val) => {
      setGoodsInList(val);
    }))
    dispatch(getGoodsOutCountApi(data, (val) => {
      setGoodsOutList(val);
    }))

    dispatch(getTotalGoodsInOutApi((val) => {
    }))
  }

  useEffect(() => {
  }, [goodsInList, goodsOutList])


  return (
    <>
      <PageHeader pageTitle="Goods In Vs Goods Out Vs Consumption" />
      <Filter dateRange
        dateRet={dataRet}
        itemName
      />
      <Row>
        <Col xs={24} sm={24} md={24}>
          <h2>Goods In</h2>
          <Table columns={columns1} dataSource={goodsInList}></Table>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <h2>Goods Out</h2>
          <Table columns={columns2} dataSource={goodsOutList}></Table>
        </Col>
      </Row>
    </>
  )
}

export default InOutCon