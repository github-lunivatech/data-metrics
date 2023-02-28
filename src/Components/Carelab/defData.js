import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { careLabTestListApi } from "../../services/careLabService";
import { Markup } from "interweave";
import SubTestModal from "./SubTestModal";
import NoteModal from "./NoteModal";
// import ImageModal from "./ImageModal";
import VerifyCheckModal from "./VerifyCheckModal";
import { Button, message, notification } from "antd";
import { todaydate } from "../Common/TodayDate";
import { tokenString } from "../Common/HandleUser";
import { insertVerifyPatientReport } from "../../services/datametricService";

const DefData = (props) => {
  const {
    visible,
    setClickedId,
    newFiscalId,
    allDataRet,
    handleOk,
    isDataVerified,
    isMaleFemale,
  } = props;
  const dispatch = useDispatch();
  const [newArData, setNewArData] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [showSubModal, setshowSubModal] = useState(false);
  const [showNoteModal, setshowNoteModal] = useState(false);
  const [viewNotes, setviewNotes] = useState("");
  const [showVerifyModal, setshowVerifyModal] = useState(false);
  const controls = useRef([]);
  const ref = useRef();

  const handleEnterTest = () => {
    setshowSubModal(true);
  };

  const handleCancel = () => {
    setshowSubModal(false);
  };

  const handleNoteModal = (e) => {
    // data-value
    setviewNotes(e.target.value);
    setshowNoteModal(true);
  };

  const handleNoteCancel = () => {
    setshowNoteModal(false);
  };

  const verifyAllData = () => {
    let isAllDataVerified = false;
    let allVerButtonData = document.querySelectorAll(".panelStart button");
    for (let index = 0; index < allVerButtonData.length; index++) {
      const element = allVerButtonData[index];
      // let singleEleData = element.closest('tr').children[1].children[0].value
      // let allSingleData = JSON.parse(element.dataset.all)

      isAllDataVerified = true;
    }
    isDataVerified(isAllDataVerified);
  };

  useEffect(() => {
    if (handleOk === true) {
      verifyAllData();
    }
  }, [handleOk]);

  useEffect(() => {
    setNewArData([]);
    if (visible === true) {
      let fullDa = {
        sampleid: setClickedId,
        fiscalyear: newFiscalId,
      };
      dispatch(
        careLabTestListApi(fullDa, (res) => {
          let newArray = {};
          let newJSON = {};
          let newSub = {};

          allDataRet(res);

          for (const key in res) {
            if (Object.hasOwnProperty.call(res, key)) {
              const ele = res[key];

              let panelName = ele?.Panel;
              let groupName = `${ele?.Panel}_${ele?.GroupName}`;
              let subTypeName = `${ele?.Testname}?q=&${ele?.Panel}_${ele?.GroupName}`;

              if (!newArray[panelName]) {
                newArray[panelName] = [];
              }

              if (!newJSON[groupName]) {
                newJSON[groupName] = [];
              }

              //subtype
              if (subTypeName !== null && !newSub[subTypeName]) {
                newSub[subTypeName] = [];
              }

              newSub[subTypeName] = [...newSub[subTypeName], ele];
              //subtype

              // newJSON[groupName] = [...newJSON[groupName], ele];
            }
          }

          for (const key in newSub) {
            if (Object.hasOwnProperty.call(newSub, key)) {
              let spKey = key.split("?q=&")[1];
              const element = newSub[key];
              newJSON[spKey].push(element);
            }
          }

          for (const key in newJSON) {
            if (Object.hasOwnProperty.call(newJSON, key)) {
              let spKey = key.split("_")[0];
              const element = newJSON[key];
              newArray[spKey].push(element);
            }
          }

          setNewArData(newArray);
        })
      );
    }
  }, [visible]);

  const verifyOne = (e) => {
    let eTarget = e.target.closest("td").children[0].dataset;
    let allData = JSON.parse(eTarget.all);
    let testResultValue = e.target.closest("tr").children[1].children[0].value;

    let newData = {
      Id: 0,
      RecordId: allData.RecordId,
      CreatedBy: tokenString.token.UId,
      CreatedOn: todaydate,
      Remarks: `Verified by ${tokenString.token.username}, user id ${tokenString.token.UId}`,
      IsApproved: tokenString.token.UId,
      IsVerifier: true,
      IsActive: true,
      IsCurrent: true,
    };

    dispatch(
      insertVerifyPatientReport(newData, (res) => {
        if (res?.SuccessMsg == true) {
          // message.success(res?.Message)
          notification.success({
            duration: 3,
            placement: "topRight",
            message: res?.Message,
            rtl: true,
          });
        } else {
          // message.error("Some error occured. Please try again");
          notification.error({
            duration: 3,
            placement: "topRight",
            message: "Some error occured. Please try again",
            rtl: true,
          });
        }
      })
    );

    // verifyShowModal()
  };

  const testResultChange = (e) => {
    let testValue = e.target.value;
    let closeTr = e.target.closest("tr");
    closeTr.removeAttribute("class");
    let ranger = closeTr.children[3].children[0].innerHTML;
    let formattedresult = "";
    if (ranger != undefined && ranger != null && ranger != "") {
      ranger = ranger
        .replace("<br>", "</br>")
        .replace("&lt;", "<")
        .replace("&gt;", ">");
      formattedresult = IsOutOfRange(testValue, ranger);
    }
    if (formattedresult !== "") closeTr.classList.add(formattedresult);
  };

  const IsOutOfRange = (inputText, rangeValue) => {
    // isMaleFemale
    var splitter = "</br>";

    var newLineCount = rangeValue.split(splitter).length - 1;
    if (newLineCount == 0) {
      return highLowFinder(rangeValue, inputText);
    } else if (newLineCount == 1) {
      var multiRange = rangeValue.split("</br>");
      var currentRange = multiRange[0].trim();
      if (multiRange[0].indexOf(isMaleFemale) < 0) {
        currentRange = multiRange[1].trim();
      }
      return highLowFinder(currentRange.split(":")[1], inputText);
    }
    return inputText;
  };

  const highLowFinder = (range, result) => {
    try {
      var sp = "\0";

      if (range.indexOf("-") >= 0) sp = "-";
      else if (range.indexOf("<") >= 0) sp = "<";
      else if (range.indexOf(">") >= 0) sp = ">";

      if (sp != "\0") {
        var resultvalue = Number(result);
        var testRange = range.split(sp);
        if (testRange[0] == undefined || testRange[0] == null)
          testRange[0] = "0";
        var FirstRange = Number(testRange[0]);
        var SecondRange = Number(testRange[1]);
        if (sp == "-") {
          if (resultvalue > SecondRange) {
            return "high";
          }
          if (resultvalue < FirstRange) {
            return "low";
          }
        } else if (sp == "<" && resultvalue > 0) {
          if (resultvalue > SecondRange) {
            return "high";
          }
        } else if (sp == ">" && resultvalue > 0) {
          if (resultvalue < SecondRange) {
            return "low";
          }
        } else {
          return "InCorrectFormat";
        }
        return result;
      }
    } catch (e) {
      return "Error" + e;
    }
  };

  const retNoteModal = (res) => {};

  const verifyShowModal = () => {
    setshowVerifyModal(true);
  };

  const verfiyCheckCancel = (res) => {
    setshowVerifyModal(false);
  };

  const retUp = (res) => {};

  const enterPressed = (res) => {
    if (res.keyCode == 13) {
      console.log(res);
      // const index = controls.current.indexOf(res.target);
      // const next = controls.current[index + 1];
      // next && next.focus();
    }
  };

  return (
    <>
      {newArData &&
        Object.entries(newArData).map((def) => {
          let panelName = def[0];
          let panelValue = def[1];
          return (
            <div className="panelStart">
              <div className="panelClass">{panelName}</div>
              <hr />
              {panelValue &&
                Object.entries(panelValue).map((pan, index) => {
                  let groupName = pan[1][0][0]?.GroupName;
                  let groupValue = pan[1];
                  return (
                    <>
                      {panelName !== groupName ? (
                        <>
                          <div className="groupHead">{groupName}</div>
                          <hr />
                        </>
                      ) : (
                        ""
                      )}
                      <table className="testTable">
                        <thead>
                          <tr>
                            <th className="testNameHead">Test Name</th>
                            <th className="testNameResult">Test Result</th>
                            <th className="testNameUnit">Units</th>
                            <th className="testNameRange">Range</th>
                            <th className="testNameNote">Note</th>
                            <th className="testNameAction">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupValue &&
                            groupValue.map((gou) => {
                              if (gou.length > 1) {
                                let testNameHeader = gou[0]?.Testname;
                                return (
                                  <>
                                    {gou[0]?.subtestId !== null ? (
                                      <tr>
                                        <th>{testNameHeader}</th>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    ) : (
                                      ""
                                    )}

                                    {gou.map((tesLi) => {
                                      let isSubtest = tesLi?.subtestId !== null;
                                      return (
                                        <tr
                                          className={
                                            isSubtest ? "subTestClass" : ""
                                          }
                                        >
                                          {isSubtest ? (
                                            <td>{tesLi?.TestSubType}</td>
                                          ) : (
                                            <th>{tesLi?.Testname}</th>
                                          )}
                                          <td className="inputter">
                                            {tesLi?.subtestId === null &&
                                            (tesLi?.IsCulture === true ||
                                              tesLi?.SubGroupId === true) ? (
                                              <Button
                                                onClick={handleEnterTest}
                                                tabIndex={-1}
                                              >
                                                Enter Test
                                              </Button>
                                            ) : (
                                              <input
                                                type={"text"}
                                                defaultValue={
                                                  isSubtest
                                                    ? tesLi?.subresult !== null
                                                      ? tesLi?.subresult
                                                      : ""
                                                    : tesLi?.TestResult !== null
                                                    ? tesLi?.TestResult
                                                    : ""
                                                }
                                                onChange={testResultChange}
                                                onKeyDown={enterPressed}
                                              />
                                            )}
                                          </td>
                                          <td>{tesLi?.Units}</td>
                                          <td className="ranger">
                                            {
                                              <Markup
                                                content={
                                                  isSubtest
                                                    ? tesLi?.Range
                                                    : tesLi?.Max
                                                }
                                              />
                                            }
                                          </td>
                                          <td>
                                            {<Markup content={tesLi?.Note} />}
                                          </td>
                                          <td>
                                            <Button
                                              tabIndex={-1}
                                              data-all={JSON.stringify(tesLi)}
                                              onClick={verifyOne}
                                            >
                                              Verify
                                            </Button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </>
                                );
                              } else {
                                return (
                                  <tr>
                                    <th>{gou[0]?.Testname}</th>
                                    <td className="inputter">
                                      {gou[0]?.IsCulture === true ||
                                      gou[0]?.SubGroupId === true ? (
                                        // <button onClick={handleEnterTest}>Enter Test</button>
                                        <Button onClick={handleEnterTest}>
                                          Enter Test
                                        </Button>
                                      ) : (
                                        <input
                                          ref={ref}
                                          type={"text"}
                                          defaultValue={
                                            gou[0]?.TestResult !== null
                                              ? gou[0]?.TestResult
                                              : ""
                                          }
                                          onChange={testResultChange}
                                          onKeyDown={enterPressed}
                                        />
                                      )}
                                    </td>
                                    <td>{gou[0]?.Units}</td>
                                    <td className="ranger">
                                      {<Markup content={gou[0]?.Max} />}
                                    </td>
                                    <td>
                                      {gou[0]?.Note !== "" &&
                                      gou[0]?.Note !== null ? (
                                        <Markup content={gou[0]?.Note} />
                                      ) : (
                                        // <Button onClick={handleNoteModal} data-value={gou[0]?.Note}>Add Notes</Button>
                                        <button
                                          tabIndex={-1}
                                          onClick={handleNoteModal}
                                          value={gou[0]?.Note}
                                        >
                                          Add Notes
                                        </button>
                                      )}
                                    </td>
                                    <td>
                                      <Button
                                        onClick={verifyOne}
                                        data-all={JSON.stringify(gou[0])}
                                        tabIndex={-1}
                                      >
                                        Verify
                                      </Button>
                                      {/* <button tabIndex={-1} data-all={JSON.stringify(gou[0])} onClick={verifyOne}>Verify</button> */}
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                        </tbody>
                      </table>
                    </>
                  );
                })}
            </div>
          );
        })}
      <SubTestModal visible={showSubModal} handleCancel={handleCancel} />
      <NoteModal
        visible={showNoteModal}
        handleNoteModal={handleNoteCancel}
        viewNotes={viewNotes}
        retNoteModal={retNoteModal}
      />
      <VerifyCheckModal
        visible={showVerifyModal}
        verfiyCheckCancel={verfiyCheckCancel}
        retUp={retUp}
      />
    </>
  );
};

export default DefData;
