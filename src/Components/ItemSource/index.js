import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import Filter from '../Common/Filter'
import PageHeader from '../Common/pageHeader'
import { getGoodsOutApi } from '../../services/labGoodsOutService';
// import Edit from '../Common/Edit';
import Cancle from '../Common/Cancle';
import { todaydate } from '../Common/TodayDate';
import { inventoryStat } from '../Common/StateList';
import { getItemSourceDetApi } from '../../services/itemSourceService';
import Edit from '../Common/Edit';

const Index = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [goodsList, setgoodsList] = useState([]);
    const [newGoodsList, setnewGoodsList] = useState([]);

    const columns = [
        {
            title: 'Item Source',
            dataIndex: 'ItemSource',
            key: 'ItemSource',
        },
        {
            title: 'Entry Date',
            dataIndex: 'EntryDate',
            key: 'EntryDate',
            render: (text) => {
                return text.split('T')[0]
            },
            // responsive: ['md'],
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
            // responsive: ['sm'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Edit onClick={() => history.push({
                        pathname: `/itemsource/edit/${record.Id}`,
                        state: inventoryStat
                    })}>
                        Edit
                    </Edit>
                </Space>
            )
        }
    ]

    const getLabData = () => {
        dispatch(getItemSourceDetApi((val) => {
            setgoodsList(val)
            setnewGoodsList(val)
        }))
    }

    useEffect(() => {
        // let data = {
        //   fromdate: todaydate,
        //   todate: todaydate,
        // }
        getLabData()
    }, [])

    const dataRet = (val) => {
        let data = {
            fromdate: val[0].format("YYYY-MM-DD"),
            todate: val[1].format("YYYY-MM-DD"),
        }
        getLabData(data)
    }

    const handleSearch = (val) => {
        if (val === undefined || val === '') {
            setnewGoodsList(goodsList)
        } else {
            setnewGoodsList(val)
        }
    }

    return (
        <ItemSourceContainer>
            <div className="maiTopContainer">
                <PageHeader
                    buttonTitle='Add Item Source'
                    pageTitle='Item Source'
                    buttonOnClick={() => history.push({
                        pathname: '/itemsource/add',
                        state: inventoryStat
                    })}
                />
                {/* <Filter
          dataReturn={handleSearch}
          dateRange
          dateRet={dataRet}
          toCompareData={goodsList}
          serchButton
          onSearch
          forGoodsOut
        /> */}
            </div>
            <div className="tableisRes">
                <Table className='tableWidth'
                    columns={columns}
                    dataSource={newGoodsList}
                />
            </div>
        </ItemSourceContainer>
    )
}

export default Index

const ItemSourceContainer = styled.div`
 
`