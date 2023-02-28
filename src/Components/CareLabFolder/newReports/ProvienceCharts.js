import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChartColor } from "../../Common/ChartColor";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement,
  Title,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getGeographyWiseMISReports } from "../../../services/careLabService";
import { Button, Col, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  Title
);

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Patient Ratio According to District",
      font: { size: 25 },
    },
  },
};

const labels = ["sun ", "mon", "tues", "wed", "thurs"];

const Proviencecharts = () => {
  const ref = useRef(null);
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [reportTypeId, setReportTypeId] = useState();

  const saveCanvas = () => {
    const canvasSave = document.getElementById("barchartid");
    canvasSave.toBlob(function (blob) {
      saveAs(blob, "chart.png");
    });
  };
  // const downloadImage = useCallback(() => {
  //   const link = document.createElement("a");
  //   link.download = "chart.png";
  //   link.href = ref.current.toBase64Image();
  //   link.click();
  // }, []);
  const [datas, setData] = useState({
    labels,
    datasets: [
      {
        label: "Male",
        data: [],
        borderColor: ["#0361a1"],
        borderWidth: 3,
      },
      {
        label: "Female",
        data: [],
        borderColor: ["#3efe82"],
        borderWidth: 3,
      },
    ],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let datadate = {
      fromdates: "2022-01-01", //val[0].format("YYYY-MM-DD"),
      todate: "2022-12-30",
    };
    let data = {
      provinceid: stateId ? stateId : 0,
      districtid: districtId ? districtId : 0,
      municipalityId: municipalityId ? municipalityId : 0,
      fromdate: datadate.fromdates,
      todate: datadate.todate,
      reportTypeId: reportTypeId ? reportTypeId : 2,
    };
    dispatch(
      getGeographyWiseMISReports(data, (val) => {
        console.log("data", data, val, "val");
        console.log(val, "value ho");
        let maleval = 0;
        let femaleval = 0;
        val.forEach(
          (element) => {
            if (element.DistrictId == 1) {
              maleval += element.Male;
              femaleval += element.Female;
              // console.log(maleval, "maleval");
            }
            console.log(maleval, "finalmaleval");
            console.log(femaleval, "femalefinalval");
          }

          // console.log(element.Male, "valforeachelement");
          // console.log(element.Female, "valforfemale");
        );
        var maleCount = [];
        var femaleCount = [];
        var Provincename = [];
        var districtname = [];

        for (const vars of val) {
          var storMale = 0;
          var storeFemale = 0;

          districtname.forEach((element) => {
            // console.log(element, "element of district name");
            if (element == vars.DistrictName) storMale = 111;
          });
          if (storMale == 111) continue;

          districtname.forEach((element) => {
            if (element == vars.DistrictName) storeFemale = 111;
          });
          if (storeFemale == 111) continue;

          districtname.push(vars.DistrictName);

          // femaleCount.push(vars.Female);
          Provincename.push(vars.ProvinceName);

          val.forEach((element) => {
            if (element.DistrictName == vars.DistrictName) {
              console.log(element.DistrictName, "elementsdistrictname");
              storMale += element.Male;
              storeFemale += element.Female;
            }
          });
          maleCount.push(storMale);
          femaleCount.push(storeFemale);
        }
        console.log(maleCount, "before");
        console.log(femaleCount, "femalecount");

        setData({
          labels: districtname,
          datasets: [
            {
              label: "Male Patient",
              data: maleCount,
              borderColor: "rgb(85,123,132)",
              backgroundColor: "#3dad6f",
            },

            {
              label: "Female Patient",
              data: femaleCount,
              backgroundColor: "#2b4d41",
            },
          ],
        });
        console.log("ARRDATA", maleCount, femaleCount);
      })
    );
  }, []);

  return (
    <>
      <PieChartsProvience>
        <Row justify="end" gutter={[16, 16]}>
          <Button className="download-icons" onClick={saveCanvas}>
            <DownloadOutlined />
          </Button>
        </Row>

        <Row justify="space-around" gutter={[16, 16]}>
          <Col lg={24} md={24} sm={24} xs={24} className="financeCards">
            <Bar id="barchartid" ref={ref} data={datas} options={options} />
          </Col>
        </Row>
      </PieChartsProvience>
    </>
  );
};

export default Proviencecharts;
const PieChartsProvience = styled.div`
  .export-btn-charts {
    float: right;
  }
  @media (min-width: 500px) {
  }
`;
