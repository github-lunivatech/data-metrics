import React from "react";
import { Col, Input, Row, Select, Table, Form, Button } from "antd";
import AppButton from "../../Common/AppButton";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import Summery from "../../Common/Summery";
import { formItemLayout } from "../../Common/FormItemLayout";

const { Option } = Select;
const columns = [
  {
    title: "Id",
    dataIndex: "Id",
    key: "Id",
  },
  {
    title: "Test Name",
    dataIndex: "Test Name",
    key: "Test Name",
  },
  {
    title: "IsGointOut",
    dataIndex: "IsGointOut",
    key: "IsGointOut",
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "Price",
  },
  {
    title: "Discount Percentage",
    dataIndex: "Discount Percentage",
    key: "Discount Percentage",
  },
  {
    title: "Discount Amount",
    dataIndex: "Discount Amount",
    key: "Discount Amount",
  },
  {
    title: "Final Price",
    dataIndex: "Final Price",
    key: "Final Price",
  },
  {
    title: "Action",
    dataIndex: "Action",
    key: "Action",
  },
];

const Index = () => {
  const [form] = Form.useForm();
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Edit Bills"} />
        <Filter getFiscalYear serchButton />
      </div>
      <div className="financeCards">
        <Summery></Summery>
      </div>
      <div className="mainContainer">
        <Row gutter={16}>
          <Col span={14}>
            <div className="financeCards">
              <h4>Test Details</h4>
              <hr />
              <Row align="bottom" gutter={16}>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <span className="labelTop">Requestors List</span>
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Select Requestor"
                    filterOption={(input, option) => {
                      return (
                        option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                          0 ||
                        option.title
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    style={{ width: "100%" }}
                    onChange={(val) => {
                      setrequestorId(val);
                    }}
                    size="default"
                  >
                    <Option title="All" key="0" value="0">
                      self
                    </Option>
                    <Option title="All" key="1" value="0">
                      selft one
                    </Option>
                    <Option title="All" key="2" value="0">
                      self two
                    </Option>
                  </Select>
                </Col>
                <Col>
                  <AppButton
                    className="primary-btn"
                    buttonTitle="Load"
                    buttonOnClick={() => {
                      handleClicker();
                    }}
                    priamryOutlineBtn
                  />
                </Col>
              </Row>
              <div className="">
                <Table
                  className="tableWidth"
                  columns={columns}
                  dataSource={""}
                ></Table>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div className="financeCards">
              <h4>Bill Details</h4>
              <hr />
              <Row justify="center">
                <Col span={24}>
                  <Form
                    form={form}
                    // name="add_cons"
                    {...formItemLayout}
                    // initialValues={prevVal}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Discout Amount"
                      name="ConsumptionGroupName"
                      rules={[
                        {
                          required: true,
                          message: "Please input group name!",
                        },
                      ]}
                      wrapperCol={{
                        offset: 2,
                        span: 12,
                      }}
                      labelCol={{
                        span: 7,
                        offset: 0,
                      }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Total Amount"
                      name="ConsumptionGroupName"
                      rules={[
                        {
                          required: true,
                          message: "Please input group name!",
                        },
                      ]}
                      wrapperCol={{
                        offset: 2,
                        span: 12,
                      }}
                      labelCol={{
                        span: 7,
                        offset: 0,
                      }}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Amount Paid"
                      name="ConsumptionGroupName"
                      rules={[
                        {
                          required: true,
                          message: "Please input group name!",
                        },
                      ]}
                      wrapperCol={{
                        offset: 2,
                        span: 12,
                      }}
                      labelCol={{
                        span: 7,
                        offset: 0,
                      }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Amount Remaining"
                      name="ConsumptionGroupName"
                      rules={[
                        {
                          required: true,
                          message: "Please input group name!",
                        },
                      ]}
                      wrapperCol={{
                        offset: 1,
                        span: 12,
                      }}
                      labelCol={{
                        span: 8,
                        offset: 0,
                      }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Payment Type"
                      name="ConsumptionGroupName"
                      rules={[
                        {
                          required: true,
                          message: "Please input group name!",
                        },
                      ]}
                      wrapperCol={{
                        offset: 2,
                        span: 12,
                      }}
                      labelCol={{
                        span: 7,
                        offset: 0,
                      }}
                    >
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="select Payment Type"
                        filterOption={(input, option) => {
                          return (
                            option.key
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0 ||
                            option.title
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                        onChange={""}
                        allowClear
                      >
                        <Option>potato</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                      labelCol={{
                        span: 7,
                        offset: 0,
                      }}
                    >
                      <Button htmlType="submit" className="btnPrimary">
                        Update Report
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Index;
