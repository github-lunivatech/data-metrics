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
  Descriptions,
  Modal,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getManuDetApi } from "../../services/itemManufactureService";
import { getLabItemsApi } from "../../services/itemNewItemService";
import {
  getGoodsReceivedApi,
  insertGoodsReceivedApi,
} from "../../services/labGoodsReceivedService";
import moment from "moment";
import { tokenString } from "../Common/HandleUser";
import { formItemLayout } from "../Common/FormItemLayout";
import { useHistory } from "react-router-dom";
import { inventoryStat } from "../Common/StateList";
import { getItemSourceDetApi } from "../../services/itemSourceService";
// import { SearchSelect } from '../Common/SearchSelect';

const AddGoods = (props) => {
  const { forEdit } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([]);
  const [manuList, setmanuList] = useState([]);
  const [enQty, setenQty] = useState(0);
  const [enRate, setenRate] = useState(0);
  const [totalCal, settotalCal] = useState(0);
  const [itemTrack, setitemTrack] = useState("");
  const GId = props?.match?.params?.id;
  const fromDat = props?.match?.params?.from;
  const goodsInReducer = useSelector((state) => state.goodsin);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? goodsInReducer?.goodsin[GId] : {}
  );
  const [handleValue, sethandleValue] = useState(1);
  const [itemSourceList, setitemSourceList] = useState([]);

  const dateFormat = "YYYY-MM-DD";

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
    if (forEdit && previousValues === undefined) {
      dispatch(
        getGoodsReceivedApi({ fromdate: fromDat, todate: fromDat }, (val) => {})
      );
    }
    dispatch(
      getManuDetApi((val) => {
        setmanuList(val);
      })
    );
    getAllLabItem();
    dispatch(
      getItemSourceDetApi((val) => {
        setitemSourceList(val);
      })
    );
  }, []);

  useEffect(() => {
    setPreviousValues(goodsInReducer?.goodsin[GId]);
  }, [goodsInReducer?.goodsin[GId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      form.resetFields();

      setenQty(previousValues?.Quantity);
      setenRate(previousValues?.Rate);
      settotalCal(previousValues?.Total);
    }
  }, [previousValues]);

  const getAllLabItem = (ty = 0, cI = 0) => {
    let data = {
      typeId: ty,
      categoryId: cI,
    };
    dispatch(
      getLabItemsApi(data, (val) => {
        setitemList(val);
      })
    );
  };

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      GId: forEdit ? GId : 0,
      ItemId: values?.ItemId,
      Quantity: values?.Quantity,
      Rate: values?.Rate,
      Total: totalCal,
      ExpiryDate: values?.expiry_date.format("YYYY-MM-DD"),
      ManufactureId: values?.ManufactureId,
      LotNo: values?.LotNO,
      ItmTrackId: `${itemTrack}${values?.ItmTrackId}`,
      CreatedDate: values?.create_date.format("YYYY-MM-DD"),
      CreatedBy: tokenString.token.UId,
      // "ItemStatus": forEdit ? 3 : values?.ItemStatus,
      ItemStatus: forEdit ? 3 : handleValue,
      ItemSource: values?.ItemSource,
    };
    dispatch(
      insertGoodsReceivedApi(data, (res) => {
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
              pathname: "/goodsin",
              state: inventoryStat,
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

  useEffect(() => {
    calculateTotal();
  }, [enQty, enRate]);

  const calculateTotal = () => {
    let newTotal = enQty * enRate;
    settotalCal(newTotal);
  };

  let prevVal = {};
  if (previousValues !== undefined && forEdit === true) {
    prevVal = {
      ...previousValues,
      create_date: moment(previousValues?.CreatedDate),
      expiry_date: moment(previousValues?.ExpiryDate),
    };
  }

  function handleStatusChange(event) {
    sethandleValue(event.target.value);
  }

  useEffect(() => {
    // form.setFieldsValue({
    //   ItmTrackId: itemTrack
    // });
  }, [itemTrack]);

  return (
    <AddGoodsContainer>
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
              label="Reagent name"
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
                onChange={(text, option) =>
                  setitemTrack(`${option?.extradata}-`)
                }
                allowClear
              >
                {itemList?.map((iTy) => {
                  return (
                    <Option
                      extradata={iTy?.ItemCode}
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
              label="Quantity"
              name="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please input quantity!",
                },
              ]}
            >
              <InputNumber
                min={0}
                onInput={(val) => {
                  setenQty(val);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Rate"
              name="Rate"
              rules={[
                {
                  required: true,
                  message: "Please input rate!",
                },
              ]}
            >
              <InputNumber
                min={0}
                onInput={(val) => {
                  setenRate(val);
                }}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Lot No"
              name="LotNO"
              rules={[
                {
                  required: true,
                  message: "Please input lot no!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Reagent Track"
              name="ItmTrackId"
              rules={[
                {
                  required: true,
                  message: "Please Input Reagent Track!",
                },
              ]}
            >
              <Input prefix={itemTrack} />
            </Form.Item>

            <Form.Item
              label="Created Date"
              name="create_date"
              rules={[
                {
                  required: true,
                  message: "Please input Created Date!",
                },
              ]}
            >
              <DatePicker format={dateFormat} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Expiry Date"
              name="expiry_date"
              rules={[
                {
                  required: true,
                  message: "Please input Expiry Date!",
                },
              ]}
            >
              <DatePicker format={dateFormat} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Manufacturer"
              name="ManufactureId"
              rules={[
                {
                  required: true,
                  message: "Please select Manufacturer!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select manufacturer"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {manuList?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.ManufactureBY}
                      key={iTy?.MId}
                      value={iTy?.MId}
                    >
                      {iTy?.ManufactureBY}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Source"
              name="ItemSource"
              rules={[
                {
                  required: true,
                  message: "Please select Source!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select source"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {itemSourceList?.map((iTy) => {
                  return iTy?.IsActive === true ? (
                    <Option
                      title={iTy?.ItemSource}
                      key={iTy?.Id}
                      value={iTy?.Id}
                    >
                      {iTy?.ItemSource}
                    </Option>
                  ) : (
                    ""
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label={forEdit ? "Current Reagent Status" : "Reagent Status"}
              name="ItemStatus"
              rules={[
                {
                  // required: true,
                  message: "Please input Reagent Status!",
                },
              ]}
            >
              <Select
                allowClear
                // defaultValue='1'
                onChange={handleStatusChange}
              >
                {!forEdit ? (
                  <>
                    <Option value="0">Not Available</Option>
                    <Option value="1">Available</Option>
                  </>
                ) : (
                  <Option value="3">Cancel</Option>
                )}
              </Select>
            </Form.Item>

            <Descriptions bordered layout="horizontal" column={1} size="small">
              <Descriptions.Item label="SubTotal">{totalCal}</Descriptions.Item>
            </Descriptions>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {forEdit && previousValues?.ItemStatus === 3 ? (
                ""
              ) : (
                <Button
                  htmlType={forEdit ? "button" : "submit"}
                  onClick={forEdit ? showModal : ""}
                  disabled={butDis}
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
                <p>Do You want to Cancel the Goods In</p>
              </Modal>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AddGoodsContainer>
  );
};

export default AddGoods;

const AddGoodsContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
