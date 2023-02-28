import {
  Alert,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { carelabStat } from "../../Common/StateList";
import Edit from "../../Common/Edit";
import PageHeader from "../../Common/pageHeader";
import {
  getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi,
  UpdateCriticalValueAndCutoffTimeofTests,
} from "../../../services/Tat";

const TestList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [testList, setTestList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTest, setEditingTest] = useState();
  const [reRender, setReRender] = useState(false);

  const columns = [
    {
      title: "Test Id",
      dataIndex: "Id",
      key: "Id",
    },
    // {
    //   title: "Test Code",
    //   dataIndex: "TestCode",
    //   key: "TestCode",
    // },

    {
      title: "Test Name",
      dataIndex: "TestName",
      key: "TestCode",
    },

    {
      title: "Specimen",
      dataIndex: "Specimen",
      key: "Specimen",
    },

    {
      title: "Method",
      dataIndex: "Method",
      key: "Method",
    },

    {
      title: "Units",
      dataIndex: "Units",
      key: "Units",
    },

    // {
    //   title: "LISCOde",
    //   dataIndex: "LISCOde",
    //   key: "LISCOde",
    // },

    // {
    //   title: "AnalyzerId",
    //   dataIndex: "AnalyzerId",
    //   key: "AnalyzerId",
    // },

    {
      title: "Critical Values",
      dataIndex: "CriticalValues",
      key: "CriticalValues",
    },

    {
      title: "CutOfftime",
      dataIndex: "CutOfftime",
      key: "CutOfftime",
    },

    {
      title: "CutOffTimeInHrs",
      dataIndex: "CutOffTimeInHrs",
      key: "CutOffTimeInHrs",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Edit onClick={() => editTest(record)}>Edit</Edit>
        </Space>
      ),
    },
  ];

  const getTestData = () => {
    dispatch(
      getListListOfTestToInsertUpdateCutoffTimeAndCriticalValuesApi((val) => {
        setTestList(val);
        console.log("test list", testList);
      })
    );
  };

  useEffect(() => {
    getTestData();
  }, [reRender]);
  //===========For Modal==================

  const editTest = (record) => {
    setReRender(false);
    setIsEditing(true);
    setEditingTest({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingTest(null);
  };

  const onFinish = (values) => {
    // console.log(editingTest, values);
    console.log(typeof editingTest.CriticalValues);
    let data = {
      testId: editingTest.Id,
      criticalValue: editingTest.CriticalValues,
      cutofftime: editingTest.CutOfftime,
      cutoffinHrs: editingTest.CutOffTimeInHrs,
    };
    dispatch(
      UpdateCriticalValueAndCutoffTimeofTests(data, (res) => {
        if (res?.SuccessMsg === true) {
          notification.success({
            duration: 3,
            placement: "topRight",
            message: `Data has been updated`,
            rtl: true,
          });

          // setisbutdis(false)
          // onReset()
        } else {
          notification.warning({
            duration: 3,
            placement: "topRight",
            message: `Error`,
            rtl: true,
          });
          // setisbutdis(false)
        }
      })
    );
  };

  return (
    <TestControlContainer>
      <div className="maiTopContainer">
        <PageHeader
          // buttonTitle='Add Test Control'
          pageTitle="View Test List"
          // buttonOnClick={() => history.push({
          //     pathname: 'addcontroltest',
          //     state: carelabStat
          // })}
        />
      </div>
      <div className="tableisRes">
        <Table className="tableWidth" columns={columns} dataSource={testList} />
        <Modal
          title="Edit Test"
          okText="Save"
          visible={isEditing}
          onCancel={() => {
            resetEditing();
            setIsEditing(false);
          }}
          onOk={() => {
            setReRender(true);
            resetEditing();
            onFinish();
          }}
        >
          Test Id:{""}
          <Input
            value={editingTest?.Id}
            onChange={(e) => {
              setEditingTest((prev) => {
                return { ...prev, Id: e.target.value };
              });
            }}
            disabled="disabled"
          />
          Critical Value:{""}
          <br />
          <Input
            style={{ width: "100%" }}
            value={editingTest?.CriticalValues}
            placeholder="enter value in number"
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setEditingTest((prev) => {
                  return {
                    ...prev,
                    CriticalValues: e.target.value,
                  };
                });
              }
            }}
          />
          <br />
          Cutoff Time:{""}
          <br />
          <Input
            style={{ width: "100%" }}
            value={editingTest?.CutOfftime}
            onChange={(e) => {
              setEditingTest((prev) => {
                return { ...prev, CutOfftime: e.target.value };
              });
            }}
          />
          <br />
          Cutoff Time in Hrs:{""}
          <br />
          <Input
            style={{ width: "100%" }}
            placeholder="enter value in number"
            value={editingTest?.CutOffTimeInHrs}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value)))
                setEditingTest((prev) => {
                  return { ...prev, CutOffTimeInHrs: e.target.value };
                });
            }}
          />
        </Modal>
      </div>
    </TestControlContainer>
  );
};

export default TestList;

const TestControlContainer = styled.div``;
