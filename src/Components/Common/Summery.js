import { Col, Row } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Summery = () => {
  return (
    <SummeryContainer>
      <h4>Bill Summery</h4>
      <Row justify='space-between'>
        <Col>
          <li>sample no: </li>
          <li>Price: </li>
          <li>Discount Amount: </li>
          <li>Total Price: </li>
        </Col>
        <Col>
          <li>Bill no: </li>
          <li>Amount Paid: </li>
          <li>Amount Remaning: </li>
          <li>Payment Type: </li>
        </Col>
      </Row>
    </SummeryContainer>
  )
}

export default Summery

const SummeryContainer = styled.div`
  li{
    list-style: none;
  }
`
