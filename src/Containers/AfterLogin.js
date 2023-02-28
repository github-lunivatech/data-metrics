import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AfterLoginData } from "../Data/MenuRoute";
import imgOne from "../assets/images/logobig1.png";
import { CARELAB_LINK } from "../constants/url";

const AfterLogin = () => {
  const history = useHistory();

  const data = AfterLoginData;
  const token = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    console.log(token, "from token");
    if (token === null) {
      history.push("/login");
      return;
    }
  }, []);

  return (
    <DashbordContainer>
      <div className="logo">
        <img src={imgOne} alt="" />
      </div>

      <div className="options">
        <Row gutter={[16, 16]} wrap>
          {data.map((e) => (
            <>
              <Col sm={24} md={12} xs={12} lg={12} xl={8}>
                <NavLink
                  to={{
                    pathname: e.path,
                    state: e.statePath,
                  }}
                  key={e.name}
                >
                  <div className="cButton">
                    <span>
                      <i className={e.icon}></i>{" "}
                    </span>
                    <span>{e.name}</span>
                  </div>
                </NavLink>
              </Col>
            </>
          ))}
          <Col sm={24} md={12} xs={12} lg={12} xl={8}>
            <a href={CARELAB_LINK} target={"_blank"} key={"redirectOther"}>
              <div className="cButton">
                <span>
                  <i className={"icon-lab"}></i>{" "}
                </span>
                <span>Lab</span>
              </div>
            </a>
          </Col>
        </Row>
      </div>
    </DashbordContainer>
  );
};

export default AfterLogin;

const DashbordContainer = styled.div`
  height: 100%;
  padding-bottom: 26px;
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  /* background: #f9f9f9; */

  .logo {
    width: 500px;
    height: auto;
    margin: 50px auto;

    img {
      width: 80%;
    }

    @media (max-width: 800px) {
      width: 300px;
      margin: 20px 0;
    }
  }
  .options {
    width: 90%;
  }
  .cButton {
    height: 75px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #fefefe;
    box-shadow: 0 2px 22px 0 rgba(31, 38, 135, 0.17);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    span {
      font-size: 20px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--titleTxt);
      i {
        font-size: 25px;
        color: var(--primary);
      }
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      span {
        font-size: 10px;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        margin-right: 10px;
        i {
          font-size: 25px;
        }
      }
    }
    @media (max-width: 500px) {
      // height: 80px;
      text-align: center;
    }
  }
`;
