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
  getItemUnitApi,
  insertItemUnitApi,
} from "../../services/itemUnitService";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddUnits = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const unId = props?.match?.params?.id;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const unitReducer = useSelector((state) => state.units);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? unitReducer?.units[unId] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getItemUnitApi((val) => {}, unId));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(unitReducer?.units[unId]);
  }, [unitReducer?.units[unId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      UnId: forEdit ? unId : 0,
      Units: values?.unit_name,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertItemUnitApi(data, (res) => {
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
              pathname: "/units",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          // message.error("Something went wrong please try again");
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

  let prevVal = {};
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
      unit_name: previousValues?.Units,
    };
  }

  return (
    <AddUnitsContainer>
      <Row justify="center">
        <Col span={16}>
          <Form
            name="add_items"
            form={form}
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Unit Name"
              name="unit_name"
              rules={[
                {
                  required: true,
                  message: "Please input unit name!",
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
    </AddUnitsContainer>
  );
};

export default AddUnits;

const AddUnitsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
