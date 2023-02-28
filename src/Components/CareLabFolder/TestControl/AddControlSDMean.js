import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Switch,
  message,
  Select,
  InputNumber,
  DatePicker,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getControlDetailsApi,
  getControlSDMeanCVApi,
  getControlTestListApi,
  setControlWiseSDMeanCVApi,
} from "../../../services/qcService";
import { formItemLayout } from "../../Common/FormItemLayout";
import { tokenString } from "../../Common/HandleUser";
import moment from "moment";
import { carelabStat, misStat } from "../../Common/StateList";
import { useControlDetails } from "../../../CustomHook/useControlDetails";

const AddControlSDMean = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;
  const ControlId = props?.match?.params?.cid;
  const TeId = props?.match?.params?.tid;
  const EDate = props?.match?.params?.ent;
  const category = useSelector((state) => state.testcontrol);
  const [previousValues, setpreviousValues] = useState(
    forEdit ? category?.testcontrolSDlistData[CuId] : {}
  );
  const controlList = useControlDetails();
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      let newData = {
        analyzerId: ControlId,
        testid: TeId,
        from: EDate,
        to: EDate,
      };
      dispatch(getControlSDMeanCVApi(newData, (res) => {}));
    }
  }, []);

  useEffect(() => {
    setpreviousValues(category?.testcontrolSDlistData[CuId]);
    testListData(ControlId);
  }, [category?.testcontrolSDlistData[CuId]]);

  useEffect(() => {
    if (previousValues !== undefined) form.resetFields();
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      CId: forEdit ? CuId : 0,
      ControlId: values?.ControlId,
      TestId: values?.TestId,
      Mean: values?.Mean,
      SD: values?.SD,
      CV: values?.CV,
      // "EntryDate": forEdit ? moment().format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      EntryDate: values?.EntryDate.format("YYYY-MM-DD"),
      UserId: tokenString.token.UId,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
      QcLevel: values?.QcLevel,
    };
    dispatch(
      setControlWiseSDMeanCVApi(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          //   message.success(res?.Message);
          notification.success({
            duration: 3,
            placement: "topRight",
            message: res?.Message,
            rtl: true,
          });
          setTimeout(() => {
            history.push({
              pathname: "/viewcontrolsdmean",
              state: misStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          //   message.error("Something went wrong Try again");
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Something went wrong Try again",
            rtl: true,
          });
        }
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false);
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

  let prevVal = {};
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      EntryDate: moment(previousValues.EntryDate),
    };
  }
  return (
    <AddCategoryContainer>
      <Row justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="add_testcontrol"
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Control"
              name="ControlId"
              rules={[
                {
                  required: true,
                  message: "Please select control name!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Test Control"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

            <Form.Item
              label="Test"
              name="TestId"
              rules={[
                {
                  required: true,
                  message: "Please select Test name!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

            <Form.Item
              label="Mean"
              name="Mean"
              rules={[
                {
                  required: true,
                  message: "Please select Mean!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                keyboard={false}
                step={0.01}
              />
            </Form.Item>

            <Form.Item
              label="SD"
              name="SD"
              rules={[
                {
                  required: true,
                  message: "Please select SD!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                keyboard={false}
                step={0.01}
              />
            </Form.Item>

            <Form.Item
              label="CV"
              name="CV"
              rules={[
                {
                  required: true,
                  message: "Please select CV!",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                keyboard={false}
                step={0.01}
              />
            </Form.Item>

            <Form.Item
              label="Qc Level"
              name="QcLevel"
              rules={[
                {
                  required: true,
                  message: "Please input Qc Level!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Level"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                <Option title={"All"} key={"All"} value={"All"}>
                  {"All"}
                </Option>
                <Option title={"Level 1"} key={"Level 1"} value={"Level 1"}>
                  {"Level 1"}
                </Option>
                <Option title={"Level 2"} key={"Level 2"} value={"Level 2"}>
                  {"Level 2"}
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Entry Date"
              name="EntryDate"
              rules={[
                {
                  required: true,
                  message: "Please input Entry Date!",
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Is Active"
              name="IsActive"
              valuePropName="checked"
              offset={3}
            >
              <Switch defaultChecked />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                htmlType="submit"
                disabled={butDis}
                className="btnPrimary"
              >
                {forEdit ? "Edit" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AddCategoryContainer>
  );
};

export default AddControlSDMean;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
