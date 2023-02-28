import { Row, Col, Select, Button, Form, DatePicker, Input } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useControlDetails } from "../../CustomHook/useControlDetails";
import { useFiscalYear } from "../../CustomHook/useFiscalYear";
import { getControlTestListApi } from "../../services/qcService";
import AppButton from "./AppButton";

const CarelabFilter = (props) => {
  const {
    returnFilterData,
    showTestControlList,
    showControlDetails,
    showFromToDate,
    showLevel,
    showSampleIdFromTo,
    fiscalService,
    showSampleId,
    getRequestor,
  } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const controlList = useControlDetails();
  const [testList, setTestList] = useState([]);
  const [dateRange, setDateRange] = useState([moment(), moment()]);
  const fiscalYear = useFiscalYear();

  const initialValues = {
    SingleDate: moment(),
  };

  const onFilterReturn = (res) => {
    console.log(res, "resres");
    if (dateRange !== null && undefined) {
      returnFilterData(dateRange);
    } else {
      returnFilterData(res);
    }
  };

  const callTestData = (res) => {
    testListData(res);
  };

  const testListData = (newData) => {
    let oData = {
      analyzerId: newData,
    };
    dispatch(
      getControlTestListApi(oData, (res) => {
        setTestList(res);
      })
    );
  };

  return (
    <FilterContainer>
      <Form
        form={form}
        autoComplete="off"
        onFinish={onFilterReturn}
        layout={"vertical"}
        initialValues={initialValues}
      >
        <Row justify="space-between" align="bottom">
          <Col lg={24} md={24} sm={24}>
            <Row className="filterRow" align="bottom">
              {showFromToDate && (
                <Col lg={6} md={12} sm={12} xs={24}>
                  <Form.Item name="FromTo" label="From - To">
                    <RangePicker
                      initialValues={dateRange}
                      onChange={(value) => {
                        setDateRange(value);
                      }}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              )}
              {showTestControlList && (
                <Col lg={4} md={12} sm={12} xs={24}>
                  <Form.Item name="controlId" label="Test Control ">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Test Control"
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
                      allowClear
                      onChange={callTestData}
                    >
                      {controlList?.map(
                        (cList) =>
                          cList?.IsActive === true && (
                            <Option
                              title={cList?.ControlName}
                              key={cList?.CId}
                              value={cList?.CId}
                            >
                              {cList?.ControlName}
                            </Option>
                          )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {showControlDetails && (
                <Col lg={4} md={12} sm={12} xs={24}>
                  <Form.Item name="testId" label="Test">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Test"
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
                      allowClear
                    >
                      {testList?.map(
                        (cList) =>
                          cList?.IsActive === true && (
                            <Option
                              title={cList?.TestName}
                              key={cList?.TId}
                              value={cList?.TId}
                            >
                              {cList?.TestName}
                            </Option>
                          )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {showLevel && (
                <Col lg={4} md={12} sm={12} xs={24}>
                  <Form.Item name="levelId" label="Level">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Level"
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
                      allowClear
                    >
                      <Option title={"All"} key={"All"} value={"All"}>
                        {"All"}
                      </Option>
                      <Option
                        title={"Level 1"}
                        key={"Level 1"}
                        value={"Level 1"}
                      >
                        {"Level 1"}
                      </Option>
                      <Option
                        title={"Level 2"}
                        key={"Level 2"}
                        value={"Level 2"}
                      >
                        {"Level 2"}
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}

              {fiscalService && (
                <>
                  <Col lg={4} md={10} sm={12} xs={24}>
                    <Form.Item name="fiscalYear" label="Fiscal Year">
                      <Select style={{ width: "100%" }} size="default">
                        {fiscalYear.map((lis) => (
                          <Option
                            title={lis?.Year}
                            key={lis?.Id}
                            value={lis?.Id}
                          >
                            {lis?.Year}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </>
              )}
              {showSampleIdFromTo && (
                <>
                  <Col lg={4} md={12} sm={12} xs={24}>
                    <Form.Item name="sampleIdFrom" label="Sample Id From">
                      <Input placeholder="Sample Id From" />
                    </Form.Item>
                  </Col>
                  <Col lg={4} md={12} sm={12} xs={24}>
                    <Form.Item name="sampleIdTo" label="Sample Id To">
                      <Input placeholder="Sample Id to" />
                    </Form.Item>
                  </Col>
                </>
              )}

              {showSampleId && (
                <>
                  <Col lg={4} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="memberCode"
                      label={showSampleId != "" ? showSampleId : "Sample Code"}
                    >
                      <Input
                        placeholder={
                          showSampleId != "" ? showSampleId : "Sample Code"
                        }
                      />
                    </Form.Item>
                  </Col>
                </>
              )}
              {getRequestor && (
                <Col lg={6} md={9} sm={11} xs={22}>
                  <Form.Item name="requestor" label="Requestor">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      placeholder="Select Requestor"
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
                      style={{ width: "100%" }}
                      size="default"
                    >
                      <Option title="All" key="0" value="0">
                        Self
                      </Option>
                      <Option title="All" key="0" value="0">
                        Sukrim Pharmacy
                      </Option>
                      <Option title="All" key="0" value="0">
                        Everest Hospital Pvt.Ltd
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}

              <Col>
                <Form.Item>
                  <AppButton
                    className="primary-btn load-btn"
                    buttonTitle="Load"
                    buttonOnClick={() => {
                      form.submit();
                    }}
                    LoadprimaryBtn
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </FilterContainer>
  );
};

export default CarelabFilter;

const FilterContainer = styled.div`
  padding: 5px;

  .filterRow > div {
    padding: 4px;
  }

  .labelTop {
    display: block;
  }
`;
