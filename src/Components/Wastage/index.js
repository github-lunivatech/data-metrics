import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../Common/pageHeader'
import { Space, Table, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import { getWastageApi } from '../../services/wastageService'
import ReportChart from '../Common/ReportChart'
import { ChartColor } from '../Common/ChartColor'
// import Edit from '../Common/Edit'
import Cancle from '../Common/Cancle'
import { todaydate } from '../Common/TodayDate'
import { inventoryStat } from '../Common/StateList'



const Index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [newTableData, setnewTableData] = useState([]);
  const [label, setLabel] = useState([]);
  const [wastage, setWastage] = useState([]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'WId',
      key: 'wastageId',
      // fixed: 'left',
    },
    {
      title: 'Reagent Name',
      dataIndex: 'ItemName',
      key: 'itemName'
    },
    {
      title: 'Reagent Wastage Amount',
      dataIndex: 'WastageAmount',
      key: 'WastageAmount',
      render: (text, record) => (
        `${text} ${record.Unit !== null ? record.Unit : ''}`
      )
    },
    {
      title: 'Reason',
      dataIndex: 'Reason',
      key: 'Reason'
    },
    {
      title: 'Remarks',
      dataIndex: 'Remarks',
      key: 'Remarks'
    },
    {
      title: 'Is Active',
      dataIndex: 'IsActive',
      key: 'IsActive',
      render: (text) => {
        let retText = 'Inactive'
        let retColor = 'red'
        if (text === true) {
          retText = 'Active'
          retColor = 'green'
        }
        return <Tag color={retColor}>{retText}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Cancle
            onClick={() => history.push({
              pathname: `./wastage/edit/${record.WId}/${record.CreatedDate}`,
              state: inventoryStat
            })}
          >
            Cancel
          </Cancle>
        </Space>
      )
    }
  ]

  const getWastage = (data) => {
    dispatch(getWastageApi(data, (val) => {
      setTableData(val)
      setnewTableData(val)
      let pushedArr = []
      let pushedWastage = []
      val.forEach(ele => {
        pushedArr.push(ele?.ItemName)
        pushedWastage.push(ele?.WastageAmount)
      })
      setLabel(pushedArr);
      setWastage(pushedWastage);
    }))
  }

  useEffect(() => {
    let data = {
      fromdate: todaydate,
      todate: todaydate,
    }
    getWastage(data)
  }, [])

  const dateRet = (val) => {
    let data = {
      fromdate: val[0].format("YYYY-MM-DD"),
      todate: val[1].format("YYYY-MM-DD"),
    }
    getWastage(data);
  }

  const labels = label;
  const dataDo = {
    labels,
    datasets: [
      {

        label: 'Wastage',
        backgroundColor: ChartColor,
        data: wastage,
        borderColor: [
          'rgba(255, 255, 132, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };
  const dataBar = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Wastage',
        backgroundColor: 'rgb(53, 162, 235)',
        data: wastage,
        borderWidth: 2
      },
    ],
  };
  const handleSearch = (val) => {
    if (val === undefined || val === '') {
      setnewTableData(setTableData)
    } else {
      setnewTableData(val)
    }
  }



  return (
    <ItemContainer>
      <div className="maiTopContainer">
        <PageHeader
          pageTitle="Wastage"
          buttonTitle='Add Wastage'
          buttonOnClick={() => history.push({
            pathname: './wastage/add',
            state: inventoryStat
          })} />
        <Filter
          dateRange
          dateRet={dateRet}
          dataReturn={handleSearch}
          toCompareData={tableData}
          serchButton
          onSearch
          forGoodsIn
        />
      </div>
      <div className="tableisRes financeCards">
        <Table className='tableWidth' columns={columns} dataSource={newTableData}
        />
      </div>
      {label.length !== 0 ? <div className='financeCards'> <ReportChart dataDo={dataDo} dataBar={dataBar}></ReportChart></div> : ''}

    </ItemContainer>
  )
}

export default Index

const ItemContainer = styled.div`
  
`