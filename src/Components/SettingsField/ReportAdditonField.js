import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  notification,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { todaydate } from "../Common/TodayDate";
import { tokenString } from "../Common/HandleUser";
import styled from "styled-components";
import {
  GetEmailServerDetails,
  GetReportFormatDetails,
  GetReportGroupLookUpById,
  InsertUpdateEmailserverDetails,
  InsertUpdateLabReportFormats,
} from "../../services/datametricService";
import { formItemLayout } from "../Common/FormItemLayout";
import { carelabStat } from "../Common/StateList";
import { getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi } from "../../services/Tat";
import { getGroupTestForInventory } from "../../services/itemVsRatioService";
const ReportAdditonField = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const [form] = Form.useForm();
  const history = useHistory();
  const { forEdit } = props;
  const dispatch = useDispatch();
  const [Datainsert, setDatainsert] = useState([]);
  const [butDis, setButDis] = useState(false);
  const [reportlookup, setReportLookup] = useState([]);
  const [reportchangedvalue, setReportChangedvalue] = useState([]);
  const [ReportgroupChangedvalue, setReportgroupChangedvalue] = useState([]);
  const [reportformatvalue, setReportFormatValue] = useState([]);
  const [testlistdata, setTestListData] = useState([]);
  const [groupData, setgroupData] = useState([]);
  const [reportformatid, setreportformatidapi] = useState();
  const retrievevalueforedit = props.location.state.record;
  console.log(retrievevalueforedit, "retrievevalueforedit");
  const CId = props?.match?.params?.id;
  console.log(CId, "reportId");
  console.log(props, "iam props data");
  const reportgroupdata = [
    {
      reportId: 1,
      ReportGroup: "Normal",
    },
    {
      reportId: 2,
      ReportGroup: "Histo",
    },
  ];
  useEffect(() => {
    if (forEdit && retrievevalueforedit === undefined) {
      dispatch(
        GetEmailServerDetails((val) => {
          console.log(val, "vals");
        }, CId)
      );
    }
  }, []);
  useEffect(() => {
    getReportData();
    getReportFormat();
  }, []);

  const getReportData = () => {
    let data = {
      id: 0,
    };
    dispatch(
      GetReportGroupLookUpById(data, (val) => {
        console.log(val);
        setReportLookup(val);
      })
    );
  };
  useEffect(() => {
    if (reportformatid !== undefined) form.resetFields();
  }, [reportformatid]);
  useEffect(() => {
    dispatch(
      getGroupTestForInventory((val) => {
        setgroupData(val);
        console.log(val, "vals");
      })
    );
  }, []);

  useEffect(() => {
    let data = {
      id: CId,
    };
    dispatch(
      GetReportFormatDetails(data, (val) => {
        // console.log(data, "iam all data of server details");
        // console.log(val[0], "iam vals iam all data of server details");

        setreportformatidapi(val[0]);
      })
    );
  }, []);

  const getReportFormat = () => {
    let data = {
      id: 0,
    };
    dispatch(
      GetReportFormatDetails(data, (val) => {
        // console.log(val, "reportformatvaluelkloval");
        // console.log(val);
        setReportFormatValue(val);
      })
    );
    dispatch(
      getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi((val) => {
        setTestListData(val);
        // console.log(val[0], "iam testlistvals");
      })
    );
  };

  const onFinish = (values) => {
    // console.log(values, "values");
    setButDis(true);
    let data = {
      Id: forEdit ? CId : 0,
      Description: values?.Description,
      ReportType: values?.ReportType,
      GroupId: values?.GroupId,
      IndividualId: values?.IndividualId,
      ReportFormat: values?.ReportFormat,
      ReportGroup: values?.ReportGroup,
      SeparateYellowPage:
        values?.SeparateYellowPage === undefined ||
        values?.SeparateYellowPage === true
          ? true
          : false,
      HideInOtherReport:
        values?.HideInOtherReport === undefined ||
        values?.SeparateYellowPage === true
          ? true
          : false,
      // CreatedBy: tokenString.UId,
      // CreatedOn: values?.CreatedOn.format("YYYY-MM-DD"),
      CreatedBy: tokenString.token.UId,
      CreatedOn: todaydate,
      IsActive:
        values?.IsActive === undefined || values?.IsActive === true
          ? true
          : false,
    };
    console.log(data, "datasubmit");
    dispatch(
      InsertUpdateLabReportFormats(data, (res) => {
        // console.log(data, "insertdata");
        // console.log(res, "ia ma response");
        setDatainsert(data);
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
              pathname: "/reportdata",
              state: carelabStat,
            });
          }, 1000);
        } else {
          setButDis(false);
          // message.error("Something went wrong please try again");
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

  return (
    <div>
      <EmailAddField Field>
        <Row justify="center">
          <Col sm={20} md={24} xs={20} lg={18} xl={14}>
            <Form
              name="add_items"
              form={form}
              {...formItemLayout}
              initialValues={reportformatid}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Description"
                // name="unit_name"
                name="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input desciption !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ReportType"
                // name="unit_name"
                name="ReportType"
                rules={[
                  {
                    required: true,
                    message: "Please input report type !",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select report format"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    );
                  }}
                  onChange={(val) => {
                    console.log(val, "iam seleected report type");
                  }}
                  allowClear
                >
                  {reportlookup?.map((iTy) => {
                    return iTy?.IsActive === true ? (
                      <Option
                        title={iTy?.ReportType}
                        key={iTy?.RId}
                        value={iTy?.RId}
                      >
                        {iTy?.ReportType}
                      </Option>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Group"
                // name="unit_name"
                name="GroupId"
                rules={[
                  {
                    required: true,
                    message: "Please input group id !",
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
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    );
                  }}
                  allowClear
                >
                  {groupData?.map((ele) => (
                    <Option title={ele.TestName} key={ele?.Id} value={ele?.Id}>
                      {ele.TestName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="TestType"
                name="IndividualId"
                rules={[
                  {
                    required: true,
                    message: "Please input individual id !",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select report format"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    );
                  }}
                  // onChange={(val) => {
                  //   console.log(val, "val");
                  // }}
                  allowClear
                >
                  {testlistdata?.map((cList) => (
                    <Option
                      title={cList?.TestName}
                      key={cList?.Id}
                      value={cList?.Id}
                    >
                      {`${cList?.TestName} (${cList?.Specimen})`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="ReportFormat"
                name="ReportFormat"
                rules={[
                  {
                    required: true,
                    message: "Please input report format !",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select report format"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    );
                  }}
                  onChange={(val) => {
                    setReportChangedvalue(val);
                    console.log(val, "val");
                  }}
                  allowClear
                >
                  {reportformatvalue?.map((iTy) => {
                    return iTy?.IsActive === true ? (
                      <Option
                        title={iTy?.ReportFormat}
                        key={iTy?.ReportFormat}
                        value={iTy?.ReportFormat}
                      >
                        {iTy?.ReportFormat}
                      </Option>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="ReportGroup"
                // name="unit_name"
                name="ReportGroup"
                rules={[
                  {
                    required: true,
                    message: "Please input report group !",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select report group"
                  filterOption={(input, option) => {
                    return (
                      option.key.toLowerCase().indexOf(input.toLowerCase()) >=
                        0 ||
                      option.title.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    );
                  }}
                  onChange={(val) => {
                    setReportgroupChangedvalue(val);
                    console.log(val, "val");
                  }}
                  allowClear
                >
                  {reportgroupdata?.map((ele) => (
                    <Option
                      title={ele.ReportGroup}
                      key={ele?.ReportGroup}
                      value={ele?.reportId}
                    >
                      {ele.ReportGroup}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Created By"
                name="CreatedBy"
                rules={[
                  {
                    required: true,
                    message: "Please input Created by person name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item
                label="Created Date"
                name="CreatedOn"
                rules={[
                  {
                    required: true,
                    message: "Please input Created Date!",
                  },
                ]}
              >
                <DatePicker format={dateFormat} style={{ width: "100%" }} />
              </Form.Item> */}

              <Form.Item
                className="hidereport-separatepage"
                label="HideInOtherReport"
                name="HideInOtherReport"
                valuePropName="checked"
              >
                <Switch defaultChecked className="hidereport-separatepage" />
              </Form.Item>
              <Form.Item
                className="hidereport-separatepage"
                label="SeparateYellowPage"
                name="SeparateYellowPage"
                valuePropName="checked"
              >
                <Switch defaultChecked className="hidereport-separatepage" />
              </Form.Item>

              <Form.Item
                label="Is Active"
                name="IsActive"
                valuePropName="checked"
              >
                <Switch defaultChecked className="isactive-separatepage" />
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

export default ReportAdditonField;
const EmailAddField = styled.div`
  background-color: #fefefe;
  padding-top: 30px;
  @media only screen and (max-width: 768px) {
    .hidereport-separatepage {
      margin-left: 10px;
    }
    .isactive-separatepage {
      margin-left: 17px;
    }
  }
`;
