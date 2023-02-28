import { message, Table, notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getDatametricReportType,
  getGeographyWiseMISReports,
} from "../../../services/careLabService";
import {
  getDistrictsByStateId,
  getMunicipalitiesByDistrictId,
  getPatientDetailsByLocationWise,
  getStates,
} from "../../../services/datametricService";
import PageHeader from "../../Common/pageHeader";
import ReportsFilter from "../../Common/ReportsFilter";
import MainPageChart from "./MainPageChart";
import { NavLink, useLocation } from "react-router-dom";

function ProvienceDistrictWise() {
  const [states, setStates] = useState([]);
  const [district, setDistrict] = useState([]);
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipality, setMunicipality] = useState([]);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [patientData, setPatientData] = useState([]);
  const [reportsColumn, setReportsColumn] = useState([]);
  const [reportType, setReportType] = useState();
  const [reportId, setReportId] = useState();

  const dispatch = useDispatch();

  function createMarkup(htmlData = "") {
    return {
      __html: htmlData,
    };
  }

  useEffect(() => {
    dispatch(
      getDatametricReportType((val) => {
        setReportType(val);
      })
    );
  }, []);
  const OnLoad = () => {
    setPatientData([]);
    let data = {
      provinceid: stateId ? stateId : 0,
      districtid: districtId ? districtId : -1,
      municipalityId: municipalityId ? municipalityId : -1,
      fromdate: fromDate,
      todate: toDate,
      reportTypeId: reportId,
    };

    dispatch(
      getGeographyWiseMISReports(data, (val) => {
        if (val.length > 0) {
          let tableKeys = Object.keys(val[0]);
          let data = [];
          tableKeys.forEach((ele) => {
            data.push({
              title: ele,
              dataIndex: ele,
              key: ele,
              // render: function (html) {
              //   return <div dangerouslySetInnerHTML={createMarkup(html)} />;
              // },
            });
          });
          setReportsColumn(data);
          setPatientData(val);
        } else {
          notification.info({
            duration: 3,
            placement: "topRight",
            message: `No data found `,
            rtl: true,
          });
        }
      })
    );
  };

  useEffect(() => {
    console.log("newstates", states);
  }, [states]);

  useEffect(() => {
    dispatch(
      getStates((val) => {
        let newState = val.unshift({
          Id: 0,
          Name: "All",
        });

        console.log("log from states", newState);
        setStates(val);
      })
    );

    dispatch(
      getDistrictsByStateId(stateId, (val) => {
        let newState = val.unshift({
          Id: 0,
          Name: "All",
        });
        console.log(newState, "districtstsdsfsdfsfd", val);
        setDistrict(val);
      })
    );
  }, [stateId]);

  useEffect(() => {
    dispatch(
      getMunicipalitiesByDistrictId(districtId, (val) => {
        let newState = val.unshift({
          Id: 0,
          Name: "All",
        });
        setMunicipality(val);
      })
    );
  }, [districtId]);

  // var dateData = {
  //   fromdate: val[0].format("YYYY-MM-DD"),
  //   todate: val[1].format("YYYY-MM-DD"),
  //   SearchType: val.SearchType !== undefined ? val.SearchType : 1,
  // };
  const location = useLocation();
  console.log(location, "123456");

  return (
    <>
      <Provincedistrictwise>
        <div className="maiTopContainer">
          <PageHeader
            pageTitle={"Province & District-Wise Patient Count & Details"}
          />
          <ReportsFilter
            dateRange
            serchButton
            states={states}
            district={district}
            municipality={municipality}
            setStateId={setStateId}
            setDistrictId={setDistrictId}
            setMunicipalityId={setMunicipalityId}
            setFromDate={setFromDate}
            setToDate={setToDate}
            OnLoad={OnLoad}
            csvDataName="PatientReport.csv"
            csvData={patientData}
            reportName={reportId === 1 ? "Patient's" : "Patient's Count"}
            printFileName
            fromDate
            toDate
            tableHead={reportsColumn}
            reportType={reportType}
            setReportId={setReportId}
          />

          {patientData?.length > 0 && (
            <div className="tableisRes">
              <Table
                className="tableWidth"
                columns={reportsColumn}
                dataSource={patientData}
              />
            </div>
          )}
        </div>
        {/* <MainPageChart /> */}
      </Provincedistrictwise>
    </>
  );
}

export default ProvienceDistrictWise;
export const Provincedistrictwise = styled.div``;
