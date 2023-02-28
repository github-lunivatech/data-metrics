import React from "react";
import styled from "styled-components";
import PageHeader from "../Common/pageHeader";
import { NavLink, useLocation } from "react-router-dom";
import { Row, Col } from "antd";
import {
  carelabStat,
  marketingStat,
  misreportStat,
  misStat,
} from "../Common/StateList";

const data = [
  {
    name: "Daily Summary",
    pathName: "dailysummary",
    state: misreportStat,
  },
  {
    name: "Daily Transaction",
    pathName: "dailytransaction",
    state: misreportStat,
  },
  {
    name: "Requestor Report",
    pathName: "requestor",
    state: misreportStat,
  },
  {
    name: "Referer Report",
    pathName: "referer",
    state: misreportStat,
  },
  {
    name: "Requestor Sales Summary",
    pathName: "requestorsales",
    state: misreportStat,
  },
  // {
  //   name: "MIS Reports",
  //   pathName: "/datametric",
  //   isactive: MenuSettings.misreports,
  // },
  {
    name: "Provience Wise Report",
    pathName: "viewProvience&DistrictWise",
    state: misreportStat,
  },
  {
    name: "Geography Wise Report",
    pathName: "viewGeoGraphicalWise",
    state: misreportStat,
  },
  {
    name: "View Bill ",
    pathName: "addbill",
    state: misreportStat,
  },
  // {
  //     name: 'Test Type Report',
  //     pathName: 'testtype'
  // },
];

const CareLab = () => {
  const location = useLocation();
  console.log(location, "123456");

  return (
    <CareLabContain>
      <div className="maiTopContainer">
        <PageHeader pageTitle="MIS Reports"></PageHeader>
      </div>
      <div className="contents">
        <Row gutter={[16, 16]}>
          {data.map((e) => (
            <Col sm={24} md={8} xs={24} lg={6} key={e.pathName}>
              <NavLink
                key={e.pathName}
                to={{
                  pathname: `/datametric/${e.pathName}`,
                  //   state: carelabStat,
                  state: e.state,
                }}
              >
                <div className="cButton">
                  <span>{e.name}</span>
                </div>
              </NavLink>
            </Col>
          ))}
        </Row>
      </div>
    </CareLabContain>
  );
};

export default CareLab;

const CareLabContain = styled.div`
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
