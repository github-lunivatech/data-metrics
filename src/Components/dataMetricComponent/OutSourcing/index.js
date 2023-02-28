import { Table } from "antd";
import React from "react";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import BarChart from "../../FinanceDashbord/BarChart";
const columns = [
  {
    title: "sn",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "Nepali Date",
    dataIndex: "Bill Date",
    key: "Bill Date",
  },
  {
    title: "Bill Testname",
    dataIndex: "Bill Testname",
    key: "TotlaPatiet",
  },
  {
    title: "Bill Price",
    dataIndex: "Bill Price",
    key: "Bill Price",
  },
  {
    title: "Bill Disount Amt",
    dataIndex: "Bill Disount Amt",
    key: "Bill Disount Amt",
  },
  {
    title: "Bill Price Final",
    dataIndex: "Bill Price Final",
    key: "Bill Price Final",
  },
  {
    title: "outGoing lab Id",
    dataIndex: "outGoing lab Id",
    key: "outGoing lab Id",
  },
];

const Index = () => {
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Out Sourcing Report Summary"} />
        <Filter dateRange dateRet="" serchButton />
      </div>
      <div className="financeCards">
        <BarChart labels={""} data1={""} data2={""} />
      </div>
      <div className="mainContainer financeCards">
        <PageHeader
          // className="exportcsvprint"
          pageTitle={"Out Sourcing Report"}
          printFileName
          csvDataName={"outsourcingReport.csv"}
          csvData=""
          csvLinkTitle="Export CSV"
        />
        <Filter onSearch />
        <div className="">
          <Table
            className="tableWidth"
            columns={columns}
            dataSource={""}
          ></Table>
        </div>
      </div>
    </>
  );
};

export default Index;
