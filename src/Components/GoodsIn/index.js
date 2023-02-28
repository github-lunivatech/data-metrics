import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getGoodsReceivedApi } from "../../services/labGoodsReceivedService";
import Filter from "../Common/Filter";
import PageHeader from "../Common/pageHeader";
// import Edit from '../Common/Edit';
import Cancle from "../Common/Cancle";
import { todaydate } from "../Common/TodayDate";
import { useLocation } from "react-router-dom";
import { inventoryStat } from "../Common/StateList";

const Index = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [goodsList, setgoodsList] = useState([]);
  const [newGoodsList, setnewGoodsList] = useState([]);

  const columns = [
    {
      title: "Reagent Name",
      dataIndex: "ItemName",
      key: "itemName",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (text, record) =>
        `${text} ${record.Unit !== null ? record.Unit : ""}`,
    },
    {
      title: "Item Source",
      dataIndex: "Source",
      key: "Source",
    },
    {
      title: "Expiry Date",
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      render: (text) => {
        return text.split("T")[0];
      },
    },
    {
      title: "Reagent Status",
      dataIndex: "ItemStatus",
      key: "ItemStatus",
      render: (text) => {
        let retColor = "red";
        if (text === "Available") {
          retColor = "green";
        }
        return <Tag color={retColor}>{text}</Tag>;
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
                pathname: `/goodsin/edit/${record.GId}/${record.CreatedDate}`,
                state: inventoryStat,
              })
            }
          >
            Cancle
          </Cancle>
        </Space>
      ),
    },
  ];

  const getLabData = (data) => {
    dispatch(
      getGoodsReceivedApi(data, (val) => {
        setgoodsList(val);
        setnewGoodsList(val);
      })
    );
  };

  useEffect(() => {
    let data = {
      fromdate: todaydate,
      todate: todaydate,
    };
    getLabData(data);
  }, []);

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    };
    getLabData(data);
  };

  const handleSearch = (val) => {
    if (val === undefined || val === "") {
      setnewGoodsList(goodsList);
    } else {
      setnewGoodsList(val);
    }
  };

  return (
    <GoodsInContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle="Add Reagent"
          pageTitle="Reagent In"
          buttonOnClick={() =>
            history.push({
              pathname: "./goodsin/add",
              state: inventoryStat,
            })
          }
        ></PageHeader>
        <Filter
          dataReturn={handleSearch}
          dateRange
          dateRet={dataRet}
          toCompareData={goodsList}
          serchButton
          onSearch
          forGoodsIn
          columns={columns}
        ></Filter>
      </div>

      <div className="tableisRes">
        <Table
          className="tableWidth"
          columns={columns}
          dataSource={newGoodsList}
        />
      </div>
    </GoodsInContainer>
  );
};

export default Index;

const GoodsInContainer = styled.div``;
