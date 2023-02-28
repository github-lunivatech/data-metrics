import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message,
  Row,
  Col,
  Switch,
  notification,
} from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getItemCategoryApi } from "../../services/itemCategoryService";
import { getItemTypeApi } from "../../services/itemItemTypeService";
import { getLocationApi } from "../../services/itemLocationService";
import { getManuDetApi } from "../../services/itemManufactureService";
import {
  getLabItemsApi,
  insertNewItemDetailsApi,
} from "../../services/itemNewItemService";
import { getRackDetApi } from "../../services/itemRackService";
import { getItemUnitApi } from "../../services/itemUnitService";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { tokenString } from "../Common/HandleUser";
import { formItemLayout } from "../Common/FormItemLayout";
import { ItemName } from "../Common/ItemToReagent";
import { inventoryStat } from "../Common/StateList";
// import { SearchSelect } from '../Common/SearchSelect';

const AddItem = (props) => {
  const { forEdit } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [cateList, setcateList] = useState([]);
  const [unitList, setunitList] = useState([]);
  const [manuList, setmanuList] = useState([]);
  const [locationList, setlocationList] = useState([]);
  const [rackList, setrackList] = useState([]);
  const Param = props?.match?.params;
  const TId = Param?.id;
  const TyId = Param?.typeId;
  const CaId = Param?.cateId;
  const newItemReducer = useSelector((state) => state.newItem);
  const [previousValues, setPreviousValues] = useState(
    forEdit ? newItemReducer?.newItems[TId] : {}
  );

  useEffect(() => {
    getAllItemList();
    if (forEdit && previousValues === undefined) {
      dispatch(
        getLabItemsApi({ typeId: TyId, categoryId: CaId }, (val) => {}, TId)
      );
    }
  }, []);

  useEffect(() => {
    setPreviousValues(newItemReducer?.newItems[TId]);
  }, [newItemReducer?.newItems[TId]]);

  useEffect(() => {
    if (previousValues !== undefined) {
      handleRackLocation(previousValues?.LocationId);
      form.resetFields();
    }
  }, [previousValues]);

  const getAllItemList = () => {
    dispatch(
      getLocationApi((val) => {
        setlocationList(val);
      })
    );
    dispatch(
      getItemTypeApi((val) => {
        setItemList(val);
      })
    );
    dispatch(
      getItemCategoryApi((val) => {
        setcateList(val);
      })
    );
    dispatch(
      getItemUnitApi((val) => {
        setunitList(val);
      })
    );
    dispatch(
      getManuDetApi((val) => {
        setmanuList(val);
      })
    );
  };

  const handleRackLocation = (value) => {
    dispatch(
      getRackDetApi(value, (val) => {
        setrackList(val);
      })
    );
  };

  const onFinish = (values) => {
    setButDis(true);
    let data = {
      TId: forEdit ? TId : 0,
      ItemCode: values?.ItemCode,
      ItemName: values?.ItemName,
      ItemTypeId: values?.ItemTypeId,
      ItemCategoryId: values?.ItemCategoryId,
      UnitId: values?.UnitId,
      ManufactureId: values?.ManufactureId,
      LocationId: values?.LocationId,
      RackId: values?.RackId,
      MinQty: values?.MinQty,
      CreatedBy: tokenString.token.UId, //needs login userid
      CreatedDate: moment().format("YYYY-MM-DD"), //default date for now update
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    dispatch(
      insertNewItemDetailsApi(data, (res) => {
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
              pathname: "/item",
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
    // const value = form.getFieldValue(field.key)
    // form.setFieldsValue({[field.key]: {...value, ['type']: your_new_value}})
    setButDis(false);
  };

  return (
    <AddItemContainer>
      <Row justify="center">
        <Col span={16}>
          <Form
            form={form}
            name="add_items"
            {...formItemLayout}
            initialValues={previousValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={`${ItemName} Code`}
              name="ItemCode"
              rules={[
                {
                  required: true,
                  message: `Please input ${ItemName} code!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`${ItemName} Name`}
              name="ItemName"
              rules={[
                {
                  required: true,
                  message: `Please input ${ItemName} name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`${ItemName} Type`}
              name="ItemTypeId"
              rules={[
                {
                  required: true,
                  message: `Please Select ${ItemName} type!`,
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={`Select ${ItemName} type!`}
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
                      title={iTy?.ItemType}
                      key={iTy?.TId}
                      value={iTy?.TId}
                    >
                      {iTy?.ItemType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label={`${ItemName} Category`}
              name="ItemCategoryId"
              rules={[
                {
                  required: true,
                  message: `Please Select ${ItemName} Category`,
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={`Select ${ItemName} Category`}
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {cateList?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.CategoryType}
                      key={iTy?.CId}
                      value={iTy?.CId}
                    >
                      {iTy?.CategoryType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label={`${ItemName} Unit`}
              name="UnitId"
              rules={[
                {
                  required: true,
                  message: `Select ${ItemName} Unit`,
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={`Select ${ItemName} Unit`}
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {unitList?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.Units}
                      key={iTy?.UnId}
                      value={iTy?.UnId}
                    >
                      {iTy?.Units}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label={`${ItemName} manufacturer`}
              name="ManufactureId"
              rules={[
                {
                  required: true,
                  message: `Select ${ItemName} manufacturer`,
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={`Select ${ItemName} manufacturer`}
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
              label="Location"
              name="LocationId"
              rules={[
                {
                  required: true,
                  message: "Please Select Location!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select location"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                onChange={(val) => handleRackLocation(val)}
                allowClear
              >
                {locationList?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.Location}
                      key={iTy?.LId}
                      value={iTy?.LId}
                    >
                      {iTy?.Location}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Rack"
              name="RackId"
              rules={[
                {
                  required: true,
                  message: "Please Select rack!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select rack"
                filterOption={(input, option) => {
                  return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                      0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  );
                }}
                allowClear
              >
                {rackList?.map((iTy) => {
                  return (
                    <Option
                      title={iTy?.RackName}
                      key={iTy?.RId}
                      value={iTy?.RId}
                    >
                      {iTy?.RackName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Min Qty"
              name="MinQty"
              rules={[
                {
                  required: true,
                  message: "Please input minimum quantity!",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
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
                {forEdit ? "Edit" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AddItemContainer>
  );
};

export default AddItem;

const AddItemContainer = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  margin-bottom: 50px;
`;
