import {
  GetDatametricReportType,
  GetDatewiseSampleStatusOfEachTest,
  GetGeographyWiseMISReports,
  GetListOfPatientDetailsBydateAndTestDone,
  GetListOfPCRsampleByRequestorForBulkNegative,
  GetMemberShipDetailsByMembercode,
  GetMemberShipDetailsByMemberId,
  GetSMSConsumptionDetails,
  InsertUpdateCreditPartyInPatientForPartyBill,
} from "../constants/url";
import { fetchCarelab } from "../utils/carelabUtil";
import { fetch } from "../utils/httpUtil";

export const careLabTabApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `GetReportCountByStatusAndDateRange?fromdate=${data.fromdate}&todate=${data.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportStatus);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const careLabSampleStatusApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `GetPatientSampleSummaryStatus?from=${data.fromdate}&to=${data.todate}&fiscalyearId=${data.fiscalyear}&testin=&testnotin=&diagnosisin=${data.diagListIn}&diagnosisnotin=`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.CovidDetails);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const careLabTestListApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `GetTestListToViewOrVerifyInSummaryReport?sampleid=${data.sampleid}&fiscalyear=${data.fiscalyear}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.RecordList);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const careLabFiscalCodeApi = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`GetFiscalYearCodeList`);
      if (response?.status === 200) {
        successCallback(response?.data?.FIscalYearCode);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const careLabDiagnosisApi = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`GetDiagnosiGroupList`);
      if (response?.status === 200) {
        successCallback(response?.data?.DiagnosisGroup);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const dateWiseTestApi = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `GetDatewiseIncompleteSampleTestDetails?fromdate=${data.fromdate}&todate=${data.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.IncompleteSampleList);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const GetListOfPatientDetailsBydateAndTest = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetListOfPatientDetailsBydateAndTestDone}?fromdate=${data.fromdate}&todate=${data.todate}&testname=${data.testname}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.PatientList);
        // console.log("response sucess", )
      } else {
        successCallback([]);
        console.log("error");
      }
    } catch (error) { }
  };
};

// GetDatewiseSampleStatusOfEachTest

export const GetListOfPatientDetailsBydateAndTests = (
  data,
  successCallback
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDatewiseSampleStatusOfEachTest}?fromdate=${data.fromdate}&todate=${data.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.TestWiseSampleStatus);
        // console.log("response sucess", response?.data)
      } else {
        successCallback([]);
        console.log("error");
      }
    } catch (error) { }
  };
};

export const GetListOfPCRsampleByRequestorForBulkNegatives = (
  data,
  successCallback
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetListOfPCRsampleByRequestorForBulkNegative}?from=${data.from}&to=${data.to}&reqId=${data.reqId}&fiscalyear=${data.fiscalyear}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.CovidDetailsRequestorWise);
        // console.log("response sucess", response?.data)
      } else {
        successCallback([]);
        console.log("error");
      }
    } catch (error) { }
  };
};
export const GetSMSConsumptionDetail = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetchCarelab(
        `${GetSMSConsumptionDetails}?from=${data.fromdate}&to=${data.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.MessageDetails);
        // console.log("smsgot!", response?.data);
      } else {
        successCallback([]);
        console.log("error");
      }
    } catch (error) { }
  };
};
export const getMemberShipDetailsByMemberId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetMemberShipDetailsByMemberId}?mId=${data.mId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.MemberDetials);
        // console.log("smsgot!", response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};

export const getDatametricReportType = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetDatametricReportType}`);
      if (response?.status === 200) {
        // console.log(response, "resresres");
        successCallback(response?.data?.ReportDetails);
      } else {
        console.log("error");
        successCallback([]);
      }
    } catch (error) { }
  };
};
//province
export const getGeographyWiseMISReports = (data, successCallback) => {
  console.log(data, "data");
  return async (dispatch) => {
    console.log(data);
    try {
      const response = await fetch(
        `${GetGeographyWiseMISReports}?provinceid=${data.provinceid}&districtid=${data.districtid}&municipalityId=${data.municipalityId}&fromdate=${data.fromdate}&todate=${data.todate}&reportTypeId=${data.reportTypeId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.PatientList);
        // console.log("smsgot!", response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};

export const getMemberShipDetailsByMemberCode = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetMemberShipDetailsByMembercode}?memcode=${data.memberCode}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.MemberDetials);
        // console.log("smsgot!", response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};


export const InsertUpdateCreditPartyInPatientForPartyBills = (data, successCallback) => {
  console.log(data, "data");
  return async (dispatch) => {
    console.log(data);
    try {
      const response = await fetch(
        `${InsertUpdateCreditPartyInPatientForPartyBill}?id=${data.id}&creditparty=${data.creditparty}&partycode=${data.partycode}&userId=${data.userId}&email=${data.email}&contactno=${data.contactno}&pan=${data.pan}&remarks=${data.remarks}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.SampleId);
        // console.log("smsgot!", response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};