import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/images/logo1.png'

const DataIsLoading = () => {
  return (
    <DataIsLoadingContainer className='fallback-container'>
      
      <img src={logo} alt=""  />
    </DataIsLoadingContainer>
  )
}

export default DataIsLoading

const DataIsLoadingContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #bbd9dd44;
  display: flex;
  justify-content: center;
  align-items: center;
  
`
