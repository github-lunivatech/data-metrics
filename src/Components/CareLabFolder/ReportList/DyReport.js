import { Table } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  dateWiseTestApi,
  GetListOfPatientDetailsBydateAndTests,
} from "../../../services/careLabService";
import Filter from "../../Common/Filter";
import PageHeader from "../../Common/pageHeader";

const DyReport = () => {
  const dispatch = useDispatch();
  const [dyColumn, setDyColumn] = useState([]);
  const [dyColumnData, setDyColumnData] = useState([]);

  const dataRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
      SearchType: val.SearchType !== undefined ? val.SearchType : 1,
    };
    console.log(data.SearchType);

    getApiData(data);
  };
  // GetListOfPatientDetailsBydateAndTests
  const getApiData = (data) => {
    if (data.SearchType === 1) {
      dispatch(
        dateWiseTestApi(data, (res) => {
          if (res.length > 0) {
            let tableKeys = Object.keys(res[0]);
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
          } else {
            setDyColumn([]);
            setDyColumnData([]);
          }
        })
      );
    } else if (data.SearchType === 2) {
      dispatch(
        GetListOfPatientDetailsBydateAndTests(data, (res) => {
          if (res.length > 0) {
            let tableKeys = Object.keys(res[0]);
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
          } else {
            setDyColumn([]);
            setDyColumnData([]);
          }
        })
      );
    }
  };

  function createMarkup(htmlData = "") {
    return {
      __html: htmlData,
    };
  }

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Test Status"} />
        <Filter dateRange serchButton dateRet={dataRet} forTestStatus />
      </div>
      {dyColumnData.length > 0 ? (
        <div className="tableisRes">
          <Table
            className="tableWidth"
            columns={dyColumn}
            dataSource={dyColumnData}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DyReport;
//  <div className="maiTopContainer">
//           <div className="message-field">
//             <i class="icon-frown">
//               <span>
//                 <h2>!Data is not available </h2>
//               </span>
//               {/* <h3> !Data is not available </h3> */}
//               </i>
//               </div>
//             </div>
