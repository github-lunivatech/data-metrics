import React, { useRef, useState } from "react";
import { Form, Input, Modal } from 'antd';
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel,
    OnlyTwoLine
} from "./file-upload.styles";
import Compressor from 'compressorjs';

const { TextArea } = Input;

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000; // 500kb

const convertNestedObjectToArray = (nestedObj) => {
    return Object.keys(nestedObj).map((key) => nestedObj[key]);
}

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    updateFilesCb,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
}) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});
    const [remarks, setRemarks] = useState('')
    const [fileType, setFileType] = useState('')
    const [previewVisible, setpreviewVisible] = useState(false);
    const [previewImage, setpreviewImage] = useState('');

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            // if (file.size <= maxFileSizeInBytes) {
            file.remarks = remarks
            file.fileTyper = fileType
            // setRemarks('')
            // setFileType('');
            if (!otherProps.multiple) {
                return { file };
            }
            files[file.name] = file;
            // }
        }
        return { ...files };
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    const handleCancel = () => {
        setpreviewVisible(false)
    }

    const handlePreview = async (fileName) => {
        let fileRead = files[fileName];
        if (fileRead.type.split("/")[0] === "image") {
            setpreviewImage(fileRead)
            setpreviewVisible(true)
        }
    }

    return (
        <>
            <div className="label-block">
                <Form.Item
                    label="File"
                    name="filer"
                >
                    <Input
                        value={fileType}
                        onChange={e => setFileType(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Remarks"
                    name="Remarks"
                >
                    <TextArea
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                    />
                </Form.Item>
            </div>

            <FileUploadContainer>

                <InputLabel>Files</InputLabel>
                <DragDropText>Drop your files or</DragDropText>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </FileUploadContainer>

            <FilePreviewContainer>
                <span>Upload Preview</span>
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <ImagePreview
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <FileMetaData isImageFile={isImageFile}>
                                        <OnlyTwoLine>{file.name}</OnlyTwoLine>
                                        <span>{convertBytesToKB(file.size)} kb</span>
                                        <aside>
                                            {
                                                isImageFile && (
                                                    <RemoveFileIcon
                                                        className="icon-eye-open"
                                                        onClick={() => handlePreview(fileName)}
                                                    />
                                                )
                                            }

                                            <RemoveFileIcon
                                                className="icon-line-trash"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                    </FileMetaData>
                                    <OnlyTwoLine>
                                        <div>
                                            {file?.remarks}
                                        </div>
                                    </OnlyTwoLine>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
            <Modal
                visible={previewVisible}
                title={'Image'}
                footer={null}
                onCancel={handleCancel}
            >
                {
                    previewImage.length !== 0 && previewImage.type.split("/")[0] === "image" && (
                        <ImagePreview
                            src={URL.createObjectURL(previewImage)}
                            alt={`file preview`}
                        />
                    )}
            </Modal>
        </>
    );
};

export default FileUpload;