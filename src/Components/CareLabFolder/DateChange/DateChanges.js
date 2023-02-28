import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageHeader from "../../Common/pageHeader";
import moment from "moment";
import CarelabFilter from "../../Common/CarelabFilter";
import { adToBs } from "@sbmdkl/nepali-date-converter";

function DateChange() {
  const [collectionDate, setCollectionDate] = useState();
  const [nepaliDate, setNepaliDate] = useState();
  const [nepaliDateResult, setNepaliDateResult] = useState();
  const [resultDate, setResultDate] = useState();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    // console.log("collection", collectionDate);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const returnFilterData = (res) => {
    console.log(res);
  };

  // nepali date converter

  const convertToNepali = () => {
    if (collectionDate !== undefined) {
      let dateInString = collectionDate.toString();
      let nDate = adToBs(dateInString);
      // console.log(nDate, "ndatesdfdsfjk");
      setNepaliDate(nDate);
    }
    if (resultDate !== undefined) {
      let dateInStrings = resultDate.toString();
      let rDate = adToBs(dateInStrings);
      setNepaliDateResult(rDate);
    }
  };
  useEffect(() => {
    convertToNepali();
    // console.log(nepaliDate, "helllloljfkljldksf");
    // console.log(totalCharge);
    // form.setFieldsValue(to);
    form.setFieldsValue({
      nepCollectionDate: nepaliDate,
      nepCollectionDateResult: nepaliDateResult,
    });
  }, [collectionDate, nepaliDate, resultDate, nepaliDateResult]);
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Date Change"} />
        <CarelabFilter
          fiscalService
          showSampleId
          returnFilterData={returnFilterData}
        />
      </div>

      <div className="financeCards">
        <h3>Patient Details</h3>
        <Row justify="space-between" style={{ listStyleType: "none" }}>
          <Col>
            <li>Sample no: </li>
            <li>Name: </li>
            <li>Test Lists: </li>
          </Col>
          <Col style={{ marginRight: "50px" }}>
            <li>Gender: </li>
            <li>Age: </li>
            <li>Contact No: </li>
          </Col>
        </Row>
      </div>
      <TwoDiv>
        <div
          className="financeCards"
          style={{ width: "50%", marginRight: "10px" }}
        >
          <h3>
            Collection details{" "}
            <small style={{ color: "black", fontSize: "12px", margin: "30px" }}>
              2079/04/01
            </small>
          </h3>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Collection Date"
              name="collectionDate"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <DatePicker
                style={{ width: "100%", marginLeft: "12px" }}
                onChange={(e) => {
                  setCollectionDate(e.format("YYYY-MM-DD"));
                }}
              />
            </Form.Item>

            <Form.Item
              label="Collection Time"
              name="collectionTime"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <TimePicker
                initialValue={moment("12:08:23", "HH:mm:ss")}
                style={{ width: "100%", marginLeft: "12px" }}
              />
            </Form.Item>
            <Form.Item
              label="Nep. Collection Date"
              name="nepCollectionDate"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 3,
                span: 12,
              }}
            >
              <InputNumber
                style={{ width: "100%", backgroundColor: "#dbdbdb" }}
                readOnly
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="btnPrimary">
                Update Collection Date
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="financeCards" style={{ width: "50%" }}>
          <h3>
            Reporting details{" "}
            <small style={{ color: "black", fontSize: "12px", margin: "30px" }}>
              2079/04/01
            </small>
          </h3>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Result Date"
              name="result date"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your username!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <DatePicker
                onChange={(e) => {
                  setResultDate(e.format("YYYY-MM-DD"));
                }}
                style={{ width: "100%", marginLeft: "38px" }}
              />
            </Form.Item>

            <Form.Item
              label="Result Time"
              name="result time"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 4,
                span: 12,
              }}
            >
              <TimePicker
                initialValues={moment("12:08:23", "HH:mm:ss")}
                style={{ width: "100%", marginLeft: "38px" }}
              />
            </Form.Item>
            <Form.Item
              label="Nep. Collection Date"
              name="nepCollectionDateResult"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your password!",
              //   },
              // ]}
              wrapperCol={{
                offset: 3,
                span: 12,
              }}
            >
              <InputNumber
                style={{ width: "100%", backgroundColor: "#dbdbdb" }}
                readOnly
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="btnPrimary">
                Update Result Date
              </Button>
            </Form.Item>
          </Form>
        </div>
      </TwoDiv>
    </>
  );
}

export default DateChange;

const TwoDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
