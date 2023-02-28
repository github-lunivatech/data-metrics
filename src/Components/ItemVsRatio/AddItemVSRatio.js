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
  getItemVsRatioApi,
  getTestListApi,
  insertItemVsRatioApi,
} from "../../services/itemVsRatioService";
import moment from "moment";
import { tokenString } from "../Common/HandleUser";
import { formItemLayout } from "../Common/FormItemLayout";
import { ItemName } from "../Common/ItemToReagent";
import { inventoryStat } from "../Common/StateList";

const AddItemVsRatio = (props) => {
  const { forEdit } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { Option } = Select;
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setitemList] = useState([]);
  const [testList, settestList] = useState([]);
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

    dispatch(
      getTestListApi((val) => {
        settestList(val);
      })
    );
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
      IsGroup: false,
      IsConsumptionGroup: false,
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
          // message.error("Something went wrong try again");
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
    <AddItemVsRatioContainer>
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
              label="Test Name"
              name="TestId"
              rules={[
                {
                  required: true,
                  message: "Please select test!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="select a test"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {testList?.map((iTy) => {
                  return (
                    <Option title={iTy?.Testname} key={iTy?.Id} value={iTy?.Id}>
                      {iTy?.Testname}
                    </Option>
                  );
                })}
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
              <InputNumber
                min={0}
                step="0.01"
                keyboard={false}
                style={{ width: "100%" }}
              />
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
              <InputNumber
                min={0}
                step="0.01"
                keyboard={false}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="SubUnit"
              name="SubUnit"
              rules={[
                {
                  required: true,
                  message: "Please input Sub Item!",
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
    </AddItemVsRatioContainer>
  );
};

export default AddItemVsRatio;

const AddItemVsRatioContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
