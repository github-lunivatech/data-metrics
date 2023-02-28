import React, { useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getRackDetApi } from '../../services/itemRackService'
import Filter from '../Common/Filter'
import Edit from '../Common/Edit'
import { inventoryStat } from '../Common/StateList'

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])
  const [newTableData, setnewTableData] = useState([])
  const columns = [
    {
      title: 'Id',
      dataIndex: 'RId',
      key: 'rackId'
    },
    {
      title: 'Rack Code',
      dataIndex: 'RackCode',
      key: 'rackCode'
    },
    {
      title: 'Rack Name',
      dataIndex: 'RackName',
      key: 'rackName'
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'isActive',
      render: (text) => {
        let retText = 'Inactive'
        let retColor = 'red'
        if (text === true) {
          retText = 'Active'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Edit onClick={() => history.push({
            pathname: `rack/edit/${record.LocationId}/${record.RId}`,
            state: inventoryStat
          })}>Edit</Edit>
        </Space>
      )
    }
  ]

  const locateRange = (val) => {
    dispatch(getRackDetApi(val, (value) => {
      setTableData(value)
      setnewTableData(value)
    }))
  }
  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewTableData(tableData)
    } else {
      setnewTableData(val)
    }
  }

  return (
    <ItemContainer>
      <div className="maiTopContainer">
        <PageHeader pageTitle="Rack" buttonTitle='Add Rack' buttonOnClick={() => history.push({
          pathname: './rack/add',
          state: inventoryStat
        })}></PageHeader>
        <Filter locateRange={locateRange} serchButton></Filter>
        <Filter
          onSearch
          toCompareData={tableData}
          // forGoodsIn
          dataReturn={handleSearch}
          forRack
        ></Filter>
      </div>
      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newTableData}
        />
      </div>
    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`
  
`