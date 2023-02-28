import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
// import SerchBar from './SerchBar'
import UserBar from "./UserBar";
import Notification from "./Notification";

const NavBar = (props) => {
  const { sideGo } = props;
  return (
    <NavBarContainer>
      <Row justify="space-between">
        <Col>
          {/* <SerchBar></SerchBar> */}
          <div className="titleHeading">
            <h2 className={sideGo} style={{ color: "var(--primary)" }}>
              Luniva 360 LIMS
              {/* Luniva 360 LIMS PPHL Bagmati */}
            </h2>
          </div>
        </Col>

        <Col className="costomeCol">
          <Notification />
          <UserBar></UserBar>
        </Col>
      </Row>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  /*  padding: 20px; */
  padding: 15px;
  cursor: pointer;
  background-color: var(--secondaryBackground);

  position: fixed;
  z-index: 99;
  width: 100%;
  box-shadow: 0 2px 22px 0 rgb(31 38 135 / 17%);

  .titleHeading {
    @media (max-width: 800px) {
      display: none;
    }
  }

  @media (max-width: 500px) {
    display: none;
  }
  .costomeCol {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;
