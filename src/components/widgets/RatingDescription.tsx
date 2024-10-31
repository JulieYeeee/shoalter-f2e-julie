import { Rate } from 'antd'
import { styled } from 'styled-components'

const StyledRating = styled.div`
  display: flex;
  align-items: center;
`

function RatingDescription({
  rating,
  ratingCount,
  description,
}: {
  rating: number
  ratingCount: number
  description: string
}) {
  return (
    <div>
      <p>{description}</p>
      <StyledRating>
        <Rate value={rating} allowHalf disabled />
        <p>{`(${ratingCount})`}</p>
      </StyledRating>
    </div>
  )
}

export default RatingDescription
