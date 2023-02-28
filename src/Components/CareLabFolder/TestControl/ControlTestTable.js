import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { carelabStat } from '../../Common/StateList';
import Edit from '../../Common/Edit';
import PageHeader from '../../Common/pageHeader';
import { getControlDetailsApi, getControlTestListApi } from '../../../services/qcService';
import CarelabFilter from '../../Common/CarelabFilter';

const ControlTestTable = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [newGoodsList, setnewGoodsList] = useState([]);

    const columns = [
        {
            title: 'Test Name',
            dataIndex: 'TestName',
            key: 'TestName',
        },
        {
            title: 'Test Code',
            dataIndex: 'TestCode',
            key: 'TestCode',
        },
        {
            title: 'Test Description',
            dataIndex: 'TestDescription',
            key: 'TestDescription',
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
                        pathname: `/editcontroltesttest/${record.TId}`,
                        state: carelabStat
                    })}>Edit</Edit>
                </Space>
            )
        }
    ]

    const getLabData = (data) => {
        dispatch(getControlTestListApi(data, (val) => {
            setnewGoodsList(val)
        }))
    }

    // useEffect(() => {
    //     getLabData()
    // }, [])

    const returnFilterData = (res) => {
        let newData = {
            analyzerId: res.controlId
        }
        getLabData(newData)
    }

    return (
        <TestControlContainer>
            <div className="maiTopContainer">
                <PageHeader
                    buttonTitle='Add Test'
                    pageTitle='View Test'
                    buttonOnClick={() => history.push({
                        pathname: 'addcontroltesttest',
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
        </TestControlContainer>
    )
}

export default ControlTestTable

const TestControlContainer = styled.div`
 
`