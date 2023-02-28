import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getGoodsOutApi } from '../../services/labGoodsOutService';
// import Edit from '../Common/Edit';
import Cancle from '../Common/Cancle';
import { todaydate } from '../Common/TodayDate';
import { inventoryStat } from '../Common/StateList';

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([]);
  const [newGoodsList, setnewGoodsList] = useState([]);

  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'Testname',
      key: 'Testname',
    },
    {
      title: 'Reagent Name',
      dataIndex: 'ItemName',
      key: 'itemName',
      // responsive: ['sm'],
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      // responsive: ['md'],
      render: (text, record) => (
        `${text} ${record.Unit !== null ? record.Unit : ''}`
      )
    },
    {
      title: 'Goods Out Date',
      dataIndex: 'GoodsOutDate',
      key: 'GoodsOutDate',
      render: (text) => {
        return text.split('T')[0]
      },
      // responsive: ['md'],
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
      // responsive: ['sm'],
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'IsActive',
      render: (text) => {
        let retText = 'Inactive'
        let retColor = 'red'
        if (text === true) {
          retText = 'Active'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      },
      // responsive: ['sm'],
    },
    {
      title: 'Remarks',
      dataIndex: 'Remarks',
      key: 'Remarks',
      // responsive: ['md'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Cancle onClick={() => history.push({
            pathname: `/goodsout/edit/${record.GOId}/${record.GoodsOutDate}`,
            state: inventoryStat
          })}>
            Cancel
          </Cancle>
        </Space>
      )
    }
  ]

  const getLabData = (data) => {
    dispatch(getGoodsOutApi(data, (val) => {
      setgoodsList(val)
      setnewGoodsList(val)
    }))
  }

  useEffect(() => {
    let data = {
      fromdate: todaydate,
      todate: todaydate,
    }
    getLabData(data)
  }, [])

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getLabData(data)
  }

  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewGoodsList(goodsList)
    } else {
      setnewGoodsList(val)
    }
  }

  return (
    <GoodsOutContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle='Add Reagent out'
          pageTitle='Reagent Out'
          buttonOnClick={() => history.push({
            pathname: './goodsout/add',
            state: inventoryStat
          })}
        />
        <Filter
          dataReturn={handleSearch}
          dateRange
          dateRet={dataRet}
          toCompareData={goodsList}
          serchButton
          onSearch
          forGoodsOut
        />
      </div>
      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newGoodsList}
        />
      </div>
    </GoodsOutContainer>
  )
}

export default Index

const GoodsOutContainer = styled.div`
 
`