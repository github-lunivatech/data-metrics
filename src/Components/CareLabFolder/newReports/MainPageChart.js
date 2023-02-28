import React, { useState } from "react";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { Select, Row, Col, Form } from "antd";
import ProvienceLinechart from "./ProvienceLineChart";
import ProviencePiechart from "./ProviencePiechart";
import ProvienceCharts from "./ProvienceCharts";
import DonutChart from "./DonutChartMale";
import RootDonutChart from "./RootDonutChart";
import AppButton from "../../Common/AppButton";
const MainPageChart = () => {
  const [newdata, setNewData] = useState([]);
  const { Option, OptGroup } = Select;
  const OnLoad = (e) => {
    console.log(e, "e");
    const selecteditem = e;
    setNewData(selecteditem);
    console.log(selecteditem, "aaa");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const datas = [
    {
      id: 1,
      name: "Pie charts",
    },
    {
      id: 2,
      name: "Line Charts",
    },
    {
      id: 3,
      name: "Bar Charts",
    },
    {
      id: 4,
      name: "Doughnut Charts",
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <MainPageChartStyle>
        <AppButton
          buttonTitle="View Charts"
          buttonOnClick={showModal}
          viewButton
        ></AppButton>

        <Modal
          title=" Charts Details"
          visible={isModalOpen}
          footer={null}
          style={{
            top: 20,
          }}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <div className="financeCards">
            {/* <span className="pageTtitle">Chart Status of Patient</span> */}
            <h2>Chart Status of Patient</h2>
            <Row>
              <Col
                sm={24}
                md={12}
                xs={12}
                lg={12}
                xl={8}
                className="dropmenu"
                span={6}
              >
                <Select
                  defaultValue="Pie Charts"
                  id="storeItemName"
                  style={{
                    width: "100%",
                  }}
                  onSelect={OnLoad}
                  placeholder="Please select the chart menu"
                >
                  {datas.map((item) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <div className="btn-section">
                <Col sm={24} md={12} xs={12} lg={12} xl={8} span={8}>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  ></Form.Item>
                </Col>
              </div>
            </Row>
          </div>
          {newdata == "" ? <ProviencePiechart /> : ""}
          {newdata === 1 ? <ProviencePiechart /> : ""}
          {newdata === 2 ? <ProvienceLinechart /> : ""}
          {/* Bar chart */}
          {newdata === 3 ? <ProvienceCharts /> : ""}
          {newdata === 4 ? <RootDonutChart /> : ""}
        </Modal>
      </MainPageChartStyle>
    </>
  );
};
export default MainPageChart;

export const MainPageChartStyle = styled.div`
  .modalcharts {
    margin-left: 10px;
  }
`;
