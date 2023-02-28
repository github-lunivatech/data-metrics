// import useTokenHook from "../CustomHook/useTokenHook";

import {
  datametricStat,
  marketingStat,
  misStat,
  tatStat,
} from "../Components/Common/StateList";
import { MenuSettings } from "./MenuSettings";

export const useCareLabRoute = () => {
  const sampleStatusNav = [
    {
      icon: "icon-file-alt",
      key: "dynareportlist",
      name: "Test Status",
      path: "/dynarep",
    },
  ];
  const settingsServerdata = [
    {
      icon: "icon-envelope",
      key: "Email",
      name: "Email",
      path: "/settingsemail",
    },
    {
      icon: "icon-book",
      key: "Report Format",
      name: "report",
      path: "/reportdata",
    },
    {
      icon: "icon-picture",
      key: "theme",
      name: "Theme",
      path: "/theme",
    },
  ];

  const financeNav = [
    {
      icon: "icon-graph",
      key: "finance",
      name: "Finance",
      path: "/finance",
    },
    {
      icon: "icon-line2-doc",
      key: "misReports",
      name: "MIS Reports",
      path: "/datametric",
      statePath: "misReportStat",
    },
  ];

  const marketingNav = [
    {
      icon: "icon-chat-3",
      key: "sms",
      name: "sms",
      path: "/sms",
    },
  ];

  const reportStatNav = [
    {
      icon: "icon-line-file",
      key: "reportlist",
      name: "Report List",
      path: "/reportlist",
    },
    {
      icon: "icon-file-alt",
      key: "dynareportlist",
      name: "Test Status",
      path: "/dynarep",
    },
    {
      icon: "icon-lab",
      key: "testanalytics",
      name: "Test Name",
      path: "/testanalytics",
      hasSubNav: false,
    },
  ];

  const testAnalysisNav = [
    {
      icon: "icon-lab",
      key: "testanalytics",
      name: "Patient by test",
      path: "/testanalytics",
      hasSubNav: false,
    },
  ];

  const bulkNegativeNav = [
    {
      icon: "icon-sticky-note1",
      key: "negative",
      name: "Bulk Negative",
      path: "/negative",
    },
    {
      icon: "icon-sticky-note1",
      key: "requestorwisenegative",
      name: "Requestor wise negative",
      path: "/rsnegative",
    },
  ];

  const tatNav = [
    {
      icon: "icon-chat",
      key: "tatanalysis",
      name: "tat analysis",
      path: "/tatanalysis",
      statePath: tatStat,
    },

    // by me==========
    {
      icon: "icon-list",
      key: "tatGetTestList",
      name: "Get Test List",
      path: "/testList",
      statePath: tatStat,
    },
  ];
  const dateChangeNav = [
    {
      icon: "icon-calendar2",
      key: "datechanges",
      name: "Date Change",
      path: "/datechanges",
    },

    {
      icon: "icon-calendar3",
      key: "bulkdatechange",
      name: "Bulk Date Change",
      path: "/bulkdatechange",
    },
    {
      icon: "icon-calendar-plus",
      key: "requestorwisedatechange",
      name: "Requestor wise Date Change",
      path: "/requestorwisedatechange",
    },
  ];

  const qcControlNav = [
    {
      icon: "icon-bar-chart",
      key: "lcchart",
      name: "LJ Chart",
      path: "/lcchart",
      statePath: misStat,
    },
    {
      icon: "icon-lab2",
      key: "addtestcontrol",
      name: "Test Control",
      path: "/viewtestcontrol",
      statePath: misStat,
    },
    {
      icon: "icon-lab2",
      key: "viewcontroltest",
      name: "Control Test",
      path: "/viewcontroltest",
      statePath: misStat,
    },
    {
      icon: "icon-lab2",
      key: "viewcontroltesttest",
      name: "Tests",
      path: "/viewcontroltesttest",
      statePath: misStat,
    },
    {
      icon: "icon-bars1",
      key: "viewtestdata",
      name: "Test Data",
      path: "/viewtestdata",
      statePath: misStat,
    },
    {
      icon: "icon-bars1",
      key: "viewcontrolsdmean",
      name: "SD Mean",
      path: "/viewcontrolsdmean",
      statePath: misStat,
    },
  ];

  const newReportsNav = [
    {
      icon: "icon-bars1",
      key: "viewProvience&DisticeWise",
      name: "Provience Wise Report",
      path: "viewProvience&DistrictWise",
    },
    {
      icon: "icon-bars1",
      key: "viewGeoGraphicalWise",
      name: "Geographical Wise Report",
      path: "viewGeoGraphicalWise",
    },
    // {
    //   icon: "icon-bars1",
    //   key: "viewAge&GenderWise",
    //   name: "Age/Gender Wise",
    //   path: "viewAge&GenderWise",
    // },
    // {
    //   icon: "icon-bars1",
    //   key: "viewDepartmentWiseTests",
    //   name: "Department Wise Tests",
    //   path: "viewDepartmentWiseTests",
    // },
    // {
    //   icon: "icon-bars1",
    //   key: "viewDepartmentWisePatients",
    //   name: "Department Wise Patients",
    //   path: "viewDepartmentWisePatients",
    // },
    // {
    //   icon: "icon-bars1",
    //   key: "viewDistrictCovidRecords",
    //   name: "District Covid Records",
    //   path: "viewDistrictCovidRecords",
    // },
    // {
    //   icon: "icon-bars1",
    //   key: "viewProvienceCovidRecords",
    //   name: "Provience Covid Records",
    //   path: "viewProvienceCovidRecords",
    // },
  ];

  const mainRoute = [
    // datmetric dashboard
    {
      icon: "icon-line2-home",
      key: "datametricdash",
      name: "Dashboard ",
      path: "/datametricdash",
      statePath: datametricStat,
    },
    {
      icon: "icon-folder-open-alt",
      key: "samplestatus",
      name: "Sample Status",
      path: "/sampledash",
      hasSubNav: true,
      subNavData: sampleStatusNav,
      showTab: true,
    },
    {
      icon: "icon-sticky-note1",
      key: "bulknegative",
      name: "Bulk Negative",
      path: "/bulknegativedash",
      hasSubNav: true,
      subNavData: bulkNegativeNav,
      showTab: false,
    },
    {
      icon: "icon-paste",
      key: "reportstatus",
      name: "Report Status",
      path: "/reportdash",
      hasSubNav: true,
      subNavData: reportStatNav,
      showTab: true,
    },
    {
      icon: "icon-stack2",
      key: "testanalyticss",
      name: "Test Analysis",
      path: "/testanalysis",
      hasSubNav: true,
      subNavData: testAnalysisNav,
      showTab: false,
    },

    {
      icon: "icon-line-bar-graph",
      key: "finance1",
      name: "Finance",
      path: "/financedash",
      hasSubNav: true,
      subNavData: financeNav,
      showTab: false,
    },
    {
      icon: "icon-chart",
      key: "departmentanalytics",
      name: "Department analytics",
      path: "/departmentanalytics",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-bars1",
      key: "outsourceanalytics",
      name: "Outsource analytics",
      path: "/outsourceanalytics",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-line-file",
      key: "marketanlaytic",
      name: "Marketing Analytic",
      path: "/carddash",
      hasSubNav: false,
      showTab: true,
    },
    // {
    //   icon: "icon-line-file",
    //   key: "membershipcard",
    //   name: "Membership Card",
    //   path: "/carddash",
    //   hasSubNav: false,
    //   showTab: true,
    // },
    {
      icon: "icon-money",
      key: "expensemanagement",
      name: "Expense Management",
      path: "/expensemanagement",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-line-bag",
      key: "marketinganalytics",
      name: "Marketing analytics",
      path: "/marketingdash",
      hasSubNav: true,
      subNavData: marketingNav,
      showTab: false,
    },
    {
      icon: "icon-line-alt",
      // key: "tatanalytics",
      name: "TAT analytics",
      path: "/tatdash",
      hasSubNav: true,
      subNavData: tatNav,
      showTab: true,
    },
    // {
    //     icon: 'icon-lab',
    //     key: 'testanalytics',
    //     name: 'Test analytics',
    //     path: '/testanalytics',
    //     hasSubNav: false,
    // },

    // {
    //     icon: 'icon-lab',
    //     key: 'samplestatus',
    //     name: 'Sample Status',
    //     path: '/samplestatus',
    //     hasSubNav: false,
    // },
    {
      icon: "icon-stack2",
      key: "qcmanagement",
      name: "QC Management",
      path: "/qcdash",
      hasSubNav: true,
      subNavData: qcControlNav,
      showTab: true,
    },
    {
      icon: "icon-book",
      key: "misreports",
      name: "MIS Reports",
      path: "/datametric",

      hasSubNav: false,
      showTab: true,
    },
    {
      icon: "icon-line2-doc",
      key: "printdetails",
      name: "Print Reports",
      path: "/print",
      showTab: false,
    },
    {
      icon: "icon-line2-doc",
      key: "addtable",
      name: "Billing",
      path: "/viewbill",
      showTab: false,
    },
    {
      icon: "icon-line-calendar",
      key: "datedash",
      name: "Date Change",
      path: "/datedash",
      hasSubNav: true,
      subNavData: dateChangeNav,
      showTab: false,
    },

    {
      icon: "icon-receipt",
      key: "editbill",
      name: "Edit Bill",
      path: "/editbill",
      hasSubNav: false,
      showTab: false,
    },
    {
      icon: "icon-line2-doc",
      key: "newReports",
      name: "New Reports",
      path: "/newReports",
      hasSubNav: true,
      subNavData: newReportsNav,
      showTab: true,
    },
    {
      icon: "icon-file-text",
      key: "viewbillss",
      name: "View Bill ",
      path: "/addbill",
      showTab: true,
    },
    {
      icon: "icon-line2-screen-desktop",
      key: "dynamicreporrt",
      name: "dynamicreport",
      path: "/dynarep",
      isactive: MenuSettings.dynamicreporrt,
      showTab: false,
    },
    {
      icon: "icon-line2-screen-desktop",
      key: "outsourcing",
      name: "outsourcing",
      path: "/outsourcing",
      showTab: true,
    },
    {
      icon: "icon-chat-3",
      key: "sms",
      name: "sms",
      path: "/sms",
      statePath: marketingStat,
    },
    {
      icon: "icon-line2-settings",
      key: "settings",
      name: "Settings",
      path: "/settingsServer",
      subNavData: settingsServerdata,

      // isactive: MenuSettings.theme,
      hasSubNav: true,
      showTab: true,
    },

    // {
    //   icon: "icon-line2-settings",
    //   key: "theme",
    //   name: "Settings",
    //   path: "/theme",
    //   isactive: MenuSettings.theme,
    //   showTab: true,
    // },
  ];

  return {
    // lateadded: lateadded,
    mainRoute: mainRoute,
    sampleStatusNav: sampleStatusNav,
    financeNav: financeNav,
    tatNav: tatNav,
    marketingNav: marketingNav,
    reportStatNav: reportStatNav,
    qcControlNav: qcControlNav,
    testAnalysisNav: testAnalysisNav,
    newReportsNav: newReportsNav,
    dateChangeNav: dateChangeNav,
    bulkNegativeNav: bulkNegativeNav,
  };
};
