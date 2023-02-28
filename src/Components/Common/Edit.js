import { Popover } from 'antd'
import React from 'react'
import styled from 'styled-components'

const content=(
  <span>Edit</span>
)

const Edit = ({onClick}) => {
  
  return (
    <EditContainer>
      <Popover content={content}>
        <i className="icon-edit2" onClick={onClick} ></i>
      </Popover>
    </EditContainer>
  )
}

export default Edit

const EditContainer = styled.div`
  i{
    color: var(--primary);
    cursor: pointer;
    font-size: 16px;
  }

`
