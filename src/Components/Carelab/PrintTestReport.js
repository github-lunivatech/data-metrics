import React, { useEffect } from 'react';
import '../../assets/css/style.css'
import $ from 'jquery'
import { CheckerInfo, Checkers, CompanyInfo, mappingObject, PatientInfo, ReportSettings, SubTest, Test, TestGroup, TestPanel } from './mapper';
import NormalFormat from './carelabprintformat/NormalFormat';
import CrystalFormat from './carelabprintformat/CrystalFormat';

const PrintTestReport = (props) => {
    const splitter = props.location.pathname.split('/');
    const sampleIdSp = splitter[2];
    const fiscalYearSp = splitter[3];

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let reportType = params.get('q') !== null ? params.get('q') : 'normal';

    var mapData = function (from, to, mapper) {
        Object.keys(to).forEach(key => {
            var pMapper = mapper[key];
            if (!pMapper)
                to[key] = from[key];
            else
                to[key] = from[pMapper];
        });
    };

    var setBlogImage = function (img, blobData) {
        img.attr("src", "data:image/jpg;base64," + blobData);
    };

    var addSubTest = function (tst, test) {
        if (test.subtestId) {
            var subTest = tst.SubTests.find(x => x.SubTestId === test.subtestId);
            if (!subTest) {
                subTest = new SubTest();
                subTest.SubTestId = test.subtestId;
                subTest.TestSubType = test.TestSubType;
                subTest.SubResult = test.subresult;
                subTest.Designation = test.Designation;
                subTest.SubUnit = test.SubUnit;
                subTest.Range = test.Range;
                subTest.SubMethod = test.submethod;
                tst.SubTests.push(subTest);
            }
        }
    };

    var addTest = function (grp, test) {
        var tst = grp.Tests.find(x => x.TestName === test.Testname);
        if (!tst) {
            tst = new Test();
            // Object.keys(tst).forEach(key => {
            //     // $("."+key).html(pat[key]);
            //     tst[key] = test[key];
            //   }); 
            tst.TestName = test.Testname;
            tst.TestResult = test.TestResult;
            tst.CheckedBy = test.CheckedBy;
            tst.Units = test.Units;
            tst.Max = test.Max;
            tst.Method = test.Method;
            tst.Note = test.Note;
            grp.Tests.push(tst);
        }
        addSubTest(tst, test);
    };

    var addGroup = function (panel, test) {
        var grp = panel.TestGroups.find(x => x.GroupId === test.GroupId);
        if (!grp) {
            grp = new TestGroup();
            grp.GroupId = test.GroupId;
            grp.GroupName = test.GroupName;
            panel.TestGroups.push(grp);
        }
        addTest(grp, test);
    };
    var processCheckerList = function (data) {
        var checkerData = data.CheckerList[0];
        var checkers = new Checkers();
        checkers.CountChecker = function () {
            var counter = 0;
            if (this.FirstChecker) counter++;
            if (this.SecondChecker) counter++;
            if (this.ThirdChecker) counter++;
            return counter;
        };
        if (checkerData) {
            if (checkerData.FirstCheckerId) {
                checkers.FirstChecker = new CheckerInfo();
                checkers.FirstChecker.Id = checkerData.FirstCheckerId; //checkers.SecondChecker
                checkers.FirstChecker.Name = checkerData.FirstCheckerName
                checkers.FirstChecker.Designation = checkerData.FirstCheckerDesignation
                checkers.FirstChecker.RegNo = checkerData.FirstCheckerRegNo
                checkers.FirstChecker.DSignature = checkerData.FirstCheckerDS
            }

            if (checkerData.SecondCheckerId) {
                checkers.SecondChecker = new CheckerInfo();
                checkers.SecondChecker.Id = checkerData.SecondCheckerId;
                checkers.SecondChecker.Name = checkerData.SecondCheckerName
                checkers.SecondChecker.Designation = checkerData.SecondCheckerDesignation
                checkers.SecondChecker.RegNo = checkerData.SecondCheckerRegNo
                checkers.SecondChecker.DSignature = checkerData.SecondCheckerDS
            }

            if (checkerData.ThirdCheckerId) {
                checkers.ThirdChecker = new CheckerInfo();
                checkers.ThirdChecker.Id = checkerData.ThirdCheckerId;
                checkers.ThirdChecker.Name = checkerData.ThirdCheckerName
                checkers.ThirdChecker.Designation = checkerData.ThirdCheckerDesignation
                checkers.ThirdChecker.RegNo = checkerData.ThirdCheckerRegNo
                checkers.ThirdChecker.DSignature = checkerData.ThirdCheckerDS
            }
        }
        return checkers;
    };
    var processTestInfo = function (testData) {
        var testPanels = [];
        testData.forEach(test => {
            var testPanel = testPanels.find(x => x.Panel === test.Panel);
            if (!testPanel) {
                testPanel = new TestPanel();
                testPanel.PanelId = test.PanelId;
                testPanel.Panel = test.Panel;
                testPanels.push(testPanel)
            }
            addGroup(testPanel, test);
        });
        return testPanels;
    };

    var processApiData = function (data) {
        var settings = new ReportSettings();
        var pat = new PatientInfo();
        mapData(data.PatientDetails[0], pat, mappingObject.PatientMapper);
        Object.keys(pat).forEach(key => {
            $("." + key).html(pat[key]);
        });

        var com = new CompanyInfo();
        mapData(data.Table3[0], com, mappingObject.CompanyInfoMapper);
        if (com.CompanyHeaderLogo) {
            setBlogImage($("#logo"), com.CompanyHeaderLogo);
        }
        Object.keys(com).forEach(key => {
            $("." + key).html(com[key]);
        });

        if (settings.PrintWithoutHeader) {
            $(".page-header .headerHTML .row").addClass("hideOnPrint");
        }
        else {
            $(".page-header .headerHTML .row").removeClass("hideOnPrint");
        }

        var testPanels = processTestInfo(data.TestList);
        var panelTitle = $(".panel-title").html();
        var groupTitle = $(".group-title").html();
        var testTable = $(".test-table").html();
        var tblRow = $(testTable).find('tbody tr');
        var stestTable = $(".subtest-table").html();
        var stblRow = $(stestTable).find('tbody tr');
        var testNote = $(testTable).find('tfoot .TestNote');
        var subtestNote = $(testTable).find('tfoot .SubTestNote');

        testPanels.forEach(panel => {
            var pnl = $(panelTitle).clone();
            $(pnl).html(panel.Panel);
            $(".page-content").append(pnl);
            panel.TestGroups.forEach(group => {
                var grp = $(groupTitle).clone();
                $(grp).html(group.GroupName);
                $(".page-content").append(grp);
                var tbl = $(testTable).clone();
                var tblbody = $(tbl).find('tbody').html('');
                group.Tests.forEach(test => {
                    var row = $(tblRow).clone();
                    Object.keys(test).forEach(key => {
                        var ele = $(row).find("." + key);
                        $(ele).html(test[key]);
                    });
                    $(tblbody).append(row);
                    if (test.SubTests) {
                        test.SubTests.forEach(subTest => {
                            var srow = $(stblRow).clone();
                            Object.keys(subTest).forEach(skey => {
                                var sele = $(srow).find("." + skey);
                                $(sele).html(subTest[skey]);
                            });
                            $(tblbody).append(srow);
                            if (subTest.SubNote) {
                                var sNoteRow = $(subtestNote).clone();
                                var sNote = $(sNoteRow).find(".SubNote");
                                $(sNote).html(subTest.SubNote);
                                $(tblbody).append(sNoteRow);
                            }
                        });
                    }
                    if (test.Note) {
                        var tNoteRow = $(testNote).clone();
                        var tNote = $(tNoteRow).find(".Note");
                        $(tNote).html(test.Note);
                        $(tblbody).append(tNoteRow);
                    }
                });

                if (group.GroupNote) {
                    var footerNote = $(tbl).find("GroupNote");
                    // var tGroupNoteRow = $(footerNote).clone();
                    // var tGroupNote = $(tGroupNoteRow).find(".GroupNote");
                    // $(tGroupNote).html(test.Note);
                    // $(tblbody).append(tGroupNoteRow);
                    // var footerNote = $(tbl).find("GroupNote");
                    $(footerNote).html(group.GroupNote);
                }

                $(".page-content").append(tbl);
                if (settings.SeparatePageForDGroup)
                    $(".page-content").append('<div class="page"></div>');
            });

        });

        var checkers = processCheckerList(data);
        var checkerInfoTemplate = $(".checker-info").html();
        var createCheckerDiv = function (checker) {
            var checkerInfo = $(checkerInfoTemplate).clone();
            $(checkerInfo).find(".Name").html(checker.Name);
            $(checkerInfo).find(".Designation").html(checker.Designation);
            $(checkerInfo).find(".RegNo").html(checker.RegNo);
            var img = $("<img>");
            $(checkerInfo).find(".Signature").html(img);
            if (checker.DSignature) {
                setBlogImage($(img), checker.DSignature);
            }
            return checkerInfo;
        }

        if (checkers.FirstChecker) {
            var div = createCheckerDiv(checkers.FirstChecker);
            $(".Checkers").append(div);
        }
        else {
            $(".Checkers").append($(checkerInfoTemplate).clone());
        }

        if (checkers.SecondChecker) {
            var div2 = createCheckerDiv(checkers.SecondChecker);
            $(".Checkers").append(div2);
        }
        else {
            $(".Checkers").append($(checkerInfoTemplate).clone());
        }

        if (checkers.ThirdChecker) {
            var div3 = createCheckerDiv(checkers.ThirdChecker);
            $(".Checkers").append(div3);
        }
        else {
            $(".Checkers").append($(checkerInfoTemplate).clone());
        }


    }

    useEffect(() => {
        $(function () {
            $.get("https://lunivacare.ddns.net/CarelabDataMetricService_qc/Api/GetNormalReportByPatientId", { sampleId: sampleIdSp, fiscalyearId: fiscalYearSp })
                .done(function (data) {
                    processApiData(data);
                });

            // setTimeout(() => {
            //     window.print()
            //     window.close()
            // }, 1000)
        })
    }, [])

    const Components = {
        normal: NormalFormat,
        crystal: CrystalFormat,
    }

    return React.createElement(Components[reportType])
}
export default PrintTestReport