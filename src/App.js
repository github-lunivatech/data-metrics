import { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import loadlogo from "./assets/images/logo1.png";
import {
  AsyncRequestorWiseNegative,
  AsyncBulkNegative,
  AsyncExpenseManagement,
  AsyncAddCategory,
  AsyncAddConsumptionGroup,
  AsyncAddConsumptionLookGroup,
  AsyncAddItems,
  AsyncAddItemVsRatio,
  AsyncAddLocation,
  AsyncAddRack,
  AsyncAddType,
  AsyncAddUnits,
  AsyncAddWastage,
  AsyncAppLayout,
  AsyncCategory,
  AsyncConsumableReports,
  AsyncConsumptionIndex,
  AsyncConsumptionLookIndex,
  AsyncDashbord,
  AsyncGoodOut,
  AsyncGoodsIn,
  AsyncGoodsInAdd,
  AsyncGoodsInReports,
  AsyncGoodsOutAdd,
  AsyncGoodsOutReports,
  AsyncInOutConReports,
  AsyncinvsReports,
  AsyncItems,
  AsyncItemVsRatio,
  AsyncLocation,
  AsyncLocationStockReport,
  AsyncMinQuantityReport,
  AsyncRack,
  AsyncReports,
  AsyncSettings,
  AsyncStocks,
  AsyncType,
  AsyncUnits,
  AsyncWastage,
  AsyncAddGroupItemVsRatioVsConsumption,
  AsyncRequestorReport,
  AsyncTestTypeReport,
  AsyncReferReport,
  AsyncCareLab,
  AsyncRequestorSalesReport,
  AsyncDailySummary,
  AsyncDailyTransaction,
  AsyncLogin,
  AsyncPublicLayout,
  AsyncNotFound,
  AsyncFinance,
  AsyncTheme,
  AsyncOutSourcing,
  AsyncEditBill,
  AsycAboutLuniva,
  AsyncReagentUsed,
  AsyncAddReagentUsed,
  AsyncCareLabIndex,
  AsyncAddManufacture,
  AsyncManufacture,
  AsyncAfterLogin,
  AsyncQcControl,
  AsyncLC,
  AsyncTestControl,
  AsyncViewTestControl,
  AsyncAddTestControl,
  AsyncViewTestControlList,
  AsyncAddTestControlTest,
  AsyncViewTestControlTest,
  AsyncAddTestData,
  AsyncViewTestData,
  AsyncViewCareDashboard,
  AsyncAddControlSDMean,
  AsyncControlSDMeanTable,
  AsyncPrintTestReport,
  AsyncDyReport,
  AsyncTestAnalytics,
  AsyncSampleStatus,
  AsyncTestList,
  AsyncReportList,
  AsyncDepartmentAnalytics,
  AsyncOutsourceAnalytics,
  AsyncSms,
  AsyncTatAnalysis,
  AsyncAddSms,
  AsyncBulkDateChange,
  AsyncRequestorWiseDateChange,
  AsyncDateChanges,
  AsyncMembershipCard,
  AsyncItemSource,
  AsyncAddItemSource,
  AsyncPrintLayout,
  AsyncAddBill,
  AsyncAddUpdateBill,
  AsyncViewBillingTable,
  AsyncPrintBillLayout,
  AsyncViewUpdateBill,
  AsyncProvienceDistrictWise,
  AsyncDeparmentWisePatients,
  AsyncAgeGenderWise,
  AsyncDepartmentWiseTests,
  AsyncDistrictCovidRecords,
  AsyncProvienceCovidRecords,
  AsyncGeoGraphicalWise,
  AsyncCountCharts,
  AsyncMainCharts,
  AsyncDatametricDashboard,
  AsyncSettingsserver,
  AsyncEmailServer,
  AsyncAddEmailField,
  AsyncEditEmailField,
  AsyncReportdataSettings,
  AsyncAddReportSettings,
} from "./App/asyncComponent";
import PublicRoute from "./Routes/PublicRoute";
import { MenuSettings } from "./Data/MenuSettings";
import PrivateRouter from "./Routes/PrivateRouter";
import { createGlobalStyle } from "styled-components";
import { themedata } from "./Components/theme/themdata";

// import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    // localStorage.clear();
    localStorage.setItem("theme", JSON.stringify(themedata.theme3));
    return () => {};
  }, []);

  // useEffect(()=> {
  //   localStorage.clear()
  //   localStorage.setItem('theme', JSON.stringify(themedata.theme3));
  // }, [])
  const theme = JSON.parse(localStorage.getItem("theme"));
  const GlobStyl = createGlobalStyle`
  :root {
  --primary: ${theme?.primary ? theme?.primary : "#026b9e"};
  --secondary: ${theme?.secondary ? theme?.secondary : "#3ea9dbc8"}; 
  --primaryBackground:${
    theme?.primaryBackground ? theme?.primaryBackground : "#d0edff"
  };
  --secondaryBackground: #fefefe;
  --cardColor: #fefefe;
  --titleTxt: #232342;
  }
`;
  // const [user, setUser] = useState("");
  // const socket= io("http://anisdell:3006/", {
  //     path: "/hello-path/"
  //   });

  //   useEffect(() => {
  //     socket.emit("newUser", '');
  //   }, [socket]);

  //   useEffect(() => {
  //     if(socket !== null){
  //       socket.on("updateNotification", (data) => {
  //     });

  //     onClickEvent()

  //     }
  // }, [socket]);

  // const onClickEvent = () => {
  //   socket.emit("sendNotification", {
  //       senderName: user,
  //       receiverName: user
  //     });
  // }

  return (
    <>
      <GlobStyl />
      <Suspense
        fallback={
          <div className="fallback-container">
            <img src={loadlogo} alt="" />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/afterlogin" />
          </Route>
          <PublicRoute
            exact
            path="/login"
            component={AsyncLogin}
            layout={AsyncPublicLayout}
          />
          {/* <PublicRoute
            exact
            path="/table"
            component={AddTable}
            layout={AsyncTableLayout}
          /> */}
          <PublicRoute
            exact
            path="/afterlogin"
            component={AsyncAfterLogin}
            layout={AsyncPublicLayout}
          />
          {MenuSettings.dashboard ? (
            <PrivateRouter
              exact
              path="/dashbord"
              component={AsyncDashbord}
              layout={AsyncAppLayout}
              showSider
            />
          ) : (
            ""
          )}
          {MenuSettings.goodsin
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/2"
                  path="/goodsin"
                  component={AsyncGoodsIn}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/3"
                  path="/goodsin/add"
                  component={AsyncGoodsInAdd}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/4"
                  path="/goodsin/edit/:id/:from"
                  component={AsyncGoodsInAdd}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.item
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/5"
                  path="/item"
                  component={AsyncItems}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/6"
                  path="/item/add"
                  component={AsyncAddItems}
                  layout={AsyncAppLayout}
                  showSider
                />,
                // new
                <PrivateRouter
                  exact
                  path="/datametric/addbill"
                  component={AsyncAddBill}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/7"
                  path="/item/edit/:id/:typeId/:cateId"
                  component={AsyncAddItems}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.goodsout
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/8"
                  path="/goodsout"
                  component={AsyncGoodOut}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/9"
                  path="/goodsout/add"
                  component={AsyncGoodsOutAdd}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/10"
                  path="/goodsout/edit/:id/:from"
                  component={AsyncGoodsOutAdd}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.type
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/11"
                  path="/type"
                  component={AsyncType}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/12"
                  path="/type/add"
                  component={AsyncAddType}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/13"
                  path="/type/edit/:id"
                  component={AsyncAddType}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.category
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/14"
                  path="/category"
                  component={AsyncCategory}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/15"
                  path="/category/add"
                  component={AsyncAddCategory}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/16"
                  path="/category/edit/:id"
                  component={AsyncAddCategory}
                  forEdit
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.location
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/17"
                  path="/location"
                  component={AsyncLocation}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/18"
                  path="/location/add"
                  component={AsyncAddLocation}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/19"
                  path="/location/edit/:id"
                  component={AsyncAddLocation}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.rack
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/20"
                  path="/rack"
                  component={AsyncRack}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/21"
                  path="/rack/add"
                  component={AsyncAddRack}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/22"
                  path="/rack/edit/:locate/:id"
                  component={AsyncAddRack}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.wastage
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/23"
                  path="/wastage"
                  component={AsyncWastage}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/24"
                  path="/wastage/add"
                  component={AsyncAddWastage}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/25"
                  path="/wastage/edit/:id/:from"
                  component={AsyncAddWastage}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.itemvsratio
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/26"
                  path="/itemvsratio"
                  component={AsyncItemVsRatio}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/27"
                  path="/itemvsratio/add"
                  component={AsyncAddItemVsRatio}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/28"
                  path="/itemvsratio/eidt/:id"
                  component={AsyncAddItemVsRatio}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/29"
                  path="/itemvsratio/add/group"
                  component={AsyncAddGroupItemVsRatioVsConsumption}
                  layout={AsyncAppLayout}
                  forGroup
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/30"
                  path="/itemvsratio/edit/group/:id"
                  component={AsyncAddGroupItemVsRatioVsConsumption}
                  layout={AsyncAppLayout}
                  forEdit
                  forGroup
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/31"
                  path="/itemvsratio/edit/itemconsumption/:id"
                  component={AsyncAddGroupItemVsRatioVsConsumption}
                  layout={AsyncAppLayout}
                  forEdit
                  forCon
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/32"
                  path="/itemvsratio/add/itemconsumption"
                  component={AsyncAddGroupItemVsRatioVsConsumption}
                  layout={AsyncAppLayout}
                  forCon
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.units
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/33"
                  path="/units"
                  component={AsyncUnits}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/34"
                  path="/units/add"
                  component={AsyncAddUnits}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/35"
                  path="/units/edit/:id"
                  component={AsyncAddUnits}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.reports
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/36"
                  path="/reports"
                  component={AsyncReports}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/37"
                  path="/reports/goodsin"
                  component={AsyncGoodsInReports}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/38"
                  path="/reports/goodsout"
                  component={AsyncGoodsOutReports}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/39"
                  path="/reports/consumption"
                  component={AsyncConsumableReports}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/40"
                  path="/reports/invs"
                  component={AsyncinvsReports}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/41"
                  path="/reports/inoutcon"
                  component={AsyncInOutConReports}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/42"
                  path="/reports/stocks"
                  component={AsyncStocks}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/43"
                  path="/reports/minquantityreport"
                  component={AsyncMinQuantityReport}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/44"
                  path="/reports/locationstockreport"
                  component={AsyncLocationStockReport}
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.consumption
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/45"
                  path="/consumption"
                  component={AsyncConsumptionIndex}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/46"
                  path="/consumption/add"
                  component={AsyncAddConsumptionGroup}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/47"
                  path="/consumption/edit/:id"
                  component={AsyncAddConsumptionGroup}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.consumptionlook
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/48"
                  path="/consumptionlook"
                  component={AsyncConsumptionLookIndex}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/49"
                  path="/consumptionlook/add"
                  component={AsyncAddConsumptionLookGroup}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/50"
                  path="/consumptionlook/edit/:id"
                  component={AsyncAddConsumptionLookGroup}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
                <PrivateRouter
                  exact
                  key="theme"
                  path="/theme"
                  component={AsyncTheme}
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.finance
            ? [
                <PrivateRouter
                  exact
                  path="/finance"
                  component={AsyncFinance}
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.misreports
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/51"
                  path="/datametric"
                  component={AsyncCareLab}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/52"
                  path="/datametric/testtype"
                  component={AsyncTestTypeReport}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/53"
                  path="/datametric/requestor"
                  component={AsyncRequestorReport}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/54"
                  path="/datametric/referer"
                  component={AsyncReferReport}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/55"
                  path="/datametric/requestorsales"
                  component={AsyncRequestorSalesReport}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/56"
                  path="/datametric/dailysummary"
                  component={AsyncDailySummary}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/57"
                  path="/datametric/dailytransaction"
                  component={AsyncDailyTransaction}
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.outsourcing
            ? [
                <PrivateRouter
                  exact
                  path="/outsourcing"
                  component={AsyncOutSourcing}
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.editbill
            ? [
                <PrivateRouter
                  exact
                  path="/editbill"
                  component={AsyncEditBill}
                  layout={AsyncAppLayout}
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.reagentused
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/58"
                  path="/reagentused"
                  component={AsyncReagentUsed}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/59"
                  path="/reagentused/add"
                  component={AsyncAddReagentUsed}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/60"
                  path="/reagentused/edit/:id/:from"
                  component={AsyncAddReagentUsed}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          {MenuSettings.units
            ? [
                <PrivateRouter
                  exact
                  key="thisSet/61"
                  path="/manufacture"
                  component={AsyncManufacture}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/62"
                  path="/manufacture/add"
                  component={AsyncAddManufacture}
                  layout={AsyncAppLayout}
                  showSider
                />,

                <PrivateRouter
                  exact
                  key="thisSet/63"
                  path="/manufacture/edit/:id"
                  component={AsyncAddManufacture}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          <PrivateRouter
            exact
            path="/settings"
            component={AsyncSettings}
            layout={AsyncAppLayout}
            showSider
          />
          {MenuSettings.settingsserver
            ? [
                <PrivateRouter
                  exact
                  key="settings"
                  path="/settingsserver"
                  component={AsyncEmailServer}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
                <PrivateRouter
                  exact
                  key="theme"
                  path="/theme"
                  component={AsyncTheme}
                  layout={AsyncAppLayout}
                  showSider
                />,
                <PrivateRouter
                  exact
                  path="/settingsemail"
                  component={AsyncEmailServer}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,

                <PrivateRouter
                  exact
                  path="/reportdata"
                  component={AsyncReportdataSettings}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
                <PrivateRouter
                  exact
                  path="/reportdata/addreport"
                  component={AsyncAddReportSettings}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
                <PrivateRouter
                  exact
                  key="editemails"
                  path="/reportdata/edit/:id"
                  component={AsyncAddReportSettings}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
                <PrivateRouter
                  exact
                  path="/settingsemail/addemail"
                  component={AsyncAddEmailField}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
                <PrivateRouter
                  exact
                  key="editemails"
                  path="/settingsemail/edit/:id"
                  component={AsyncAddEmailField}
                  layout={AsyncAppLayout}
                  forEdit
                  showSider
                />,
              ]
            : ""}
          <PrivateRouter
            exact
            path="/aboutluniva"
            component={AsycAboutLuniva}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/carelab"
            component={AsyncCareLabIndex}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/qccontrol"
            component={AsyncQcControl}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/lcchart"
            component={AsyncLC}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/viewtestcontrol"
            component={AsyncViewTestControl}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/addtestcontrol"
            component={AsyncTestControl}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/edittestcontrol/:id/:SId"
            component={AsyncTestControl}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewcontroltest/"
            component={AsyncViewTestControlList}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/addcontroltest/"
            component={AsyncAddTestControl}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/editcontroltest/:id"
            component={AsyncAddTestControl}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewcontroltesttest/"
            component={AsyncViewTestControlTest}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/addcontroltesttest/"
            component={AsyncAddTestControlTest}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/editcontroltesttest/:id"
            component={AsyncAddTestControlTest}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewtestdata/"
            component={AsyncViewTestData}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/addcontroldata/"
            component={AsyncAddTestData}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/editcontroldata/:id/:tid"
            component={AsyncAddTestData}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/caredashboard/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/sampledash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/datametricdash/"
            component={AsyncDatametricDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/newReports/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/reportdash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/bulknegativedash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/financedash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/departmentdash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/outsourcedash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/marketingdash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/tatdash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/testdash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/qcdash/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/testanalysis/"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewcontrolsdmean/"
            component={AsyncControlSDMeanTable}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/addcontrolsdmean/"
            component={AsyncAddControlSDMean}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/editcontrolsdmean/:cid/:id/:tid/:ent"
            component={AsyncAddControlSDMean}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PublicRoute
            exact
            path="/printtestreport/:sid/:fid"
            component={AsyncPrintTestReport}
            layout={AsyncPublicLayout}
          />
          <PrivateRouter
            exact
            path="/dynarep"
            component={AsyncDyReport}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/testanalytics"
            component={AsyncTestAnalytics}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/testList"
            component={AsyncTestList}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/reportlist"
            component={AsyncReportList}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/departmentanalytics"
            component={AsyncDepartmentAnalytics}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/carddash"
            component={AsyncMembershipCard}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/outsourceanalytics"
            component={AsyncOutsourceAnalytics}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/expensemanagement"
            component={AsyncExpenseManagement}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/sms"
            component={AsyncSms}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/sms/add"
            component={AsyncAddSms}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/bulkdatechange"
            component={AsyncBulkDateChange}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/datechanges"
            component={AsyncDateChanges}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/requestorwisedatechange"
            component={AsyncRequestorWiseDateChange}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/negative"
            component={AsyncBulkNegative}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/rsnegative"
            component={AsyncRequestorWiseNegative}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/datedash"
            component={AsyncViewCareDashboard}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/tatanalysis"
            component={AsyncTatAnalysis}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          {/* dashboard datametric */}
          <PrivateRouter
            exact
            path="/dashdata"
            component={AsyncDatametricDashboard}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/itemsource"
            component={AsyncItemSource}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/itemsource/add"
            component={AsyncAddItemSource}
            layout={AsyncAppLayout}
            showSider
          />
          <PrivateRouter
            exact
            path="/itemsource/edit/:id"
            component={AsyncAddItemSource}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          {/* //For print destails page */}
          <PrivateRouter
            exact
            path="/print"
            component={AsyncAddUpdateBill}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewupdatebill/:id/:fiscalyear"
            component={AsyncViewUpdateBill}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewbill"
            component={AsyncViewBillingTable}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/datametric/viewProvience&DistrictWise"
            component={AsyncProvienceDistrictWise}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/charts"
            component={AsyncCountCharts}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          {/* //charts dropdown menu */}
          <PrivateRouter
            exact
            path="/MainPage"
            component={AsyncMainCharts}
            layout={AsyncAppLayout}
            // forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/datametric/viewGeoGraphicalWise"
            component={AsyncGeoGraphicalWise}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewDistrictCovidRecords"
            component={AsyncDistrictCovidRecords}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewProvienceCovidRecords"
            component={AsyncProvienceCovidRecords}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewAge&GenderWise"
            component={AsyncAgeGenderWise}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewDepartmentWiseTests"
            component={AsyncDepartmentWiseTests}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          <PrivateRouter
            exact
            path="/viewDepartmentWisePatients"
            component={AsyncDeparmentWisePatients}
            layout={AsyncAppLayout}
            forEdit
            showSider
          />
          {/* Design Purpose */}
          <PublicRoute
            exact
            path="/printlayout/:id/:fiscalyear"
            component={AsyncPrintBillLayout}
            layout={AsyncAppLayout}
            forEdit
          />
          <Route component={AsyncNotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
