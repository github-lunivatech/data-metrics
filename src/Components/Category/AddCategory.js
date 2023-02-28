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
  getItemCategoryApi,
  insertItemCategoryApi,
} from "../../services/itemCategoryService";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddCategory = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;
  const category = useSelector((state) => state.category);
  const [previousValues, setpreviousValues] = useState(
    forEdit ? category?.category[CuId] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(
        getItemCategoryApi((val) => {
          setpreviousValues(val[0]);
        }, CuId)
      );
    }
  }, []);

  useEffect(() => {
    setpreviousValues(category?.category[CuId]);
  }, [category?.category[CuId]]);

  useEffect(() => {
    if (previousValues !== undefined) form.resetFields();
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      CId: forEdit ? CuId : 0,
      CategoryType: values?.cate_type,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertItemCategoryApi(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          // message.success(res?.Message);
          notification.success({
            duration: 3,
            placement: "topRight",
            message: res?.Message,
            rtl: true,
          });
          setTimeout(() => {
            // window.location.reload(false);
            history.push({
              pathname: "/category",
              state: inventoryStat,
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
            name="add_items"
            {...formItemLayout}
            initialValues={prevVal}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Category Type"
              name="cate_type"
              rules={[
                {
                  required: true,
                  message: "Please input category type!",
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
    </AddCategoryContainer>
  );
};

export default AddCategory;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
