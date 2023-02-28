import { Badge } from 'antd';

const NewBadge = (props) => {
    const { badgeColor, textColor, badgeSize, offsetValue, badgeCount, children } = props

    return (
        <Badge count={badgeCount} size={badgeSize} offset={offsetValue} style={{ backgroundColor: badgeColor, color: textColor }}>
            {children}
        </Badge>
    )
}

export default NewBadge