import { Table } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  dateWiseTestApi,
  GetListOfPatientDetailsBydateAndTest,
} from "../../../services/careLabService";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

const TestAnalytics = () => {
  const dispatch = useDispatch();
  const [dyColumn, setDyColumn] = useState([]);
  const [dyColumnData, setDyColumnData] = useState([]);
  // const [ForCsvData, setForCsvData] = useState();
  const [ToSendDate, setToSendDate] = useState();

  const dataRet = (val) => {
    // console.log("val", val);
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      testname: val.testName,
    };
    // console.log("data", data)
    setToSendDate(data);
    getApiData(data);
  };

  const getApiData = (data) => {
    dispatch(
      GetListOfPatientDetailsBydateAndTest(data, (res) => {
        // console.log("response", res)
        // setForCsvData(res)
        if (res.length > 0) {
          let tableKeys = Object.keys(res[0]);
          let data = [];
          tableKeys.forEach((ele) => {
            data.push({
              title: ele,
              dataIndex: ele,
              key: ele,
              render: function (html) {
                return <div dangerouslySetInnerHTML={createMarkup(html)} />;
              },
            });
          });
          setDyColumn(data);
          setDyColumnData(res);
        } else {
          setDyColumn([]);
          setDyColumnData([]);
        }
      })
    );
  };

  function createMarkup(htmlData = "") {
    return {
      __html: htmlData,
    };
  }

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Patient Details By Test Name"
          csvLinkTitle="Export CSV"
          csvData={dyColumnData}
          csvDataName="rest-anatutics.csv"
          printFileName
          reportName="Test Analytics"
          tableHead={dyColumn}
          fromToDate={ToSendDate}
        />
        <Filter dateRange serchButton dateRet={dataRet} forTestAnalytics />
      </div>
      {dyColumnData.length > 0 && (
        <div className="tableisRes">
          <Table
            className="tableWidth"
            columns={dyColumn}
            dataSource={dyColumnData}
            scroll={{
              x: "auto",
            }}
          />
        </div>
      )}
    </>
  );
};

export default TestAnalytics;
