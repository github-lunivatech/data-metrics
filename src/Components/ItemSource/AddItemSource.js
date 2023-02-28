import {
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Switch,
  DatePicker,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  getItemSourceDetApi,
  insertItemSourceDetApi,
} from "../../services/itemSourceService";
import { formItemLayout } from "../Common/FormItemLayout";
import { tokenString } from "../Common/HandleUser";
import { inventoryStat } from "../Common/StateList";
import moment from "moment";

const AddItemSource = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const TId = props?.match?.params?.id;
  const itemTypeReducer = useSelector((state) => state.itemSource);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? itemTypeReducer?.newItems[TId] : {}
  );

  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getItemSourceDetApi((val) => {}));
    }
  }, []);

  useEffect(() => {
    setPreviousValues(itemTypeReducer?.newItems[TId]);
  }, [itemTypeReducer?.newItems[TId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      Id: forEdit ? TId : 0,
      ItemSource: values?.ItemSource,
      UserId: tokenString.token.UId,
      EntryDate: values?.EntryDate.format("YYYY-MM-DD"),
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertItemSourceDetApi(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          notification.success({
            duration: 3,
            placement: "topRight",
            message: res?.Message,
            rtl: true,
          });
          setTimeout(() => {
            history.push({
              pathname: "/itemsource",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          //   message.error("Something went wrong. Try again");
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Something went wrong. Try again",
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
      EntryDate: moment(previousValues?.EntryDate),
    };
  }

  return (
    <AddItemSourceContainer>
      <Row justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Item Source"
              name="ItemSource"
              rules={[
                {
                  required: true,
                  message: "Please input item source!",
                },
              ]}
            >
              <Input />
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
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
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
    </AddItemSourceContainer>
  );
};

export default AddItemSource;

const AddItemSourceContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
