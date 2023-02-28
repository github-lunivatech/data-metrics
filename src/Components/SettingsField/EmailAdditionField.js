import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Switch,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  GetEmailServerDetails,
  InsertUpdateEmailserverDetails,
} from "../../services/datametricService";
import { formItemLayout } from "../Common/FormItemLayout";
import { carelabStat } from "../Common/StateList";
const EmailAdditionField = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [datainsert, setDatainsert] = useState([]);
  const [useridselected, setuseriddetails] = useState();
  // console.log(props, "props");
  const alllistedvalue = props.location.state.record;
  // console.log("this is the prop", alllistedvalue);
  const CID = props?.match?.params?.id;
  console.log(CID, "i am props id");

  useEffect(() => {
    if (forEdit && alllistedvalue === undefined) {
      dispatch(
        GetEmailServerDetails((val) => {
          console.log(val, "vals");
        }, CID)
      );
    }
  }, []);

  useEffect(() => {
    let data = {
      id: CID,
    };
    dispatch(
      GetEmailServerDetails(data, (val) => {
        console.log(data, "iam all data of server details");
        console.log(val[0], "iam vals iam all data of server details");
        let userdtat = val[0];
        // setpreviousValues(val[0]);
        setuseriddetails(val[0]);
        // let finalres = val[0];
        // setuseriddetails(finalres);
        const array = val;
        console.log(finalres, "finalres");

        // const newObject = Object.assign(
        //   {},
        //   ...array.map((item) => ({
        //     ["Id"]: item.Id,
        //     ["Port"]: item.Port,
        //     ["Host"]: item.Host,
        //     ["UserName"]: item.UserName,
        //     ["Password"]: item.Password,
        //     ["From"]: item.From,
        //     ["IsActive"]: item.IsActive,
        //     ["Bcc"]: item.Bcc,
        //   }))
        // );
        // console.log(newObject, "newobject");
        // setuseriddetails(newObject);
      })
    );
    // form.setFieldsValue({
    //   Port: useridselected.Port,
    //   UserName: UserName,
    // });
  }, []);
  // useEffect(() => form.resetFields(), [props.initialValues]);
  useEffect(() => {
    if (useridselected === undefined) {
      Host: "";
    }
    console.log(useridselected, "useridselected");
    const selecteddata = useridselected;
  }, [useridselected]);

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      Id: forEdit ? CID : 0,
      Host: values?.Host,
      Port: values?.Port,
      UserName: values?.UserName,
      Password: values?.Password,
      From: values?.From,
      Bcc: values?.Bcc,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };

    dispatch(
      InsertUpdateEmailserverDetails(data, (res) => {
        console.log(data, "dataofinsert");
        setDatainsert(data);
        console.log(res, "responsedata");
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
              pathname: "/settingsemail",
              state: carelabStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Something went wrong please try again",
            rtl: true,
          });
        }
      })
    );
    form.resetFields();
  };

  useEffect(() => {
    if (useridselected !== undefined) form.resetFields();
  }, [useridselected]);
  const onFinishFailed = (errorInfo) => {
    setButDis(false);
  };

  return (
    <div>
      <EmailAddField Field>
        <Row justify="center" gutter={16}>
          <Col
            sm={20}
            md={24}
            xs={20}
            lg={18}
            xl={14}
            className="description-box"
          >
            <Form
              form={form}
              {...formItemLayout}
              initialValues={useridselected}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="HostName"
                name="Host"
                placeholder="Host"
                values="Host"
                rules={[
                  {
                    required: true,
                    message: "Please input hostname !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Port"
                name="Port"
                rules={[
                  {
                    required: true,
                    message: "Please input port num !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="UserName"
                name="UserName"
                rules={[
                  {
                    required: true,
                    message: "Please input username !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input the password !",
                  },
                ]}
              >
                <Input.Password placeholder="input password" />
              </Form.Item>
              <Form.Item
                label="From"
                name="From"
                rules={[
                  {
                    required: true,
                    message: "Please input from name !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Bcc"
                name="Bcc"
                rules={[
                  {
                    required: true,
                    message: "Please input bcc !",
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
      </EmailAddField>
    </div>
  );
};

export default EmailAdditionField;
const EmailAddField = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
`;
