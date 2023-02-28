import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Popover } from 'antd';
import NotificationContent from './NotificationContent';
import { useDispatch } from 'react-redux'
import { getItemNearApi } from '../../services/itemNewItemService';

const Notification = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  const getData = () => {
    const pushedArr = []
    dispatch(getItemNearApi(value => {
      value.forEach(ele => {
        pushedArr.push(ele);
      })
      setTableData(pushedArr)
    }))
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <NotificationContainer>
      <Popover
        placement="bottom"
        content={tableData.length > 0 ?
          <NotificationContent data={tableData} /> : 'no new notification'
        }
        trigger="click">
        <i className='icon-line-bell'></i> {tableData.length > 0 ? <span className='notiCount'>{tableData.length}</span> : ''}
      </Popover>
    </NotificationContainer>
  )
}

export default Notification

const NotificationContainer = styled.div`
  border-radius: 50%;
  i{
    color: var(--primary);
    width: 32px;
    height: 32px;
    border: 2px solid var(--primary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  .notiCount{
    position: absolute;
    color: #ffffff;
    background: #d3726e;
    width: 1rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 50%;
    top: 2%;
    height: 1rem;
    left: 10%;
    font-size: 10px;
    font-weight: bold;
  }
  &:hover{
      /* background-color: transparent; */
      background-color: var(--primary);
      color: #fefefe;
      box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
      i{
        color: #fefefe;
      }
    }
`