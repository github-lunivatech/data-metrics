import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import PageHeader from "../Common/pageHeader";
import { carelabStat, inventoryStat } from "../Common/StateList";
import {
  GetEmailServerDetails,
  GetReportFormatDetails,
} from "../../services/datametricService";
import { useDispatch } from "react-redux";
import Edit from "../Common/Edit";
import { useHistory } from "react-router-dom";
const ReportRetrieve = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [reportId, setReportId] = useState([]);
  const [reportFormat, setReportFormat] = useState([]);
  useEffect(() => {
    getEmailData();
  }, []);

  const getEmailData = () => {
    let data = {
      id: 0,
    };
    dispatch(
      GetReportFormatDetails(data, (val) => {
        console.log(val);
        setReportFormat(val);
        // setunitList(val)
        setReportId(val);
      })
    );
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "ReportType",
      dataIndex: "ReportType",
      key: "ReportType",
    },
    {
      title: "GroupId",
      dataIndex: "GroupId",
      key: "GroupId",
    },
    {
      title: "IndividualId",
      dataIndex: "IndividualId",
      key: "IndividualId",
    },

    {
      title: "ReportFormat",
      dataIndex: "ReportFormat",
      key: "ReportFormat",
    },
    {
      title: "ReportGroup",
      dataIndex: "ReportGroup",
      key: "ReportGroup",
    },

    {
      title: "HideInOtherReport",
      dataIndex: "HideInOtherReport",
      key: "HideInOtherReport",
      render: (text) => {
        let retText = "false";
        let retColor = "red";
        if (text === true) {
          retText = "true";
          retColor = "green";
        }
        return <Tag color={retColor}>{retText}</Tag>;
      },
    },
    {
      title: "SeparateYellowPage",
      dataIndex: "SeparateYellowPage",
      key: "SeparateYellowPage",
      render: (text) => {
        let retText = "false";
        let retColor = "red";
        if (text === true) {
          retText = "true";
          retColor = "green";
        }
        return <Tag color={retColor}>{retText}</Tag>;
      },
    },
    {
      title: "CreatedBy",
      dataIndex: "CreatedBy",
      key: "CreatedBy",
    },
    {
      title: "CreatedOn",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
    },

    {
      title: "Is Active",
      dataIndex: "IsActive",
      key: "IsActive",
      render: (text) => {
        let retText = "Inactive";
        let retColor = "red";
        if (text === true) {
          retText = "Active";
          retColor = "green";
        }
        return <Tag color={retColor}>{retText}</Tag>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Edit
            onClick={() =>
              history.push({
                pathname: `./reportdata/edit/${record.Id}`,
                // state: { carelabStat: carelabStat, record: record },
                state: carelabStat,
              })
            }
          >
            Edit
          </Edit>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle={"ReportFormat"}
          buttonTitle="Add ReportFormat Details"
          buttonOnClick={() =>
            history.push({
              pathname: "./reportdata/addreport",
              state: carelabStat,
            })
          }
        />
      </div>
      <div className="tableisRes">
        <Table className="tableWidth" columns={columns} dataSource={reportId} />
      </div>
    </>
  );
};

export default ReportRetrieve;
