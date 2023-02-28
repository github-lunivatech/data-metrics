import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Switch,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { formItemLayout } from "../Common/FormItemLayout";
import { useHistory } from "react-router-dom";
import {
  consumptionGroupApi,
  insertUpdateConsumptionGroupApi,
} from "../../services/consumptionService";
import { inventoryStat } from "../Common/StateList";

const AddConsumptionGroup = (props) => {
  const { forEdit } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [butDis, setButDis] = useState(false);
  const CGId = props?.match?.params?.id;
  const consumptionReducer = useSelector((state) => state.consumption);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? consumptionReducer?.consumption[CGId] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(consumptionGroupApi((val) => {}));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(consumptionReducer?.consumption[CGId]);
  }, [consumptionReducer?.consumption[CGId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      CGId: forEdit ? CGId : 0,
      ConsumptionGroupName: values?.ConsumptionGroupName,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertUpdateConsumptionGroupApi(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          // message.success(res?.Message);
          notification.success({
            duration: 3,
            placement: "topRight",
            message: res?.Message,
            rtl: true,
          });
          setTimeout(() => {
            history.push({
              pathname: "/consumption",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          // message.error("Something went wrong Try again");
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
    <AddConsumptionGroupContainer>
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
              name="ConsumptionGroupName"
              rules={[
                {
                  required: true,
                  message: "Please input group name!",
                },
              ]}
            >
              <Input />
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
    </AddConsumptionGroupContainer>
  );
};

export default AddConsumptionGroup;

const AddConsumptionGroupContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
