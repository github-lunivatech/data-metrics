import { Row, Col, Button, Form, Table } from "antd";
import { DatePicker, TimePicker } from "antd";

import React from "react";
import CarelabFilter from "../../Common/CarelabFilter";
import Filter from "../../Common/Filter";

import PageHeader from "../../Common/pageHeader";

function BulkNegative() {
  const columns = [
    {
      title: "SN",
    },
    {
      title: "Patient Name",
    },
    {
      title: "Contact No",
    },
    {
      title: "Collection Date",
    },
  ];

  const onFinish = (values) => {
    console.log("Updated:", values);
  };
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Bulk Negative"} />

        <CarelabFilter showSampleIdFromTo fiscalService />
      </div>

      <div className="financeCards">
        <h3>Patient Details</h3>
        <Row style={{ listStyleType: "none" }}>
          <Col style={{ marginRight: "20px" }}>
            <label htmlFor=" " style={{ fontWeight: "bold" }}>
              Result Date
            </label>
            <br />
            <DatePicker />
          </Col>
          <Col style={{ marginRight: "50px" }}>
            <label htmlFor=" " style={{ fontWeight: "bold" }}>
              Result Time
            </label>
            <br />
            <TimePicker />
          </Col>

          <Col style={{ marginTop: "20px" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={onFinish}>
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <div style={{ justifyContent: "end" }}>
          <Filter onSearch />
        </div>
        <div className="tableisRes">
          <Table className="tableWidth" columns={columns} />
        </div>
      </div>
    </>
  );
}

export default BulkNegative;
