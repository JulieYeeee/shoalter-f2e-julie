import { Avatar, Card } from 'antd'

interface RowCardProps {
  src: string
  title: string
  description: string
}

function RowCard({ src, title, description }: RowCardProps) {
  return (
    <div>
      <Card>
        <Avatar shape="square" size={64} alt={title} src={src}></Avatar>
        <Card.Meta title={title} description={description}></Card.Meta>
      </Card>
    </div>
  )
}

export default RowCard
