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
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getLabItemsApi } from "../../services/itemNewItemService";
import {
  getConsumptionReagentApi,
  getReagentUsedApi,
  insertReagentUsedApi,
} from "../../services/reagentService";
import moment from "moment";
import { tokenString } from "../Common/HandleUser";
import { formItemLayout } from "../Common/FormItemLayout";
import { inventoryStat } from "../Common/StateList";

const AddUsedReagent = (props) => {
  const { forEdit } = props;
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setItemList] = useState([]);
  const WId = props?.match?.params?.id;
  console.log(WId, "IAM Wid");
  const FromDater = props?.match?.params?.from;
  const reagentReducer = useSelector((state) => state.reagent);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? reagentReducer?.reagents[WId] : {}
  );
  const [itemTitleHead, setitemTitleHead] = useState([]);

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
        getReagentUsedApi(
          { fromdate: FromDater, todate: FromDater },
          (val) => {}
        )
      );
    }

    dispatch(
      getConsumptionReagentApi((val) => {
        setitemTitleHead(val);
      })
    );
  }, []);

  useEffect(() => {
    setPreviousValues(reagentReducer?.reagents[WId]);
    // return () => {
    //   setPreviousValues({})
    // };
  }, [reagentReducer?.reagents[WId]]);

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
      CId: forEdit ? WId : 0,
      ItemId: values?.ItemId,
      ControlAmount: values?.ControlAmount,
      Reason: values?.Reason,
      Remarks: values?.Remarks,
      CreatedDate: values?.CreatedDate.format("YYYY-MM-DD"),
      CreatedBy: tokenString.UId,
      IsActive: forEdit ? false : true,
      Title: values?.Title,
    };

    dispatch(
      insertReagentUsedApi(data, (res) => {
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
              pathname: "/reagentused",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          // message.error("Something went wrong Try again");
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
      CreatedDate: moment(previousValues?.CreatedDate),
    };
  }

  return (
    <AddUsedReagentContainer>
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
              label="Consumption Head"
              name="Title"
              rules={[
                {
                  required: true,
                  message: "Please select Consumption Head!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select a Consumption Head"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
              >
                {itemTitleHead?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.ConsumptionHead}
                      key={iTy?.HId}
                      value={iTy?.ConsumptionHead}
                    >
                      {iTy?.ConsumptionHead}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

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
                placeholder="Select a Reagent"
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
              label="Control Amount"
              name="ControlAmount"
              rules={[
                {
                  required: true,
                  message: "Please input used control amount!",
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
                <p>Do You want to Cancel the Reagent Used?</p>
              </Modal>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AddUsedReagentContainer>
  );
};

export default AddUsedReagent;

const AddUsedReagentContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
