import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/images/lunivalogo.png'

const AboutLuniva = () => {
  return (
    <AboutLunivaContainer>
      <div className="maiTopContainer">
        <div className='contenet'>
          <div className="left">
            <img src={logo} alt="" />
          </div>
          <div className="right">

            <ul>
              <li><h3>Luniva 360 LIMS</h3></li>
              <li>
                <i className='icon-line-phone'></i>
                <span>01-5909085</span>
              </li>
              <li>
                <i className='icon-mail'></i>
                <span>lunivatech@gmail.com</span>
              </li>
              <li>
                <i className='icon-location'></i>
                <span>Lalitpur, Nepal</span>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </AboutLunivaContainer>
  )
}

export default AboutLuniva

const AboutLunivaContainer = styled.div`
  .contenet{
    display: flex;
    justify-content: center;
    padding: 50px 0;
    .left{
      width: 300px;
      img{
        width: 100%
      }
    }
    .right{
      padding: 20px;
      h3{
        color: var(--primary);
        font-size: 30px;
        letter-spacing: 2px;
        font-weight: 500;
      }
      ul{
        li{
          list-style: none;
          display: flex;
          gap: 20px;
          margin-bottom: 5px;
          cursor: pointer;
          i{
            color: #fefefe;
            background-color: var(--primary);
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
          }
        }
      }
    }
  }
`