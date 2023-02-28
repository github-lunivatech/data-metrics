import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Switch,
  Select,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { formItemLayout } from "../Common/FormItemLayout";
import { useHistory } from "react-router-dom";
import {
  consumptionGroupApi,
  consumptionLookupApi,
  insertConsumptionLookupApi,
} from "../../services/consumptionService";
import { getTestListApi } from "../../services/itemVsRatioService";
import { inventoryStat } from "../Common/StateList";

const AddConsumptionLook = (props) => {
  const { forEdit } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [butDis, setButDis] = useState(false);
  const CId = props?.match?.params?.id;
  const consumptionReducer = useSelector((state) => state.consumption);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? consumptionReducer?.consumptionLook[CId] : {}
  );
  const [conGroup, setconGroup] = useState([]);
  const [testList, settestList] = useState([]);

  useEffect(() => {
    dispatch(
      consumptionGroupApi((val) => {
        setconGroup(val);
      })
    );

    dispatch(
      getTestListApi((val) => {
        settestList(val);
      })
    );

    if (forEdit && previousValues === undefined) {
      dispatch(consumptionLookupApi((val) => {}));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(consumptionReducer?.consumptionLook[CId]);
  }, [consumptionReducer?.consumptionLook[CId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      CId: forEdit ? CId : 0,
      ConsumptionGroupId: values?.ConsumptionGroupId,
      TestId: values?.TestId,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertConsumptionLookupApi(data, (res) => {
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
              pathname: "/consumptionlook",
              state: inventoryStat,
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

  let prevVal = {};
  if (previousValues !== undefined && forEdit === true) {
    prevVal = {
      ...previousValues,
    };
  }

  return (
    <AddConsumptionLookContainer>
      <Row justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="add_cons"
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Group Name"
              name="ConsumptionGroupId"
              rules={[
                {
                  required: true,
                  message: "Please select group name!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select a group"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {conGroup?.map((iTy) => (
                  <Option
                    title={iTy?.ConsumptionGroupName}
                    key={iTy?.CGId}
                    value={iTy?.CGId}
                  >
                    {iTy?.ConsumptionGroupName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Test Name"
              name="TestId"
              rules={[
                {
                  required: true,
                  message: "Please select test name!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select a test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {testList?.map((iTy) => (
                  <Option title={iTy?.Testname} key={iTy?.Id} value={iTy?.Id}>
                    {iTy?.Testname}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Is Active"
              name="IsActive"
              valuePropName="checked"
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
                {forEdit ? "Edit" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AddConsumptionLookContainer>
  );
};

export default AddConsumptionLook;

const AddConsumptionLookContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
