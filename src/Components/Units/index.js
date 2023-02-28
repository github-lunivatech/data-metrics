import { Table, Space, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
import { getItemUnitApi } from '../../services/itemUnitService';
import Edit from '../Common/Edit';
import Filter from '../Common/Filter';
import { inventoryStat } from '../Common/StateList';

const Index = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [unitList, setunitList] = useState([])
  const [newunitList, setnewunitList] = useState([])

  useEffect(() => {
    getLabData()
  }, [])

  const getLabData = () => {
    dispatch(getItemUnitApi((val) => {
      setunitList(val)
      setnewunitList(val)
    }))
  }
  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'Units',
      key: 'unitName',
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
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Edit onClick={() => history.push({
            pathname: `./units/edit/${record.UnId}`,
            state: inventoryStat
          })}>Edit</Edit>
        </Space>
      )
    }
  ]
  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewunitList(unitList)
    } else {
      setnewunitList(val)
    }
  }

  return (
    <UnitContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle='Add Units'
          pageTitle='Units'
          buttonOnClick={() => history.push({
            pathname: './units/add',
            state: inventoryStat
          })}
        ></PageHeader>
        <Filter
          onSearch
          toCompareData={unitList}
          // forGoodsIn
          dataReturn={handleSearch}
          forUnits
        ></Filter>
      </div>
      <div className="tableisRes">
        <Table className='tableWidth'
          columns={columns}
          dataSource={newunitList}
        />
      </div>
    </UnitContainer>
  )
}

export default Index

const UnitContainer = styled.div`
 
`