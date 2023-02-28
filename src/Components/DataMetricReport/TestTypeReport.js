import { Table } from "antd";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getTestTypeReport } from "../../services/datametricService";
import Filter from "../Common/Filter";
import PageHeader from "../Common/pageHeader";

const TestTypeReport = () => {
    const dispatch = useDispatch();
    const [testData, setTestData] = useState([]);

    const columns = [
        {
            title: 'Test Name',
            dataIndex: 'Test Name',
            key: 'Test Name',
        },
    ]

    useEffect(() => {
        let data = {
            testType: 1
        }
        getDataForReport(data)
    }, [])

    const getDataForReport = (data) => {
        dispatch(getTestTypeReport(data, (val) => {
            setTestData(val)
        }))
    }

    return (
        <>
            <PageHeader
                pageTitle='Test Type Report'
            />
            <Filter
                gettesttypelist
                serchButton
            />
            <Table
                columns={columns}
                dataSource={testData}
            />
        </>
    )
}

export default TestTypeReport