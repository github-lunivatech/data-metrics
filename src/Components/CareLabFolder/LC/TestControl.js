import {
  Form,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Switch,
  message,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useControlDetails } from "../../../CustomHook/useControlDetails";
import {
  getControlTestListApi,
  getListOfControlWiseSDApi,
  setControlWiseSDApi,
} from "../../../services/qcService";
import { formItemLayout } from "../../Common/FormItemLayout";
import { tokenString } from "../../Common/HandleUser";
import moment from "moment";
import { carelabStat, misStat } from "../../Common/StateList";

const TestControl = (props) => {
  const history = useHistory();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;
  const SId = props?.match?.params?.SId;
  const category = useSelector((state) => state.testcontrol);
  const [previousValues, setpreviousValues] = useState(
    forEdit ? category?.testcontrols[SId] : {}
  );
  const [controlTestList, setControlTestList] = useState([]);
  const controlList = useControlDetails();

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      let newD = {
        analyzerId: CuId,
      };
      dispatch(
        getListOfControlWiseSDApi(newD, (res) => {
          getControlFun(res[0]?.TestId);
        })
      );
    }
  }, []);

  useEffect(() => {
    setpreviousValues(category?.testcontrols[SId]);
    getControlFun(CuId);
  }, [category?.testcontrols[SId]]);

  useEffect(() => {
    if (previousValues !== undefined) form.resetFields();
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      SId: forEdit ? SId : 0,
      TestId: values.TestId,
      ControlId: values.ControlId,
      AverageValue: values.AverageValue,
      ISDMax: values.ISDMax,
      IISDMax: values.IISDMax,
      IIISDMax: values.IIISDMax,
      ISDMin: values.ISDMin,
      IISDMin: values.IISDMin,
      IIISDMin: values.IIISDMin,
      EntryDate: forEdit
        ? moment().format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      UserId: tokenString.token.UId,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      setControlWiseSDApi(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          // message.success(res?.Message)
          notification.success({
            duration: 3,
            placement: "topRight",
            message: res?.Message,
            rtl: true,
          });
          setTimeout(() => {
            history.push({
              pathname: "/viewtestcontrol",
              state: misStat,
            });
          }, 1000);
        } else {
          setButDis(false);
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
      cate_type: previousValues["CategoryType"],
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
                  message: "Please input control!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Control"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                style={{ width: "100%" }}
                size="default"
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
              label="Average Value"
              name="AverageValue"
              rules={[
                {
                  required: true,
                  message: "Please input Min Value!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="+1SD"
              name="ISDMax"
              rules={[
                {
                  required: true,
                  message: "Please input +1SD!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="+2SD"
              name="IISDMax"
              rules={[
                {
                  required: true,
                  message: "Please input +2SD!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="+3SD"
              name="IIISDMax"
              rules={[
                {
                  required: true,
                  message: "Please input +3SD!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="-1SD"
              name="ISDMin"
              rules={[
                {
                  required: true,
                  message: "Please input -1SD!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="-2SD"
              name="IISDMin"
              rules={[
                {
                  required: true,
                  message: "Please input -2SD!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
            </Form.Item>

            <Form.Item
              label="-3SD"
              name="IIISDMin"
              rules={[
                {
                  required: true,
                  message: "Please input -3SD!",
                },
              ]}
            >
              <InputNumber keyboard={false} style={{ width: "100%" }} min={0} />
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

export default TestControl;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
