import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getItemCategoryApi } from '../../services/itemCategoryService'
import Edit from '../Common/Edit'
import Filter from '../Common/Filter'
import { inventoryStat } from '../Common/StateList'

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([])
  const [newTableData, setnewTableData] = useState([])

  useEffect(() => {
    dispatch(getItemCategoryApi((val) => {
      setTableData(val)
      setnewTableData(val)
    }))
  }, [])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'CId',
      key: 'categoryId'
    },
    {
      title: 'Category Name',
      dataIndex: 'CategoryType',
      key: 'categoryName'
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
          pathname: `./category/edit/${record.CId}`,
          state: inventoryStat
        })}>Edit</Edit>
        </Space>
      )
    }
  ]
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
        <PageHeader pageTitle="Category" buttonTitle='Add Category' buttonOnClick={() => history.push({
          pathname: './category/add',
          state: inventoryStat
        })}></PageHeader>

        <Filter
          onSearch
          toCompareData={tableData}
          // forGoodsIn
          dataReturn={handleSearch}
          forCategory
        ></Filter>
      </div>
      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newTableData}
        ></Table>
      </div>

    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`
  
`