import { Form, Button, Select } from 'antd';

const ItemFilter = () => {
    const { Option } = Select;

    const onFinish = (values) => {
    }

    return (
        <Form
            name="add_items"
            layout="inline"
            onFinish={onFinish}
            autoComplete="off"
        >

            <Form.Item
                label="Item Category"
                name="item_category"
            >
                <Select>
                    <Option value="0">All</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Item Type"
                name="item_type"
            >
                <Select>
                    <Option value="0">All</Option>
                </Select>
            </Form.Item>

        </Form>
    );

};

export default ItemFilter;