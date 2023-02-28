import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Compressor from 'compressorjs';
import FileUpload from './FileUpload';

const ImageModal = (props) => {
    const { visible, handleFileCancel } = props
    const [newUserInfo, setNewUserInfo] = useState({
        fileLists: []
    });

    const updateUploadedFiles = (files) => setNewUserInfo({ ...newUserInfo, fileLists: files });

    useEffect(() => {
    }, [newUserInfo])

    const handleCancelFiler = () => {
        handleFileCancel(false)
    }

    return (
        <>
            <Modal
                title="Upload Files"
                visible={visible}
                closable={false}
                // width={1000}
                style={{ top: 20 }}
                onCancel={handleCancelFiler}
            >
                <FileUpload
                    accept=".jpg,.png,.jpeg,.pdf"
                    label="Files"
                    multiple
                    updateFilesCb={updateUploadedFiles}
                />
                {/* <input
                    accept="image/*,capture=camera"
                    capture="”camera"
                    type="file"
                    onChange={(event) => handleCompressedUpload(event)}
                /> */}

            </Modal>
        </>
    )
}

export default ImageModal