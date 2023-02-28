import { Popover } from 'antd'
import styled from 'styled-components'

const content = (
    <span>View</span>
)

const View = ({ onClick }) => {

    return (
        <ViewContainer>
            <Popover content={content}>
                <i className="icon-eye-open" onClick={onClick} ></i>
            </Popover>
        </ViewContainer>
    )
}

export default View

const ViewContainer = styled.div`
  i{
    color: var(--primary);
    cursor: pointer;
    font-size: 16px;
  }
`