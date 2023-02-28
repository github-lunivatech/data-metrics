import {
  GetListOfUserForMetric,
  GetListOfTestByTypeForBulkUpdate,
  GetTestType,
  GetDatewiseRequestorTransactionDetails,
  GetRequestorList,
  GetReferedDoctorList,
  GetRequestorwiseTotalSalesSummaryByDate,
  GetDatewiseReferredDoctorTransactionDetails,
  GetDailySummaryTransactionUserWiseByDate,
  GetDailyTransactionByUserIdAndDate,
  GetCompanyDetials,
  GetDataMetricReportByReportTypeAndDateRange,
  VerifyPatientReport,
  GetPatientBillInfoByBillId,
  GetPatientBillItemDetailsByBillId,
  GetStates,
  GetDistrictsByStateId,
  GetMunicipalitiesByDistrictId,
  GetPatientDetailsByLocationWise,
  insertUpdateCreditPartyInPatientForPartyBill,
} from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateFormData";
import { fetch, store, storeNested } from "../utils/httpUtil";
import GetReportFormatById from "../constants/url";
export const getTestTypeReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await store(
        `${GetListOfTestByTypeForBulkUpdate}?testTypeId=${data.testType}`
      );
      if (response?.status === 200) {
        successCallback([]);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getReferReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDatewiseReferredDoctorTransactionDetails}?from=${data.fromdate}&to=${data.todate}&refId=${data.reqid}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getRequestorReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDatewiseRequestorTransactionDetails}?from=${data.fromdate}&to=${data.todate}&reqId=${data.reqid}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getRequestorTotalSalesReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetRequestorwiseTotalSalesSummaryByDate}?from=${data?.fromdate}&to=${data?.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getGetRequestorList = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetRequestorList);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getRequestorBillListAll = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`GetCreditPartyListForBilling`);

      if (response?.status === 200) {
        successCallback(response?.data?.CreditParty);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getGetRefererList = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetReferedDoctorList);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getGetTestTypeList = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetTestType);
      if (response?.status === 200) {
        successCallback(response?.data?.TestType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getDailyTransactionReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDailyTransactionByUserIdAndDate}?from=${data.fromdate}&to=${data.todate}&userId=${data.userId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getDailySummaryReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDailySummaryTransactionUserWiseByDate}?from=${data.fromdate}&to=${data.todate}&userId=${data.userId}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.ReportDetails);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getListofUser = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetListOfUserForMetric}`);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getListofcompany = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetCompanyDetials}`);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportType);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

//
export const getDataMetricReportByReportTypeAndDateRange = (
  data,
  successCallback
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetDataMetricReportByReportTypeAndDateRange}?from=${data.fromdate}&to=${data.todate}&reportType=${data.reportType}`
        // `${GetDataMetricReportByReportTypeAndDateRange}?from=${data.fromdate}&to=${data.todate}&reportType=dashboard`
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

//
export const insertVerifyPatientReport = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const formData = generateUrlEncodedData(data);
      const response = await store(VerifyPatientReport, formData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const addCreateCreditPartyBill = (data, successCallback) => {
  return async (dispatch) => {
    try {
      data._lstBillItems = JSON.stringify(data._lstBillItems);
      const formData = generateUrlEncodedData(data);
      // const response = await store('CreateCreditPartyBill', formData);
      const response = await storeNested("", formData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getPatientBillByBillId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetPatientBillInfoByBillId}?billId=${data.sampleId}&fiscalyear=${data.fiscalYear}`
      );
      // const response = await fetch(
      //   `GetPatientBillInfoByBillId?billId=${data.sampleId}&fiscalyear=${data.fiscalYear}`
      // );
      if (response?.status === 200) {
        successCallback(response?.data?.billDetails);
        // dispatch(response?.data)
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getPatientBillItemByBillId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetPatientBillItemDetailsByBillId}?billId=${data.sampleId}&fiscalyear=${data.fiscalYear}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.billItemDetails);
        // dispatch(response?.data)
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

// newTests

export const getStates = (successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetStates}`);
      if (response?.status === 200) {
        successCallback(response?.data?.StateDetails);
        // dispatch(response?.data)
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const getDistrictsByStateId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${GetDistrictsByStateId}?stateId=${data}`);
      if (response?.status === 200) {
        successCallback(response?.data?.DistrictList);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};
export const getMunicipalitiesByDistrictId = (data, successCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetMunicipalitiesByDistrictId}?districtId=${data}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.MunicipalList);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};
// GeographicalTestwisePatientCountReport
export const getGeographicalTestwisePatientCountReport = (
  data,
  successCallback
) => {
  console.log(data, "dataapppppp");
  return async (dispatch) => {
    try {
      const response = await fetch(
        `GeographicalTestwisePatientCountReport?provinceid=${data.provinceid}&districtid=${data.districtid}&municipalityId=${data.municipalityId}&fromdate=${data.fromdate}&todate=${data.todate}&diagnosisId=${data.diagnosisId}&testId=${data.testId}`
      );
      console.log(response);
      if (response?.status === 200) {
        successCallback(response?.data?.TestWiseCount);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};
export const getPatientDetailsByLocationWise = (data, successCallback) => {
  return async (dispatch) => {
    try {
      // console.log(data, "dataasss");
      const response = await fetch(
        `${GetPatientDetailsByLocationWise}?provinceid=${data.provinceid}&districtid=${data.districtid}&municipalityId=${data.municipalityId}&fromdate=${data.fromdate}&todate=${data.todate}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.PatientList);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const InsertUpdateCreditPartyInPatientForPartyBill = (
  data,
  successCallback
) => {
  return async (dispatch) => {
    try {
      // console.log(data, "dataasss");
      const response = await fetch(
        `${insertUpdateCreditPartyInPatientForPartyBill}?id=${data.id}&creditparty=${data.creditparty}&partycode=${data.partycode}&userId=${data.userId}&email=${data.email}&contactno=${data.contactno}&pan=${data.pan}&remarks=${data.remarks}`
      );
      if (response?.status === 200) {
        successCallback(response?.data?.SampleId);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const GetEmailServerDetails = (data, successCallback) => {
  return async (dispatch) => {
    try {
      console.log(data, "dataasss");
      const response = await fetch(`GetEmailServerDetails?eId=${data.id}`);
      if (response?.status === 200) {
        successCallback(response?.data?.EmailSettings);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const GetReportFormatDetails = (data, successCallback) => {
  return async (dispatch) => {
    try {
      // console.log(data, "dataasss");
      const response = await fetch(`GetReportFormatById?rId=${data.id}`);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportFormat);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const GetReportGroupLookUpById = (data, successCallback) => {
  return async (dispatch) => {
    try {
      // console.log(data, "dataasss");
      const response = await fetch(`GetReportGroupLookUpById?rId=${data.id}`);
      if (response?.status === 200) {
        successCallback(response?.data?.ReportGroup);
      } else {
        successCallback([]);
      }
    } catch (error) {}
  };
};

export const InsertUpdateEmailserverDetails = (data, successCallback) => {
  return async (dispatch) => {
    const newData = generateUrlEncodedData(data);
    try {
      const response = await store(`InsertUpdateEmailserverDetails`, newData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};

export const InsertUpdateLabReportFormats = (data, successCallback) => {
  return async (dispatch) => {
    const newDatas = generateUrlEncodedData(data);
    try {
      const response = await store(`InsertUpdateLabReportFormats`, newDatas);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) {}
  };
};
