import { ItemName } from "../Components/Common/ItemToReagent";
import { marketingStat, misStat } from "../Components/Common/StateList";
import { MenuSettings } from "./MenuSettings";

export const AfterLoginData = [
  {
    icon: "icon-line2-home",
    key: "inventory",
    name: "Inventory",
    path: "/dashbord",
    statePath: "inventory",
    isactive: MenuSettings.dashboard,
  },
  {
    icon: "icon-line2-doc",
    key: "misreports",
    name: "MIS Reports",
    path: "/datametric",
    statePath: "misReportStat",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "datametric",
    name: "Datametric",
    // all menu in datametric appear here[menuroute.js]
    path: "/caredashboard",
    statePath: "datametric",
    path: "/datametricdash",
    statePath: "datametricStat",
    isactive: MenuSettings.datametricdash,
  },
  {
    icon: "icon-stack2",
    key: "qcmanagement",
    name: "QC Management",
    path: "/qcdash",
    statePath: "misStat",
    // isactive: MenuSettings.datametrictab,
  },
  {
    icon: "icon-stack2",
    key: "marketinganalysis",
    name: "Marketing Analysis",
    path: "/marketingdash",
    statePath: "marketingStat",
    isactive: MenuSettings.sms,
  },
  {
    icon: "icon-beaker",
    key: "tatanalysis",
    name: "tatanalysis",
    path: "/tatanalysis",
    statePath: "tatStat",
    isactive: MenuSettings.tatanalysis,
  },
  {
    icon: "icon-line2-screen-desktop",
    key: "outsourcing",
    name: "Outsourcing",
    path: "/outsourceanalytics",
    statePath: "outsourcingStat",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-line2-settings",
    key: "settings",
    name: "Settings",
    path: "/settingsserver",
    statePath: "settingStat",
    isactive: MenuSettings.settingsserver,
  },
  {
    icon: "icon-paste",
    key: "labstatus",
    name: "Lab Status",
    path: "/dynarep",
    statePath: "labstatusStat",
    isactive: MenuSettings.labstatus,
  },
];

//inventory management
export const MenuRoute = [
  {
    icon: "icon-line2-home",
    key: "dashbord",
    name: "dashboard",
    path: "/dashbord",
    isactive: MenuSettings.dashboard,
  },

  {
    icon: "icon-line-bag",
    key: "goodsin",
    name: "Reagent in",
    path: "/goodsin",
    isactive: MenuSettings.goodsin,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "goodsOut",
    name: "Reagent Out",
    path: "/goodsout",
    isactive: MenuSettings.goodsout,
  },

  {
    icon: "icon-line-trash",
    key: "wastage",
    name: "wastage",
    path: "/wastage",
    isactive: MenuSettings.wastage,
  },
  {
    icon: "icon-line2-doc",
    key: "reports",
    name: "Reports",
    path: "/reports",
    isactive: MenuSettings.reports,
  },
  {
    icon: "icon-archive2",
    key: "reagentused",
    name: "Reagent Control",
    path: "/reagentused",
    isactive: MenuSettings.reagentused,
  },

  // {
  //   icon: "icon-line2-doc",
  //   key: "misreports",
  //   name: "MIS Reports",
  //   path: "/datametric",
  //   isactive: MenuSettings.misreports,
  // },
];
//inventory settings
export const settingsMenu = [
  {
    icon: "icon-line-box",
    key: "item",
    name: ItemName,
    path: "/item",
    isactive: MenuSettings.item,
  },
  {
    icon: "icon-lab2",
    key: "itemVsRatio",
    name: `${ItemName} Ratio`,
    path: "/itemvsratio",
    isactive: MenuSettings.itemvsratio,
  },
  {
    icon: "icon-line-stack",
    key: "type",
    name: "type",
    path: "/type",
    isactive: MenuSettings.type,
  },
  {
    icon: "icon-line-book",
    key: "category",
    name: "category",
    path: "/category",
    isactive: MenuSettings.category,
  },
  {
    icon: "icon-location",
    key: "location",
    name: "location",
    path: "/location",
    isactive: MenuSettings.location,
  },
  {
    icon: "icon-line-archive",
    key: "rack",
    name: "rack",
    path: "/rack",
    isactive: MenuSettings.rack,
  },
  {
    icon: "icon-line-content-right",
    key: "unit",
    name: "unit",
    path: "/units",
    isactive: MenuSettings.units,
  },
  {
    icon: "icon-bar-chart",
    key: "Manufacture",
    name: "Manufacture",
    path: "/manufacture",
    isactive: MenuSettings.manufacture,
  },
  {
    icon: "icon-bitbucket-sign",
    key: "consumption",
    name: "consumption",
    path: "/consumption",
    isactive: MenuSettings.consumption,
  },
  {
    icon: "icon-camera",
    key: "cons lookup",
    name: "cons lookup",
    path: "/consumptionlook",
    isactive: MenuSettings.consumptionlook,
  },
  {
    icon: "icon-eye-open",
    key: "item source",
    name: "Item Source",
    path: "/itemsource",
    isactive: MenuSettings.consumptionlook,
  },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'theme',
  //   name: 'theme',
  //   path: '/theme',
  //   isactive: MenuSettings.theme,
  // },
];

//datametric
export const dataMetricCon = [
  {
    icon: "icon-line-shopping-bag",
    key: "carelabreport",
    name: "Report Care",
    path: "/carelab",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-building2",
    key: "department",
    name: "department",
    path: "/department",
    isactive: MenuSettings.department,
  },
  {
    icon: "icon-line2-screen-desktop",
    key: "outsourcing",
    name: "outsourcing",
    path: "/outsourcing",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-graph",
    key: "finance",
    name: "Finance",
    path: "/finance",
    isactive: MenuSettings.finance,
  },
  {
    icon: "icon-calendar21",
    key: "marketing",
    name: "marketing",
    path: "/marketing",
    isactive: MenuSettings.marketing,
  },
  // {
  //   icon: "icon-chat",
  //   key: "tatanalysis",
  //   name: "tat analysis",
  //   path: "/tatanalysis",
  //   statePath: "tatStat",
  //   isactive: MenuSettings.tatanalysis,
  // },
  //by ..
  {
    icon: "icon-chat",
    key: "printdetails",
    name: "Print Reports",
    path: "/print",
    isactive: MenuSettings.printanalysis,
  },
  {
    icon: "icon-chat",
    key: "printdetails",
    name: "Print Reports",
    path: "/print",
    isactive: MenuSettings.printanalysis,
  },
  {
    icon: "icon-list",
    key: "tatGetTestList",
    name: "Get Test List",
    path: "/tatGetTestList",
    isactive: MenuSettings.gettestlist,
  },

  {
    icon: "icon-stethoscope",
    key: "testanalysis",
    name: "testanalysis",
    path: "/testanalysis",
    isactive: MenuSettings.testanalysis,
  },
  {
    icon: "icon-line2-screen-desktop",
    key: "expesemangement",
    name: "expensemangement",
    path: "/expesemangement",
    isactive: MenuSettings.expesemangement,
  },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'qccontrol',
  //   name: 'qccontrol',
  //   path: '/qccontrol',
  //   isactive: MenuSettings.qccontrol,
  // },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'dynamicreporrt',
  //   name: 'dynamicreport',
  //   path: '/dynamicreporrt',
  //   isactive: MenuSettings.dynamicreporrt,
  // },

  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'editbill',
  //   name: 'editbill',
  //   path: '/editbill',
  //   isactive: MenuSettings.editbill,
  // },
  // {
  //   icon: "icon-chat-3",
  //   key: "sms",
  //   name: "sms",
  //   path: "/sms",
  //   isactive: MenuSettings.sms,
  // },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'datechange',
  //   name: 'datechange',
  //   path: '/',
  //   isactive: MenuSettings.datechange,
  // },
  // {
  //   icon: 'icon-line2-screen-desktop',
  //   key: 'bulknegative',
  //   name: 'bulknegative',
  //   path: '/bulknegative',
  //   isactive: MenuSettings.bulknegative,
  // },
];
export const tatanalysis = [
  {
    icon: "icon-chat",
    key: "tatanalysis",
    name: "tat analysis",
    path: "/tatanalysis",
    statePath: "tatStat",
    isactive: MenuSettings.tatanalysis,
  },
];

export const qcControlNav = [
  {
    icon: "icon-bar-chart",
    key: "lcchart",
    name: "LJ Chart",
    path: "/lcchart",
    isactive: MenuSettings.goodsout,
    statePath: misStat,
  },
  {
    icon: "icon-lab2",
    key: "addtestcontrol",
    name: "Test Control",
    path: "/viewtestcontrol",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-lab2",
    key: "viewcontroltest",
    name: "Control Test",
    path: "/viewcontroltest",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-bars1",
    key: "viewcontroltesttest",
    name: "Tests",
    path: "/viewcontroltesttest",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "viewtestdata",
    name: "Test Data",
    path: "/viewtestdata",
    isactive: MenuSettings.goodsout,
  },
  {
    icon: "icon-line-shopping-bag",
    key: "viewsdmean",
    name: "Sd Mean",
    path: "/viewcontrolsdmean",
    isactive: MenuSettings.goodsout,
  },
];

export const tatNav = [
  {
    icon: "icon-chat",
    key: "tatanalysis",
    name: "tat analysis",
    path: "/tatanalysis",
    isactive: MenuSettings.tatanalysis,
    // statePath: "tatStat",
  },

  // by me==========
  {
    icon: "icon-list",
    key: "tatGetTestList",
    name: "Get Test List",
    path: "/testList",
    isactive: MenuSettings.tatanalysis,
    // statePath: "tatStat",
  },
];
export const marketinganalyticNav = [
  {
    icon: "icon-line-file",
    key: "marketanlaytic",
    name: "Analysis",
    path: "/carddash",
    isactive: MenuSettings.sms,
  },
  {
    icon: "icon-chat-3",
    key: "sms",
    name: "sms",
    path: "/sms",
    isactive: MenuSettings.sms,
    statePath: marketingStat,
  },
];

export const misreportNav = [
  {
    icon: "icon-line2-doc",
    key: "misreports",
    name: "MIS Reports",
    path: "/datametric",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-bars1",
    key: "viewProvience&DisticeWise",
    name: "Provience Wise Report",
    path: "/datametric/viewProvience&DistrictWise",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-bars1",
    key: "viewGeoGraphicalWise",
    name: "Geography Wise Report",
    path: "/datametric/viewGeoGraphicalWise",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-file-text",
    key: "viewbillss",
    name: "View Bill ",
    path: "/datametric/addbill",
    isactive: MenuSettings.misreports,
  },
  /// added
  {
    icon: "icon-file-text",
    key: "dailysummary",
    name: "Daily Summary",
    path: "/datametric/dailysummary",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-file-text",
    key: "dailytransaction",
    name: "Daily Transaction",
    path: "/datametric/dailytransaction",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-file-text",
    key: "requestor",
    name: "Requestor Report",
    path: "/datametric/requestor",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-file-text",
    key: "referer",
    name: "Referer Report",
    path: "/datametric/referer",
    isactive: MenuSettings.misreports,
  },
  {
    icon: "icon-file-text",
    key: "requestorsales",
    name: "Requestor Sales Summary",
    path: "/datametric/requestorsales",
    isactive: MenuSettings.misreports,
  },
];

// Out Sourcing Report Summary
export const outsourceNav = [
  {
    icon: "icon-line2-screen-desktop",
    key: "outsourcing",
    name: "Outsourcing",
    path: "/outsourcing",
    isactive: MenuSettings.outsourcing,
  },
];

export const settingsNav = [
  {
    icon: "icon-envelope",
    key: "Email",
    name: "Email",
    path: "/settingsemail",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-book",
    key: "Report Format",
    name: "report",
    path: "/reportdata",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-picture",
    key: "theme",
    name: "Theme",
    path: "/theme",
    isactive: MenuSettings.outsourcing,
  },
];

export const datametricNav = [
  {
    icon: "icon-line2-home",
    key: "datametricdash",
    name: "Dashboard ",
    path: "/datametricdash",
    isactive: MenuSettings.outsourcing,
  },
];

export const labStatusNav = [
  {
    icon: "icon-file-alt",
    key: "datametricdash",
    name: "Test Status ",
    path: "/dynarep",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-line-file",
    key: "reportlist",
    name: "Report List",
    path: "/reportlist",
    isactive: MenuSettings.outsourcing,
  },
  {
    icon: "icon-lab",
    key: "testanalytics",
    name: "Test Name",
    path: "/testanalytics",

    isactive: MenuSettings.outsourcing,
  },
];
