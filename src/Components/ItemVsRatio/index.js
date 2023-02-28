import React, { useState, useEffect } from 'react'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useDispatch } from 'react-redux';
import PageHeader from '../Common/pageHeader'
import { getItemVsRatioApi } from '../../services/itemVsRatioService';
import Edit from '../Common/Edit';
import Filter from '../Common/Filter';
import { ItemName } from '../Common/ItemToReagent';
import { inventoryStat } from '../Common/StateList';

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [newTableData, setnewTableData] = useState([]);

  useEffect(() => {
    dispatch(getItemVsRatioApi((val) => {
      setTableData(val)
      setnewTableData(val)
    }))
  }, [])

  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'TestName',
      key: 'Testname',
    },
    {
      title: `${ItemName} Name`,
      dataIndex: 'ItemName',
      key: 'itemName',
      render: (text, record) => (
        `${text} ${record.Unit !== null ? `(${record.Unit})` : ''}`
      )
    },
    {
      title: `${ItemName} Per Unit Test`,
      dataIndex: 'ItemPerUnitTest',
      key: 'ItemPerUnitTest'
    },
    {
      title: `Test Per Unit`,
      dataIndex: 'TestPerUnit',
      key: 'TestPerUnit'
    },
    {
      title: 'Sub Unit',
      dataIndex: 'SubUnit',
      key: 'SubUnit'
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
      title: 'Is Group',
      dataIndex: 'IsGroup',
      key: 'IsGroup',
      render: (text) => {
        let retText = 'Not In Group'
        let retColor = 'red'
        if (text === true) {
          retText = 'In Group'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      }
    },
    {
      title: 'Is Consumption Group',
      dataIndex: 'IsConsumptionGroup',
      key: 'IsConsumptionGroup',
      render: (text) => {
        let retText = 'Not In Consumption'
        let retColor = 'red'
        if (text === true) {
          retText = 'In Consumption'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        let pusherName = `/itemvsratio/eidt/${record.RId}`
        if (record.IsGroup === true)
          pusherName = `/itemvsratio/edit/group/${record.RId}`
        else if (record.IsConsumptionGroup === true)
          pusherName = `/itemvsratio/edit/itemconsumption/${record.RId}`
        return (
          <Space size="middle">
            <Edit onClick={() => history.push({
              pathname: pusherName,
              state: inventoryStat
            })}>Edit</Edit>
          </Space>
        )
      }

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
        <PageHeader
          buttonTitle={`Add ${ItemName} Vs Ratio`}
          pageTitle={`${ItemName} Vs Ratio`}
          buttonOnClick={() => history.push({
            pathname: './itemvsratio/add',
            state: inventoryStat
          })}

          forGroup={`Add Group ${ItemName} Vs Ratio`}
          forGroupButtonClick={() => history.push({
            pathname: './itemvsratio/add/group',
            state: inventoryStat
          })}

          forCon={`Add Group ${ItemName} Vs Consumption`}
          forConButtonClick={() => history.push({
            pathname: './itemvsratio/add/itemconsumption',
            state: inventoryStat
          })}

        ></PageHeader>

        <Filter
          onSearch
          toCompareData={tableData}
          // forGoodsIn
          dataReturn={handleSearch}
          forItemVsRatio
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