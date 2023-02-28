import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import loadlogo from '../../assets/images/logosmall1.png';

const MobileNav = () => {
  return (
    <MobileNavContainer>
      <NavLink to="/afterlogin">
        <div className="logo">
          <img src={loadlogo} alt="" />
        </div>
        <div className="userIcon">
        </div>
      </NavLink>
    </MobileNavContainer>
  )
}

export default MobileNav

const MobileNavContainer = styled.div`
  display: none;
  /* padding: 8px 15px; */
  padding: 15px;

  background-color: #fefefe;
  /* position: relative; */
  position: fixed;
  width: 100%;
  z-index: 99;
  box-shadow: 0 2px 22px 0 rgb(31 38 135 / 17%);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  
  @media(max-width: 500px){
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
      width: 40px;
      img{
        width: 100%;
      }
    }
  }
  
`