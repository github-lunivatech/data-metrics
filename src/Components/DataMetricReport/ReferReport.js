import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getReferReport } from "../../services/datametricService";
import { Table } from "antd";
import { getAllPritDataSucess } from "../../store/slices/printSlice";
import DataIsLoading from '../Common/IsLoading';

const ReferReport = () => {
  const dispatch = useDispatch();
  const [tableData, settableData] = useState([]);
  const [tableHead, settableHead] = useState([]);
  const [newTableData, setnewTableData] = useState([]);
  const [printData, setprintData] = useState([])
  const [fromToDate, setfromToDate] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const getDataForReport = (data) => {
    setIsLoading(true);
    setprintData(data)
    dispatch(getReferReport(data, (val) => {
      settableData(val)
      setnewTableData(val)
      let obj = { data, val }
      dispatch(getAllPritDataSucess(obj))
      setIsLoading(false);
    }))
  }

  const dataRet = (val) => {
    let data = {
      ...val,
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getDataForReport(data)
    setfromToDate(data);
  }

  useEffect(() => {
    createTableHead()
  }, [tableData]);

  const createTableHead = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]);
      let data = []
      tableKeys.forEach(ele => {
        data.push({
          title: ele,
          dataIndex: ele,
          key: ele,
        })
      })

      settableHead(data);
    }
  }

  const handleSearch = (val) => {
    let data = printData

    if (val === undefined || val === '') {
      setnewTableData(tableData)
      let obj2 = { data, tableData }
      dispatch(getAllPritDataSucess(obj2))
    } else {
      setnewTableData(val)
      let obj3 = { data, val }
      dispatch(getAllPritDataSucess(obj3))
    }
  }

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle='Referer Report'
          csvLinkTitle='Export CSV'
          csvData={newTableData}
          csvDataName='RefererReport.csv'
          printFileName
          reportName='Refer'
          tableHead={tableHead}
          fromToDate={fromToDate}
          removetwo
          selctorr={'Refer Name'}
        />
        <Filter
          dateRange
          dateRet={dataRet}
          serchButton
          getrefererlist
          toCompareData={tableData}
          onSearch
          dataReturn={handleSearch}
          forRefererReport
        />
      </div>
      {
        IsLoading ? <DataIsLoading /> :
        tableHead.length !== 0 ?
          <div className="tableisRes">
            <Table className='tableWidth'
              columns={tableHead}
              dataSource={newTableData}
            />

          </div> : ''
      }
    </>
  )
}

export default ReferReport