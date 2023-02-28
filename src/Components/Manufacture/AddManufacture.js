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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getManuDetApi,
  insertManufactureApi,
} from "../../services/itemManufactureService";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddManufacture = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const RId = props?.match?.params?.id;
  const manuReducer = useSelector((state) => state.manu);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? manuReducer?.manus[RId] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getManuDetApi((value) => {}, RId));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(manuReducer?.manus[RId]);
  }, [manuReducer?.manus[RId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      MId: forEdit ? RId : 0,
      ManufactureBY: values?.ManufactureBY,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertManufactureApi(data, (res) => {
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
              pathname: "/manufacture",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          //   message.error("Something went wrong. Try again");
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Something went wrong please try again",
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
    <AddManufactureContainer>
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
              label="Manufacture BY"
              name="ManufactureBY"
              rules={[
                {
                  required: true,
                  message: "Please input Manufacture BY!",
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
    </AddManufactureContainer>
  );
};

export default AddManufacture;

const AddManufactureContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
