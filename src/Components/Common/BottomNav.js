import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Popover } from 'antd';
import { inventoryStat } from './StateList';

const handleLogout = () => {
  localStorage.clear()
}



const content = (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    color: 'red'
  }}>
    {/* <Link to=''>change passowrd</Link> */}
    <Link to='/login' onClick={handleLogout}>Logout</Link>
  </div>
);

const BottomNav = () => {

  return (
    <BottomNavContainer>
      <li>
        <Link to={{
          pathname: '/',
          state: inventoryStat
        }}><i className='icon-line2-home'></i></Link>
      </li>
      <li>
        <Link to={{
          pathname: '/reports/minquantityreport',
          state: inventoryStat
        }}><i className='icon-line-bell'></i></Link>
      </li>
      <li>
        <Link to={{
          pathname: '/settings',
          state: inventoryStat
        }}><i className='icon-line2-settings'></i></Link>
      </li>
      <li>
        <Popover placement="top" content={content} trigger="click">
          <i className='icon-user1'></i>
        </Popover>
      </li>

    </BottomNavContainer>
  )
}

export default BottomNav

const BottomNavContainer = styled.div`
  display: none;
  
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  li{
    list-style: none;
    i{
      color: #fefefe;
      font-size: 18px;
    }
  }
  @media(max-width: 500px){
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
  background-color:var(--primary);
  padding: 15px 40px;
  }
`