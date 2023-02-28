import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { MenuRoute } from "../Data/MenuRoute";
import imgOne from "../assets/images/logobig1.png";
import { Col, Row } from "antd";
import { quotes } from "../Data/quotesData";
import bkg from "../assets/images/svg.png";
import day from "../assets/images/day.jpg";
import night from "../assets/images/night.jpg";
import { inventoryStat } from "../Components/Common/StateList";

const DashBoardContainer = () => {
  const data = MenuRoute;
  const token = JSON.parse(localStorage.getItem("userData"));
  const [randomElement, setrandomElement] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  // const cardImgBkg = useMemo(() => day);

  const [date, setDate] = useState(new Date());
  const [cardBkg, setcardBkg] = useState();
  const daysNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const monthsNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  // const location = useLocation();
  // console.log(location.pathname, "this si spathat name");

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setDate(new Date());
    const temp = date.getHours;
    temp >= 18 || temp < 6 ? setcardBkg("night") : setcardBkg("day");
  }

  return (
    <DashbordContainer>
      <div className="welcome">
        <Row gutter={[16, 16]}>
          <Col sm={24} md={16} xs={24} lg={16}>
            <div className="right maiTopContainer">
              <h3> Welcome back {token.username}</h3>
              <p>
                <span>
                  <i className="icon-quote-left1"></i>
                </span>{" "}
                {randomElement}{" "}
                <span>
                  <i className="icon-quote-right1"></i>
                </span>
              </p>
            </div>
          </Col>
          <Col sm={24} md={8} xs={24} lg={8}>
            <div className="left maiTopContainer">
              <img src={imgOne} alt="" />
            </div>
          </Col>
        </Row>
      </div>
      <Row gutter={[16, 16]}>
        <Col sm={24} md={8} xs={24} lg={6}>
          <div className={`dContainer ${cardBkg}`}>
            <div className="detail ">
              <span>{daysNames[date.getDay()]}</span>
              <h2>
                {date.getHours()} : {date.getMinutes()}
              </h2>
              <p>
                {date.getFullYear()} {monthsNames[date.getMonth()]}{" "}
                {date.getDate()}{" "}
              </p>
            </div>
          </div>
        </Col>

        <Col sm={24} md={16} xs={24} lg={18}>
          <Row gutter={[16, 16]}>
            {data.map((e) => (
              <>
                {e.key !== "dashbord" ? (
                  <Col sm={24} md={12} xs={12} lg={12} xl={8}>
                    <NavLink
                      to={{
                        pathname: e.path,
                        state: inventoryStat,
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
                ) : (
                  ""
                )}
              </>
            ))}
          </Row>
        </Col>
      </Row>

      {/* </div> */}
    </DashbordContainer>
  );
};

export default DashBoardContainer;

const DashbordContainer = styled.div`
.ant-row {
  margin-left: unset !important;
  margin-right: unset !important;
}

.welcome{
  display: flex;
  h3{
    color: #fefefe;
    font-size: 30px;
    @media(max-width: 800px) {
      font-size: 22px;
    }
  }
  p{
    color: #e7e4e4;
    font-size: 18px;
    
    @media(max-width: 800px) {
      font-size: 16px;
    }
    span{
      i{
        font-size: 20px;
        color: rgb(233,91,41);
      }
    }
  }
  .right{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    padding: 20px 40px;
    background-color: var(--primary);
    background-image: url(${bkg});
    background-size: cover;
    @media(max-width: 800px) {
      padding: 10px;
      justify-content: center;
    }
  }
  .left{
    width: 100%;
    height: 200px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  
    img{
      width: 100%;
    }
    @media(max-width: 800px) {
    }
  }
  @media(max-width: 800px) {
    padding: 10px;
  }
  @media(max-width: 576px) {
    display: none;
  }
}


.botContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 25px;
  width: 100%;
  
  @media(max-width: 500px){
    padding: 0px;
    justify-content: center;
    gap: 15px;
    margin-bottom: 50px;
  }
}
  
  
  .cButton{
    height: 120px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #fefefe;
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    span{
      font-size: 16px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--titleTxt);
      i{
        font-size: 25px;
        color: var(--primary);
      }
    }
    
    @media(max-width: 768px){
      display: flex;
      flex-direction: column;
      span{
      font-size: 16px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      margin-right: 10px;
      i{
        font-size: 25px;
      }
    }
    }
    @media(max-width: 500px){
      // height: 80px;
      text-align: center;
    }
   
  }

  
 
  
  .dContainer{
    height: 255px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background-size: cover;
    background-position:center;
    border-radius: 10px;
    box-shadow:  0 0 0 2px rgba(123, 124, 126, 0.123);
    
    }
    
  }
  .day{
    background-image: url(${day});
    .detail{
      position: absolute;
      z-index: 20;
      background: rgba( 255, 255, 255, 0.1 );
      backdrop-filter: blur( 1px );
      -webkit-backdrop-filter: blur( 1px );
      top: 0;
      left: 0;
      right: 0;
      bottom:0 ;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      h2{
        font-size: 35px;
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 0px;
        padding: 0;
      }
      span{
        font-size: 24px;
        text-transform: capitalize;
        color: #232325;
        margin: 0px;
        padding: 0;
      }
      p{
        font-size: 16px;
        color: rgb(233,91,41);
        margin: 0px;
        padding: 0;
      }
    }
  
  .night{
    background-image: url(${night});
    .detail{
      position: absolute;
      z-index: 20;
      background: rgba( 255, 255, 255, 0.1 );
      backdrop-filter: blur( 1px );
      -webkit-backdrop-filter: blur( 1px );
      top: 0;
      left: 0;
      right: 0;
      bottom:0 ;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
      h2{
        font-size: 35px;
        font-weight: 600;
        color: #fefefe;
        margin-bottom: 0px;
        padding: 0;
      }
      span{
        font-size: 30px;
        text-transform: capitalize;
        color: #c8c8dd;
        margin: 0px;
        padding: 0;
      }
      p{
        font-size: 16px;
        color: rgb(233,91,41);
        margin: 0px;
        padding: 0;
      }
    }
  }
`;
