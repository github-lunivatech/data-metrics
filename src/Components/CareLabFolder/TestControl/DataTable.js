import { Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { carelabStat } from '../../Common/StateList';
import Edit from '../../Common/Edit';
import PageHeader from '../../Common/pageHeader';
import { getControlDetailsApi, getControlValueByControlTestIdApi } from '../../../services/qcService';
import CarelabFilter from '../../Common/CarelabFilter';

const DataTable = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [newGoodsList, setnewGoodsList] = useState([]);

    const columns = [
        // {
        //     title: 'Control Test',
        //     dataIndex: 'ControlTestId',
        //     key: 'ControlTestId',
        // },
        {
            title: 'Control Value',
            dataIndex: 'ControlValue',
            key: 'ControlValue',
        },
        {
            title: 'QC Date',
            dataIndex: 'QCDate',
            key: 'QCDate',
            render: (text) => {
                return text.split('T')[0]
            }
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
                        pathname: `/editcontroldata/${record.QId}/${record.ControlTestId}`,
                        state: carelabStat
                    })}>Edit</Edit>
                </Space>
            )
        }
    ]

    const getLabData = (newData) => {
        dispatch(getControlValueByControlTestIdApi(newData, (val) => {
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
                    buttonTitle='Add Test Data'
                    pageTitle='View Test Data'
                    buttonOnClick={() => history.push({
                        pathname: 'addcontroldata',
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

export default DataTable

const TestControlContainer = styled.div`
 
`