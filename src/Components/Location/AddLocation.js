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
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getLocationApi,
  insertLocationApi,
} from "../../services/itemLocationService";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddLocation = (props) => {
  // const { Option } = Select;
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const LId = props?.match?.params?.id;
  const locationReducer = useSelector((state) => state.locations);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? locationReducer?.locations[LId] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getLocationApi((val) => {}));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(locationReducer?.locations[LId]);
  }, [locationReducer?.locations[LId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      LId: forEdit ? LId : 0,
      LCode: values?.LCode,
      Location: values?.Location,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertLocationApi(data, (res) => {
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
              pathname: "/location",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Something went wrong, Try again",
            rtl: true,
          });
        }
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    setButDis(false);
  };

  return (
    <AddLocationContainer>
      <Row justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            initialValues={previousValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Location Code"
              name="LCode"
              rules={[
                {
                  required: true,
                  message: "Please input location code!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Location name"
              name="Location"
              rules={[
                {
                  required: true,
                  message: "Please input Location name!",
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
    </AddLocationContainer>
  );
};

export default AddLocation;

const AddLocationContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
