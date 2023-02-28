import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Switch,
  message,
  Select,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getControlDetailsApi,
  getControlTestListApi,
  setControlDetailsApi,
  setTestControlTestApi,
} from "../../../services/qcService";
import { formItemLayout } from "../../Common/FormItemLayout";
import { tokenString } from "../../Common/HandleUser";
import moment from "moment";
import { carelabStat } from "../../Common/StateList";
import { getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi } from "../../../services/Tat";

const AddControlTest = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;
  const category = useSelector((state) => state.testcontrol);
  const [previousValues, setpreviousValues] = useState(
    forEdit ? category?.testcontrollisttest[CuId] : {}
  );
  const [labTestList, setLabTestList] = useState([]);

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getControlTestListApi({ analyzerId: CuId }, (res) => {}));
    }

    dispatch(
      getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi((res) => {
        setLabTestList(res);
      })
    );
  }, []);

  useEffect(() => {
    setpreviousValues(category?.testcontrollisttest[CuId]);
  }, [category?.testcontrollisttest[CuId]]);

  useEffect(() => {
    if (previousValues !== undefined) form.resetFields();
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      TId: forEdit ? CuId : 0,
      TestCode: values?.TestCode,
      TestName: values?.TestName,
      TestDescription: values?.TestDescription,
      LabTestId: values?.LabTestId,
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
      setTestControlTestApi(data, (res) => {
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
              pathname: "/viewcontroltesttest",
              state: carelabStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          // message.error('Something went wrong Try again')
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

  let prevVal = {};
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
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
              label="Test Code"
              name="TestCode"
              rules={[
                {
                  required: true,
                  message: "Please input test code!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Test Name"
              name="TestName"
              rules={[
                {
                  required: true,
                  message: "Please input test name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Test Description"
              name="TestDescription"
              rules={[
                {
                  required: true,
                  message: "Please input test description!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Lab Test"
              name="LabTestId"
              rules={[
                {
                  required: true,
                  message: "Please input lab test!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Lab test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {labTestList?.map((cList) => (
                  <Option
                    title={cList?.TestName}
                    key={cList?.Id}
                    value={cList?.Id}
                  >
                    {`${cList?.TestName} (${cList?.Specimen})`}
                  </Option>
                ))}
              </Select>
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

export default AddControlTest;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
