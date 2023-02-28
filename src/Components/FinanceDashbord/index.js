import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "../Common/Filter";
import PageHeader from "../Common/pageHeader";
import { getDataMetricReportByReportTypeAndDateRange } from "../../services/datametricService";

import { useDispatch } from "react-redux";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import ForReportDoughnutChart from "./ForReportDoughnutChart";
import DataIsLoading from "../Common/IsLoading";
import day from "../../assets/images/day.jpg";
import night from "../../assets/images/night.jpg";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const columns = [
  {
    title: "Date",
    dataIndex: "Day",
    key: "Day",
  },
  {
    title: "Nepali Date",
    dataIndex: "NepaliDay",
    key: "NepaliDay",
  },
  {
    title: "Total Patiet",
    dataIndex: "Total Patient",
    key: "TotlaPatiet",
  },
  {
    title: "Total Amount",
    dataIndex: "Total Amount",
    key: "TotalAmount",
  },
  {
    title: "Dues",
    dataIndex: "Dues",
    key: "Dues",
  },
  {
    title: "Paid",
    dataIndex: "Paid",
    key: "Paid",
  },
];

const Index = () => {
  // getDataMetricReportByReportTypeAndDateRange
  // for pie [payment report] = ReportDetails
  // for bar [payment report] = Table1
  //  for referer =Table2
  // for requestor = Table3
  // for over all table = Table4
  const dispatch = useDispatch();
  const [PayPie, setPayPie] = useState([]);
  const [PayBar1, setPayBar1] = useState([]);
  const [PayBar2, setPayBar2] = useState([]);
  const [PayRef, setPayRef] = useState([]);
  const [PayReq, setPayReq] = useState([]);
  const [PayTable, setPayTable] = useState([]);

  const [PayPieLabel, setPayPieLabel] = useState([]);
  const [PayBarLabel, setPayBarLabel] = useState([]);
  const [PayRefLabel, setPayRefLabel] = useState([]);
  const [PayReqLabel, setPayReqLabel] = useState([]);

  const [IsLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [cardBkg, setcardBkg] = useState();
  const daysNames = [
    "sunday",
    "monday",
    "tuesday",
    "wedesday",
    "thirsday",
    "friday",
    "saturday",
  ];
  const monthsNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "jun",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDate(new Date());
    const temp = date.getHours;
    temp >= 18 || temp < 6 ? setcardBkg("night") : setcardBkg("day");
  }

  const getDataForReport = (data) => {
    setIsLoading(true);
    dispatch(
      getDataMetricReportByReportTypeAndDateRange(data, (val) => {
        setPayTable(val?.Table4);
        //for pie
        let pusPayPie = [];
        let pusPayPieLabel = [];
        val.ReportDetails.forEach((ele) => {
          pusPayPie.push(ele?.Total);
          pusPayPieLabel.push(ele?.BIllPaymentType);
        });
        setPayPie(pusPayPie);
        setPayPieLabel(pusPayPieLabel);
        // for bar
        let pshBar1 = [];
        let pshBar2 = [];
        let pshBarLabel = [];
        val.Table1.forEach((ele) => {
          pshBar1.push(ele?.PAID);
          pshBar2.push(ele?.UNPAID);
          pshBarLabel.push(ele?.Date);
        });
        setPayBar1(pshBar1);
        setPayBar2(pshBar2);
        setPayBarLabel(pshBarLabel);

        // for refer
        let pshRef = [];
        let pushReflabel = [];
        val.Table2.forEach((ele) => {
          pshRef.push(ele?.Total);
          pushReflabel.push(ele?.Referrer);
        });
        setPayRefLabel(pushReflabel);
        setPayRef(pshRef);

        // for requestor
        let pshReq = [];
        let pushReQlabel = [];
        val.Table3.forEach((ele) => {
          pshReq.push(ele?.Total);
          pushReQlabel.push(ele?.Requestor);
        });
        setPayReqLabel(pushReQlabel);
        setPayReq(pshReq);
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
  };

  useEffect(() => {
    const fd = new Date();
    const date = `${fd.getFullYear()}-${fd.getMonth() + 1}-${fd.getDate()} `;
    const data = {
      fromdate: date,
      todate: date,
    };
    getDataForReport(data);
  }, []);

  return (
    <FinenceDashbordContainer>
      {IsLoading ? (
        <DataIsLoading />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col lg={18}>
              <div className="maiTopContainer">
                <PageHeader pageTitle="Finance Dashbord"></PageHeader>
                <Filter dateRange dateRet={dataRet} serchButton />
              </div>
              <div className="maincontainer">
                <Row>
                  <Col lg={24} md={24} sm={24} xs={24} className="financeCards">
                    <h3>Paymet Report</h3>
                    <BarChart
                      labels={PayBarLabel}
                      data1={PayBar1}
                      data2={PayBar2}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div className={`dContainer ${cardBkg}`}>
                    <div className="detail ">
                      <span className="dayname">
                        {daysNames[date.getDay()]}
                      </span>
                      <h2>
                        {date.getHours()} : {date.getMinutes()}
                      </h2>
                      <p>
                        {date.getFullYear()} {monthsNames[date.getMonth()]}{" "}
                        {date.getDate()}{" "}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "16px" }}>
                <Col span={24}>
                  <DoughnutChart
                    title={"Paymet Report"}
                    labels={PayPieLabel}
                    data={PayPie}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <ForReportDoughnutChart
                title={"Referer Report"}
                data={PayRef}
                labels={PayRefLabel}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <ForReportDoughnutChart
                title={"Requestor Report"}
                data={PayReq}
                labels={PayReqLabel}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <div className="tableisRes financeCards">
              <h3>Total Collection</h3>
              <Table
                className="tableWidth"
                columns={columns}
                dataSource={PayTable}
              ></Table>
            </div>
          </Row>
        </>
      )}
    </FinenceDashbordContainer>
  );
};
export default Index;

const FinenceDashbordContainer = styled.div`
  .financeCards {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 22px 0 rgba(31, 38, 135, 0.1);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    margin-bottom: 20px;
    padding: 5px 8px;
    width: 100%;
    height: 100%;
    h3 {
      border-bottom: 1px solid #c6c6cb;
    }
  }
  /* .dayname {
    font-size: 25px !important;
  } */

  .dContainer {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    box-shadow: 0 0 0 2px rgba(123, 124, 126, 0.123);
  }

  .day {
    background-image: url(${day});
    .detail {
      position: absolute;
      z-index: 20;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      h2 {
        font-size: 35px;
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 0px;
        padding: 0;
      }
      span {
        font-size: 30px;
        text-transform: capitalize;
        color: #232325;
        margin: 0px;
        padding: 0;
      }
      p {
        font-size: 16px;
        color: rgb(233, 91, 41);
        margin: 0px;
        padding: 0;
      }
    }
  }
  .night {
    background-image: url(${night});
    .detail {
      position: absolute;
      z-index: 20;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      h2 {
        font-size: 35px;
        font-weight: 600;
        color: #fefefe;
        margin-bottom: 0px;
        padding: 0;
      }
      span {
        font-size: 30px;
        text-transform: capitalize;
        color: #c8c8dd;
        margin: 0px;
        padding: 0;
      }
      p {
        font-size: 16px;
        color: rgb(233, 91, 41);
        margin: 0px;
        padding: 0;
      }
    }
  }
`;
