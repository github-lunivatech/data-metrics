import React from "react";
import { ChartColor } from "../Common/ChartColor";
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
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Col, Row } from "antd";

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
};

const DoughnutChart = (props) => {
  const data = props.data;
  const labels = props.labels;
  const dataDo = {
    labels,
    datasets: [
      {
        label: "financeData",
        backgroundColor: ChartColor,
        data: props.data,
        borderColor: ["rgba(255, 255, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const total = props.data.reduce((partialsum, a) => partialsum + a, 0);

  return (
    <DoughnutContainer>
      <div className="financeCards">
        <h3>{props.title}</h3>
        <Doughnut options={options} data={dataDo} />

        <div className="">
          <Row justify="space-between" gutter={[10, 10]}>
            <Col lg={10}>
              <div>
                <div className="refererename">
                  <h4 className="paymenttype">Payment Type</h4>
                </div>

                {labels.map((item) => (
                  <div>
                    <span className="item-span">{item}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <h4>Amount</h4>
                {data.map((item) => (
                  <div>
                    <span className="item-span">{item}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </DoughnutContainer>
  );
};

export default DoughnutChart;

const DoughnutContainer = styled.div`
  .dTable {
    padding: 10px 20px 0px 0px;
    border: 1px solid #b9b9df;
    border-radius: 6px;
    margin-top: 10px;
    li {
      list-style: none;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;

      span {
        color: var(--primary);
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
        text-align: right;
      }
      h6 {
        font-size: 14px;
        color: #232325;
        margin-bottom: 0px;
      }
    }
  }
  .paymenttype {
    white-space: nowrap;
  }
`;
