import {
  Form,
  Input,
  Button,
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
import {
  getControlDetailsApi,
  getControlTestListApi,
  setControlDetailsApi,
} from "../../../services/qcService";
import { formItemLayout } from "../../Common/FormItemLayout";
import { tokenString } from "../../Common/HandleUser";
import moment from "moment";
import { carelabStat } from "../../Common/StateList";

const AddControl = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const CuId = props?.match?.params?.id;

  const category = useSelector((state) => state.testcontrol);
  console.log(category, "i am category");
  const [previousValues, setpreviousValues] = useState(
    forEdit ? category?.testcontrollist[CuId] : {}
  );

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getControlDetailsApi((res) => {}));
    }
  }, []);

  useEffect(() => {
    setpreviousValues(category?.testcontrollist[CuId]);
  }, [category?.testcontrollist[CuId]]);

  useEffect(() => {
    if (previousValues !== undefined) form.resetFields();
  }, [previousValues]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      CId: forEdit ? CuId : 0,
      ControlCode: values?.ControlCode,
      ControlName: values?.ControlName,
      ControlDescription: values?.ControlDescription,
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
      setControlDetailsApi(data, (res) => {
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
              pathname: "/viewcontroltest",
              state: carelabStat,
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
  if (previousValues !== undefined) {
    prevVal = {
      ...previousValues,
    };
  }
  return (
    <AddCategoryContainer>
      <Row justify="center">
        <Col sm={20} md={24} xs={20} lg={18} xl={14}>
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
              label="Control Code"
              name="ControlCode"
              rules={[
                {
                  required: true,
                  message: "Please input control code!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Control Name"
              name="ControlName"
              rules={[
                {
                  required: true,
                  message: "Please input control name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="control-descplabel"
              label="Control Description"
              name="ControlDescription"
              rules={[
                {
                  required: true,
                  message: "Please input control description!",
                },
              ]}
            >
              <TextArea />
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

export default AddControl;

const AddCategoryContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  /* .control-descplabel{

  } */
`;
