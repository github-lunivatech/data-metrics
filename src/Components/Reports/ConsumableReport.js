import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Col, Row, Table } from "antd";
import PageHeader from "../Common/pageHeader";
import styled from "styled-components";
import Filter from "../Common/Filter";
import { useDispatch } from "react-redux";
import { getActualConsumApi } from "../../services/stockService";
import { ChartColor } from "../Common/ChartColor";

ChartJS.register(ArcElement, Tooltip, Legend);

const ConsumableReport = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [fullData, setfullData] = useState([]);
  const [newTableData, setnewTableData] = useState([]);

  const getAcutalCon = (data) => {
    dispatch(
      getActualConsumApi(data, (val) => {
        setTableData(val);
        setnewTableData(val);
      })
    );
  };

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    };
    getAcutalCon(data);
  };

  useEffect(() => {
    createTableHead();
  }, [tableData]);

  const createTableHead = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]);
      let data = [];
      let labels = [];

      tableKeys.forEach((ele) => {
        data.push({
          title: ele === "ItemName" ? "Reagent Name" : ele,
          dataIndex: ele,
          key: ele,
        });
      });

      tableData.forEach((ele) => {
        if (ele.ItemName !== null) labels.push(ele.ItemName);
      });

      setLabelName(labels);
      setTableHead(data);
    }
  };

  useEffect(() => {
    dubDa();
  }, [labelName]);

  const dubDa = () => {
    const labels = labelName;
    const data = tableData;

    if (data !== null && data !== undefined) {
      const filledMonths = data.map((month) => month.ItemName);
      const dataset = labels.map((month) => {
        const indexOfFilledData = filledMonths.indexOf(month);
        if (indexOfFilledData !== -1) {
          return data[indexOfFilledData].Consumption;
        }
        return null;
      });
      setfullData(dataset);
    }
  };

  const data = {
    labels: labelName,
    datasets: [
      {
        label: "Consumption",
        data: fullData,
        backgroundColor: ChartColor,
        borderColor: ChartColor,
        borderWidth: 1,
      },
    ],
  };

  const handleSearch = (val) => {
    if (val === undefined || val === "") {
      setnewTableData(tableData);
    } else {
      setnewTableData(val);
    }
  };

  return (
    <ConsumeContainer>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Consumption Report"
          csvLinkTitle="Export csv"
          csvData={newTableData}
          csvDataName="consumptionReport.csv"
        />
        <Filter
          dateRange
          dateRet={dataRet}
          toCompareData={tableData}
          onSearch
          serchButton
          dataReturn={handleSearch}
          forConsumptionReport
        />
      </div>
      <div className="tableisRes financeCards">
        <Table
          className="tableWidth"
          columns={tableHead}
          dataSource={newTableData}
        />
      </div>
      {fullData.length !== 0 ? (
        <Row>
          <Col sm={12} xs={24}>
            <div className="financeCards">
              <Doughnut data={data} />
            </div>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </ConsumeContainer>
  );
};

export default ConsumableReport;

const ConsumeContainer = styled.div``;
