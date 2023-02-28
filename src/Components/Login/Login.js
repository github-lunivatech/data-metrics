import { message, notification } from "antd";
import pMinDelay from "p-min-delay";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useToken from "./useToken";
import { useDispatch } from "react-redux";
import { getLoginApi } from "../../services/loginService";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import logo from "../../assets/images/logobig1.png";
import crystslBkg from "../../assets/images/cover.jpg";

export default function Login() {
  const dispatch = useDispatch();
  const { token, setToken } = useToken();
  const history = useHistory();
  // const [tableData, setTableData] = useState([]);
  const [companyDetail, setcompanyDetail] = useState([]);
  // const [visible, setVisible] = useState();

  const onFinish = (values) => {
    let data = {
      user: values?.username,
      pass: values?.password,
    };
    // setToken({
    //   token: 'admin',
    //   username: 'admin',
    //   roleId: 1,
    //   UId: 1
    // })
    // history.push({
    //   pathname: '/'
    // })

    dispatch(
      getLoginApi(data, (val) => {
        if (val.length !== 0) {
          let andd = val?.CheckValidLoginForInventory;
          if (andd[0]?.usruserid > 0) {
            setToken({
              token: andd[0]?.usrUsername,
              username: andd[0]?.usrUsername,
              roleId: andd[0]?.usrrole,
              UId: andd[0]?.usruserid,
            });
            history.push({
              pathname: "/",
            });
            // pMinDelay(openNotification('topLeft'), 2000);
          } else {
            notification.error({
              duration: 3,
              placement: "topRight",
              message: "Username or password incorrect",
              rtl: true,
            });
          }
        } else {
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Username or password incorrect",
            rtl: true,
          });
        }
      })
    );
  };

  const onFinishFailed = (errorInfo) => {};

  // const getData = () => {
  //   const pushedArr = []
  //   dispatch(getItemNearApi(value => {
  //     value.forEach(ele => {
  //       pushedArr.push(ele);
  //     })
  //     setTableData(pushedArr)

  //   }))
  // }
  // useEffect(() => {
  //   getData();
  // }, [])

  // const openNotification = (placement) => {
  //   if (tableData.length >= 1) {
  //     notification.info({
  //       message: `Some items Are out of Stocks`,
  //       placement,
  //     })
  //   } else {

  //   }

  // };

  return (
    <LoginFormContainer>
      <div className="left">
        <img src={crystslBkg} alt="" />
      </div>
      <div className="right">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input autoFocus={true} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="powerd">
          <p>
            Powered by &copy;{" "}
            <span style={{ color: "#e95b29" }}> LunivaTech Pvt.Ltd.</span>
          </p>
        </div>
      </div>
    </LoginFormContainer>
  );
}

const LoginFormContainer = styled.div`
  display: flex;
  // flex-direction: column;
  align-items: center;
  // gap: 20px;
  .logo {
    width: 360px;
    margin-bottom: 60px;
    text-align: center;
    @media (max-width: 768px) {
      width: 260px;
      margin-bottom: 40px;
    }
    img {
      width: 100%;
    }
  }

  .left {
    display: flex;
    flex: 0.5;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    img {
      width: 100%;
      object-fit: cover;
      object-postion: ceter;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  .right {
    display: flex;
    flex: 0.4;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    @media (max-width: 576px) {
      flex: 1;
      width: 100%;
      height: 100vh;
      justify-content: center;
      align-items: center;
    }
  }

  .powerd {
    margin-top: 70px;
    p {
      letter-spacing: 1.2px;
    }
    span {
      font-size: 20px;
      letter-spacing: 1.2px;
    }
  }
`;
