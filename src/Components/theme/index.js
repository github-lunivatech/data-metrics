import React, { useState } from 'react'
import PageHeader from '../Common/pageHeader'
import { Select, Radio, Space } from 'antd'
import { themedata } from './themdata'


const Index = () => {

  const handleChage = e => {
    localStorage.clear();
    localStorage.setItem('theme', e.target.value);
    location.reload();
  }
  return (
    <>
      <div className="maiTopContainer" style={{ padding: '10px' }}>
        <PageHeader
          pageTitle={'Theme'}
        ></PageHeader>
        <Radio.Group onChange={handleChage}>
          <Space>
            <Radio.Button
              value={JSON.stringify(themedata.defaultTheme)}
            >Default</Radio.Button>
            <Radio.Button value={JSON.stringify(themedata.theme1)}>Green</Radio.Button>
            <Radio.Button value={JSON.stringify(themedata.theme2)}>Dark</Radio.Button>
            <Radio.Button value={JSON.stringify(themedata.theme3)}>Blue</Radio.Button>
            <Radio.Button value={JSON.stringify(themedata.theme4)}>costome</Radio.Button>
          </Space>
        </Radio.Group>

      </div>
    </>
  )
}

export default Index
