import React, { useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../assets/images/logo1.png'


const ErrorPage = () => {

 
  return (
    <ErrorPageContainer>
      <div className="top">
        <div className="left">
          <img src={logo} alt="" />
        </div>
        <span className='bar'>|</span>
        <div className="right">
          <h3>404 Page not found.</h3>
        </div>
      </div>


    </ErrorPageContainer>
  )
}

export default ErrorPage

const ErrorPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--primaryBackground);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.10 );
  .top{
    width: 500px;
    height: 200px;
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    background-color: var(--secondaryBackground);
    border-radius: 10px;
    .left{
      img{
        width: 55px;
      }
    }
    .right{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  
`
