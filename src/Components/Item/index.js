import React, { useState } from "react";
import { Space, Table } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { getLabItemsApi } from "../../services/itemNewItemService";
import PageHeader from "../Common/pageHeader";
import Filter from "../Common/Filter";
import Edit from "../Common/Edit";
import { inventoryStat } from "../Common/StateList";

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [newTableData, setnewTableData] = useState([]);
  const [typId, setTypId] = useState(0);
  const [catId, setCatId] = useState(0);

  const columns = [
    {
      title: "Reagent Code",
      dataIndex: "ItemCode",
      key: "itemCode",
    },
    {
      title: "Reagent Name",
      dataIndex: "ItemName",
      key: "itemName",
    },
    {
      title: "MinQty",
      dataIndex: "MinQty",
      key: "minQty",
      render: (text, record) =>
        `${text} ${record.Unit !== null ? record.Unit : ""}`,
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
      render: (text, record) => {
        if (text !== null) {
          return `${text} ${record.Rack !== null ? `(${record.Rack})` : ""}`;
        }
        return "";
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
                pathname: `/item/edit/${record.TId}/${typId}/${catId}`,
                state: inventoryStat,
              })
            }
          ></Edit>
        </Space>
      ),
    },
  ];

  const getLabData = (tId = 0, cId = 0) => {
    let data = {
      typeId: tId,
      categoryId: cId,
    };
    dispatch(
      getLabItemsApi(data, (val) => {
        setTableData(val);
        setnewTableData(val);
      })
    );
  };

  // if (tableData.length === 0) {
  //   getLabData()
  // }

  const dataRet = (val) => {
    getLabData(val?.iType, val?.cType);
    setTypId(val?.iType);
    setCatId(val?.cType);
  };

  const henadleSearch = (val) => {
    if (val === undefined || val === "") {
      setnewTableData(tableData);
    } else {
      setnewTableData(val);
    }
  };

  return (
    <ItemContainer>
      <div className="maiTopContainer">
        <PageHeader
          buttonTitle="Add Reagent"
          pageTitle="Reagent"
          buttonOnClick={() =>
            history.push({
              pathname: "./item/add",
              state: inventoryStat,
            })
          }
        ></PageHeader>
        <Filter
          itemType
          categroryType
          dataRet={dataRet}
          serchButton
          onSearch
          toCompareData={tableData}
          forItem
          dataReturn={henadleSearch}
        />
      </div>
      <div className="top"></div>
      <div className="tableisRes">
        <Table
          className="tableWidth"
          columns={columns}
          dataSource={newTableData}
        />
      </div>
    </ItemContainer>
  );
};

export default Index;

const ItemContainer = styled.div``;
