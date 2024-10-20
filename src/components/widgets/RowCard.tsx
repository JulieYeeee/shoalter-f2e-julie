import { Avatar, Card } from 'antd'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  /* 以下設定推薦卡片寬度 */
  .ant-card-body {
    width: 125px;
  }
  /* 以下設定推薦卡片圖片 */
  .ant-card-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    > :first-child {
      border-radius: 16px;
    }
  }
  .ant-card-meta-title {
    font-weight: 500;
    font-size: 14px;
    /* 以下處理文字斷行及刪節號樣式 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
    white-space: wrap;
    text-overflow: clip;
    /* 以下處理固定標題容器行高 */
    min-height: 2em;
    line-height: 1em;
    overflow: hidden;
  }
`

interface RowCardProps {
  src: string
  title: string
  description: string
}

function RowCard({ src, title, description }: RowCardProps) {
  return (
    <StyledCard
      cover={<Avatar shape="square" size={64} alt={title} src={src} />}
    >
      <Card.Meta title={title} description={description} />
    </StyledCard>
  )
}

export default RowCard
