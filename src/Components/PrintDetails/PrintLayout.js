import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { inWords } from "../../constants/numberToWords";
import {
  getListofcompany,
  getPatientBillByBillId,
  getPatientBillItemByBillId,
  getRequestorBillListAll,
} from "../../services/datametricService";
import { tokenString } from "../Common/HandleUser";
import { todaydate } from "../Common/TodayDate";

const PrintLayout = (props) => {
  console.log(props, "propsdatat  ");
  const dispatch = useDispatch();
  const paramVal =
    props !== undefined ? props?.location?.pathname.split("/") : "";
  const BILLID = paramVal != "" ? paramVal[2] : "";
  const FISCALYEAR = paramVal != "" ? paramVal[3] : "";

  const [companyDetail, setcompanyDetail] = useState([]);
  const [billDetails, setBillDetails] = useState([]);
  const [billItemDetails, setBillItemDetails] = useState([]);
  const [partyListData, setPartyListData] = useState([]);
  const [singlePartyData, setSinglePartyData] = useState([]);
  const [shouldPrint, setShouldPrint] = useState(false);
  useEffect(() => {
    console.log(billItemDetails, "billItemDetails");
  }, [billItemDetails]);

  const loadPrintDataFun = (billId, fiscalYear) => {
    const ALLDATA = {
      sampleId: billId,
      fiscalYear: fiscalYear,
    };

    dispatch(
      getListofcompany((data) => {
        setcompanyDetail(data[0]);
      })
    );

    dispatch(
      getRequestorBillListAll((val) => {
        if (val.length > 0) {
          setPartyListData(val);
        }
      })
    );

    dispatch(
      getPatientBillByBillId(ALLDATA, (val) => {
        if (val.length > 0) {
          setBillDetails(val);
          console.log(val, "billval");
        }
      })
    );
    dispatch(
      getPatientBillItemByBillId(ALLDATA, (val) => {
        console.log(val, "patientbillitembybillid");
        if (val.length > 0) {
          setBillItemDetails(val);
          console.log(val, "patientbillitembybillid");
          setShouldPrint(true);
        }
      })
    );
  };
  // console.log(billItemDetails, "Saurey");
  useEffect(() => {
    console.log(billItemDetails, "billItemDetails");
  }, [billItemDetails]);

  useEffect(() => {
    if (shouldPrint) {
      setTimeout(() => {
        window.print();
        // window.close();
      }, [1000]);
    }
  }, [shouldPrint]);

  useEffect(() => {
    loadPrintDataFun(BILLID, FISCALYEAR);
  }, []);

  useEffect(() => {
    if (billDetails.length > 0) {
      const oneParty = partyListData.filter(
        (res) => billDetails[0].BillCreditPartyCode === res.crdPartyCode
      );
      if (oneParty.length > 0) setSinglePartyData(oneParty[0]);
    }
  }, [partyListData, billDetails]);

  return (
    <div>
      {billDetails.map(() => (
        <PrintLayoutPage>
          <div className="topic-section">
            {console.log(singlePartyData)}
            <h3>{companyDetail?.CompanyName}</h3>
            <p>{companyDetail?.COmpanyAddress}</p>
            <p>
              Phn no: <span>{companyDetail?.COmpanyContactNo}</span> <br />
              PAN: <span>{companyDetail?.COmpanyTPIN}</span>
            </p>
            <div className="invoice">
              <span className="invoice-details">Invoice</span>
            </div>
          </div>
          <div className="details-section">
            <Divider orientation="left"></Divider>

            <div className="details-new">
              <table className="table-design">
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <strong>Bill No: </strong>
                        <span>{billDetails[0].BillNo}</span>
                      </div>
                      <div>
                        <strong>Bill Id: </strong>
                        <span>{BILLID}</span>
                      </div>
                      <div>
                        <strong>
                          Requestor: <span>{billDetails[0].Requestor}</span>
                        </strong>
                      </div>
                      <div>
                        <strong>
                          Payment Mode:{billDetails[0].PaymentMode}
                        </strong>
                      </div>
                      <div>
                        <strong>Payment Type:</strong>
                        <span>{billDetails[0].BillPaymentType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="right-details">
                        <div>
                          <strong>Bill Date: </strong>
                          <span>{billDetails[0].BillDate.split("T")[0]}</span>
                        </div>
                        <div>
                          <strong>Bill Nepali Date: </strong>
                          <span>{billDetails[0].BillNepaliDate}</span>
                        </div>
                        <div>
                          <strong>Credit Name: </strong>
                          <span>{singlePartyData?.CrdPartyName}</span>
                        </div>
                        <div>
                          <strong>Credit Pan: </strong>
                          <span>{singlePartyData?.CrdPartyPan}</span>
                        </div>
                        <div>
                          <strong>Credit Party Code: </strong>
                          <span>{billDetails[0].BillCreditPartyCode}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <table className="table_bill">
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Test Name</th>
                      <th className="money"></th>
                      {/* <th className="money">Quantity</th> */}
                      {/* <th className="money">Discount</th> */}
                      {/* <th className="money">Round Amount (Rs)</th> */}
                      <th className="money">Price (Rs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItemDetails.map((billItemVal, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div>{billItemVal.billTestName} </div>
                        </td>
                        {/* <td className="money">{billItemVal.billPrice}</td> */}
                        <td></td>
                        {/* <td className="money">1</td> */}
                        {/* <td className="money">
                          {billItemVal.BillDiscountAmount}
                        </td> */}
                        {/* <td className="money">{billItemVal.RoundAmount}</td> */}
                        <td className="money">{billItemVal.billPrice}</td>
                      </tr>
                    ))}
                    {billItemDetails.map((billItemVal, index) => (
                      <tr>
                        <th>Total</th>
                        <th></th>
                        {/* <th className="money">{billDetails[0].Price}</th> */}
                        <th></th>
                        <th className="money grandTotalAmount">
                          {/* {billDetails[0].TotalPrice} */}
                          {billItemVal.billPrice}
                        </th>
                        <th className="money"></th>
                        {/* {billDetails[0].BillDiscountPrice} */}
                      </tr>
                    ))}
                    <tr>
                      <th></th>
                      <th className="total-below">
                        <span>Net Total</span> <br></br>
                        <span>Discount Amount </span> <br></br>
                        <span>Round Amount </span> <br></br>
                        <span>Grand Total</span> <br></br>
                        <span>Paid Amount</span> <br></br>
                      </th>
                      <td className="money" colSpan="3">
                        {/* <span>{billDetails[0].TotalPrice}</span>
                        <br></br> */}
                        {billItemDetails.map((billItemVal, index) => (
                          <>
                            <span>{billItemVal.billPrice}</span>
                            <br></br>
                            <span>{billItemVal.BillDiscountAmount} </span>
                            <br></br>
                            <span>{billItemVal.RoundAmount}</span>
                            <br></br>
                            <span>{billItemVal.BillPriceFinal}</span>

                            <br></br>
                          </>
                        ))}
                        <span>{billDetails[0].BillAmtPaid}</span> <br></br>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="printed-section">
                  <span>
                    <strong>Printed On:</strong> {todaydate}
                  </span>

                  <span>
                    <strong>Printed By:</strong> {tokenString.token.username}
                  </span>
                </div>
                <span className="total-amt">
                  Amount in Words: {inWords(billDetails[0].TotalPrice)}
                </span>
              </div>
            </div>
          </div>
        </PrintLayoutPage>
      ))}
    </div>
  );
};

export default PrintLayout;
const PrintLayoutPage = styled.div`
  .topic-section {
    display: grid;
    justify-content: center;
    margin-top: 10px;
    align-items: center;
    text-align: center;
  }
  p {
    margin: 0;
  }
  h3 {
    color: black;
    margin: 0;
  }
  .invoice-details {
    font-size: 18px;
  }
  .row-section {
    margin-left: 10px;
  }

  /* new table */
  .details-new {
    margin-left: 10px;
  }
  tr td:last-child {
    text-align: right;
  }
  .table-design {
    width: 100%;
  }
  .right-details {
    margin-right: 10px;
  }
  .table_bill {
    border: 1px solid #ccc;
    border-collapse: collapse;
    width: 100%;
  }
  .table_bill thead tr th,
  .table_bill tfoot tr th {
    padding: 5px 9px !important;
  }
  .table_bill th {
    border: 1px solid #ccc;
  }
  .table_bill td,
  .table_bill th {
    border: 1px solid #ccc;
  }
  .money {
    text-align: right;
  }
  .table_bill tbody tr td {
    padding: 0px 9px !important;
  }
  .total-below {
    text-align: left;
  }
  th {
    text-align: left;
  }

  .printed-section span:last-child {
    float: right;
    text-align: right;
  }
  .qmoney {
    text-align: left;
  }
  p,
  span {
    font-size: 12px;
  }
  .total-amt {
    text-transform: capitalize;
  }
`;
