import { useState } from "react";
import { useDispatch } from "react-redux";
import PageHeader from "../Common/pageHeader";
import { getPatientBillByBillId } from "../../services/datametricService";
import { Space, Table } from "antd";
import DataIsLoading from "../Common/IsLoading";
import { useHistory } from "react-router-dom";
import { carelabStat, homePageName } from "../Common/StateList";
import CarelabFilter from "../Common/CarelabFilter";
import View from "../Common/View";
import Print from "../Common/Print";

const AddTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [returnDataList, setReturnDataList] = useState({});
  const [IsLoading, setIsLoading] = useState(false);

  const tableHeads = [
    {
      title: "BillNo",
      dataIndex: "BillNo",
      key: "BillNo",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "TotalPrice",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "SampleId",
      render: (text, record) => (
        <Space size="middle">
          <View
            onClick={() =>
              history.push({
                pathname: `/viewupdatebill/${returnDataList?.sampleId}/${returnDataList?.fiscalYear}`,
                state: carelabStat,
              })
            }
          >
            View
          </View>
          <Print
            onClick={() => {
              window.open(
                `/${homePageName}/printlayout/${returnDataList?.sampleId}/${returnDataList?.fiscalYear}`,
                "_blank"
              );
              // history.push({
              //   pathname: `/printlayout/${returnDataList?.sampleId}/${returnDataList?.fiscalYear}`,
              //   state: carelabStat
              // })}
            }}
          >
            Print
          </Print>
        </Space>
      ),
    },
  ];

  const getDataForReport = (data) => {
    setIsLoading(true);
    dispatch(
      getPatientBillByBillId(data, (val) => {
        setTableData(val);
        console.log(setTableData, "Hell");
      })
    );
    setIsLoading(false);
  };

  // const createTableHead = () => {
  //   if (tableData.length !== 0) {
  //     let tableKeys = Object.keys(tableData[0]);
  //     let data = [];
  //     tableKeys.forEach((ele) => {
  //       data.push({
  //         title: ele,
  //         dataIndex: ele,
  //         key: ele,
  //       });
  //     });
  //     setTableHead(data);
  //   }
  // };

  const returnFilterData = (res) => {
    setReturnDataList(res);
    getDataForReport(res);
  };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle=" View Billing Report"
          reportName="Requestor"
          selctorr={"Requestor Name"}
          buttonTitle="Add Bill"
          buttonOnClick={() =>
            history.push({
              pathname: "/addbill",
              state: carelabStat,
            })
          }
        />
        <CarelabFilter
          showSampleId={"Bill Id"}
          fiscalService
          returnFilterData={returnFilterData}
        />
      </div>

      {IsLoading ? (
        <DataIsLoading />
      ) : tableData.length !== 0 ? (
        <div className="tableisRes">
          <Table
            className="tableWidth"
            columns={tableHeads}
            dataSource={tableData}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddTable;
