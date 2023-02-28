import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Table } from 'antd'
// import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
// import { getRackDetApi } from '../../services/itemRackService'
// import Filter from '../Common/Filter'
import { getStockApi } from '../../services/stockService'
import Filter from '../Common/Filter';

const Index = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [tableData, setTableData] = useState([]);
  const [newTableData, setnewTableData] = useState([]);
  const [tableHead, settableHead] = useState([]);

  // const columns = [
  //   {
  //     title: 'Item Id',
  //     dataIndex: 'ItemId',
  //     key: 'ItemId'
  //   },
  //   {
  //     title: 'Item Name',
  //     dataIndex: 'ItemName',
  //     key: 'ItemName'
  //   },
  //   {
  //     title: 'Transaction Date',
  //     dataIndex: 'TransactionDate',
  //     key: 'TransactionDate',
  //     render: (text) => {
  //       return text.split('T')[0]
  //     }
  //   },
  //   {
  //     title: 'Min Qty',
  //     dataIndex: 'MinQty',
  //     key: 'MinQty'
  //   },
  //   {
  //     title: 'Remaining Count',
  //     dataIndex: 'RemainingCount',
  //     key: 'RemainingCount'
  //   },
  // ]

  useEffect(() => {
    locateRange();
  }, [])
  useEffect(() => {
    createTableHead();
  }, [tableData]);

  const locateRange = () => {
    dispatch(getStockApi(0, (value) => {
      setTableData(value)
      setnewTableData(value);
    }))
  }

  const createTableHead = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]);
      let data = [];
      tableKeys.forEach(ele => {
        data.push({
          title: ele === 'ItemName' ? 'Reagent Name' : ele === 'ItemId' ? 'Reagent Id' : ele,
          dataIndex: ele,
          key: ele,
        })
      })
      settableHead(data);
    }
  }
  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewTableData(tableData)
    } else {
      setnewTableData(val);
    }
  }

  return (
    <StocksContainer>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Stocks"
          csvLinkTitle='Export csv'
          csvData={newTableData}
          csvDataName='stocks.csv'
        ></PageHeader>
        <Filter
          onSearch
          toCompareData={tableData}
          forGoodsIn
          dataReturn={handleSearch}
        ></Filter>
      </div>
      <div className="tableisRes">
        <Table
          columns={tableHead}
          dataSource={newTableData}
          rowClassName={(record) => ( record.RemainingCount < record.MinQty ? 'redback' : '' )}
        />
      </div>
    </StocksContainer>
  )
}

export default Index

const StocksContainer = styled.div`
  
`