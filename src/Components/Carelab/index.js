import { Tabs, Table, Button, Switch, Tag } from "antd";
import NewBadge from "./NewBadge";
import { useDispatch } from "react-redux";
import {
  careLabSampleStatusApi,
  careLabTabApi,
  careLabFiscalCodeApi,
} from "../../services/careLabService";
import Filter from "../Common/Filter";
import { useState, useEffect } from "react";
import ReportModal from "./ReportModal";
import PrintReport from "./PrintReport";
import { Markup } from "interweave";
import PageHeader from "../Common/pageHeader";
// import AntdUpload from './AntdUpload';

const { TabPane } = Tabs;

const offsetValue = [10, 0];

const Carelab = () => {
  const dispatch = useDispatch();
  const [tabData, setTabData] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState(0);
  const [columns, setColumns] = useState([]);
  const [newTableData, setNewTableData] = useState([]);
  const [ftDate, setFtDate] = useState({});
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [clickedId, setClickedId] = useState(0);
  const [newFiscalId, setNewFiscalId] = useState(0);
  const [showDiagList, setshowDiagList] = useState(false);
  const [diagList, setDiagList] = useState("");
  const [isMaleFemale, setIsMaleFemale] = useState("");
  const [isPrint, setIsPrint] = useState(false);

  const staticColumn = [
    {
      title: "Patient Name",
      dataIndex: "PatientName",
      key: "PatientName",
      width: "15%",
      render: (text, record) => (
        <>
          <strong>
            <div>{text}</div>
            <div>
              <small>{record?.Gender}</small>
            </div>
            <div>
              <small>Sample Id: {record?.SampleId}</small>
            </div>
          </strong>
        </>
      ),
    },
    {
      title: "Requestor / Referrer",
      dataIndex: "Requestor",
      key: "Requestor",
      render: (text, record) => (
        <>
          <div>Requestor: {text}</div>
          <div>Referrer: {record?.Referrer}</div>
        </>
      ),
    },
    {
      title: "Report Status",
      dataIndex: "BillPaymentType",
      key: "BillPaymentType",
      render: (text, record) => {
        const billText = text.toLowerCase();
        const prioText = record.ReportPriority.toLowerCase();
        const statText = record.ReportStatus.toLowerCase();
        let billTag = "";
        if (billText === "cash") {
          billTag = <Tag color="green">{text}</Tag>;
        } else if (billText === "credit") {
          billTag = <Tag color="#108ee9">{text}</Tag>;
        } else if (billText === "creditcollection") {
          billTag = <Tag color="gold">{text}</Tag>;
        } else {
          billTag = <Tag>{text}</Tag>;
        }

        let prioTag = "";
        if (prioText != null) {
          if (prioText.includes("emergency")) {
            prioTag = <Tag color="error">{prioText}</Tag>;
          } else if (prioText === "") {
            prioTag = <Tag>Normal</Tag>;
          } else {
            prioTag = <Tag color="green">{prioText}</Tag>;
          }
        }

        let statTag = "";
        if (statText !== null) {
          if (statText === "not completed") {
            statTag = <Tag color="error">{statText}</Tag>;
          } else if (statText === "report completed") {
            statTag = <Tag color="success">{statText}</Tag>;
          } else if (statText === "partially completed") {
            statTag = <Tag color="warning">{statText}</Tag>;
          } else {
            statTag = <Tag color="warning">{statText}</Tag>;
          }
        }

        return (
          <div className="allStat">
            <div>{billTag}</div>
            <div>{prioTag}</div>
            <div>{statTag}</div>
          </div>
        );
      },
    },
    /* {
        title: 'Payment Type',
        dataIndex: 'BillPaymentType',
        key: 'BillPaymentType',
        render: (text, record) => {
            if (text !== null) {
                let texter = text.toLowerCase();
                if (texter === "cash") {

                    return <Tag color="green">{text}</Tag>
                } else if (texter === "credit") {
                    return <Tag color="#108ee9">{text}</Tag>
                } else if (texter === "creditcollection") {
                    return <Tag color="gold">{text}</Tag>
                } else {
                    return <Tag>{text}</Tag>
                }
            } else {
                return "";
            }
        }
    },
    {
        title: 'Report Priority',
        dataIndex: 'ReportPriority',
        key: 'ReportPriority',
        render: (row) => {
            if (row != null) {
                let texter = row.toLowerCase();
                if (texter.includes("emergency")) {
                    return <Tag color="error">{row}</Tag>
                } else if (texter === "") {
                    return <Tag>Normal</Tag>
                } else {
                    return <Tag color="green">{row}</Tag>
                }
            } else {
                return "";
            }
        }
    },
    {
        title: 'Report Status',
        dataIndex: 'ReportStatus',
        key: 'ReportStatus',
        render: (row) => {
            if (row !== null) {
                if (row.toLowerCase() === "not completed") {
                    return <Tag color="error">{row}</Tag>
                } else if (row.toLowerCase() === "report completed") {
                    return <Tag color="success">{row}</Tag>
                } else if (row.toLowerCase() === "partially completed") {
                    return <Tag color="warning">{row}</Tag>
                } else {
                    return <Tag color="warning">{row}</Tag>
                }
            } else {
                return "";
            }
        }
    }, */
    {
      title: "Report Delivery",
      dataIndex: "ReportDelivery",
      key: "ReportDelivery",
    },
    {
      title: "Test",
      dataIndex: "Test",
      key: "Test",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "Action",
      render: (text, record) => {
        return (
          <Button
            data-attr={record?.SampleId}
            data-gen={record?.Gender}
            onClick={clickEvent}
          >
            View
          </Button>
        );
        // return <button data-attr={record?.SampleId} data-gen={record?.Gender} onClick={clickEvent}>View</button>
      },
    },
  ];

  const clickEvent = (e) => {
    let eTarget = e.target.closest("td").children[0].dataset;
    setClickedId(eTarget.attr);
    setIsMaleFemale(eTarget.gen.split("-")[0]);
    setIsButtonClicked(true);
  };

  const handleCancel = () => {
    setIsButtonClicked(false);
  };

  const callback = (key) => {
    if (activeTabKey !== key) {
      setActiveTabKey(key);
      tableRetData(key);
    }
  };

  const callTabApi = (data) => {
    dispatch(
      careLabTabApi(data, (res) => {
        setTabData(res);
      })
    );
  };

  const dataRet = (val) => {
    let data = {
      fromdate: "2021-06-22", //val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    };
    setDiagList(val?.diaList.toString());
    setNewFiscalId(val?.fiscalId);
    setFtDate(data);
    callTabApi(data);
  };

  const tableRetData = (val) => {
    let fullDa = {
      ...ftDate,
      reportTab: val,
      fiscalyear: newFiscalId,
      diagListIn: diagList,
    };
    dispatch(
      careLabSampleStatusApi(fullDa, (res) => {
        setColumns([]);
        setNewTableData([]);

        if (res.length !== 0) {
          let tableKeys = Object.keys(res[0]);
          let data = [];
          tableKeys.forEach((ele) => {
            data.push({
              title: ele,
              dataIndex: ele,
              key: ele,
            });
          });
          setColumns(data);
          setNewTableData(res);
        }
      })
    );
  };

  const diagIn = (e) => {
    setshowDiagList(e);
  };

  const printData = () => {
    setIsPrint(true);
  };

  const handlePrintClose = () => {
    setIsPrint(false);
  };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Sample Stat"} />
        <div style={{ padding: "0 8px " }}>
          Diagnosis In <Switch onChange={diagIn} />
        </div>
        <Filter
          dateRange
          serchButton
          dateRet={dataRet}
          fiscalService
          showDiagList={showDiagList}
        />
      </div>
      <div className="tableisRes">
        <Tabs onChange={callback}>
          {tabData.map((taber, index) => {
            let badgeColour = taber?.Code;
            let tabStat = taber?.Status;
            let textColour = badgeColour === "yellow" ? "black" : "white";
            return (
              <TabPane
                tab={
                  <NewBadge
                    badgeCount={taber?.Count}
                    badgeSize="small"
                    offsetValue={offsetValue}
                    badgeColor={badgeColour}
                    textColor={textColour}
                  >
                    <label>{tabStat}</label>
                  </NewBadge>
                }
                key={index}
              >
                <div className="tableisRes">
                  <Table
                    className="tableWidth"
                    columns={staticColumn}
                    dataSource={newTableData}
                  />
                </div>
              </TabPane>
            );
          })}
        </Tabs>
        <ReportModal
          visible={isButtonClicked}
          handleCancel={handleCancel}
          setClickedId={clickedId}
          newFiscalId={newFiscalId}
          isMaleFemale={isMaleFemale}
        />
        <PrintReport isPrint={isPrint} handlePrintClose={handlePrintClose} />
      </div>
    </>
  );
};

export default Carelab;
