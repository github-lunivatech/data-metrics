import React, { useEffect, useState } from "react";
import { Button, message, Table, notification } from "antd";
// import CarelabFilter from "../../Common/CarelabFilter";
import { printMembership } from "./MembershipPrint";
import {
  getMemberShipDetailsByMemberCode,
  getMemberShipDetailsByMemberId,
} from "../../../services/careLabService";

import { useLocation } from "react-router";

import PageHeader from "../../Common/pageHeader";
import cry from "../../../assets/images/cry.png";
import logosmall from "../../../assets/images/logosmall1.png";
import { useDispatch } from "react-redux";
import CarelabFilter from "../../Common/CarelabFilter";

function MembershipCard() {
  // console.log(mCode, "Saurey"); // Outputs the value of the 'param' parameter
  const [code, setCode] = useState();
  const [directPrint, setdirectPrint] = useState();

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    // Get the value of the 'param' parameter
    const paramValue = new URLSearchParams(currentUrl.search);
    const mCode = paramValue.get("mCode");
    const directPrint = paramValue.get("print");
    setCode(mCode);
    setdirectPrint(directPrint);
  }, []);
  console.log(code, "hi");

  useEffect(() => {
    if (code) {
      const dt = {};
      dt.memberCode = code;
      dispatch(
        getMemberShipDetailsByMemberCode(dt, (res) => {
          console.log(res, "dsad");
          if (res.length > 0) {
            setDyColumnData(res);
            // if (directPrint) {
            //   //console.log(res[0], "Error");
            //   // onFinish(res[0]);
            // }
            // console.log(res);
          } else {
            notification.error({
              duration: 3,
              placement: "topRight",
              message: `No data found for member code ${memberCode}`,
              rtl: true,
            });
            setDyColumnData([]);
          }
        })
      );
    }
  }, [code]);

  // let myphmcy = new URLSearchParams(window.location.search).get("mCode.value");
  // console.log(myphmcy, "Saurey");

  const [data, setData] = useState([]);
  // const [dyColumn, setDyColumn] = useState([]);
  const [dyColumnData, setDyColumnData] = useState([]);
  const dispatch = useDispatch();
  const d = new Date();
  const e = d.toISOString().split("T")[0];

  const dyColumn = [
    {
      key: "Id",
      dataIndex: "Id",
      title: "Id",
    },
    {
      key: "Name",
      dataIndex: "Name",
      title: "Name",
    },
    {
      key: "Member Code",
      dataIndex: "MemberCode",
      title: "Member Code",
    },
    {
      key: "Address",
      dataIndex: "Address",
      title: "Address",
    },
    {
      key: "Contact",
      dataIndex: "ContactNo",
      title: "Phone No.",
    },
    {
      key: "DOB",
      dataIndex: "DateOfBirth",
      title: "Date of Birth",
    },
    {
      key: "IssuedDate",
      dataIndex: "Date",
      title: "Issued Date",
    },
    {
      key: "Action ",
      dataIndex: "Action",
      title: "Action",
      render: (data, row, meta) => {
        return <Button onClick={() => onFinish(row)}> Print</Button>;
      },
    },
  ];

  // useEffect(() => {
  //   loadMemberData()
  // }, []);

  const loadMemberData = (memberCode) => {
    let a = {
      memberCode: memberCode,
    };
    dispatch(
      getMemberShipDetailsByMemberCode(a, (res) => {
        // console.log(res);
        if (res.length > 0) {
          setDyColumnData(res);
          // console.log(res);
        } else {
          notification.info({
            duration: 3,
            placement: "topRight",
            message: `No data found for member code ${memberCode}`,
            rtl: true,
          });
          setDyColumnData([]);
        }
      })
    );
  };

  const onFinish = (values) => {
    console.log(values, "123213");
    const urlhref = window.location.href,
      newpath = urlhref.split("luniva360lims");
    const imagePath = `${newpath[0]}${cry}`;
    const small = `${newpath[0]}${logosmall}`;

    printMembership(imagePath, small, values, e);
  };

  const returnFilterData = (res) => {
    loadMemberData(res?.memberCode);
  };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader pageTitle={"Membership Card"} />
        {/* <Button onClick={onFinish}> Print</Button> */}
      </div>
      <CarelabFilter
        showSampleId={"Member Code"}
        returnFilterData={returnFilterData}
      />
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

export default MembershipCard;
