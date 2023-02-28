import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  notification,
} from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { carelabStat, marketingStat, misStat } from "../../Common/StateList";
import AppButton from "../../Common/AppButton";

function AddSMSDetails() {
  const [smsCount, setSmsCount] = useState();
  const [smsCharge, setSmsCharge] = useState();
  const [discount, setDiscount] = useState();
  const [totalCharge, setTotalCharge] = useState();
  const [loadings, setLoadings] = useState([]);

  const [form] = Form.useForm();
  const history = useHistory();

  //   useEffect(() => {

  //   }, [totalCharge]);

  const handleChange = () => {
    console.log(smsCount, smsCharge);
    if (smsCount && smsCharge !== undefined && discount === undefined) {
      setTotalCharge(smsCount * smsCharge);
    } else if (smsCharge && smsCount && discount !== undefined) {
      setTotalCharge(smsCharge * smsCount - discount);
    } else {
      setTotalCharge(0);
    }
  };
  useEffect(() => {
    handleChange();
    // console.log(totalCharge);
    // form.setFieldsValue(to);
    form.setFieldsValue({
      TotalCharge: totalCharge,
    });
  }, [totalCharge, smsCount, smsCharge, discount]);
  // loading

  const enterLoading = (index) => {
    if (totalCharge !== 0 || undefined) {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      notification.success({
        duration: 3,
        placement: "topRight",
        message: `Data is saved`,
        rtl: true,
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return history.push({
            pathname: "/sms",
            state: marketingStat,
          });
        });
      }, 2000);
    } else {
      // message.error("please input the values");
      notification.error({
        duration: 3,
        placement: "topRight",
        message: "please input the values",
        rtl: true,
      });
    }
  };

  return (
    <AddGoodsContainer>
      <h2 style={{ textAlign: "center", paddingBottom: "20px" }}>
        Add Sms Consumption
      </h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="SMS Added Count"
          name="SMS Added Count"
          value={smsCount}
          onChange={(e) => {
            setSmsCount(e.target.value);
            // handleChange();
          }}
          rules={[
            { required: true, message: "Please input your SMS Added Count!" },
          ]}
        >
          <InputNumber style={{ width: "60%" }} />
        </Form.Item>
        <Form.Item
          label="Per SMS Charge"
          name="Per SMS Charge"
          value={smsCharge}
          onChange={(e) => {
            setSmsCharge(e.target.value);
            // handleChange();
          }}
          rules={[
            { required: true, message: "Please input your Per SMS Charge!" },
          ]}
        >
          <InputNumber style={{ width: "60%" }} />
        </Form.Item>
        <Form.Item
          label="Discount Amount"
          name="Discount Amount"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
            // handleChange();
          }}
          rules={[
            { required: true, message: "Please input your Total Charge!" },
          ]}
        >
          <InputNumber style={{ width: "60%" }} />
        </Form.Item>
        <Form.Item
          label="Total Charge"
          name="TotalCharge"
          //   value={totalCharge}
          //   rules={[
          //     { required: true, message: "Please input your Total Charge!" },
          //   ]}
        >
          <InputNumber style={{ width: "60%" }} readOnly />
        </Form.Item>
      </Form>
      <Button
        loading={loadings[1]}
        type="primary"
        style={{ display: "block", margin: "10px auto" }}
        onClick={() => {
          handleChange();
          enterLoading(1);
        }}
      >
        Save
      </Button>
      {/* <AppButton
        buttonTitle="Save"
        buttonOnClick={() => {
          handleChange();
          enterLoading(1);
        }}
        savebutton
      ></AppButton> */}
    </AddGoodsContainer>
  );
}

export default AddSMSDetails;

const AddGoodsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
  height: 100%;
`;
