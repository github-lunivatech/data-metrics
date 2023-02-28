import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteModal = (props) => {
    const { visible, handleNoteModal, viewNotes, retNoteModal } = props
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [noteValue, setNoteValue] = useState('')

    useEffect(() => {
        setNoteValue(viewNotes)
    }, [viewNotes])

    const handleOk = () => {
        retNoteModal(noteValue);
        setConfirmLoading(true)
    }

    const handleCancelClick = () => {
        handleNoteModal(false)
        // setNoteValue('')
        setConfirmLoading(false)
    }

    const noteEnterChange = (e) => {
        setNoteValue(e);
    }

    return (
        <>
            <Modal
                title="Notes"
                visible={visible}
                closable={false}
                width={1000}
                style={{ top: 20 }}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancelClick}
            >
                <div>
                    <ReactQuill value={noteValue} onChange={noteEnterChange} />
                </div>
            </Modal>
        </>
    )
}

export default NoteModal