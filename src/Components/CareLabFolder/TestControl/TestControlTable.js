import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { carelabStat } from "../../Common/StateList";
import Edit from "../../Common/Edit";
import PageHeader from "../../Common/pageHeader";
import { getControlDetailsApi } from "../../../services/qcService";

const TestControlTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [newGoodsList, setnewGoodsList] = useState([]);

  const columns = [
    {
      title: "Control Name",
      dataIndex: "ControlName",
      key: "ControlName",
    },
    {
      title: "Control Code",
      dataIndex: "ControlCode",
      key: "ControlCode",
    },
    {
      title: "Control Description",
      dataIndex: "ControlDescription",
      key: "ControlDescription",
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
                pathname: `/editcontroltest/${record.CId}`,
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

  const getLabData = () => {
    dispatch(
      getControlDetailsApi((val) => {
        setnewGoodsList(val);
      })
    );
  };

  useEffect(() => {
    getLabData();
  }, []);

  return (
    <TestControlContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle="Add Test Control"
          pageTitle="View Test Control"
          buttonOnClick={() =>
            history.push({
              pathname: "addcontroltest",
              state: carelabStat,
            })
          }
        />
      </div>
      <div className="tableisRes">
        <Table
          className="tableWidth"
          columns={columns}
          dataSource={newGoodsList}
        />
      </div>
    </TestControlContainer>
  );
};

export default TestControlTable;

const TestControlContainer = styled.div``;
