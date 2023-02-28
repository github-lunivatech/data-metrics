import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { carelabStat } from '../../Common/StateList';
import Edit from '../../Common/Edit';
import PageHeader from '../../Common/pageHeader';
import CarelabFilter from '../../Common/CarelabFilter';
import { getListOfControlWiseSDApi } from '../../../services/qcService';

const ControlTable = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // const [goodsList, setgoodsList] = useState([]);
    const [newGoodsList, setnewGoodsList] = useState([]);

    const columns = [
        {
            title: 'Test',
            dataIndex: 'TestId',
            key: 'TestId',
        },
        {
            title: 'Control',
            dataIndex: 'ControlId',
            key: 'ControlId',
        },
        {
            title: 'Average Value',
            dataIndex: 'AverageValue',
            key: 'AverageValue',
        },
        {
            title: 'Entry Date',
            dataIndex: 'EntryDate',
            key: 'EntryDate',
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
                        pathname: `/edittestcontrol/${record.ControlId}/${record.SId}`,
                        state: carelabStat
                    })}>Edit</Edit>
                </Space>
            )
        }
    ]

    // const getLabData = (data) => {
    //     dispatch(getGoodsOutApi(data, (val) => {
    //         setgoodsList(val)
    //         setnewGoodsList(val)
    //     }))
    // }

    useEffect(() => {
        // let data = {
        //   fromdate: todaydate,
        //   todate: todaydate,
        // }
        // getLabData(data)
    }, [])

    // const dataRet = (val) => {
    //     let data = {
    //         fromdate: val[0].format("YYYY-MM-DD"),
    //         todate: val[1].format("YYYY-MM-DD"),
    //     }
    //     getLabData(data)
    // }

    // const handleSearch = (val) => {
    //     if (val === undefined || val === '') {
    //         setnewGoodsList(goodsList)
    //     } else {
    //         setnewGoodsList(val)
    //     }
    // }

    const returnFilterData = (res) => {
        let newData = {
            analyzerId: res.controlId
        }
        dispatch(getListOfControlWiseSDApi(newData, (re) => {
            setnewGoodsList(re)
        }))
    }

    return (
        <GoodsOutContainer>
            <div className="maiTopContainer">
                <PageHeader
                    buttonTitle='Add Test Control'
                    pageTitle='Test Control'
                    buttonOnClick={() => history.push({
                        pathname: 'addtestcontrol',
                        state: carelabStat
                    })}
                />
                <CarelabFilter
                    returnFilterData={returnFilterData}
                    showTestControlList={true}
                />
            </div>
            <div className="tableisRes">
                <Table className='tableWidth'
                    columns={columns}
                    dataSource={newGoodsList}
                />
            </div>
        </GoodsOutContainer>
    )
}

export default ControlTable

const GoodsOutContainer = styled.div`
 
`