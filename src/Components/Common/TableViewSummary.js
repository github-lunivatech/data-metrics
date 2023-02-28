import { Col, Row } from "antd";
import styled from "styled-components";

const TableViewSummary = (props) => {
  const { reqDatas } = props;
  let id = "";
  let no = "";

  if (reqDatas.length > 0) {
    id = reqDatas[0].patId;
    no = reqDatas[0].BillNo;
  }
  //   console.log(reqDatas, "mydatata");
  // requestorList
  return (
    <NewSummaryViewContainer>
      <h4>Bill Summary</h4>
      <Row justify="space-between">
        <Col>
          <li>Id:{id}</li>
          <li>BillNo:{no}</li>
        </Col>
        <Col>
          <li>Bill Amount Paid:{} </li>
          <li>Bill Collection Amount:{} </li>
        </Col>
      </Row>
    </NewSummaryViewContainer>
  );
};

export default TableViewSummary;

const NewSummaryViewContainer = styled.div`
  li {
    list-style: none;
  }
`;
