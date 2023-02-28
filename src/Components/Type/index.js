import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getItemTypeApi } from '../../services/itemItemTypeService'
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
      dataIndex: 'TId',
      key: 'typeId'
    },
    {
      title: 'Type Name',
      dataIndex: 'ItemType',
      key: 'typeName'
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
          pathname: `./type/edit/${record.TId}`,
          state: inventoryStat
        })}>Edit</Edit>
        </Space>
      )
    }
  ]

  useEffect(() => {
    dispatch(getItemTypeApi((val) => {
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
        <PageHeader pageTitle="Type" buttonTitle='Add Type' buttonOnClick={() => history.push({
          pathname: './type/add',
          state: inventoryStat
        })}></PageHeader>
          <Filter
            onSearch
            toCompareData={tableData}
            // forGoodsIn
            dataReturn={handleSearch}
            forItemType
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