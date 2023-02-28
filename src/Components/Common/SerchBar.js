
import Search from 'antd/lib/input/Search'
import React from 'react'
import styled from 'styled-components'

const SerchBar = () => {
  return (
    <SerchBarContainer>
      <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch=''
    />
    </SerchBarContainer>
  )
}

export default SerchBar

const SerchBarContainer = styled.div`

`