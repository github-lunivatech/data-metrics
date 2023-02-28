export var PatientInfo = function () {
    return {
        ClinicalCode: "",
        PatientName: "",
        Age: "",
        Gender: "",
        ContactNo: "",
        ReferredBy: "",
        RequestedBy: "",
        LabNo: "",
        SampleReceived: "",
        ReportingDate: "",
        DateOfBirth: "",
        PAN: "",
        Reg_No: ""
    };
};

export var CompanyInfo = function () {
    return {
        CompanyHeaderLogo: "",
        CompanyName: "",
        CompanyAddress: "",
        CompanyContactNo: "",
        CompanyEmail: "",
        CompanyWebSite: "",
        IsHeaderImage: false,
        ClinicalNote: "",
        CompanyFax: "",
        Id: "",
        RegisterDate: "",
        CompanyTPIN: ""
    };
};

export var CheckerInfo = function () {
    return { Name: "", Designation: "", RegNo: "", DSignature: "" }
};

export var Checkers = function () {
    return {
        CountChecker: function () {
            var counter = 0;
            if (this.FirstChecker) counter++;
            if (this.SecondChecker) counter++;
            if (this.ThirdChecker) counter++;
            return counter;
        },
        FirstChecker: null,
        SecondChecker: null,
        ThirdChecker: null
    }
}

export var TestPanel = function () {
    return {
        Panel: "",
        TestGroups: []
    };
};

export var TestGroup = function () {
    return {
        GroupId: "",
        GroupName: "",
        GroupNote: "",
        Tests: []
    };
};

export var Test = function () {
    return {
        TestName: "",
        TestResult: "",
        CheckedBy: "",
        Units: "",
        Max: "",
        Method: "",
        Note: "",
        SubTests: [],
    };
};

export var SubTest = function () {
    return {
        SubTestId: "",
        TestSubType: "",
        SubResult: "",
        Designation: "",
        SubUnit: "",
        Range: "",
        SubMethod: "",
        SubNote: ""
    };
};

export var ReportSettings = function () {
    return {
        SeparatePageForDGroup: true,
        PrintWithoutHeader: true
    };
};



export var TestInfo = function () {
    return {
        "subtestId": null,
        "GroupId": 1,
        "RecordId": 5,
        "GroupName": "Complete Blood Count",
        "Testname": "Total Leucocyte count(TC)",
        "Method": "Cell Counter",
        "Max": "4000-11000",
        "TestResult": null,
        "TestSubType": null,
        "subresult": null,
        "Range": null,
        "submethod": null,
        "CheckedBy": null,
        "Designation": null,
        "RegNo": null,
        "PanId": 115,
        "Panel": "HEMATOLOGY REPORT",
        "D_group": 1,
        "Units": "cells/cumm",
        "DigId": 1,
        "SubUnit": "",
        "Note": null,
        "Specimen": "WB EDTA(2ml)",
        "IsCulture": false,
        "SubGroupId": false
    }
}

export var mappingObject = {
    PatientMapper: {
        "PatientName": "FirstName",
        "Gender": "Sex",
        "RequestedBy": "Requestor",
        "Reg_No": "Nrl_Reg_No",
        "ReportingDate": "ResultDate",
        "SampleReceived": "Date"
    },
    CompanyInfoMapper: {
        "CompanyHeaderLogo": "CompanyLogo"
    }
};