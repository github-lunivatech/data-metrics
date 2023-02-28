import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { carelabStat, misStat } from "../../Common/StateList";
import Edit from "../../Common/Edit";
import PageHeader from "../../Common/pageHeader";
import CarelabFilter from "../../Common/CarelabFilter";
import { getControlSDMeanCVApi } from "../../../services/qcService";

const ControlSDMeanTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [newGoodsList, setnewGoodsList] = useState([]);

  const columns = [
    {
      title: "Test",
      dataIndex: "TestId",
      key: "TestId",
    },
    {
      title: "Control",
      dataIndex: "ControlId",
      key: "ControlId",
    },
    {
      title: "Mean",
      dataIndex: "Mean",
      key: "Mean",
    },
    {
      title: "SD",
      dataIndex: "SD",
      key: "SD",
    },
    {
      title: "CV",
      dataIndex: "CV",
      key: "CV",
    },
    {
      title: "Qc Level",
      dataIndex: "QcLevel",
      key: "QcLevel",
    },
    {
      title: "Entry Date",
      dataIndex: "EntryDate",
      key: "EntryDate",
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
      // responsive: ['sm'],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Edit
            onClick={() =>
              history.push({
                pathname: `/editcontrolsdmean/${record.ControlId}/${
                  record.CId
                }/${record.TestId}/${record.EntryDate.split("T")[0]}`,
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

  const returnFilterData = (res) => {
    let newData = {
      analyzerId: res.controlId,
      testid: res.testId,
      from: res.FromTo[0].format("YYYY-MM-DD"),
      to: res.FromTo[1].format("YYYY-MM-DD"),
    };
    dispatch(
      getControlSDMeanCVApi(newData, (re) => {
        setnewGoodsList(re);
      })
    );
  };

  return (
    <GoodsOutContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle="Add Control SD"
          pageTitle="Control SD Mean CV"
          buttonOnClick={() =>
            history.push({
              pathname: "addcontrolsdmean",
              state: misStat,
            })
          }
        />
        <CarelabFilter
          returnFilterData={returnFilterData}
          showFromToDate={true}
          showTestControlList={true}
          showControlDetails={true}
        />
      </div>
      <div className="tableisRes">
        <Table
          className="tableWidth"
          columns={columns}
          dataSource={newGoodsList}
        />
      </div>
    </GoodsOutContainer>
  );
};

export default ControlSDMeanTable;

const GoodsOutContainer = styled.div``;
