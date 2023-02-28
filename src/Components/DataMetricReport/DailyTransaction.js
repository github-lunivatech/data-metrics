import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Filter from "../Common/Filter";
import PageHeader from "../Common/pageHeader";
import { getDailyTransactionReport } from "../../services/datametricService";
import { Table, Tag } from "antd";
import DataIsLoading from "../Common/IsLoading";
import { NavLink, useLocation } from "react-router-dom";

const DailyTransaction = () => {
  const dispatch = useDispatch();
  const [tableData, settableData] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [fromToDate, setfromToDate] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const location = useLocation();
  console.log(location, "123456");
  const tableHead = [
    {
      title: "Patient Info",
      dataIndex: "FirstName",
      key: "Name",
      render: (text, record) => {
        let fullName = `${text} ${record.MiddleName} ${record.LastName}`;
        let ager = `(${record.Age})`;
        return (
          <>
            <div>{fullName},</div>
            <div>{record.Id},</div>
            <div>{ager}</div>
            <div>{record.ContactNo}</div>
          </>
        );
      },
    },
    {
      title: "Bill No",
      dataIndex: "BillNo",
      key: "BillNo",
    },
    {
      title: "Created On",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      render: (text, record) =>
        `${text.split("T")[0]} (${record.CreatedOnNepaliDate})`,
    },
    {
      title: "Payment Details",
      dataIndex: "PaymentTYpe",
      key: "PaymentTYpe",
      render: (text, record) => {
        return (
          <>
            Type: {text} <br />
            Mode: {record.PaymentMOde} <br />
            Code: {record.PaymentCode}
          </>
        );
      },
    },
    {
      title: "Is Paid",
      dataIndex: "IsPaid",
      key: "IsPaid",
      render: (text) => {
        let retText = "Not Paid";
        let retColor = "red";
        if (text === true) {
          retText = "Paid";
          retColor = "green";
        }
        return <Tag color={retColor}>{retText}</Tag>;
      },
    },
    {
      title: "Sample Id",
      dataIndex: "SampleId",
      key: "SampleId",
    },
    {
      title: "Requestor",
      dataIndex: "Requestor",
      key: "Requestor",
    },
    {
      title: "User Name",
      dataIndex: "usrFullName",
      key: "usrFullName",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Remaining Amount",
      dataIndex: "RemainingAmount",
      key: "RemainingAmount",
    },
    {
      title: "Total Price",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
  ];

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

  const handleSearch = (val) => {
    if (val === undefined || val === "") {
      setNewTableData(tableData);
    } else {
      setNewTableData(val);
    }
  };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Daily Transaction Report"
          csvLinkTitle="Export CSV"
          csvData={newTableData}
          csvDataName="dailyTransactionReport.csv"
          printFileName
          reportName="Daily Transaction"
          tableHead={tableHead}
          fromToDate={fromToDate}
        />
        <Filter
          dateRange
          dateRet={dataRet}
          serchButton
          getuserslist
          toCompareData={tableData}
          onSearch
          dataReturn={handleSearch}
          forDailyTrasection
        />
      </div>
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
    </>
  );
};

export default DailyTransaction;
