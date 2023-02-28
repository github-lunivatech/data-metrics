import {
  Col,
  Input,
  Row,
  Select,
  Form,
  Button,
  InputNumber,
  Descriptions,
  notification,
  message,
  Popconfirm,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import PageHeader from "../Common/pageHeader";
import NewTableSummary from "../Common/NewTableSummary";
import styled from "styled-components";
import {
  addCreateCreditPartyBill,
  getRequestorBillListAll,
  InsertUpdateCreditPartyInPatientForPartyBill,
} from "../../services/datametricService";
import { useDispatch } from "react-redux";
import { adToBs } from "@sbmdkl/nepali-date-converter";
import { paymentType } from "../../constants/paymentType";
import { todaydate } from "../Common/TodayDate";
import { useHistory } from "react-router-dom";
import { tokenString } from "../Common/HandleUser";
import { carelabStat, homePageName, inventoryStat } from "../Common/StateList";
import { useFiscalYear } from "../../CustomHook/useFiscalYear";
import PrintLayout from "../PrintDetails/PrintLayout";
import AppButton from "../Common/AppButton";

const AddBill = ({ ...props }) => {
  const { serchButton } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discountamount, setDiscountAmount] = useState(0);
  const [discountpercentage, setDiscountPercentage] = useState(0);
  const [total, setTotal] = useState(0);
  const [grandtotals, setGrandTotals] = useState(0);
  const [roundamt, setRoundAmt] = useState(0);
  const [pointRoundAmt, setPointRoundAmt] = useState(0);
  const [partydata, setPartydata] = useState([]);
  const [data, setData] = useState([]);
  const [chData, setChData] = useState({});
  const [requestorList, setrequestorList] = useState([]);
  const [butDis, setButDis] = useState(false);
  const [fiscalYearId, setFiscalYearId] = useState(1);
  const [discountpercentfieldvalue, setDiscountPercentFieldValue] = useState(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const checkvalue = (e) => {
    if (e > 101) {
      message.info("only enter the value less than 100");
    }
  };
  const [dTracker, setDTracker] = useState(false);
  const fiscalYear = useFiscalYear();
  const { Option } = Select;

  const handleChange = (value) => {
    setChData(value);
  };

  useEffect(() => {
    dispatch(
      getRequestorBillListAll((val) => {
        console.log(val, "billvalue");
        setrequestorList(val);
        setPartydata(val);
      })
    );
  }, []);

  const onFinish = (values) => {
    if (discountpercentage == 100) {
      message.info("Are you giving 100% discount?");
      // <Popconfirm
      //   title="Title"
      //   description="Open Popconfirm with Promise"
      //   onConfirm={confirm}
      //   onOpenChange={() => console.log("open change")}
      // >
      //   <Button type="primary">Open Popconfirm with Promise</Button>
      // </Popconfirm>;
    }

    console.log(values, "formvalues");
    let billdata = {
      id: partydata[0].crdId,
      creditparty: partydata[0].CrdPartyName,
      partycode: partydata[0].crdPartyCode,
      userId: partydata[0].crdId,
      email: "N/A",
      contactno: partydata[0].crdPartyPhoneNo,
      pan: partydata[0].CrdPartyPan,
      remarks: "N/A",
    };

    dispatch(
      InsertUpdateCreditPartyInPatientForPartyBill(billdata, (val) => {
        console.log(val, "ssdflksjdsdfsdfsdf");
        if (val[0].SampleId > 0) {
          console.log(val[0].SampleId, "Sampleid");
          if (data.length > 0) {
            console.log(data, "iam data");
            setButDis(true);
            ///creditparty save

            const allDataSend = {
              _lstBillItems: [
                {
                  ID: 0,
                  BillID: 0,
                  BillNo: "N/A",
                  TestID: 0,
                  billDGid: 0,
                  billTestName:
                    values?.item !== undefined && values?.item !== null
                      ? values?.item
                      : 0,
                  billPrice: total !== undefined && total !== null ? total : 0,
                  billOutGoing: true,
                  //needs percent
                  billDiscount:
                    values?.dis !== undefined && values?.dis !== null
                      ? values?.dis
                      : 0,
                  //needs percent
                  billDiscountAmt:
                    values?.discountAmount !== undefined &&
                    values?.discountAmount !== null
                      ? values?.discountAmount
                      : 0,
                  billPriceFinal:
                    grandtotals !== undefined && grandtotals !== null
                      ? grandtotals
                      : 0,
                  IsSync: true,
                  // RoundAmt: roundamt,
                  RoundAmt: pointRoundAmt,

                  Remarks: "N/A",
                  OutgoingLabId: 1,
                },
              ],
              Id: 0,
              PatId: 2,
              Nrl_Reg_No: "N/A",
              TestId: 0,
              Price: total,
              TotalPrice: grandtotals,
              DiscountPrice:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              HSTPrice: 0,
              IsPaid: true,
              IsDone: true,
              BillDate: todaydate,
              BillLastModifiedDate: todaydate,
              BillNo: "N/A",
              //needs percent
              BillDiscount:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              //needs percent

              BillDiscountAmt:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              BillHst: 0,
              BillHstAmt: 0,
              BillAmtPaid: 0,
              BillRemainingAmt: 0,
              BillPaymentType:
                values?.pmt !== undefined && values?.pmt !== null
                  ? values?.pmt
                  : "",
              BillOutGngAmt: grandtotals,
              BillOutGngDiscountAmt:
                values?.dis !== undefined && values?.dis !== null
                  ? values?.dis
                  : 0,
              BillOutGngAmtPc: 1,
              UserId: tokenString.token.UId,
              BillIsVoid: false,
              BillLastModifiedUser: tokenString.token.UId,
              BillAdvanceAmt: 0,
              BillCollectionAmt: grandtotals,
              BillNepaliDate: nepaliDateConverter(todaydate),
              BillLastModifiedNepaliDate: nepaliDateConverter(todaydate),
              // BillRoundedAmt: "",
              BillWithoutRound: grandtotals,
              BillCreditPartyCode: data[0].crdPartyCode,
              BillPassword: "",
              IsSync: true,
              PaymentMode: "Cash",
              Remarks: "N/A",
              PaymentCode: "",
              SampleId: val[0].SampleId,
              FiscalYearId: fiscalYearId,
            };
            console.log(allDataSend, "alldatasend");

            dispatch(
              addCreateCreditPartyBill(allDataSend, (res) => {
                console.log(res, "resho");
                if (res?.SuccessMsg === true) {
                  // message.success(res?.Message);
                  notification.success({
                    duration: 3,
                    placement: "topRight",
                    message: res?.Message,
                    rtl: true,
                  });
                  // console.log(res, "myres");
                  setTimeout(() => {
                    history.push({
                      pathname: `/viewupdatebill/${res.CreatedId}/${fiscalYearId}`,
                      state: carelabStat,
                    });
                    window.open(
                      `/${homePageName}/printlayout/${res?.CreatedId}/${fiscalYearId}`,
                      "_blank"
                    );
                  }, 1000);
                } else {
                  setButDis(false);
                  notification.error({
                    duration: 3,
                    placement: "topRight",
                    message: res?.Message,
                    rtl: true,
                  });
                }
              })
            );
          } else {
            setButDis(false);
            // message.warning("Requestor is not selected");
            notification.warning({
              duration: 3,
              placement: "topRight",
              message: "Requestor is not selected",
              rtl: true,
            });
          }
        }
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    setButDis(false);
  };

  const nepaliDateConverter = (englishDateString) => {
    const nDate = adToBs(englishDateString);
    return nDate;
  };

  useEffect(() => {
    multiply();
    grandtotal();
    roundsfunc();
  }, [rate, quantity, discountamount, grandtotals, total]);

  const multiply = () => {
    let totalcal = rate * quantity;
    setTotal(totalcal);
  };

  const grandtotal = () => {
    let totalss = total - discountamount;
    let totalD = Math.round(totalss);

    setGrandTotals(totalD);
  };
  const roundsfunc = () => {
    let rv = Math.round(discountamount);
    let totalrv = rv - discountamount;
    setPointRoundAmt(totalrv);
    console.log(totalrv, "totalrv");
    setRoundAmt(rv);
    console.log(rv, "roundedvalues");
  };

  const onChangeHandler = () => {
    const BillData = requestorList.filter((res) => res.crdId === chData);
    setData(BillData);
    setPartydata(BillData);
    console.log(BillData, "itemdata");
  };

  const calculateDiscountPercentage = (e) => {
    if (rate !== 0 && quantity !== 0) {
      let originalAmount = rate * quantity;
      if (e !== null || 0) {
        let discountPercentages = (e / originalAmount) * 100;
        setDiscountPercentage(discountPercentages);

        if (discountPercentages <= 100) {
          // console.log(discountPercentages, "discount percentage");
          form.setFieldsValue(
            {
              discountPercentage: discountPercentages?.toFixed(2) + "%",
            }

            // setDiscountPercentFieldValue(discountPercentage);
          );
        } else {
          notification.warning({
            duration: 0,
            placement: "topRight",
            message:
              "Please select the discount amount that is  less than 100%",
            rtl: true,
          });

          form.setFieldsValue({
            discountPercentage: 0 + "%",
          });
        }
      } else {
        form.setFieldsValue({
          discountPercentage: 0 + "%",
        });
      }
    }
  };

  const calculateDiscountAmount = (e) => {
    if (rate !== 0 && quantity !== 0) {
      let originalAmount = rate * quantity;

      if (e !== null || 0) {
        let discountamounts = (e / 100) * originalAmount;
        setDiscountAmount(discountamounts);
        if (discountamounts <= total) {
          // console.log(discountamounts, "discount amounts");

          form.setFieldsValue({
            discountAmount: discountamounts?.toFixed(2),
          });
        } else {
          form.setFieldsValue({
            discountAmount: 0,
          });
        }
      } else {
        form.setFieldsValue({
          discountAmount: 0,
        });
      }
    }
  };

  return (
    <>
      <AddBillSection>
        <div className="maiTopContainer">
          <PageHeader pageTitle={"Create New Bill"} />
          {
            <div className="dropdown-section">
              <Row>
                <Col
                  sm={24}
                  md={24}
                  xs={24}
                  lg={24}
                  xl={12}
                  className="requestor-section"
                >
                  <Select onChange={handleChange} style={{ width: "50%" }}>
                    {requestorList?.map((iTy) => (
                      <Option
                        title={iTy?.CrdPartyName}
                        key={iTy?.crdId}
                        value={iTy?.crdId}
                      >
                        {iTy?.CrdPartyName}
                      </Option>
                    ))}
                  </Select>
                  {/* {serchButton && ( */}
                  {/* <Col> */}
                  <AppButton
                    // onClick={onChangeHandler}
                    className="primary-btn load-btn"
                    buttonTitle="Load"
                    buttonOnClick={() => {
                      onChangeHandler();
                    }}
                    LoadprimaryBtn
                  />
                  {/* </Col> */}
                  {/* )} */}
                </Col>
              </Row>
            </div>
          }
        </div>
        <div className="financeCards">
          <NewTableSummary reqData={data}></NewTableSummary>
        </div>
        <div className="mainContainer">
          <Row gutter={16}>
            <Col span={24}>
              <div className="financeCards">
                <h4>Bill Details</h4>
                <hr />

                <Form
                  name="basic"
                  labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col
                      sm={24}
                      md={24}
                      xs={24}
                      lg={14}
                      xl={6}
                      className="description-box"
                    >
                      <Descriptions
                        bordered
                        layout="horizontal"
                        column={1}
                        size="small"
                      >
                        <Descriptions.Item label="SubTotal">
                          <span className="descriptioncol">{total}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Discount (%)">
                          <span className="descriptioncol">
                            {discountpercentage?.toFixed(1)}
                          </span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Discount Amt">
                          <span className="descriptioncol">
                            {" "}
                            {discountamount?.toFixed(1)}
                          </span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Round Amt">
                          <span className="descriptioncol"> {roundamt}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="GrandTotal">
                          <span className="descriptioncol"> {grandtotals}</span>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    {/* span={10} */}
                    <Col sm={24} md={24} xs={24} lg={14} xl={10}>
                      <Form.Item
                        label="Item Name"
                        name="item"
                        rules={[
                          {
                            required: true,
                            message: "Please input item name!",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Rate"
                        name="rate"
                        rules={[
                          {
                            required: true,
                            message: "Please input item rate!",
                          },
                        ]}
                      >
                        <InputNumber
                          min={0}
                          onChange={(e) => {
                            setRate(e);
                          }}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Quantity"
                        name="qty"
                        rules={[
                          {
                            required: true,
                            message: "Please input item quantity!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={0}
                          onChange={(e) => setQuantity(e)}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Discount Amount"
                        name="discountAmount"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input max discount!",
                        //   },
                        // ]}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          min={0}
                          onChange={(e) => {
                            setDiscountAmount(e);
                            calculateDiscountPercentage(e);
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} md={24} xs={24} lg={10} xl={8}>
                      <Form.Item
                        label="Discount (%)"
                        name="discountPercentage"
                        rules={[
                          {
                            required: true,
                            message: "Please input item discount!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            width: "100%",
                          }}
                          // min={0}
                          max={100}
                          onChange={(e) => {
                            console.log(e, "discount percentage");
                            console.log(e.length, "discount lenght");

                            checkvalue();
                            setDiscountPercentage(e);
                            // setDTracker(!dTracker)

                            calculateDiscountAmount(e);
                            console.log(e, "log from onchange");

                            // autodisountamtcalculate(e);
                            // autocalcDisAmount(e);
                          }}
                          // defaultValue={discountpercentage}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Payment Type"
                        name="pmt"
                        rules={[
                          {
                            required: true,
                            message: "Please select payment type!",
                          },
                        ]}
                      >
                        <Select onChange={handleChange}>
                          {paymentType.map((item) => {
                            return (
                              <Option value={item.paymentmethod} key={item.id}>
                                {item.paymentmethod}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="fiscalYear" label="Fiscal Year">
                        <Select
                          style={{ width: "100%" }}
                          size="default"
                          onChange={(res) => {
                            setFiscalYearId(res);
                          }}
                        >
                          {fiscalYear.map((lis) => (
                            <Option
                              title={lis?.Year}
                              key={lis?.Id}
                              value={lis?.Id}
                            >
                              {lis?.Year}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Remarks"
                        name="Remarks"
                        rules={[
                          {
                            required: true,
                            message: "Please input item name!",
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="itemsection">
                    <Row gutter={16}>
                      <Col span={24}>
                        <div className="s-btn">
                          <AppButton
                            buttonTitle="Save"
                            butDis={false}
                            buttonOnClick={form.submit}
                            savebutton
                          ></AppButton>

                          {/* <Button type="primary" htmlType="submit"> */}
                          {/* <Button
                            htmlType="submit"
                            disabled={butDis}
                            type="primary"
                            className=""
                          >
                            Save
                          </Button> */}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </AddBillSection>
    </>
  );
};

export default AddBill;
const AddBillSection = styled.div`
  .data-item-display {
    display: flex;
  }
  .qty-field {
    margin-left: 10px;
  }
  .s-btn {
    margin-left: 20px;
    float: right;
  }
  /* .load-btn {
    margin-left: 20px;
  } */
  .dropdown-section {
    margin: 20px;
  }
  .requestor-section {
    display: flex;
  }
  .pmt-section {
    margin-left: 40px;
  }
  .itemsection {
    margin-top: 20px;
  }
  .descriptioncol {
    white-space: nowrap;
  }
  .ant-descriptions-bordered.ant-descriptions-small
    .ant-descriptions-item-label,
  .ant-descriptions-bordered.ant-descriptions-small
    .ant-descriptions-item-content {
    padding: 8px 16px;
    font-weight: 500;
  }
  /* ant-descriptions-item-label */
  @media only screen and (max-width: 1024px) {
    .description-box {
      margin-bottom: 20px;
    }
  }
`;
