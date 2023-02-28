import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Popover } from "antd";
import { carelabStat, marketingStat, misStat } from "./StateList";

const handleLogout = () => {
  localStorage.clear();
};

const content = (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      color: "red",
    }}
  >
    {/* <Link to=''>change passowrd</Link> */}
    <Link to="/login" onClick={handleLogout}>
      Logout
    </Link>
  </div>
);

const CareLabNav = () => {
  return (
    <BottomNavContainer>
      <li>
        <Link
          to={{
            pathname: "/caredashboard",
            state: carelabStat,
          }}
        >
          <i className="icon-line2-home"></i>
        </Link>
      </li>
      <li>
        <Link
          to={{
            pathname: "/carelab",
            state: carelabStat,
          }}
        >
          <i className="icon-line-file"></i>
        </Link>
      </li>
      <li>
        <Link
          to={{
            pathname: "/lcchart",
            // state: carelabStat,
            state: misStat,
          }}
        >
          <i className="icon-stack2"></i>
        </Link>
        <Link
          to={{
            pathname: "/sms",
            // state: carelabStat,
            state: marketingStat,
          }}
        >
          <i className="icon-stack2"></i>
        </Link>
      </li>

      <li>
        <Popover placement="top" content={content} trigger="click">
          <i className="icon-user1"></i>
        </Popover>
      </li>
    </BottomNavContainer>
  );
};

export default CareLabNav;

const BottomNavContainer = styled.div`
  display: none;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  li {
    list-style: none;
    i {
      color: #fefefe;
      font-size: 18px;
    }
  }
  @media (max-width: 500px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 100;

    justify-content: space-between;
    align-items: center;
    background-color: var(--primary);
    padding: 15px 40px;
  }
`;
