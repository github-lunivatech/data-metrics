import { message, notification, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VerifyPatientReport } from "../../../constants/url";
import {
  getDatametricReportType,
  getGeographyWiseMISReports,
} from "../../../services/careLabService";
import {
  getDistrictsByStateId,
  getGeographicalTestwisePatientCountReport,
  getMunicipalitiesByDistrictId,
  getPatientDetailsByLocationWise,
  getStates,
} from "../../../services/datametricService";
import PageHeader from "../../Common/pageHeader";
import ReportsFilter from "../../Common/ReportsFilter";
import ReportsFilterGeo from "../../Common/ReportFilterGeo";
import { getControlValueByControlTestIdApi } from "../../../services/qcService";
function GeoGraphicalWise() {
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
  const [test, setTest] = useState([]);
  const [testId, setTestId] = useState(0);
  const [diagnosis, setDiagnosis] = useState([]);
  const [diagnosisId, setDiagnosisId] = useState(0);

  const dispatch = useDispatch();

  function createMarkup(htmlData = "") {
    return {
      __html: htmlData,
    };
  }

  //   useEffect(() => {
  //     dispatch(
  //       getDatametricReportType((val) => {
  //         setReportType(val);
  //       })
  //     );
  //   }, []);
  const OnLoad = () => {
    console.log("fromtodate", fromDate, toDate, diagnosisId);
    setPatientData([]);
    let data = {
      provinceid: stateId ? stateId : 0,
      districtid: districtId ? districtId : 0,
      municipalityId: municipalityId ? municipalityId : 0,
      fromdate: fromDate,
      todate: toDate,
      diagnosisId: diagnosisId ? diagnosisId : 0,

      testId: testId ? testId : 0,
    };
    console.log(data, "data");

    dispatch(
      getGeographicalTestwisePatientCountReport(data, (val) => {
        console.log("data", data, "val", val);
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
          // message.info("No data found");
          notification.info({
            duration: 3,
            placement: "topRight",
            message: "Data Not Found",
            rtl: true,
          });
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      getStates((val) => {
        setStates(val);
        console.log(val);
      })
    );

    dispatch(
      getDistrictsByStateId(stateId, (val) => {
        setDistrict(val);
      })
    );
  }, [stateId]);

  useEffect(() => {
    dispatch(
      getMunicipalitiesByDistrictId(districtId, (val) => {
        console.log(val, "municiplaity val");
        console.log(districtId, "districtid");
        setMunicipality(val);
      })
    );
  }, [districtId]);

  useEffect(() => {
    dispatch(
      getGeographicalTestwisePatientCountReport(diagnosisId, (val) => {
        console.log(diagnosisId, "valge");
        console.log(val, "diagnosisreportval");
        setDiagnosis(val);
      })
    );
  }, [diagnosisId]);

  useEffect(() => {
    dispatch(
      getControlValueByControlTestIdApi((val) => {
        console.log(data, "valge");
        console.log(val, "diagnosisreportval");
        setTest(val);
      })
    );
  }, [diagnosisId]);

  // var dateData = {
  //   fromdate: val[0].format("YYYY-MM-DD"),
  //   todate: val[1].format("YYYY-MM-DD"),
  //   SearchType: val.SearchType !== undefined ? val.SearchType : 1,
  // };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Geographical Wise Reports & Details"} />
        <ReportsFilterGeo
          dateRange
          serchButton
          states={states}
          district={district}
          municipality={municipality}
          test={test}
          setStateId={setStateId}
          setDistrictId={setDistrictId}
          setMunicipalityId={setMunicipalityId}
          setDiagnosisId={setDiagnosisId}
          diagnosisId={diagnosisId}
          diagnosis={diagnosis}
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
    </>
  );
}

export default GeoGraphicalWise;
