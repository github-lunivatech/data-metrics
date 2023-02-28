import { Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import SubTestData from './subTestData';

const SubTestModal = (props) => {
    const { visible, handleCancel, setClickedId, newFiscalId } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visibler, setVisibler] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true)
    };

    const handleCancelClick = () => {
        setConfirmLoading(false)
        handleCancel(false)
    }

    useEffect(() => {
        setVisibler(visible);
    }, [visible])

    return (
        <>
            <Modal
                title="Sub Test List"
                visible={visible}
                closable={false}
                width={900}
                style={{ top: 20 }}
                footer={
                    [
                        <Button type="primary" loading={confirmLoading} onClick={handleOk}>
                            Add All Test
                        </Button>,
                        <Button type="default" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                    ]
                }
            >
                <SubTestData />
            </Modal>
        </>
    );
};

export default SubTestModal;