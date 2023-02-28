import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  message,
  Row,
  Col,
  Modal,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getLabItemsApi } from "../../services/itemNewItemService";
import { getWastageApi, insertWastageApi } from "../../services/wastageService";
import moment from "moment";
import { tokenString } from "../Common/HandleUser";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddWastage = (props) => {
  const { forEdit } = props;
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setItemList] = useState([]);
  const WId = props?.match?.params?.id;
  const FromDater = props?.match?.params?.from;
  const wastageReducer = useSelector((state) => state.wastage);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? wastageReducer?.wastages[WId] : {}
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getAllLabItem(0, 0);
    if (forEdit && previousValues === undefined) {
      dispatch(
        getWastageApi({ fromdate: FromDater, todate: FromDater }, (val) => {})
      );
    }
  }, []);

  useEffect(() => {
    setPreviousValues(wastageReducer?.wastages[WId]);
  }, [wastageReducer?.wastages[WId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();
    }
  }, [previousValues]);
  const getAllLabItem = (ty = 0, cI = 0) => {
    let data = {
      typeId: ty,
      categoryId: cI,
    };
    dispatch(
      getLabItemsApi(data, (val) => {
        setItemList(val);
      })
    );
  };

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      WId: forEdit ? WId : 0,
      ItemId: values?.ItemId,
      WastageAmount: values?.WastageAmount,
      Reason: values?.Reason,
      Remarks: values?.Remarks,
      CreatedDate: values?.CreatedDate.format("YYYY-MM-DD"),
      CreatedBy: tokenString.token.UId,
      IsActive: forEdit ? false : true,
    };
    dispatch(
      insertWastageApi(data, (res) => {
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
              pathname: "/wastage",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "something went wrong",
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
      CreatedDate: moment(previousValues?.CreatedDate),
    };
  }

  return (
    <AddWastageContainer>
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
              label="Reagent Name"
              name="ItemId"
              rules={[
                {
                  required: true,
                  message: "Please select reagent name!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select A Reagent"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
              >
                {itemList?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.ItemName}
                      key={iTy?.TId}
                      value={iTy?.TId}
                    >
                      {iTy?.ItemName} ({iTy?.Unit})
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Wastage Amount"
              name="WastageAmount"
              rules={[
                {
                  required: true,
                  message: "Please input wastage amount!",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Reason"
              name="Reason"
              rules={[
                {
                  required: true,
                  message: "Please input Reason!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Remarks"
              name="Remarks"
              rules={[
                {
                  required: true,
                  message: "Please input Remarks!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Created Date"
              name="CreatedDate"
              rules={[
                {
                  required: true,
                  message: "Please input created Date!",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {forEdit && previousValues?.IsActive === false ? (
                ""
              ) : (
                <Button
                  htmlType={forEdit ? "button" : "submit"}
                  disabled={butDis}
                  onClick={forEdit ? showModal : ""}
                  className="btnPrimary"
                >
                  {forEdit ? "Cancel" : "Submit"}
                </Button>
              )}

              <Modal
                title="Warning"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Do You want to Cancel the Wastage</p>
              </Modal>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AddWastageContainer>
  );
};

export default AddWastage;

const AddWastageContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
