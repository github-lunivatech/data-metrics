import { Popover } from 'antd'
import styled from 'styled-components'

const content = (
    <span>Print</span>
)

const Print = ({ onClick }) => {

    return (
        <PrintContainer>
            <Popover content={content}>
                <i className="icon-line-printer" onClick={onClick} ></i>
            </Popover>
        </PrintContainer>
    )
}

export default Print

const PrintContainer = styled.div`
  i{
    color: var(--primary);
    cursor: pointer;
    font-size: 16px;
  }
`