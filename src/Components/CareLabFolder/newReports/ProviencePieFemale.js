import React, { useEffect, useState } from "react";
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
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getGeographyWiseMISReports } from "../../../services/careLabService";
import { DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { Button } from "antd";

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
      text: " Female Patient Ratio According to District",
      font: { size: 20 },
    },
  },
};

const labels = ["sun ", "mon", "tues", "wed", "thurs"];

const ProviencePieFemale = () => {
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [municipalityId, setMunicipalityId] = useState(0);
  const [reportTypeId, setReportTypeId] = useState();
  const [districtlabels, setDistrictlabels] = useState([]);

  const saveCanvas = () => {
    const canvasSave = document.getElementById("chartsidfemale");
    canvasSave.toBlob(function (blob) {
      saveAs(blob, "chart.png");
    });
  };
  const [datas, setData] = useState({
    labels,
    label: true,
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
        let maleCount = [];
        let femaleCount = [];
        let Provincename = [];
        let districtname = [];

        for (const vars of val) {
          let storMale = 0;
          let storeFemale = 0;
          let districtlabels = "";

          districtname.forEach((element) => {
            if (element == vars.DistrictName) storMale = 111;
          });
          if (storMale == 111) continue;

          districtname.forEach((element) => {
            if (element == vars.DistrictName) storeFemale = 111;
          });
          if (storeFemale == 111) continue;

          // districtname.push(vars.DistrictName);

          // femaleCount.push(vars.Female);
          // Provincename.push(vars.ProvinceName);

          val.forEach((element) => {
            if (element.DistrictName == vars.DistrictName) {
              console.log(element.DistrictName);
              storMale += element.Male;
              storeFemale += element.Female;
            }
            if (element.Female < 1) {
              console.log(element.DistrictName, "femlaeelement0");
            }
          });
          val.forEach((element) => {
            console.log(element, "newelementval");
          });
          maleCount.push(storMale);
          districtname.push(vars.DistrictName);
          console.log(districtname);
          setDistrictlabels(districtname);
          femaleCount.push(storeFemale);
        }
        console.log(maleCount, "before");
        setData({
          labels: districtname,
          datasets: [
            {
              label: "Female Patient",
              data: femaleCount,
              borderColor: "rgb(85,123,132)",
              // backgroundColor: ChartColor,
              backgroundColor: [
                "#0070ff",
                "#24cb1c",
                "#d72e3d",
                "#249d3d",
                "#ffb90c",
                "#1698af",
                "#616a72",
              ],
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
        <Button className="download-icons" onClick={saveCanvas}>
          <DownloadOutlined />
        </Button>
        <Pie
          className="financeCards"
          id="chartsidfemale"
          data={datas}
          options={options}
        />
      </PieChartsProvience>
    </>
  );
};

export default ProviencePieFemale;
const PieChartsProvience = styled.div`
  .download-icons {
    float: right;
  }
`;
