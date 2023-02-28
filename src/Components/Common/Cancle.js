import { Popover } from 'antd'
import React from 'react'
import styled from 'styled-components'

const content = (
  <span>Cancel</span>
)

const Cancle = ({ onClick }) => {

  return (
    <CancleContainer>
      <Popover content={content}>
        <i className="icon-line-circle-cross1" onClick={onClick} ></i>
      </Popover>
    </CancleContainer>
  )
}

export default Cancle

const CancleContainer = styled.div`
  i{
    color: var(--primary);
    cursor: pointer;
    font-size: 16px;
  }
`