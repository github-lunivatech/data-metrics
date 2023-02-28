import React from "react";
import { useState } from "react";
import styled from "styled-components";
import PageHeader from "../Common/pageHeader";
import DataIsLoading from "../Common/IsLoading";
import Filter from "../Common/Filter";

const handleSearch = (val) => {
  if (val === undefined || val === "") {
    setnewTableData(tableData);
  } else {
    setnewTableData(val);
  }
};

const PrintDetails = () => {
  const getDataForReport = (data) => {
    setIsLoading(true);
    dispatch(
      getDailyTransactionReport(data, (val) => {
        settableData(val);
        setNewTableData(val);
        setIsLoading(false);
      })
    );
  };
  const dataRet = (val) => {
    let data = {
      ...val,
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    };
    getDataForReport(data);
    setfromToDate(data);
  };
  const [tableData, settableData] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  return (
    <PrintDetailsConatiner>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Print Reports"
          csvLinkTitle="Export CSV"
          csvData={newTableData}
          csvDataName="dailyTransactionReport.csv"
          printFileName
          reportName="Daily Transaction"
        ></PageHeader>
        <Filter
          dateRange
          dateRet={dataRet}
          serchButton
          getrequestorlist
          toCompareData={tableData}
          onSearch
          dataReturn={handleSearch}
          forRequestorReport
        />
        {IsLoading ? (
          <DataIsLoading />
        ) : newTableData.length !== 0 ? (
          <div className="tableisRes">
            <Table
              className="tableWidth"
              columns={tableHead}
              dataSource={newTableData}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </PrintDetailsConatiner>
  );
};
export default PrintDetails;
const PrintDetailsConatiner = styled.div`
  .cButton {
    height: 120px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fefefe;
    box-shadow: 0 2px 22px 0 rgba(31, 38, 135, 0.17);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    span {
      font-size: 16px;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--titleTxt);
      text-align: center;
      i {
        font-size: 25px;
        color: var(--primary);
      }
    }

    @media (max-width: 768px) {
      span {
        font-size: 16px;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        margin-right: 10px;
        i {
          font-size: 25px;
        }
      }
    }
    @media (max-width: 500px) {
      height: 80px;
    }
  }
`;
