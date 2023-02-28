import { Col, Row, Form, Descriptions, Button } from "antd";
import PageHeader from "../Common/pageHeader";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  getPatientBillByBillId,
  getPatientBillItemByBillId,
  getRequestorBillListAll,
} from "../../services/datametricService";
import { useEffect, useState } from "react";
import { carelabStat, homePageName } from "../Common/StateList";
import { useHistory } from "react-router-dom";
import AppButton from "../Common/AppButton";

const ViewUpdateBill = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const BILLID = props?.match?.params.id;
  const FISCALYEAR = props?.match?.params.fiscalyear;
  const [IsLoading, setIsLoading] = useState(false);
  const [billDetails, setBillDetails] = useState([]);
  const [billItemDetails, setBillItemDetails] = useState([]);
  const [partylistdata, setPartyListData] = useState([]);
  const [patientinfo, setPatientInfo] = useState([]);
  const [finaldata, setFinaldata] = useState([]);

  const windowopen = () => {
    window.open(
      `/${homePageName}/printlayout/${BILLID}/${FISCALYEAR}`,
      "_blank"
    );
  };

  const loadPrintDataFun = (billId, fiscalYear) => {
    const ALLDATA = {
      sampleId: billId,
      fiscalYear: fiscalYear,
    };

    dispatch(
      getPatientBillByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillDetails(val);
          setPatientInfo(val);
        }
      })
    );

    dispatch(
      getRequestorBillListAll((val) => {
        if (val.length > 0) {
          setPartyListData(val);
        }
      })
    );

    setIsLoading(true);
    dispatch(
      getPatientBillItemByBillId(ALLDATA, (val) => {
        console.log(val, "valcomes");
        if (val.length > 0) {
          setBillItemDetails(val);
          setTableData(val);
        } else {
          setTableData([]);
        }
      })
    );
    setIsLoading(false);
  };
  useEffect(() => {
    loadPrintDataFun(BILLID, FISCALYEAR);
  }, []);

  useEffect(() => {
    if (patientinfo.length > 0) {
      const itemme2 = partylistdata.filter(
        (res) => patientinfo[0].BillCreditPartyCode === res.crdPartyCode
      );
      setFinaldata(itemme2);
    }
  }, [patientinfo, partylistdata]);

  const onFinish = (res) => {};
  const onFinishFailed = (res) => {};

  return (
    <>
      {billDetails.map(() => (
        <ViewUpdateBillSection>
          <div className="maiTopContainer">
            <PageHeader
              pageTitle={"View Bill"}
              buttonTitle="Create New Bill"
              buttonOnClick={() =>
                history.push({
                  pathname: "/addbill",
                  state: carelabStat,
                })
              }
            />
          </div>
          <div className="financeCards">
            <h4>Bill Summary</h4>
            <Row justify="space-between">
              <Col>
                <p>Patient Id: {billDetails[0].patId}</p>
                <p>Bill Id: {BILLID}</p>
                <p>Bill No: {billDetails[0].BillNo} </p>
              </Col>
              <Col></Col>
              {finaldata.map(() => (
                <Col>
                  <p>Credit Party: {finaldata[0].CrdPartyName} </p>
                  <p>Credit Pan: {finaldata[0].CrdPartyPan} </p>
                  <p>
                    Credit Party Code: {billDetails[0].BillCreditPartyCode}{" "}
                  </p>
                </Col>
              ))}
            </Row>
            {/* {finaldata.map(() => (
              <Row justify="space-between">
                <Col>
                  <ul>Bill Name :{finaldata[0].CrdPartyName} </ul>
                  <ul>Bill No :{finaldata[0].crdPartyPhoneNo} </ul>
                </Col>
                <Col>
                  <ul>Address :{finaldata[0].CrdPartyAddress} </ul>
                </Col>
              </Row>
            ))} */}
            {/* <div>
              {partylistdata.map((abc) => {
                return <ul>Bill No :{abc.crdId} </ul>;
              })}
            </div> */}
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <table className="table" id="customers">
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>Test Name</th>
                          <th>Total</th>
                          <th>Discount Amount</th>
                          <th>Grand Total</th>
                          <th>Round Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billItemDetails.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.billTestName}</td>
                              <td>{data.billPrice}</td>
                              <td>{data.BillDiscountAmount}</td>
                              <td>{data.BillPriceFinal}</td>
                              <td>{data.RoundAmount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <Row>
                      {/* <Col span={6}> */}
                      <Col
                        sm={12}
                        md={12}
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
                          <Descriptions.Item label="Net Total">
                            {billDetails[0].Price}
                          </Descriptions.Item>
                          {billItemDetails.map((data, index) => {
                            return (
                              <Descriptions.Item label="Discount Amount">
                                {data.BillDiscountAmount}
                              </Descriptions.Item>
                            );
                          })}

                          <Descriptions.Item label="Grand Total">
                            {billDetails[0].TotalPrice}
                          </Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={18}>
                        <PrintContainer>
                          {/* <Button
                            onClick={() => {
                              window.open(
                                `/${homePageName}/printlayout/${BILLID}/${FISCALYEAR}`,
                                "_blank"
                              );
                            }}
                          >
                            Print
                          </Button> */}
                          <AppButton
                            buttonTitle="Print"
                            buttonOnClick={windowopen}
                            printprimarybutton
                          ></AppButton>
                        </PrintContainer>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </ViewUpdateBillSection>
      ))}
    </>
  );
};

export default ViewUpdateBill;
const ViewUpdateBillSection = styled.div`
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
  .load-btn {
    margin-left: 20px;
  }
  .dropdown-section {
    margin: 20px;
  }
  .requestor-section {
    display: flex;
  }
  .pmt-section {
    margin-left: 40px;
  }
  .table {
    border: 1px solid;
  }
  #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0px 10px 0px;
  }

  #customers td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #customers tr:hover {
    background-color: #ddd;
  }

  #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #fafafa;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const PrintContainer = styled.div`
  float: right;
`;
