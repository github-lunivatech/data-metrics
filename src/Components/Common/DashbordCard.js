import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DashbordCard = (props) => {
  return (
    <DashbordCardContainer>
      <a href={props.path}>
        <div className="cardContent">
          <span className='iconStyle'><i className={props.icon}></i></span>
          <span className='textStyle'>
            {props.name}
          </span>
        
        </div>
      </a>
    </DashbordCardContainer>
  )
}

export default DashbordCard

const DashbordCardContainer = styled.div`


  
`