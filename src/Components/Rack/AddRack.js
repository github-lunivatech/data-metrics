import { Form, Input, Button, Select, message, Row, Col, Switch } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getLocationApi } from "../../services/itemLocationService";
import {
  getRackDetApi,
  insertRackDetailsApi,
} from "../../services/itemRackService";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddRack = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [locationList, setlocationList] = useState([]);
  const locateId = props?.match?.params?.locate;
  const RId = props?.match?.params?.id;
  const rackReducer = useSelector((state) => state.racks);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? rackReducer?.racks[RId] : {}
  );

  useEffect(() => {
    dispatch(
      getLocationApi((val) => {
        setlocationList(val);
      })
    );

    if (forEdit && previousValues === undefined) {
      dispatch(getRackDetApi(locateId, (value) => {}));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(rackReducer?.racks[RId]);
  }, [rackReducer?.racks[RId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      RId: forEdit ? RId : 0,
      RackCode: values?.RackCode,
      RackName: values?.RackName,
      LocationId: values?.LocationId,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertRackDetailsApi(data, (res) => {
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
              pathname: "/rack",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          // message.error('Something went wrong. Try again')
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
    <AddRackContainer>
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
              label="Rack Code"
              name="RackCode"
              rules={[
                {
                  required: true,
                  message: "Please input rack code!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Rack name"
              name="RackName"
              rules={[
                {
                  required: true,
                  message: "Please input Rack name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Location"
              name="LocationId"
              rules={[
                {
                  required: true,
                  message: "Please select Location!",
                },
              ]}
            >
              <Select allowClear>
                {locationList?.map((iTy) => {
                  return (
                    <Option value={iTy?.LId} key={iTy?.Location}>
                      {iTy?.Location}
                    </Option>
                  );
                })}
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
    </AddRackContainer>
  );
};

export default AddRack;

const AddRackContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
