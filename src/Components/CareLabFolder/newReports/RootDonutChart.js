import { Col, Row } from "antd";
import React from "react";
import DonutChartFemale from "./DonutChartFemale";
import DonutChartMale from "./DonutChartMale";

const RootDonutChart = () => {
  return (
    <>
      <div>
        <Row justify="space-around" gutter={[16, 16]}>
          <Col sm={12} md={12} xs={24} lg={12} xl={12}>
            <DonutChartMale />
          </Col>
          <Col sm={12} md={12} xs={24} lg={12} xl={12}>
            <DonutChartFemale />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RootDonutChart;
