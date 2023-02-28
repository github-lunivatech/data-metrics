import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";
import {
  carelabStat,
  inventoryStat,
  marketingStat,
} from "../../Common/StateList";
import { Table } from "antd";
import CarelabFilter from "../../Common/CarelabFilter";
import { GetSMSConsumptionDetail } from "../../../services/careLabService";
import { useDispatch } from "react-redux";

function Sms() {
  const [dyColumn, setDyColumn] = useState([]);
  const [dyColumnData, setDyColumnData] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const returnFilterData = (val) => {
    console.log(val);
    let data = {
      fromdate: val.FromTo[0].format("YYYY-MM-DD"),
      todate: val.FromTo[1].format("YYYY-MM-DD"),
    };

    getSMSData(data);
  };
  // GetListOfPatientDetailsBydateAndTests
  const getSMSData = (data) => {
    // if (data.SearchType === 1) {

    // }
    dispatch(
      GetSMSConsumptionDetail(data, (res) => {
        console.log(res);
        if (res.length > 0) {
          let tableKeys = Object.keys(res[0]);
          // console.log("keysfortable", tableKeys);
          let data = [];
          tableKeys.forEach((ele) => {
            data.push({
              title: ele,
              dataIndex: ele,
              key: ele,
              render: function (html) {
                return <div dangerouslySetInnerHTML={createMarkup(html)} />;
              },
            });
          });
          setDyColumn(data);
          setDyColumnData(res);
          // console.log(dyColumn);
          // console.log(dyColumnData);
        } else {
          setDyColumn([]);
          setDyColumnData([]);
        }
      })
    );
  };

  useEffect(() => {
    getSMSData();
  }, [dyColumnData]);
  function createMarkup(htmlData = "") {
    return {
      __html: htmlData,
    };
  }
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle={"SMS"}
          buttonTitle="Add Sms Details"
          buttonOnClick={() =>
            history.push({
              pathname: "./sms/add",
              // state: carelabStat,
              state: marketingStat,
            })
          }
        />

        <CarelabFilter showFromToDate returnFilterData={returnFilterData} />
        <Filter onSearch />
      </div>

      {dyColumnData.length > 0 && (
        <div className="tableisRes">
          <Table
            className="tableWidth"
            columns={dyColumn}
            dataSource={dyColumnData}
          />
        </div>
      )}
    </>
  );
}

export default Sms;
