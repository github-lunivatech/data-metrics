// export const DEV_URL = 'http://192.168.100.34/CarelabInventory/';
export const DEV_URL =
  "https://lunivacare.ddns.net/CarelabDataMetricService_qc/";
// export const DEV_URL =
//   "https://lunivacare.ddns.net/CarelabDataMetricServiceCrystalLive/";
// export const DEV_URL =
//   "https://lunivacare.ddns.net/CarelabDataMetricService_billTest/";

export const Carelab_Url =
  "https://lunivacare.ddns.net/CarelabDataMetricService_qc/";

// bill test
// export const Carelab_Url =
//   "https://lunivacare.ddns.net/CarelabDataMetricService_billTest/";

// export const Carelab_Url =
//   "http://192.168.100.34/CarelabDataMetricServiceCrystal/";

// export const Carelab_Url =
//   "https://lunivacare.ddns.net/CarelabDataMetricServiceCrystalLive/";

// export const DEV_URL = 'https://lunivat.ddns.net/crystal/CarelabDataMetricServiceCrystal/';
// http://192.168.100.34/CarelabDataMetricServiceCrystal/
// export const DEV_URL = 'https://lunivatech.ddns.net/LunivaSamjhana/LunivaInventory/';
// export const DEV_URL = 'http://lunivatech.ddns.net/LunivaSamjhana/LunivaInventory/';

// export const DEV_URL =
//   "https://lunivacare.ddns.net/CarelabDataMetricServiceBagmatiJanaswasthaLive/";

// export const Carelab_Url =
//   "https://lunivacare.ddns.net/CarelabDataMetricServiceBagmatiJanaswasthaLive/";

export const CARELAB_LINK = `https://lunivat.ddns.net/jpdhulikhel/Carelab/Account/Login`;

// export const TEST_LINK = `http://192.168.100.77:90/ecrm/login/testCallSer`;
export const TEST_LINK = `http://lunivacare.ddns.net:8080/ecrm/login/testCallSer`;

export const BASE_URL = `${DEV_URL}Api/`; // see service for api or Api
export const CarelabBase_Url = `${Carelab_Url}Api/`;

// for inventory lab only
//GET
/**
 * @desc: get item category
 * @param: ?id={id}
 */
export const GetItemCategory = "GetItemCategory";
/**
 * @desc: get item type
 * @param: ?id={id}
 */
export const GetItemType = "GetItemType";
/**
 * @desc: get units details
 * @param: ?id={id}
 */
export const GetUnitsDetails = "GetUnitsDetails";
/**
 * @desc: get manufacture details
 * @param: ?id={id}
 */
export const GetManufactureDetails = "GetManufactureDetails";
/**
 * @desc: get location details
 * @param: ?id={id}
 */
export const GetLocationDetails = "LocationDetails";
/**
 * @desc: get good received details by date
 * @param: ?fromdate=2021-11-01&todate=2021-11-28
 */
export const GetGoodReceivedDetailsByDate = "GetGoodReceivedDetailsByDate";
/**
 * @desc: get list of lab intems detail by type id
 * @param: ?itemtypeId=1&CategoryId=1
 */
export const GetListOfLabItemsDetailsByTypeId =
  "GetListOfLabItemsDetailsByTypeId";
/**
 * @desc: rack details by location id
 * @param: ?locationId=1
 */
export const RackDetailsByLocationId = "RackDetailsByLocationId";
/**
 * @desc: get list of wastage details by date
 * @param: ?fromdate=2021-11-01&todate=2021-11-28
 */
export const GetlistOfwastageDetailsByDate = "GetlistOfwastageDetailsByDate";
/**
 * @desc: get list of item vs test ratio
 * @param: ?id={id}
 */
export const GetListOfItemVsTestRatio = "GetListOfItemVsTestRatio";
/**
 * @desc:
 * @param:
 */
export const GetListOfGroupTestForInventory = "GetListOfGroupTestForInventory";
/**
 * @desc: get list of goods out record by date
 * @param: ?fromdate={fromdate}&todate={todate}
 */
export const GetListofGoodsOutRecordByDate = "GetListofGoodsOutRecordByDate";
/**
 * @desc: get list of test for inventory
 * @param:
 */
export const GetListOfTestForInventory = "GetListOfTestForInventory";
/**
 * @desc: get goods out count by date wise and item wise
 * @param: ?fromdate={fromdate}&todate={todate}&itemid={itemid}
 */
export const GetGoodsOutCountByDateWiseandItemWise =
  "GetGoodsOutCountByDateWiseandItemWise";
/**
 * @desc: get goods in count by date wise and item wise
 * @param: ?fromdate={fromdate}&todate={todate}&itemid={itemid}
 */
export const GetGoodsInCountByDateWiseandItemWise =
  "GetGoodsInCountByDateWiseandItemWise";
/**
 * @desc: get current remaining stock count by id
 * @param:
 */
export const GetCurrentRemainingStockCountById =
  "GetCurrentRemainingStockCountById";
/**
 * @desc: get list of items near to min quantity
 * @param:
 */
export const GetListOfItemsNearToMinQuantity =
  "GetListOfItemsNearToMinQuantity";
/**
 * @desc: get total goods in and out by item
 * @param:
 */
export const GetTotalGoodsInAndOutByItem = "GetTotalGoodsInAndOutByItem";
/**
 * @desc: get good received details by item id
 * @param: ?itemId={itemId}
 */
export const GetGoodReceivedDetailsbyItemId = "GetGoodReceivedDetailsbyItemId";
/**
 * @desc: get location wise remaining stock details
 * @param: ?location={location}
 */
export const GetLocationWiseRemainingStockDetails =
  "GetLocationWiseRemainingStockDetails";
/**
 * @desc: get actual consuption report by date range
 * @param: ?from={from}&to={to}
 */
export const GetActualConsumptionReportByDateRange =
  "GetActualConsumptionReportByDateRange";
/**
 * @desc: get consumption group
 * @param:
 */
export const GetConsumptionGroup = "GetConsumptionGroup";
/**
 * @desc: get consumption group test look up
 * @param:
 */
export const GetConsumptionGroupTestLookUp = "GetConsumptionGroupTestLookUp";

//carelabdatametric services only dont mix up
/**
 * @desc: get requestor list
 * @param:
 */
export const GetRequestorList = "GetRequestorList";
/**
 * @desc: get refered doctor list
 * @param:
 */
export const GetReferedDoctorList = "GetReferedDoctorList";
/**
 * @desc: get date wise requestor transaction details
 * @param: ?from={from}&to={to}&reqId={reqId}
 */
export const GetDatewiseRequestorTransactionDetails =
  "GetDatewiseRequestorTransactionDetails";
/**
 * @desc: get date wise refrered doctor transaction details
 * @param: ?from={from}&to={to}&refId={refId}
 */
export const GetDatewiseReferredDoctorTransactionDetails =
  "GetDatewiseReferredDoctorTransactionDetails";
/**
 * @desc: get test type
 * @param:
 */
export const GetTestType = "GetTestType";
/**
 * @desc: get list of test by type for bulk update
 * @param: ?testTypeId={testTypeId} for some reason this post lol
 */
export const GetListOfTestByTypeForBulkUpdate =
  "GetListOfTestByTypeForBulkUpdate";
/**
 * @desc: get requestor wise total sales summary by date
 * @param: ?from={from}&to={to}
 */
export const GetRequestorwiseTotalSalesSummaryByDate =
  "GetRequestorwiseTotalSalesSummaryByDate";
/**
 * @desc: get daily summary transaction user wise by date
 * @param: ?from={from}&to={to}&userId={userId}
 */
export const GetDailySummaryTransactionUserWiseByDate =
  "GetDailySummaryTransactionUserWiseByDate";
/**
 * @desc: get daily transaction by userid and date
 * @param: ?from={from}&to={to}&userId={userId}
 */
export const GetDailyTransactionByUserIdAndDate =
  "GetDailyTransactionByUserIdAndDate";
/**
 * @desc: get list of user for metric
 * @param:
 */
export const GetListOfUserForMetric = "GetListOfUserForMetric";
/**
 * @desc: get list of company details
 * @param:
 */
export const GetCompanyDetials = "GetCompanyDetials";

export const GetDataMetricReportByReportTypeAndDateRange =
  "GetDataMetricReportByReportTypeAndDateRange";
//carelabdatametric services only dont mix up
/**
 * @descL get reagent used for control by date
 * @param: ?fromdate={fromdate}&todate={todate}
 */
export const GetReagentUsedForControlByDate = "GetReagentUsedForControlByDate";

//POST
/**
 * @desc: insert update item category
 * @param:{
  "CId": 0,
  "CategoryType": "string",
  "IsActive": true
}
 */
export const InsertUpdateItemCategory = "InsertUpdateItemCategory";
/**
 * @desc: insert update item type
 * @param: {
  "TId": 0,
  "ItemType": "string",
  "IsActive": true
}
 */
export const InsertUpdateItemType = "InsertUdpateItemType";
/**
 * @desc: insert update units
 * @param: {
  "UnId": 0,
  "Units": "string",
  "IsActive": true
}
 */
export const InsertUpdateUnits = "InsertUpdateUnits";
/**
 * @desc: insert update manufacture
 * @param: {
  "MId": 0,
  "ManufactureBY": "string",
  "IsActive": true
}
 */ export const InsertUpdateManufacture = "InsertUpdateManufacture";
/**
 * @desc: insert update location
 * @param: {
  "LId": 0,
  "LCode": "string",
  "Location": "string",
  "IsActive": true
}
 */
export const InsertUpdateLocation = "InsertUpdateLocation";
/**
 * @desc: insert update rack details
 * @param: {
  "RId": 0,
  "RackCode": "string",
  "RackName": "string",
  "LocationId": 0,
  "IsActive": true
}
 */
export const InsertUpdatRackDetails = "InsertUdpatRackDetails";
/**
 * @desc: insert update lab good received
 * @param: {
  "GId": 0,
  "ItemId": 0,
  "Quantity": 0,
  "Rate": 0,
  "Total": 0,
  "ExpiryDate": "2021-11-28T04:28:49.537Z",
  "ManufactureId": 0,
  "LotNo": "string",
  "ItmTrackId": "string",
  "CreatedDate": "2021-11-28T04:28:49.537Z",
  "CreatedBy": 0,
  "ItemStatus": 0
}
 */
export const InsertUpdateLabGoodReceived = "InsertUpdateLabGoodReceived";
/**
 * @desc: insert update wastage details
 * @param: {
  "WId": 0,
  "ItemId": 0,
  "WastageAmount": 0,
  "Reason": "string",
  "Remarks": "string",
  "CreatedDate": "2021-11-28T04:28:49.553Z",
  "CreatedBy": 0
}
 */
export const InsertUpdateWastageDetails = "InsertUpdateWastageDetails";
/**
 * @desc: insert update item vs test ratio
 * @param: {
  "RId": 0,
  "ItemId": 0,
  "TestId": 0,
  "ItemPerUnitTest": 0,
  "IsActive": true,
  "CreatedDate": "2021-11-28T04:28:49.558Z",
  "CreatedBy": 0
}
 */
export const InsertUpdateItemVsTestRatio = "InsertUpdateItemVsTestRatio";
/**
 * @desc: insert update new items details
 * @param: {
  "TId": 0,
  "ItemCode": "string",
  "ItemName": "string",
  "ItemTypeId": 0,
  "ItemCategoryId": 0,
  "UnitId": 0,
  "ManufactureId": 0,
  "LocationId": 0,
  "RackId": 0,
  "MinQty": 0,
  "CreatedBy": 0,
  "CreatedDate": "2021-11-28T04:28:49.517Z",
  "IsActive": true
}
 */
export const InsertUpdateNewItemsDetails = "InsertUpdateNewItemsDetails";
/**
 * @desc: insert update goods out details
 * @param: {
  "GOId": 1,
  "TestId": 2,
  "ItemId": 3,
  "GoodReceivedNo": 4,
  "Quantity": 5.1,
  "UserId": 6,
  "GoodsOutDate": "2021-11-30T14:38:13.8160149+05:45",
  "IsActive": true,
  "Remarks": "sample string 9"
}
 */
export const InsertUpdateGoodsoutRecord = "InsertUpdateGoodsoutRecord";
/**
 * @desc: insert update consumption test look up
 * @param: {
  "CId": 1,
  "ConsumptionGroupId": 2,
  "TestId": 3,
  "IsActive": true
 }
 */
export const InsertUpdateConsumptionTestLookUp =
  "InsertUpdateConsumptionTestLookUp";
/**
 * @desc: insert update consumption group
 * @param: {
  "CGId": 1,
  "ConsumptionGroupName": "sample string 2",
  "IsActive": true
 }
 */
export const InsertUpdateConsumptionGroup = "InsertUpdateConsumptionGroup";
/**
 * @desc: insert update control reagent details
 * @param: {
  "CId": 1,
  "ItemId": 2,
  "ControlAmount": 3.1,
  "Reason": "sample string 4",
  "Remarks": "sample string 5",
  "CreatedDate": "2022-02-18T15:31:04.7442891+05:45",
  "CreatedBy": 7,
  "IsActive": true
  }
 */
export const InsertUpdateControlReagentDetails =
  "InsertUpdateControlReagentDetails";

/**
 * @desc: new verfiy report service
 * @param: {
  "Id": 1,
  "RecordId": 2,
  "CreatedBy": 3,
  "CreatedOn": "2022-06-09T12:28:42.6410367+05:45",
  "Remarks": "sample string 5",
  "IsApproved": 6,
  "IsVerifier": true,
  "IsActive": true,
  "IsCurrent": true
}
 */
export const VerifyPatientReport = "VerifyPatientReport ";

/**
 * @desc: Update Critical Value And Cut off Time of Test
 * @param: ?testId={testId}&criticalValue={criticalValue}&cutofftime={cutofftime}&cutoffinHrs={cutoffinHrs}
 */

export const InsertUpdateControlDetails = "InsertUpdateControlDetails";

/**
 * @desc: Get Control Details
 */
export const GetControlDetails = "GetControlDetails";

/**
 * @desc: Get Control Value By Control TestId
 * @param: ?analyzerId={analyzerId}
 */
export const GetControlValueByControlTestId = "GetControlValueByControlTestId";

/**
 * @desc: Get List Of Control Wise SD
 * @param: ?analyzerId={analyzerId}
 */
export const GetListOfControlWiseSD = "GetListOfControlWiseSD";

/**
 * @desc: Get Control Test List
 * @param: ?analyzerId={analyzerId}
 */
export const GetControlTestList = "GetControlTestList";

/**
 * @desc: Insert Update Control Wise SD
 * @param: {
  "SId": 1,
  "TestId": 2,
  "ControlId": 3,
  "AverageValue": 4.1,
  "ISDMax": 5.1,
  "IISDMax": 6.1,
  "ISDMin": 7.1,
  "IISDMin": 8.1,
  "EntryDate": "2022-07-05T12:01:32.1722723+05:45",
  "UserId": 10,
  "IsActive": true
}
 */
export const InsertUpdateControlWiseSD = "InsertUpdateControlWiseSD";

/**
 * @desc: Get List Of Control value By Analyzer And Date For LJ Chart
 * @param: ?analyzerId={analyzerId}&testId={testId}&from={from}&to={to}
 */
export const GetListOfControlvalueByAnalyzerAndDateForLJChart =
  "GetListOfControlvalueByAnalyzerAndDateForLJChart";

/**
 * @desc: InsertUpdateTestControl
 * @param: {
  "TId": 1,
  "TestCode": "sample string 2",
  "TestName": "sample string 3",
  "TestDescription": "sample string 4",
  "LabTestId": 5,
  "UserId": 6,
  "EntryDate": "2022-07-06T12:27:23.1129523+05:45",
  "IsActive": true
}
 */
export const InsertUpdateTestControl = "InsertUpdateTestControl";

/**
 * @desc: Insert Update Control Value
 * @param: 
 * {
  "QId": 1,
  "ControlTestId": 2,
  "ControlValue": 3.1,
  "QCDate": "2022-07-07T10:51:15.5915765+05:45",
  "UserId": 5,
  "IsActive": true
}
 */
export const InsertUpdateControlValue = "InsertUpdateControlValue";

/**
 * @desc: Insert Update Control Wise SD Mean CV
 * @param: {
  "CId": 1,
  "ControlId": 2,
  "TestId": 3,
  "Mean": 4.1,
  "SD": 5.1,
  "CV": 6.1,
  "EntryDate": "2022-07-10T16:15:23.8118534+05:45",
  "UserId": 8,
  "IsActive": true,
  "QcLevel": "sample string 10"
  }
 */
export const InsertUpdateControlWiseSDMeanCV =
  "InsertUpdateControlWiseSDMeanCV";

/**
 * @desc: Get Control Wise SD Mean CV
 * @param: ?analyzerId={analyzerId}&testid={testid}&from={from}&to={to}
 */
export const GetControlWiseSDMeanCV = "GetControlWiseSDMeanCV";

// GetListOfPatientDetailsBydateAndTestDone?fromdate={fromdate}&todate={todate}&testname={testname}
export const GetListOfPatientDetailsBydateAndTestDone = `GetListOfPatientDetailsBydateAndTestDone`;

/**
 * @desc: Get Patient Details by date and test done
 * @param: ?fromdate={fromdate}&todate={todate}&testname={testname}
 */

// GetDatewiseSampleStatusOfEachTest?fromdate={fromdate}&todate={todate}
export const GetDatewiseSampleStatusOfEachTest = `GetDatewiseSampleStatusOfEachTest`;
/**
 * @desc: Get datewise sample status of each test
 * @param: ?fromdate={fromdate}&todate={todate}
 */

export const GetListOfTestToInsertUpdateCutoffTimeAndCriticalValues = `GetListOfTestToInsertUpdateCutoffTimeAndCriticalValues`;
/**
 * @desc: Get List Of Test To Insert Update Cutoff Time And CriticalValues
 * @param:   {
            "Id": 1,
            "TestCode": "A1",
            "TestName": "Absolute Basophil Count",
            "Specimen": "WB EDTA(2ml)",
            "Method": "Cell Counter",
            "Units": "cells/cumm",
            "LISCOde": "11",
            "AnalyzerId": 1,
            "CriticalValues": "123",
            "CutOfftime": "3hrs",
            "CutOffTimeInHrs": 2.0
        },
 */

export const UpdateCriticalValueAndCutoffTimeofTest =
  "UpdateCriticalValueAndCutoffTimeofTest";

/**
 * @desc: Insert Update Control Details
 * @param: {
 "CId": 1,
 "ControlCode": "sample string 2",
 "ControlName": "sample string 3",
 "ControlDescription": "sample string 4",
 "UserId": 5,
 "EntryDate": "2022-07-05T12:00:37.6481523+05:45",
 "IsActive": true
}
 */

export const GetListOfPCRsampleByRequestorForBulkNegative =
  "GetListOfPCRsampleByRequestorForBulkNegative";

// {
//     "SampleId": 248,
//     "FirstName": "Deniel ",
//     "MiddleName": "",
//     "LastName": "Gm",
//     "Sex": "Male",
//     "Age": "32 yrs",
//     "ContactNo": "9813734685",
//     "CollectionDate": "2021-03-07T17:00:48",
//     "CollectionNepaliDate": "2077/11/23     ",
//     "FiscalYearId": 1,
//     "RequestorId": 1
// },
export const GetSMSConsumptionDetails = "GetSMSConsumptionDetails";
// /**
//  * @desc: Get SMS Consumption Details
//  * @param:
// // {
// //             "PId": 1,
// //             "SMSAddedCount": 20000,
// //             "PerSMSCharge": 1.6000,
// //             "DiscountAmt": 0.0000,
// //             "TotalCharge": 32000.0000,
// //             "AddedDate": "2021-03-20T13:15:57",
// //             "UserId": 1
// //

export const GetMemberShipDetailsByMemberId = "GetMemberShipDetailsByMemberId";

//*@desc: Get Membership Details By Member ID
//*@param:
//     {
//   "Id": 1,
//   "MemberCode": "M1",
//   "Name": "Test  Test",
//   "Age": "2 yrs",
//   "ContactNo": "1234567890",
//   "Sex": "Female",
//   "Date": "2018-01-01T00:00:00",
//   "EmailId": "",
//   "NepaliDate": "               ",
//   "PAN": "         ",
//   "DateOfBirth": null,
//   "Address": ""
// }

/**
 * @desc: insert update item source
 * @param: {
  "Id": 1,
  "ItemSource": "sample string 2",
  "UserId": 3,
  "EntryDate": "2022-10-12T12:15:30.2571117+05:45",
  "IsActive": true
  }
 */
export const InsertUpdateItemSource = "InsertUpdateItemSource";

/**
 * @desc: get item source details
 * @param:
 */
export const GetItemSourceDetails = "GetItemSourceDetails";

/**
 * @desc: GetPatientBillInfoByBillId
 * @param: ?billId={billId}&fiscalyear={fiscalyear}
 */
export const GetPatientBillInfoByBillId = "GetPatientBillInfoByBillId";

/**
 * @desc: GetPatientBillItemDetailsByBillId
 * @param: ?billId={billId}&fiscalyear={fiscalyear}
 */
export const GetPatientBillItemDetailsByBillId =
  "GetPatientBillItemDetailsByBillId";

// newTests

export const GetStates = "GetStates";

/**
 * @desc: GetStates
 */

export const GetDistrictsByStateId = "GetDistrictsByStateId";

/**
 * @desc:GetDistrictsByStateId
 * @param: ?stateId={stateId}
 */

export const GetMunicipalitiesByDistrictId = "GetMunicipalitiesByDistrictId";

/**
 * @desc: GetMunicipalitiesByDistrictId
 * @param: ?districtId={districtId}
 */

export const GetPatientDetailsByLocationWise =
  "GetPatientDetailsByLocationWise";

// /**
//  * @desc: GetPatientDetailsByLocationWise
//  * @param: ?provinceid={provinceid}&districtid={districtid}&municipalityId={municipalityId}&fromdate={fromdate}&todate={todate}
//  */

export const GetDatametricReportType = "GetDatametricReportType";

/**
 * @desc: GetDatametricReportType
 */

export const GetGeographyWiseMISReports = "GetGeographyWiseMISReports";

// /**
//  * @desc: GetPatientDetailsByLocationWise
//  * @param: ?provinceid={provinceid}&districtid={districtid}&municipalityId={municipalityId}&fromdate={fromdate}&todate={todate}
//  */

export const insertUpdateCreditPartyInPatientForPartyBill =
  "InsertUpdateCreditPartyInPatientForPartyBill";

export const GetEmailServerDetails = "GetEmailServerDetails";
export const GetReportFormatDetails = "GetReportFormatDetails";
export const GetReportGroupLookUpById = "GetReportGroupLookUpById";

// @desc: InsertUpdateCreditPartyInPatientForPartyBill
// @param/body:
// {
//   "CreditPartyName": "Astha Kidney Hospital",
//   "CreditPartyCode": "C100",
//   "UserId": 3,
//   "SampleId": 4,
//   "CreditPartyContactNo": "98512536985",
//   "CreditPartyPAN": "234324324",
//   "CreditPartyEmail": "sample string 7",
//   "Remarks": "sample string 8",
//   "CreditPartyId": 2
// }

export const GetMemberShipDetailsByMembercode =
  "GetMemberShipDetailsByMembercode";

// @desc: GetMemberShipDetailsByMembercode
// @param: ?memcode={memcode}

export const InsertUpdateCreditPartyInPatientForPartyBill =
  "InsertUpdateCreditPartyInPatientForPartyBill";

//@desc: InsertUpdateCreditPartyInPatientForPartyBill
// @param: ?id={id}&creditparty={creditparty}&partycode={partycode}&userId={userId}&email={email}&contactno={contactno}&pan={pan}&remarks={remarks}
