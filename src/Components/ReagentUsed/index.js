import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageHeader from "../Common/pageHeader";
import { Space, Table, Tag } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Filter from "../Common/Filter";
import Cancle from "../Common/Cancle";
import { getReagentUsedApi } from "../../services/reagentService";
import { todaydate } from "../Common/TodayDate";
import { inventoryStat } from "../Common/StateList";

const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [newTableData, setnewTableData] = useState([]);

  const columns = [
    {
      title: "CId",
      dataIndex: "CId",
      key: "CId",
    },
    {
      title: "Consumption Head",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Reagent Name",
      dataIndex: "ReagentName",
      key: "ReagentName",
    },
    {
      title: "Control Amount",
      dataIndex: "ControlAmount",
      key: "ControlAmount",
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      key: "Remarks",
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
          <Cancle
            onClick={() =>
              history.push({
                pathname: `/reagentused/edit/${record.CId}/${
                  record.CreatedDate.split("T")[0]
                }`,
                state: inventoryStat,
              })
            }
          >
            Cancel
          </Cancle>
        </Space>
      ),
    },
  ];

  const getWastage = (data) => {
    dispatch(
      getReagentUsedApi(data, (val) => {
        setTableData(val);
        setnewTableData(val);
      })
    );
  };

  useEffect(() => {
    let data = {
      fromdate: todaydate,
      todate: todaydate,
    };
    getWastage(data);
  }, []);

  const dateRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    };
    getWastage(data);
  };

  const handleSearch = (val) => {
    if (val === undefined || val === "") {
      setnewTableData(setTableData);
    } else {
      setnewTableData(val);
    }
  };

  return (
    <ItemContainer>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Control Entry"
          buttonTitle="Add Control Entry"
          buttonOnClick={() =>
            history.push({
              pathname: "./reagentused/add",
              state: inventoryStat,
            })
          }
        />
        <Filter
          dateRange
          dateRet={dateRet}
          dataReturn={handleSearch}
          toCompareData={tableData}
          serchButton
          onSearch
          forGoodsIn
        />
      </div>
      <div className="tableisRes financeCards">
        <Table
          className="tableWidth"
          columns={columns}
          dataSource={newTableData}
          rowClassName={(record) =>
            record.Title !== null
              ? record.Title.includes("Repeat")
                ? "repeatback"
                : record.Title.includes("RB")
                ? "rbback"
                : record.Title.includes("Calibarati")
                ? "calback"
                : record.Title.includes("QC")
                ? "qcback"
                : ""
              : ""
          }
        />
      </div>
    </ItemContainer>
  );
};

export default Index;

const ItemContainer = styled.div``;
