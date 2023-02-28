import {
  Form,
  Button,
  DatePicker,
  Select,
  InputNumber,
  message,
  Row,
  Col,
  Switch,
  Input,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getLabItemsApi } from "../../services/itemNewItemService";
import {
  getGroupTestForInventory,
  getItemVsRatioApi,
  getTestListApi,
  insertItemVsRatioApi,
} from "../../services/itemVsRatioService";
import moment from "moment";
import { tokenString } from "../Common/HandleUser";
import { formItemLayout } from "../Common/FormItemLayout";
import { consumptionGroupApi } from "../../services/consumptionService";
import { ItemName } from "../Common/ItemToReagent";
import { inventoryStat } from "../Common/StateList";

const GroupAddItemVsRatioVsConsumtion = (props) => {
  const { forEdit, forGroup, forCon } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([]);
  // const [testList, settestList] = useState([]);
  const [groupData, setgroupData] = useState([]);
  const RId = props?.match?.params?.id;
  const itemRatioReducer = useSelector((state) => state.itemRatio);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? itemRatioReducer?.itemRatios[RId] : {}
  );

  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    if (forEdit && previousValues === undefined) {
      dispatch(getItemVsRatioApi((val) => {}, RId));
    }
    getAllLabItem();
    if (forGroup !== undefined) {
      dispatch(
        getGroupTestForInventory((val) => {
          setgroupData(val);
        })
      );
    }
    if (forCon !== undefined) {
      dispatch(
        consumptionGroupApi((val) => {
          setgroupData(val);
        })
      );
    }
  }, []);

  useEffect(() => {
    setPreviousValues(itemRatioReducer?.itemRatios[RId]);
  }, [itemRatioReducer?.itemRatios[RId]]);

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
        setitemList(val);
      })
    );

    //   if (forGroup !== undefined) {
    //   dispatch(getTestListApi((val) => {
    //     settestList(val)
    //   }))
    // }
  };

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      RId: forEdit ? RId : 0,
      ItemId: values?.ItemId,
      TestId: values?.TestId,
      ItemPerUnitTest: values?.ItemPerUnitTest,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
      CreatedDate: values?.CreatedDate.format("YYYY-MM-DD"),
      CreatedBy: tokenString.token.UId,
      IsGroup: forGroup ? true : false,
      IsConsumptionGroup: forCon ? true : false,
      TestPerUnit: values?.TestPerUnit,
      SubUnit: values?.SubUnit,
    };
    dispatch(
      insertItemVsRatioApi(data, (res) => {
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
              pathname: "/itemvsratio",
              state: inventoryStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Something went wrong try again",
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
    <GroupAddItemVsRatioVsConsumtionContainer>
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
              label={forGroup ? "Group Name" : "Consumption Name"}
              name="TestId"
              rules={[
                {
                  required: true,
                  message: "Please select Group!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select group"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {groupData?.map((ele) => (
                  <Option
                    title={forGroup ? ele.TestName : ele.ConsumptionGroupName}
                    key={forGroup ? ele?.Id : ele.CGId}
                    value={forGroup ? ele?.Id : ele.CGId}
                  >
                    {forGroup ? ele.TestName : ele.ConsumptionGroupName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={`${ItemName} Name`}
              name="ItemId"
              rules={[
                {
                  required: true,
                  message: `Select ${ItemName} Name`,
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={`Select ${ItemName} Name`}
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
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
              label={`${ItemName} Per Unit Test`}
              name="ItemPerUnitTest"
              rules={[
                {
                  required: true,
                  message: `Select ${ItemName} Per Unit Test`,
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="TestPerUnit"
              name="TestPerUnit"
              rules={[
                {
                  required: true,
                  message: "Please input Test Per Unit!",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="SubUnit"
              name="SubUnit"
              rules={[
                {
                  required: true,
                  message: `Please input Sub ${ItemName}!`,
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Created Date"
              name="CreatedDate"
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
              label="Is Active"
              name="IsActive"
              valuePropName="checked"
            >
              <Switch defaultChecked />
            </Form.Item>

            <Form.Item
              label={forGroup ? "Is Group" : "Is Consumption Group"}
              name={forGroup ? "Is Group" : "Is Consumption Group"}
              valuePropName="checked"
            >
              <Switch disabled={true} defaultChecked></Switch>
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
    </GroupAddItemVsRatioVsConsumtionContainer>
  );
};

export default GroupAddItemVsRatioVsConsumtion;

const GroupAddItemVsRatioVsConsumtionContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
