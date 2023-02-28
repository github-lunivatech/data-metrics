import React from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'antd'
import { inventoryStat } from '../Common/StateList'

const data = [
  {
    name: 'Reagent in Report',
    pathName: 'goodsin'
  },
  {
    name: 'Reagent Out reports',
    pathName: 'goodsout'
  },
  {
    name: 'Consumption Report',
    pathName: 'consumption'
  },
  {
    name: 'Stocks',
    pathName: 'stocks'
  },
  {
    name: 'Overall Report',
    pathName: 'inoutcon'
  },
  {
    name: 'Min Quantity Report',
    pathName: 'minquantityreport'
  },
  {
    name: 'Location Stock Report',
    pathName: 'locationstockreport'
  },

]

const Index = () => {
  return (

    <ReportContainer>
      <div className="maiTopContainer">
        <PageHeader pageTitle="Reports"></PageHeader>
      </div>
      <Row gutter={[16, 16]}>
        {
          data.map(e => (
            <Col sm={24} md={8} xs={24} lg={6} key={e.pathName}>
              <NavLink
                    to={{
                      pathname: `./reports/${e.pathName}`,
                      state: inventoryStat,
                    }}
                    pathname={e.pathName}
                  >
                    <div className="cButton"><span>{e.name}</span></div>
                  </NavLink>
            </Col>
          ))
        }

      </Row>

    </ReportContainer>
  )
}

export default Index

const ReportContainer = styled.div`
   .cButton{
    height: 120px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fefefe;
    box-shadow: 0 2px 22px 0 rgba( 31, 38, 135, 0.17 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    span{
      font-size: 16px;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      color: var(--titleTxt);
      i{
        font-size: 25px;
        color: var(--primary);
      }
    }
    
    @media(max-width: 768px){
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
      height: 80px;
    }
   
  }
`