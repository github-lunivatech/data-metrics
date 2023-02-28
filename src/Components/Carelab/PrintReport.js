// print panel in different pages
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { careLabTestListApi } from "../../services/careLabService";

const PrintReport = (props) => {
  const { isPrint, handlePrintClose } = props;
  const dispatch = useDispatch();
  const [printJData, setPrintJData] = useState([]);

  const printReportHere = () => {
    createDataLayout();
    let newWindow = window.open();
    let newStyle = `
        <style>
        /* .introHead {
            position: fixed;
            top: 10%;
        } */
        table {
            width: 100%;
        }
        .introHead tr td {
            width: 50%;
        }
        .introHead tr td:last-child {
            text-align: right;
        }
        .panelName {
            color: #fff;
            text-align: center;
            background-color: gray;
        }
        #container {
            /* position: fixed;
            bottom: 10%;
            width: 100%; */
            display: flex;
            justify-content: space-between;
        }
        #container > div {
            width: 15%;
            border-top: 2px solid;
        }
        .pageBreaker {
            page-break-after: always;
        }
        
        .page-header, .page-header-space {
            height: 150px;
        }
        .page-footer, .page-footer-space {
            height: 60px;
        }
        .page-footer {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
          
        .page-header {
            position: fixed;
            top: 0;
            width: 100%;
        }

        .testTableHere tr{
            text-align: left;
        }

        .testTableHere thead tr, .groupHead {
            text-decoration: underline;
        }

        .groupHead {
            font-weight: bold;
            font-size: 17px;
        }

        .testTableHere tbody {
            font-size: 15px;
        }
        @media print {
            thead {
                display: table-header-group;
            }
            tfoot {
                display: table-footer-group;
            }
            
            body {
                margin: 0;
            }

            @page {
                margin-top: 4cm;
                margin-bottom: 2cm;
            }
        }
        </style>
        `;

    let topHeader = `
        <table class="introHead">
            <tbody>
                <tr>
                    <td>
                    <ul>
                    <li>Hello</li>
                    </ul>
                    <ul>
                    <li>Hello</li>
                    </ul>
                        <div>Sample ID: <strong></strong></div>
                        <div>Patient's Name: <strong></strong></div>
                        <div>Age: </div>
                        <div>Gender: </div>
                        <div>Referred By: </div>
                        <div>Requestor: </div>
                        <div>Contact No.: </div>
                        <div>Email ID: </div>
                    </td>
                    <td>
                        <div>Date of Collection: </div>
                        <div>Date of Registration: </div>
                        <div>Date of Reporting: </div>
                    </td>
                </tr>
            </tbody>
        </table>`;

    let panelFoot = `
        <div id="container">
            <div>
                <div>Name</div>
                <div>Specialization</div>
                <div>Number</div>
            </div>
            <div>
                <div>Name</div>
                <div>Specialization</div>
                <div>Number</div>
            </div>
            <div>
                <div>Name</div>
                <div>Specialization</div>
                <div>Number</div>
            </div>
        </div>
        `;

    let headAndFoot = `
        <div class="page-header">
            ${topHeader}
        </div>
        <div class="page-footer">
            ${panelFoot}
        </div>
        `;

    // margin_topClass
    let panTableStart = `
        <table class="">
            <thead>
                <tr>
                <td>
                    <div class="page-header-space"></div>
                </td>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
        `;

    let panelStart = "";
    printJData &&
      Object.entries(printJData).map((def) => {
        let panelName = def[0];
        let panelValue = def[1];
        let allPanData = `
            <div class="pageBreaker"><div class="panelName"><h2>${panelName}</h2></div>
            `;

        panelValue &&
          Object.entries(panelValue).map((pan) => {
            let groupName = pan[1][0][0]?.GroupName;
            let groupValue = pan[1];

            let groupHead =
              panelName !== groupName
                ? `<div class="groupHead">${groupName}</div>`
                : "";

            let groupTableAll = `
                <table class="testTableHere">
                    <thead>
                        <tr>
                            <th class="testNameHead">Test</th>
                            <th class="testNameResult">Result</th>
                            <th class="testNameRange">Reference</th>
                            <th class="testNameUnit">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

            let tableRowCreate = "";
            groupValue &&
              groupValue.map((gou) => {
                if (gou.length > 1) {
                  let testNameHeader = gou[0]?.Testname;

                  let subHeader =
                    gou[0]?.subtestId !== null
                      ? `<tr>
                                <th>${testNameHeader}</th>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>`
                      : "";
                  tableRowCreate += subHeader;

                  gou.map((tesLi) => {
                    let isSubtest = tesLi?.subtestId !== null;
                    let rowHere = `
                                <tr class=${isSubtest ? "subTestClass" : ""}>
                                    ${
                                      isSubtest
                                        ? `<td>${tesLi?.TestSubType}</td>`
                                        : `<th>${tesLi?.Testname}</th>`
                                    }
                                    <td>
                                    ${
                                      isSubtest
                                        ? tesLi?.subresult !== null
                                          ? tesLi?.subresult
                                          : ""
                                        : tesLi?.TestResult !== null
                                        ? tesLi?.TestResult
                                        : ""
                                    }
                                    </td>
                                    <td>
                                    ${isSubtest ? tesLi?.Range : tesLi?.Max}
                                    </td>
                                    <td>${tesLi?.Units}</td>
                                </tr>`;

                    tableRowCreate += rowHere;
                  });
                } else {
                  let newRowHere = `
                        <tr>
                            <th>${gou[0]?.Testname}</th>
                            <td>${
                              gou[0]?.TestResult != null
                                ? gou[0]?.TestResult
                                : ""
                            }</td>
                            <td>${gou[0]?.Max}</td>
                            <td>${gou[0]?.Units}</td>
                        </tr>
                        `;
                  tableRowCreate += newRowHere;
                }
              });

            groupTableAll += tableRowCreate;
            groupTableAll += `
                    </tbody>
                </table>
                `;

            allPanData += groupHead + groupTableAll;
          });

        allPanData += "</div>";

        panelStart += allPanData;
      });

    panTableStart += panelStart;

    panTableStart += `
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <div class="page-footer-space"></div>
                    </td>
                </tr>
            </tfoot>
        </table>`;

    newWindow.document.body.innerHTML = newStyle + headAndFoot + panTableStart;

    // setTimeout(function () {
    //     newWindow.print();
    //     newWindow.close();
    //   }, 300);

    handlePrintClose(false);
  };

  useEffect(() => {}, [printJData]);

  const createDataLayout = () => {
    let fullDa = {
      sampleid: 112,
      fiscalyear: 1,
    };
    dispatch(
      careLabTestListApi(fullDa, (res) => {
        let newArray = {};
        let newJSON = {};
        let newSub = {};

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

        setPrintJData(newArray);
        return newArray;
      })
    );
  };

  useEffect(() => {
    if (isPrint === true) {
      printReportHere();
    }
  }, [isPrint]);

  return <></>;
};

export default PrintReport;
