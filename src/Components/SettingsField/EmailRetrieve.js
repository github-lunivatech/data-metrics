import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
import PageHeader from "../Common/pageHeader";
import { carelabStat } from "../Common/StateList";
import { GetEmailServerDetails } from "../../services/datametricService";
import { useDispatch } from "react-redux";
import Edit from "../Common/Edit";
import { NavLink, useHistory } from "react-router-dom";
const EmailRetrieve = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emailsettingsdetails, setEmailSettingsDetails] = useState([]);
  const [newEmailDetails, setnewEmailDetails] = useState([]);
  const [selectdata, setSelectdata] = useState([]);
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: "Host Name",
      dataIndex: "Host",
      key: "Host",
    },
    {
      title: "Port",
      dataIndex: "Port",
      key: "Port",
    },
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "Password",
      dataIndex: "Password",
      key: "Password",
    },

    {
      title: "From",
      dataIndex: "From",
      key: "From",
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
      title: "Bcc",
      dataIndex: "Bcc",
      key: "Bcc",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Space size="middle">
              <Edit
                onClick={
                  //  () => console.log(record, "dfs")
                  () => {
                    // console.log(record, "recordofselectedfiled");
                    // datarecord = { selectdata };
                    history.push({
                      pathname: `/settingsemail/edit/${record.Id}`,
                      state: carelabStat,
                    });
                  }
                }
              >
                Edit
              </Edit>
            </Space>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getEmailData();
  }, []);
  useEffect(() => {
    console.log(selectdata, "selectdsbvvbvb");
  }, [selectdata]);

  //   useEffect(() => {
  //     if (forEdit && previousValues === undefined) {
  //         let data = {
  //             analyzerId: CuId
  //         }
  //         dispatch(GetEmailServerDetails(data, (res) => {
  //             getControlFun(res[0]?.TestId)
  //         }))
  //     }
  // }, [])

  const getEmailData = () => {
    let data = {
      id: 0,
    };
    dispatch(
      GetEmailServerDetails(data, (val) => {
        console.log(data, "iam all data");
        console.log(val, "iam vals");
        setEmailSettingsDetails(val);
        // setunitList(val)
        setnewEmailDetails(val);
      })
    );
  };
  const handleSearch = (val) => {
    if (val === undefined || val === "") {
      setnewEmailDetails(setEmailSettingsDetails);
    } else {
      setnewEmailDetails(val);
    }
  };
  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle={"Email"}
          buttonTitle="Add Email Details"
          buttonOnClick={() =>
            history.push({
              pathname: "./settingsemail/addemail",
              state: carelabStat,
            })
          }
        />
      </div>
      <div className="tableisRes">
        <Table
          className="tableWidth"
          columns={columns}
          // dataReturn={handleSearch}
          dataSource={newEmailDetails}
        />
        {/* <EmailAdditionField datarecord={selectdata} /> */}
      </div>
    </>
  );
};

export default EmailRetrieve;
