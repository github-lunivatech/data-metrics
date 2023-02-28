import { Upload } from 'antd';

const { Dragger } = Upload;

const AntdUpload = () => {
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                
            }
            if (status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                // message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            
        },
    };


    return (
        <Dragger {...props}>
            {/* <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p> */}
            <p className="ant-upload-text">Click or drag file to upload</p>
            {/* <p className="ant-upload-hint">
                Drag or Select
            </p> */}
        </Dragger>
    )
}

export default AntdUpload