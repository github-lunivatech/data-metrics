import React, { useState } from "react";
import NavBar from "../Components/Common/NavBar";
import SideNav from "../Components/Common/SideNav";
import styled from "styled-components";
import BottomNav from "../Components/Common/BottomNav";
import MobileNav from "../Components/Common/MobileNav";
import { Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { carelabStat, marketingStat } from "../Components/Common/StateList";
import CareLabNav from "../Components/Common/CareLabNav";
// https://nepal-weather-api.herokuapp.com/api/?place=all

const { Content, Footer } = Layout;
const date = new Date();

const AppLayout = (props) => {
  const [Value, setValue] = useState();
  const location = useLocation();

  const statePass = (val) => {
    setValue(val);
  };

  return (
    <MainAppContentComponentContainer>
      <Layout className="mainLayout" id="app-layout">
        <Layout>
          {props.showSider ? <SideNav statePass={statePass}></SideNav> : ""}

          <Layout className="main-app-layout">
            {props.showSider ? (
              <NavBar
                sideGo={Value === true ? "customContent2" : "customContent1"}
              ></NavBar>
            ) : (
              ""
            )}
            {props.showSider ? <MobileNav /> : ""}
            {props.showSider ? (
              <Content
                className={
                  Value === true ? "costomeContent2" : "costomeContent1"
                }
              >
                {props?.children}
              </Content>
            ) : (
              <Content className={"costomeContent3"}>{props?.children}</Content>
            )}
            {props.showSider ? (
              <Footer className="footer">
                <h3>
                  All rights reserved &copy;{" "}
                  <Link to="/aboutluniva">
                    {" "}
                    <span>Lunivatech Pvt. Ltd {date.getFullYear()} </span>
                  </Link>
                </h3>
              </Footer>
            ) : (
              ""
            )}

            {props.showSider ? (
              location.state === carelabStat ? (
                <CareLabNav />
              ) : (
                <BottomNav />
              )
            ) : (
              ""
            )}
            {props.showSider ? (
              location.state === marketingStat ? (
                <CareLabNav />
              ) : (
                <BottomNav />
              )
            ) : (
              ""
            )}
          </Layout>
        </Layout>
      </Layout>
    </MainAppContentComponentContainer>
  );
};

export default AppLayout;

const MainAppContentComponentContainer = styled.div`
  .mainLayout {
    min-height: 100vh;
  }
  .costomeContent1 {
    padding: 90px 0px 60px 220px;
    transition: 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    @media (max-width: 576px) {
      padding: 90px 10px 70px 10px;
    }
  }
  .costomeContent2 {
    padding: 90px 0px 60px 100px;
    transition: 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    @media (max-width: 576px) {
      padding: 90px 20px 70px 20px;
    }
  }
  .costomeContent3 {
    padding: 10px;
  }

  .ant-layout-content {
    /* margin-top: 75px; */
    /* margin-bottom: 30px; */
    /* @media(max-width: 800px){
      margin-top: 65px;
    }
    @media(max-width: 576px){
      margin-top: 65px;
    } */
  }

  .customContent1 {
    padding: 0px 0px 0px 220px;
    @media (max-width: 576px) {
      padding: 20px;
    }
  }
  .customContent2 {
    padding: 0px 0px 0px 100px;
    @media (max-width: 576px) {
      padding: 20px;
    }
  }

  .btnPrimary {
    margin-top: 25px;
    background-color: var(--secondary);
    color: var(--secondaryBackground);
    border-radius: 30px !important;
    min-height: 36px;
    display: flex;
    align-items: center;
    font-size: 25px;
    letter-spacing: 1.1px;
    font-weight: 400;
    border: 1px solid var(--secondary);
    &:hover {
      background-color: transparent;
      border: 1px solid var(--secondary);
      color: var(--secondary);
    }
  }
  @media (max-width: 576px) {
    .sideNav {
      display: none;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
    padding: 7px 50px;
    box-shadow: 10px 2px 22px 0 rgb(31 38 135 / 17%);
    h3 {
      color: #80808b;
      span {
        color: rgb(233, 91, 41);
      }
    }

    @media (max-width: 576px) {
      display: none;
    }
  }
`;
