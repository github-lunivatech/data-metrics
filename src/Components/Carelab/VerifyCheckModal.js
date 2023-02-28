import { useState } from "react"
import { Form, Input, Modal } from "antd"

const VerifyCheckModal = (props) => {
    const { visible, verfiyCheckCancel, retUp } = props
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm()
    const prevVal = {}

    const handleCancel = () => {
        setConfirmLoading(false)
        verfiyCheckCancel(false)
    }

    const onFinish = (values) => {
        setConfirmLoading(true)
        form.validateFields().then(values => {
            retUp(values);
            // form.resetFields();
        }).catch(info => {
          
          setConfirmLoading(false)
        });
    }

    const onFinishFailed = (info) => {

    }

    return (
        <>
            <Modal
                visible={visible}
                title='Verify User'
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={380}
                onOk={onFinish}
            >
                <Form
                    form={form}
                    name="add_items"
                    // {...formItemLayout}
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={prevVal}
                    // onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter username!',
                            },
                        ]}
                    >
                        <Input
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter password!',
                            },
                        ]}
                    >
                        <Input.Password
                            style={{ width: '100%' }}
                        />
                    </Form.Item>


                </Form>
            </Modal>
        </>
    )
}

export default VerifyCheckModal