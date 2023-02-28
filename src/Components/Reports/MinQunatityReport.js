import React, { useEffect, useState } from 'react'
import PageHeader from '../Common/pageHeader'
import styled from 'styled-components'
import { Table } from 'antd'
import { useDispatch } from 'react-redux'
import { getItemNearApi } from '../../services/itemNewItemService'

const MinQunatityReport = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [tableHead, settableHead] = useState([]);

  const getData = () => {
    dispatch(getItemNearApi(value => {
      setTableData(value)
    }))
  }
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {

    CreateTable();
  }, [tableData])

  const CreateTable = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]); //keys taneko
      let data = []
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

  return (
    <MinQunatityReportContainer>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle='Minimum Quantity Report'
          csvLinkTitle='Export csv'
          csvData={tableData}
          csvDataName='minQtyRepot.csv'
        >
        </PageHeader>
      </div>
      <div className="tableisRes">
        <Table columns={tableHead} dataSource={tableData}></Table>
      </div>
    </MinQunatityReportContainer>
  )
}

export default MinQunatityReport

const MinQunatityReportContainer = styled.div`
 @media(max-width: 576px){
  margin-bottom: 50px;
 }
`