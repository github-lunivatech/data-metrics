import React from 'react'
import { Select } from 'antd';
export const SearchSelect = (props) => {
    const { itemList, placer } = props
    return (
        <Select
            showSearch
            optionFilterProp="children"
            placeholder={placer}
            filterOption={(input, option) => {
                return (
                    option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                    option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            }}
        >
            {itemList}
        </Select>
    )
}