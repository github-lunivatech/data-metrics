import { Modal } from 'antd'
import React from 'react'

const CustomModal = (props) => {
    const { visible, onOk, confirmLoading, onCancel, goodsRecList, retSelData } = props

    const handleAdder = (val) => {
        let targ = val.target
        retSelData({
            goodId: targ.value,
            remCount: targ.dataset.rem
        });
    }

    return (
        <Modal
            title="Select Items"
            visible={visible}
            onOk={onOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            footer={null}
        >
            <table style={{width: '100%'}}>
                <thead style={{textAlign: 'left'}}>
                    <th>Goods In Id</th>
                    <th>Remaining Count</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {
                        goodsRecList.map(ele => {
                            return (
                                <tr key={ele?.GoodsInId}>
                                    <td>{ele?.GoodsInId}</td>
                                    <td>{ele?.RemainingCount}</td>
                                    <td><button data-rem={ele?.RemainingCount} value={ele?.GoodsInId} onClick={handleAdder}>Add</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Modal>
    )
}
export default CustomModal