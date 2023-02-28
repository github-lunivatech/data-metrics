import {
  Form,
  Button,
  Row,
  Col,
  Switch,
  message,
  InputNumber,
  DatePicker,
  Select,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useControlDetails } from "../../../CustomHook/useControlDetails";
import {
  getControlTestListApi,
  getControlValueByControlTestIdApi,
  setControlValueApi,
} from "../../../services/qcService";
import { formItemLayout } from "../../Common/FormItemLayout";
import { tokenString } from "../../Common/HandleUser";
import { carelabStat, misStat } from "../../Common/StateList";
import moment from "moment";

const AddData = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;
  const TId = props?.match?.params?.tid;
  const category = useSelector((state) => state.testcontrol);
  const [previousValues, setpreviousValues] = useState(
    forEdit ? category?.testcontrollistData[CuId] : {}
  );
  const controlList = useControlDetails();
  const [controlTestList, setControlTestList] = useState([]);

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(
        getControlValueByControlTestIdApi({ analyzerId: CuId }, (res) => {})
      );
    }
  }, []);

  useEffect(() => {
    setpreviousValues(category?.testcontrollistData[CuId]);
    getControlFun(TId);
  }, [category?.testcontrollistData[CuId], TId]);

  useEffect(() => {
    if (previousValues !== undefined) form.resetFields();
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      QId: forEdit ? CuId : 0,
      ControlTestId: values?.ControlTestId,
      TestId: values?.TestId,
      ControlValue: values?.ControlValue,
      QCDate: values?.QCDate.format("YYYY-MM-DD"),
      UserId: tokenString.token.UId,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      setControlValueApi(data, (res) => {
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
              pathname: "/lcchart",
              // state: carelabStat,
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

  const changeAnalyzerId = (e) => {
    getControlFun(e);
  };

  function getControlFun(e) {
    const newData = {
      analyzerId: e,
    };
    dispatch(
      getControlTestListApi(newData, (res) => {
        setControlTestList(res);
      })
    );
  }

  let prevVal = {};
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      QCDate: moment(previousValues.QCDate),
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
              label="Control Test"
              name="ControlTestId"
              rules={[
                {
                  required: true,
                  message: "Please input control test!",
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
                onChange={(e) => changeAnalyzerId(e)}
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
                  message: "Please input Test!",
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
                style={{ width: "100%" }}
                size="default"
              >
                {controlTestList?.map(
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
              label="Control Value"
              name="ControlValue"
              rules={[
                {
                  required: true,
                  message: "Please input control value!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} keyboard={false} />
            </Form.Item>

            <Form.Item
              label="QC Date"
              name="QCDate"
              rules={[
                {
                  required: true,
                  message: "Please input QC Date!",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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

export default AddData;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
