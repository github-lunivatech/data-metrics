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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chData } from "../../../Data/chartStData";
import PageHeader from "../../Common/pageHeader";
import { carelabStat, misStat } from "../../Common/StateList";
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import CarelabFilter from "../../Common/CarelabFilter";
import {
  getControlValueForLJApi,
  getListOfControlWiseSDApi,
} from "../../../services/qcService";
import { useDispatch } from "react-redux";

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
      min: 0,
      ticks: {
        // callback: function(val, index, ticks) {
        //   console.log(val, index, ticks, this);
        //   return index % 2 === 0 ? this.getLabelForValue(val) : '';
        // },
        type: "category",
        reverse: true,
        color: "red",
      },
    },
  },
};

const LC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [plottedSd, setplottedSd] = useState([]);
  const [plottedAverage, setplottedAverage] = useState([]);
  const [labels, setlabels] = useState([]);
  const [sdMin1, setSdMin1] = useState([]);
  const [sdMin2, setSdMin2] = useState([]);
  const [sdMin3, setSdMin3] = useState([]);
  const [sdMax1, setSdMax1] = useState([]);
  const [sdMax2, setSdMax2] = useState([]);
  const [sdMax3, setSdMax3] = useState([]);
  const [columnsData, setColumnsData] = useState([]);

  const newCh = chData;

  const columns = [
    {
      title: "QCDate",
      dataIndex: "QCDate",
      key: "QCDate",
      render: function (text) {
        return text.split("T")[0];
      },
    },
    {
      title: "AverageValue",
      dataIndex: "AverageValue",
      key: "AverageValue",
    },
    {
      title: "ControlValue",
      dataIndex: "ControlValue",
      key: "ControlValue",
    },
  ];

  function calculateSdMinMax(newCh) {
    var avg = 0 /*average value*/,
      sd1s = 0,
      sd2s = 0,
      sd1min = 0,
      sd2min = 0,
      sdmin1 = 0,
      sdmin2 = 0,
      sdmin3 = 0,
      sdmax1 = 0,
      sdmax2 = 0,
      sdmax3 = 0;

    sdmin2 = parseFloat(newCh[0].ControlValue);
    sdmax2 = sdmin2;

    newCh.forEach((val) => {
      if (sdmax2 < parseFloat(val.ControlValue)) {
        sdmax2 = parseFloat(val.ControlValue);
      }

      /*   to find minimum deviation */
      if (sdmin2 > parseFloat(val.ControlValue)) {
        sdmin2 = parseFloat(val.ControlValue);
      }

      sdmax3 = parseFloat(val.IIISDMax);
      sdmin3 = parseFloat(val.IIISDMin);

      avg = val.AverageValue;

      sd1s = val.ISDMax;
      sd2s = parseFloat(val.IISDMax);
      //sd2s = (sd2s<0) ? sd2s-2 : sd2s + 2;

      sd1min = val.ISDMin;
      sd2min = parseFloat(val.IISDMin);
    });

    sdmax2 = sdmax2 <= 0 ? sdmax2 - 4.0 : sdmax2 + 4.0;
    sdmax1 = sdmax2 - 5.0;
    sdmin2 = sdmin2 <= 0 ? sdmin2 - 4.0 : sdmin2 + 4.0;
    sdmin1 = sdmin2 + 5.0;

    let newSdMin1 = [],
      newSdMin2 = [],
      newSdMax1 = [],
      newSdMax3 = [],
      newSdMax2 = [],
      newSdMin3 = [];

    for (let index = 0; index < newCh.length; index++) {
      newSdMin1.push(sdmin1);
      newSdMin2.push(sdmin2);

      newSdMax1.push(sdmax1);
      newSdMax2.push(sdmax2);

      newSdMax3.push(sdmax3);
      newSdMin3.push(sdmin3);
    }
    setSdMin1(newSdMin1);
    setSdMin2(newSdMin2);

    setSdMax1(newSdMax1);
    setSdMax2(newSdMax2);

    setSdMax3(newSdMax3);
    setSdMin3(newSdMin3);
  }

  const dataBar = {
    labels,
    datasets: [
      {
        label: "Deviation",
        data: plottedSd,
        borderColor: ["#0361a1"],
        borderWidth: 3,
      },
      {
        label: "Average",
        data: plottedAverage,
        borderColor: ["#3efe82"],
        borderWidth: 3,
      },
      {
        label: "+1",
        data: sdMax1,
        borderColor: ["#FFFF66"],
        borderWidth: 3,
      },
      {
        label: "+2",
        data: sdMax2,
        borderColor: ["#f00"],
        borderWidth: 3,
      },
      {
        label: "+3",
        data: sdMax3,
        borderColor: ["#db9f87"],
        borderWidth: 3,
      },
      {
        label: "-1",
        data: sdMin1,
        borderColor: ["#FFFF66"],
        borderWidth: 3,
      },
      {
        label: "-2",
        data: sdMin2,
        borderColor: ["#f00"],
        borderWidth: 3,
      },
      {
        label: "-3",
        data: sdMin3,
        borderColor: ["#db9f87"],
        borderWidth: 3,
      },
    ],
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

  const returnFilterData = (res) => {
    let newData = {
      analyzerId: res.controlId,
      testId: res.testId,
      from: res.FromTo[0].format("YYYY-MM-DD"),
      to: res.FromTo[1].format("YYYY-MM-DD"),
    };
    dispatch(
      getControlValueForLJApi(newData, (re) => {
        if (re.length > 0) {
          let newLabel = [],
            newAvg = [],
            newSD = [];
          setColumnsData(re);
          re.forEach((ele) => {
            newLabel.push(ele.QCDate.split("T")[0]);
            newSD.push(ele.ControlValue);
            newAvg.push(ele.AverageValue);
          });
          setplottedSd(newSD);
          setplottedAverage(newAvg);
          setlabels(newLabel);
          calculateSdMinMax(re);
        } else {
          setColumnsData([]);
          setplottedSd([]);
          setplottedAverage([]);
          setlabels([]);
          setSdMin1([]);
          setSdMin2([]);

          setSdMax1([]);
          setSdMax2([]);

          setSdMax3([]);
          setSdMin3([]);
        }
      })
    );
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
              state: misStat,
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

export default LC;
