import React, { useEffect, useState } from 'react';
import PageHeader from '../Common/pageHeader'
import { useDispatch } from 'react-redux'
import { getLocationReportApi } from '../../services/itemLocationService';
import Filter from '../Common/Filter';
import { Table } from 'antd';

const LocationStockReport = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([])

  const locateRange = (val) => {
    dispatch(getLocationReportApi((value) => {
      setTableData(value)
    }, val))
  }

  useEffect(() => {
    createTableHead()
  }, [tableData])

  const createTableHead = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]);
      let data = []
      tableKeys.forEach(ele => {
        data.push({
          title: ele === 'Item' ? 'Reagent Name' : ele,
          dataIndex: ele,
          key: ele,
        })
      })
      setTableHead(data)
    }
  }

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle='Location Stock Report'
          csvLinkTitle='Export csv'
          csvData={tableData}
          csvDataName='locationStockReport.csv'
        />
        <Filter
          locateRange={locateRange}
          notAllLocate
          serchButton
        />
      </div>
      <div className="tableisRes">
        <Table
          columns={tableHead}
          dataSource={tableData}
        />
      </div>
    </>
  )

}

export default LocationStockReport