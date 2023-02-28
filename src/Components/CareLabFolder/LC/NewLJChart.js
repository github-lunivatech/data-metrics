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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import CarelabFilter from "../../Common/CarelabFilter";
import PageHeader from "../../Common/pageHeader";
import { carelabStat, misStat } from "../../Common/StateList";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getControlSDMeanCVApi,
  getControlValueForLJApi,
} from "../../../services/qcService";

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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      // min: 0,
      ticks: {
        color: "red",
      },
    },
  },
};

const NewLJChart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [columnsData, setColumnsData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [sdMinMaxValue, setSdMinMaxValue] = useState({});
  const [sdValue, setSdValue] = useState([]);
  const [plottedValue, setPlottedValue] = useState([]);

  const columns = [
    {
      title: "QC Date",
      dataIndex: "EntryDate",
      key: "EntryDate",
      render: function (text) {
        return text.split("T")[0];
      },
    },
    {
      title: "Mean",
      dataIndex: "Mean",
      key: "Mean",
    },
    {
      title: "SD",
      dataIndex: "SD",
      key: "SD",
    },
    {
      title: "CV",
      dataIndex: "CV",
      key: "CV",
    },
    {
      title: "Control Value",
      dataIndex: "ControlValue",
      key: "ControlValue",
    },
  ];

  const dataBar = {
    labels,
    datasets: [
      {
        label: "Deviation",
        data: plottedValue,
        borderColor: ["#0361a1"],
        borderWidth: 3,
      },
      {
        label: "SD",
        data: sdValue,
        borderColor: ["#3efe82"],
        borderWidth: 3,
      },
      {
        label: "+1SD",
        data: sdMinMaxValue?.sdMax1,
        borderColor: ["#FFFF66"],
        borderWidth: 3,
      },
      {
        label: "+2SD",
        data: sdMinMaxValue?.sdMax2,
        borderColor: ["#f00"],
        borderWidth: 3,
      },
      {
        label: "+3SD",
        data: sdMinMaxValue?.sdMax3,
        borderColor: ["#db9f87"],
        borderWidth: 3,
      },

      {
        label: "-1SD",
        data: sdMinMaxValue?.sdMin1,
        borderColor: ["#FFFF66"],
        borderWidth: 3,
      },
      {
        label: "-2SD",
        data: sdMinMaxValue?.sdMin2,
        borderColor: ["#f00"],
        borderWidth: 3,
      },
      {
        label: "-3SD",
        data: sdMinMaxValue?.sdMin3,
        borderColor: ["#db9f87"],
        borderWidth: 3,
      },
    ],
  };

  const calculateSdMinMax = (mean, sd, arrayLen) => {
    let sdMax1 = 0,
      sdMax2 = 0,
      sdMax3 = 0,
      sdMin1 = 0,
      sdMin2 = 0,
      sdMin3 = 0;

    sdMax1 = mean + sd;
    sdMax2 = sdMax1 + sd;
    sdMax3 = sdMax2 + sd;

    sdMin1 = mean - sd;
    sdMin2 = sdMin1 - sd;
    sdMin3 = sdMin2 - sd;

    let newArray = {
      sdMax1: [],
      sdMax2: [],
      sdMax3: [],
      sdMin1: [],
      sdMin2: [],
      sdMin3: [],
    };
    for (let index = 0; index < arrayLen; index++) {
      newArray.sdMax1.push(sdMax1);
      newArray.sdMax2.push(sdMax2);
      newArray.sdMax3.push(sdMax3);

      newArray.sdMin1.push(sdMin1);
      newArray.sdMin2.push(sdMin2);
      newArray.sdMin3.push(sdMin3);
    }
    return newArray;
  };

  const calculateSD = (re) => {
    if (re.length > 0) {
      let labelPush = [],
        sdPush = [],
        plottedPush = [];

      re.forEach((ele) => {
        labelPush.push(ele.EntryDate.split("T")[0]);
        sdPush.push(ele.SD);
        plottedPush.push(ele.ControlValue);
      });

      const calculatedSd = calculateSdMinMax(re[0].Mean, re[0].SD, re.length);
      setLabels(labelPush);
      setSdValue(sdPush);
      setPlottedValue(plottedPush);
      setSdMinMaxValue(calculatedSd);
      setColumnsData(re);
    } else {
      setLabels([]);
      setSdValue([]);
      setPlottedValue([]);
      setSdMinMaxValue([]);
      setColumnsData([]);
    }
  };

  const returnFilterData = (res) => {
    let newData = {
      analyzerId: res.controlId,
      testid: res.testId,
      from: res.FromTo[0].format("YYYY-MM-DD"),
      to: res.FromTo[1].format("YYYY-MM-DD"),
    };
    dispatch(
      getControlSDMeanCVApi(newData, (re) => {
        calculateSD(re);
      })
    );
  };

  const div2PDF = (e) => {
    let input = window.document.getElementsByClassName("div2PDF")[0];
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(img, "png", 1, 2);
      pdf.save("ljchart.pdf");
    });
  };

  return (
    <>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="LJ Charts"
          buttonTitle="Add Test Control"
          buttonOnClick={() =>
            history.push({
              pathname: "/addtestcontrol",
              state: misStat,
            })
          }
          forCon={"Add Control"}
          forConButtonClick={() =>
            history.push({
              pathname: "/addcontroltest",
              state: misStat,
            })
          }
          forGroup={`Add Test`}
          forGroupButtonClick={() =>
            history.push({
              pathname: "/addcontroltesttest",
              state: misStat,
            })
          }
          forData={`Add Data`}
          forDataButtonClick={() =>
            history.push({
              pathname: "/addcontroldata",
              state: carelabStat,
            })
          }
        />
        <CarelabFilter
          returnFilterData={returnFilterData}
          showFromToDate={true}
          showTestControlList={true}
          showControlDetails={true}
          showLevel={true}
        />
      </div>
      {columnsData.length > 0 && (
        <div>
          <button onClick={(e) => div2PDF(e)}>Export</button>
        </div>
      )}
      <div className="financeCards">
        <div className="div2PDF">
          <Line options={options} data={dataBar} />
        </div>
      </div>
      <div className="lineTable financeCards">
        <div className="tableisRes">
          <Table columns={columns} dataSource={columnsData} />
        </div>
      </div>
    </>
  );
};

export default NewLJChart;
