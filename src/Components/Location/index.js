import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getLocationApi } from '../../services/itemLocationService'
import Edit from '../Common/Edit'
import Filter from '../Common/Filter'
import { inventoryStat } from '../Common/StateList'

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])
  const [newTableData, setnewTableData] = useState([]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'LId',
      key: 'locationId'
    },
    {
      title: 'Location Code',
      dataIndex: 'LCode',
      key: 'locationCode'
    },
    {
      title: 'Location Name',
      dataIndex: 'Location',
      key: 'locationName'
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
          pathname: `./location/edit/${record.LId}`,
          state: inventoryStat
        })}>Edit</Edit>
        </Space>
      )
    }
  ]

  useEffect(() => {
    dispatch(getLocationApi((val) => {
      setTableData(val)
      setnewTableData(val)
    }))
  }, [])

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
        <PageHeader pageTitle="Location" buttonTitle='Add Location' buttonOnClick={() => history.push({
          pathname: './location/add',
          state: inventoryStat
        })}></PageHeader>
        <Filter
          onSearch
          toCompareData={tableData}
          // forGoodsIn
          dataReturn={handleSearch}
          forLocation
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