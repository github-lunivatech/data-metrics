import { lazy } from "react";
import pMinDelay from "p-min-delay";

export const AsyncLogin = lazy(() =>
  pMinDelay(import("../Components/Login/Login"), 300)
);

export const AsyncPublicLayout = lazy(() =>
  pMinDelay(import("../layout/publicLayout"), 300)
);

export const AsyncAppLayout = lazy(() =>
  pMinDelay(import("../layout/appLayout"), 300)
);

export const AsyncDashbord = lazy(() =>
  pMinDelay(import("../Containers/DashBoardContainer"), 300)
);
export const AsyncAfterLogin = lazy(() =>
  pMinDelay(import("../Containers/AfterLogin"), 300)
);

export const AsyncGoodsIn = lazy(() =>
  pMinDelay(import("../Components/GoodsIn/index"), 300)
);
export const AsyncGoodsInAdd = lazy(() =>
  pMinDelay(import("../Components/GoodsIn/AddGoods"), 300)
);

export const AsyncGoodOut = lazy(() =>
  pMinDelay(import("../Components/GoodsOut/index"), 300)
);
export const AsyncGoodsOutAdd = lazy(() =>
  pMinDelay(import("../Components/GoodsOut/AddGoodsOut"), 300)
);

export const AsyncItems = lazy(() =>
  pMinDelay(import("../Components/Item/index"), 300)
);
export const AsyncAddItems = lazy(() =>
  pMinDelay(import("../Components/Item/AddItem"), 300)
);

export const AsyncAddBill = lazy(() =>
  pMinDelay(import("../Components/AddBill/AddBill"), 300)
);

export const AsyncType = lazy(() =>
  pMinDelay(import("../Components/Type/index"), 300)
);
export const AsyncAddType = lazy(() =>
  pMinDelay(import("../Components/Type/AddType"), 300)
);

export const AsyncCategory = lazy(() =>
  pMinDelay(import("../Components/Category/index"), 300)
);
export const AsyncAddCategory = lazy(() =>
  pMinDelay(import("../Components/Category/AddCategory"), 300)
);

export const AsyncLocation = lazy(() =>
  pMinDelay(import("../Components/Location/index"), 300)
);
export const AsyncAddLocation = lazy(() =>
  pMinDelay(import("../Components/Location/AddLocation"), 300)
);

export const AsyncRack = lazy(() =>
  pMinDelay(import("../Components/Rack/index"), 300)
);
export const AsyncAddRack = lazy(() =>
  pMinDelay(import("../Components/Rack/AddRack"), 300)
);

export const AsyncWastage = lazy(() =>
  pMinDelay(import("../Components/Wastage/index"), 300)
);
export const AsyncAddWastage = lazy(() =>
  pMinDelay(import("../Components/Wastage/AddWastage"), 300)
);

export const AsyncItemVsRatio = lazy(() =>
  pMinDelay(import("../Components/ItemVsRatio/index"), 300)
);
export const AsyncAddItemVsRatio = lazy(() =>
  pMinDelay(import("../Components/ItemVsRatio/AddItemVSRatio"), 300)
);
export const AsyncAddGroupItemVsRatioVsConsumption = lazy(() =>
  pMinDelay(
    import("../Components/ItemVsRatio/GroupAddItemVsRatioVsConsumtion"),
    300
  )
);

export const AsyncReports = lazy(() =>
  pMinDelay(import("../Components/Reports/index"), 300)
);
// export const AsyncCSVReports = lazy(() => pMinDelay(import('../Components/Reports/Reports'), 300));
// export const AsyncGoodsInReports = lazy(() => pMinDelay(import('../Components/Reports/GoodsInReports'), 300));
export const AsyncGoodsInReports = lazy(() =>
  pMinDelay(import("../Components/Reports/newGoodsInReport"), 300)
);

// export const AsyncGoodsOutReports = lazy(() => pMinDelay(import('../Components/Reports/GoodsOutReport'), 300));
export const AsyncGoodsOutReports = lazy(() =>
  pMinDelay(import("../Components/Reports/NewGoodsOutReport"), 300)
);

export const AsyncConsumableReports = lazy(() =>
  pMinDelay(import("../Components/Reports/ConsumableReport"), 300)
);
export const AsyncinvsReports = lazy(() =>
  pMinDelay(import("../Components/Reports/InVsOutVsCon"), 300)
);
export const AsyncInOutConReports = lazy(() =>
  pMinDelay(import("../Components/Reports/InOutConTab"), 300)
);

export const AsyncSettings = lazy(() =>
  pMinDelay(import("../Components/Common/Settings"), 300)
);

// export const AsyncSettingsserver = lazy
export const AsyncSettingsserver = lazy(() =>
  pMinDelay(import("../Components/Common/SettingsServer"), 300)
);
export const AsyncEmailServer = lazy(() =>
  pMinDelay(import("../Components/SettingsField/EmailRetrieve"), 300)
);
export const AsyncReportdataSettings = lazy(() =>
  pMinDelay(import("../Components/SettingsField/ReportRetrieve"), 300)
);
export const AsyncUnits = lazy(() =>
  pMinDelay(import("../Components/Units/index"), 300)
);
export const AsyncAddUnits = lazy(() =>
  pMinDelay(import("../Components/Units/AddUnits"), 300)
);
export const AsyncAddEmailField = lazy(() =>
  pMinDelay(import("../Components/SettingsField/EmailAdditionField"), 300)
);
// export const AsyncEditEmailField = lazy(() =>
//   pMinDelay(import("../Components/SettingsField/EmailEditField"), 300)
// );
export const AsyncAddReportSettings = lazy(() =>
  pMinDelay(import("../Components/SettingsField/ReportAdditonField"), 300)
);

export const AsyncStocks = lazy(() =>
  pMinDelay(import("../Components/Stocks/index"), 300)
);
export const AsyncMinQuantityReport = lazy(() =>
  pMinDelay(import("../Components/Reports/MinQunatityReport"), 300)
);
export const AsyncLocationStockReport = lazy(() =>
  pMinDelay(import("../Components/Reports/LocationStockReport"), 300)
);

export const AsyncConsumptionIndex = lazy(() =>
  pMinDelay(import("../Components/Consumption/consumptionGroupIndex"), 300)
);
export const AsyncAddConsumptionGroup = lazy(() =>
  pMinDelay(import("../Components/Consumption/AddConsumptionGroup"), 300)
);

export const AsyncConsumptionLookIndex = lazy(() =>
  pMinDelay(import("../Components/Consumption/consumptionLookIndex"), 300)
);
export const AsyncAddConsumptionLookGroup = lazy(() =>
  pMinDelay(import("../Components/Consumption/AddConsumptionLook"), 300)
);

export const AsyncCareLab = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/CareLab"), 300)
);
export const AsyncTestTypeReport = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/TestTypeReport"), 300)
);
export const AsyncReferReport = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/ReferReport"), 300)
);
export const AsyncRequestorReport = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/RequestorReport"), 300)
);
export const AsyncRequestorSalesReport = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/RequestorSalesReport"), 300)
);

export const AsyncDailySummary = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/DailySummary"), 300)
);
export const AsyncDailyTransaction = lazy(() =>
  pMinDelay(import("../Components/DataMetricReport/DailyTransaction"), 300)
);

export const AsyncFinance = lazy(() =>
  pMinDelay(import("../Components/FinanceDashbord/index"), 300)
);
export const AsyncTheme = lazy(() =>
  pMinDelay(import("../Components/theme/index"), 300)
);

// datametric
export const AsyncOutSourcing = lazy(() =>
  pMinDelay(import("../Components/dataMetricComponent/OutSourcing/index"), 300)
);
export const AsyncEditBill = lazy(() =>
  pMinDelay(import("../Components/dataMetricComponent/EditBill/index"), 300)
);

export const AsyncNotFound = lazy(() =>
  pMinDelay(import("../Components/Common/ErrorPage"), 300)
);
export const AsycAboutLuniva = lazy(() =>
  pMinDelay(import("../Components/Common/AboutLuniva"), 300)
);

export const AsyncReagentUsed = lazy(() =>
  pMinDelay(import("../Components/ReagentUsed/index"), 300)
);
export const AsyncAddReagentUsed = lazy(() =>
  pMinDelay(import("../Components/ReagentUsed/AddUsedReagent"), 300)
);

export const AsyncCareLabIndex = lazy(() =>
  pMinDelay(import("../Components/Carelab/index"), 300)
);

export const AsyncManufacture = lazy(() =>
  pMinDelay(import("../Components/Manufacture/index"), 300)
);
export const AsyncAddManufacture = lazy(() =>
  pMinDelay(import("../Components/Manufacture/AddManufacture"), 300)
);

export const AsyncQcControl = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/QcControl/index"), 300)
);
// export const AsyncLC = lazy(() => pMinDelay(import('../Components/CareLabFolder/LC/index'), 300));
export const AsyncLC = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/LC/NewLJChart"), 300)
);
export const AsyncViewTestControl = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/TestControl/ControlTable"), 300)
);
export const AsyncAddTestControl = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/TestControl/AddControl"), 300)
);
export const AsyncViewTestControlTest = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/TestControl/ControlTestTable"),
    300
  )
);
export const AsyncAddTestControlTest = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/TestControl/AddControlTest"),
    300
  )
);
export const AsyncViewTestControlList = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/TestControl/TestControlTable"),
    300
  )
);
export const AsyncAddTestData = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/TestControl/AddData"), 300)
);
export const AsyncViewTestData = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/TestControl/DataTable"), 300)
);
export const AsyncTestControl = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/LC/TestControl"), 300)
);

export const AsyncAddControlSDMean = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/TestControl/AddControlSDMean"),
    300
  )
);
export const AsyncControlSDMeanTable = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/TestControl/ControlSDMeanTable"),
    300
  )
);

export const AsyncViewCareDashboard = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/CareLabNav/CarelabNav"), 300)
);

export const AsyncPrintTestReport = lazy(() =>
  pMinDelay(import("../Components/Carelab/PrintTestReport"), 300)
);

export const AsyncDyReport = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/ReportList/DyReport"), 300)
);

export const AsyncTestAnalytics = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/TestAnalytics/TestAnalytics"),
    300
  )
);

export const AsyncTestList = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/TestAnalytics/TestList"), 300)
);

//======Not completed file routes
export const AsyncReportList = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/NotCompleted/ReportList"), 300)
);
export const AsyncDepartmentAnalytics = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/NotCompleted/DepartmentAnalytics"),
    300
  )
);
export const AsyncOutsourceAnalytics = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/NotCompleted/OutsourceAnlytics"),
    300
  )
);
export const AsyncExpenseManagement = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/ExpenseManagement/ExpenseManagement"),
    300
  )
);

export const AsyncSms = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/SMS/Sms"), 300)
);
export const AsyncAddSms = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/SMS/AddSMSDetails"), 300)
);
export const AsyncTatAnalysis = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/NotCompleted/TatAnalysis"), 300)
);
export const AsyncBulkDateChange = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/DateChange/BulkDateChange"),
    300
  )
);
export const AsyncDateChanges = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/DateChange/DateChanges"), 300)
);

export const AsyncRequestorWiseDateChange = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/DateChange/RequestorWiseDateChange"),
    300
  )
);

export const AsyncBulkNegative = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/BulkNegative/BulkNegative"),
    300
  )
);

export const AsyncMembershipCard = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/Membership/MembershipCard"),
    300
  )
);

export const AsyncRequestorWiseNegative = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/BulkNegative/RequestorWiseNegative"),
    300
  )
);

export const AsyncItemSource = lazy(() =>
  pMinDelay(import("../Components/ItemSource/index"), 300)
);

export const AsyncAddItemSource = lazy(() =>
  pMinDelay(import("../Components/ItemSource/AddItemSource"), 300)
);

// export const AsyncSampleStatus = lazy(() => pMinDelay(import('../Components/CareLabFolder/SampleStatus/SampleStatus'), 300));
export const AsyncPrintLayout = lazy(() =>
  pMinDelay(import("../Components/PrintDetails/PrintLayout"), 300)
);

export const AsyncTableLayout = lazy(() =>
  pMinDelay(import("../Components/AddTable/AddTable"), 300)
);

export const AsyncViewBillingTable = lazy(() =>
  pMinDelay(import("../Components/AddTable/AddTable"), 300)
);
export const AsyncPrintBillLayout = lazy(() =>
  pMinDelay(import("../Components/PrintDetails/PrintLayout"), 300)
);
export const AsyncAddUpdateBill = lazy(() =>
  pMinDelay(import("../Components/PrintDetails/PrintDetails"), 300)
);
export const AsyncViewUpdateBill = lazy(() =>
  pMinDelay(import("../Components/AddBill/ViewUpdateBill"), 300)
);
// neReports

export const AsyncProvienceDistrictWise = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/Provience&DistrictWise"),
    300
  )
);

export const AsyncGeoGraphicalWise = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/GeoGraphicalWise"),
    300
  )
);

export const AsyncAgeGenderWise = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/newReports/AgeGenderWise"), 300)
);
export const AsyncProvienceCovidRecords = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/ProvienceCovidRecords"),
    300
  )
);
export const AsyncDistrictCovidRecords = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/DistrictCovidRecords"),
    300
  )
);
export const AsyncDepartmentWiseTests = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/DepartmentWiseTests"),
    300
  )
);
export const AsyncDeparmentWisePatients = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/DepartmentWisePatients"),
    300
  )
);
export const AsyncCountCharts = lazy(() =>
  pMinDelay(
    import("../Components/CareLabFolder/newReports/ProvienceCharts"),
    300
  )
);
export const AsyncMainCharts = lazy(() =>
  pMinDelay(import("../Components/CareLabFolder/newReports/MainPageChart"), 300)
);
export const AsyncDatametricDashboard = lazy(() =>
  pMinDelay(import("../Components/DatametricDashboard/index"), 300)
);
