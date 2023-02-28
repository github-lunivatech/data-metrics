import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { inventoryStat } from './StateList';

const NotificationContent = ({ data }) => {
  const history = useHistory();
  return (
    <NotificationContentContainer>
      {
        
        data.slice(0,5).map(e => (
          <div key={e.ItemName.toString()} className="card" onClick={()=>history.push({
            pathname: '/reports/minquantityreport',
            state: inventoryStat
          })}>
            <div className="icon">
              <i className='icon-exclamation-sign'></i>
            </div>
            <div className="content">
              <div className="h3">{e.ItemName}</div>
              <p>Min qty:{e.MinQty} Remaining Count: {e.RemainingCount} </p>
            </div>
          </div>
        ))
      }

      <a onClick={()=>history.push({
        pathname: '/reports/minquantityreport',
        state: inventoryStat
      })}>See more</a>
    </NotificationContentContainer>
  )
}

export default NotificationContent

const NotificationContentContainer = styled.div`
  width: 300px;
  .card{
    /* border-left: 4px solid var(--primary); */
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    border-right: 1px solid var(--primary);
    padding: 0 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: relative;
    z-index: 100;
    overflow: hidden;
    
    .icon{
      font-size: 30px;
      color: #ffc107cc;
    }
   
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 0%;
      height: 100%;
      z-index: -1;
      /* transition: width 0.3s; */
      transition: width cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
      
    }
    &:hover{
      border-right: 3px solid var(--primary);
      /* background-color: var(--primaryBackground); */
      
      &::after{
        background-color: var(--primaryBackground);
        right: 0;
        width: 100%;
       
      }
    }
  }
`