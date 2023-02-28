import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
// import { careLabTestListApi } from '../../services/careLabService'
// import { useDispatch } from 'react-redux';
import DefData from './defData'
import ImageModal from './ImageModal';
import { useHistory } from 'react-router-dom';
// import data from '../../../appSettings.json'
import useReadJSON from '../../CustomHook/useReadJSON';

const ReportModal = (props) => {
    const { visible, handleCancel, setClickedId, newFiscalId, isMaleFemale } = props;
    const history = useHistory()
    const fileReaderJSON = useReadJSON('appSettings.json')
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visibler, setVisibler] = useState(false);
    const [getAllDataHere, setGetAllDataHere] = useState([]);
    const [showImageModal, setshowImageModal] = useState(false);
    // const dispatch = useDispatch();

    const handleOk = () => {
        setConfirmLoading(true)
    };

    const handleCancelClick = () => {
        setConfirmLoading(false)
        handleCancel(false)
    }

    const allDataRet = (res) => {
        setGetAllDataHere(res);
    }

    const isDataVerified = (res) => {
        
        setConfirmLoading(!res)
    }

    const handleFileClick = () => {
        setshowImageModal(true)
    }

    const handleFileCancel = (res) => {
        setshowImageModal(false)
    }

    const handlePrintClick = (res) => {
        if(fileReaderJSON.PrintHTMLReport === true)
            window.open(`/printtestreport/${setClickedId}/${newFiscalId}`, "_blank");
        else
            console.log('print crystal report');
    }

    useEffect(() => {
        setVisibler(visible);
    }, [visible])

    return (
        <>
            <Modal
                title="Test List"
                visible={visible}
                closable={false}
                // onOk={handleOk}
                // confirmLoading={confirmLoading}
                // onCancel={handleCancelClick}
                width={1000}
                style={{ top: 20 }}
                footer={
                    [
                        <Button onClick={handlePrintClick}>
                            Print Report
                        </Button>,
                        <Button type="primary" loading={confirmLoading} onClick={handleOk}>
                            Verify All
                        </Button>,
                        <Button type="default" onClick={handleFileClick}>
                            Upload Files
                        </Button>,
                        <Button type="default" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                    ]
                }
            >
                <DefData visible={visibler} setClickedId={setClickedId} newFiscalId={newFiscalId} allDataRet={allDataRet} handleOk={confirmLoading} isDataVerified={isDataVerified} isMaleFemale={isMaleFemale} />
            </Modal>
            <ImageModal visible={showImageModal} handleFileCancel={handleFileCancel} />
        </>
    );
};

export default ReportModal;