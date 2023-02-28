import { Table } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PrintFile = () => {
  const [tableHead, settableHead] = useState([]);

  const tableData = useSelector((state) => state.printdata.printdata)
  const date = useSelector((state) => state.printdata.date)

  const createTableHead = () => {
    if (tableData.length !== 0) {
      let tableKeys = Object.keys(tableData[0]);
      let data = []
      tableKeys.forEach(ele => {
        data.push({
          title: ele,
          dataIndex: ele,
          key: ele,
        })
      })

      settableHead(data);
    }
  }
  useEffect(() => {
    createTableHead()
    setTimeout(function () {
      window.print();
      // window.close();
    }, 100);
  }, [])



  return (
    <PritFileContainer>
      <h3 className="title">Referer Report</h3>
      <div className="headingContent">
        <div className="details">
          <p>
            <span className='detailsTitle'>Refered By: </span>{tableData[0]['Refer Name']}
          </p>
        </div>
        <div className="date">
          <p>
            <span className="detailsTitle">From: </span>{date.fromdate} - <span className="detailsTitle">To: </span>{date.todate}
          </p>
        </div>
      </div>
      <Table
        pagination={false}
        columns={tableHead}
        dataSource={tableData}
      />
    </PritFileContainer>
  )

}

export default PrintFile;

const PritFileContainer = styled.div`
  .title{
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: capitalize;
    text-align: center;
  }
  .headingContent{
    display: flex;
    justify-content: space-between;
  }
  .detailsTitle{
    font-size: 16px;
    text-transform: capitalize;
    font-weight: 600;
  }
  thead.ant-table-thead th:first-child, tbody.ant-table-tbody td:first-child {
    display:none
  }
`
