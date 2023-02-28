import { message, notification, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppButton from "./AppButton";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { getListofcompany } from "../../services/datametricService";
import { newTableStyles } from "./TableStyles";

const PageHeader = ({
  pageTitle,
  buttonTitle,
  buttonOnClick,
  csvLinkTitle,
  csvDataName,
  csvData,
  forGroup,
  forGroupButtonClick,
  forCon,
  forConButtonClick,
  printFileName,
  reportName,
  tableHead,
  fromToDate,
  removetwo,
  selctorr,
  forData,
  forDataButtonClick,
}) => {
  const dispatch = useDispatch();
  const [companyDetail, setcompanyDetail] = useState([]);

  useEffect(() => {
    dispatch(
      getListofcompany((data) => {
        setcompanyDetail(data[0]);
      })
    );
  }, []);
  // console.log("col", tableHead)
  // console.log('data', csvData)

  //print handler
  //needs csvData, tableHead, fromTodate

  //company details
  //<h2> ${companyDetail.CompanyName} </h2>
  //<p> ${companyDetail.COmpanyAddress} </p>
  //<p>Contact no:${companyDetail.COmpanyContactNo} </p>
  const printHandle = () => {
    if (csvData.length !== 0) {
      let newWindow = window.open();

      var adbs = require("ad-bs-converter");
      var nepaliFromDate = fromToDate.fromdate;
      var nepaliToDate = fromToDate.todate;
      var neaplaiFromToDateString = [];
      if (nepaliFromDate !== undefined) {
        var nNepaliFromDate = nepaliFromDate.replaceAll("-", "/");
        var nNepaliToDate = nepaliToDate.replaceAll("-", "/");
        var converterNepaliFromDate = adbs.ad2bs(nNepaliFromDate);
        var converterNepalitoDate = adbs.ad2bs(nNepaliToDate);
        var converteNpFromDate = `${converterNepaliFromDate.en.year}-${converterNepaliFromDate.en.month}-${converterNepaliFromDate.en.day} `;
        var converteNpToDate = `${converterNepalitoDate.en.year}-${converterNepalitoDate.en.month}-${converterNepalitoDate.en.day} `;
        neaplaiFromToDateString.push(converteNpFromDate, converteNpToDate);
      }

      let newStyle = ``;
      if (removetwo)
        newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        display: none;
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`;

      let refName = `
      <div class="gocenter">
          
          <h2> Crystal Diagonistic Lab </h2>
          <p> Kathmandu, sankhamul </p>
          <p>Contact no:9009090 </p>
          <h2>${reportName} Report</h2>
      </div>
      <div class="headingContent">
      <div>
      ${
        selctorr !== undefined
          ? `${reportName} Name: ${csvData[0][selctorr]}`
          : ``
      }
      </div>
      <div>
      <strong>From</strong> ${
        neaplaiFromToDateString[0]
      } - <strong>To</strong> ${neaplaiFromToDateString[1]}
      </div>
      </div>
      `;

      let tableBody = "";
      let tableHeadHtml = "<thead>";
      let columns = [];

      tableHead.forEach((ele) => {
        tableHeadHtml += `<th>${ele?.dataIndex}</th>`;
        columns.push(ele.dataIndex);
      });
      tableHeadHtml += "</thead>";

      csvData.forEach((ele) => {
        tableBody = tableBody + "<tr>";
        columns.forEach((cell) => {
          tableBody = tableBody + "<td>" + ele[cell] + "</td>";
        });
        tableBody = tableBody + "</tr>";
      });

      let allTable = `<table>${tableHeadHtml}${tableBody}</table>`;

      newWindow.document.body.innerHTML =
        newTableStyles + newStyle + refName + allTable;

      setTimeout(function () {
        newWindow.print();
        newWindow.close();
      }, 300);
    } else {
      notification.info({
        duration: 3,
        placement: "topRight",
        message: "select some data",
        rtl: true,
      });
    }
  };

  return (
    <PageHeaderContainer>
      {/* for msi only */}
      {/* <div className="mis">
        <Link className='coButton' to='/datametric'>
          <span>
            <i className='icon-line2-home'></i> MIS
          </span>
        </Link>
        <Link className='coButton' to='/datametric'>
          <span>
          Crystal Diagnostic Lab
          </span>

        </Link>
      </div> */}
      {/* for msi only end */}
      <div>
        <Row justify="space-between align-center">
          <span className="pageTtitle">{pageTitle}</span>
          {/* style={{ gap: '10px' }} */}
          <Row className="exportcsvprint">
            <Space size={[8, 16]} wrap>
              {forCon && (
                <AppButton
                  buttonTitle={forCon}
                  buttonOnClick={forConButtonClick}
                  // primaryBtn
                  addprimarybutton
                ></AppButton>
              )}

              {buttonTitle && (
                <AppButton
                  buttonTitle={buttonTitle}
                  buttonOnClick={buttonOnClick}
                  // primaryBtn
                  addprimarybutton
                ></AppButton>
              )}

              {forGroup && (
                <AppButton
                  buttonTitle={forGroup}
                  buttonOnClick={forGroupButtonClick}
                  // primaryBtn
                  addprimarybutton
                ></AppButton>
              )}

              {forData && (
                <AppButton
                  buttonTitle={forData}
                  buttonOnClick={forDataButtonClick}
                  // primaryBtn
                  addprimarybutton
                ></AppButton>
              )}
            </Space>
            {csvDataName && (
              <div className="link">
                <i class="fas fa-cloud">
                  <CSVLink
                    filename={csvDataName}
                    // className="btn ant-btn btn-primary btn-primary--outline"
                    className="csvbutton"
                    data={csvData}
                  >
                    {/* <i class="icon-frown">Export CSV</i> */}
                    <i class="icon-file">
                      Export Csv
                      {/* <span>Export CSV</span> */}
                    </i>
                  </CSVLink>
                </i>
              </div>
            )}
            {printFileName && (
              <AppButton
                buttonTitle="Print"
                buttonOnClick={printHandle}
                // primaryBtn
                // addprimarybutton
                printprimarybutton
              ></AppButton>
            )}
          </Row>
        </Row>
      </div>
    </PageHeaderContainer>
  );
};

export default PageHeader;

const PageHeaderContainer = styled.div`
  /* background-color: #fefefe; */
  padding: 10px 10px;
  width: 100%;
  align-items: center;
  /* for MIS */
  /* .mis{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .coButton{
    background-color: var(--primary);
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 5px;
   
    span{
      display: flex;
      gap: 10px;
      color: #fefefe;
      justify-content: center;
      align-items: center;
      i{

      }
    }

  } */
  /* for MIS end */
  /* exportcsvprint */
  /* responsive for ousourcing report */
`;
