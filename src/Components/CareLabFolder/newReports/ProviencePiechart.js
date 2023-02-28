import { Button, Col, Row } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProviencePieMale from "./ProviencePieMale";
import ProviencePieFemale from "./ProviencePieFemale";
const ProviencePiechart = () => {
  const ref = useRef(null);
  // const downloadImage = useCallback(() => {
  //   const link = document.createElement("div2PDF");
  //   console.log(link, "linkdocumentofcreateelement");
  //   link.download = "chart.png";
  //   link.href = ref.current.toBase64Image();
  //   link.click();
  // }, []);

  return (
    <>
      <PieChartsProvience>
        {/* <Row justify="end" gutter={[16, 16]}>
          <Button
            onClick={(e) => downloadImage(e)}
            className="export-btn-charts"
            type="primary"
          >
            Export charts
          </Button>
        </Row> */}
        <Row gutter={[16, 16]}>
          {/* <div className="div2PDF"> */}
          <Col sm={12} md={12} xs={24} lg={12} xl={12}>
            <ProviencePieMale />
          </Col>
          {/* </div> */}

          {/* <Col sm={24} md={24} xs={24} lg={12} xl={12}> */}
          <Col sm={12} md={12} xs={24} lg={12} xl={12}>
            <ProviencePieFemale />
          </Col>
        </Row>
      </PieChartsProvience>
    </>
  );
};

export default ProviencePiechart;
const PieChartsProvience = styled.div`
  .export-btn-charts {
    float: right;
  }
  /* #canvas-container {
    height: 60vh;
    width: 60vw;
    position: relative;
  } */

  /* @media (min-width: 768px) {
    #canvas-container {
      height: auto;
      width: auto;
    }
  } */
`;
