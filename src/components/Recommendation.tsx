'use client'
import { useEffect } from 'react'
import { List } from 'antd'
import RowCard from '@/components/widgets/RowCard'
import {
  recommendationSelector,
  getRecommendationThunk,
} from '@/lib/features/searchResultSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

interface Item {
  'im:image': { label: string }[]
  'im:name': { label: string }
  category: { attributes: { label: string } }
}

function Recommendation() {
  const dispatch = useAppDispatch()
  const { result } = useAppSelector(recommendationSelector)

  useEffect(() => {
    dispatch(getRecommendationThunk())
  }, [dispatch])

  // TODO:可能不用 List component
  return (
    <div>
      <h1>Recommendation</h1>
      <div style={{ width: '100vw', overflowX: 'auto' }}>
        <List
          // style={{ width: "fit-content" }}
          dataSource={result}
          grid={
            {
              // gutter: 1,
              // column: 5,
              // xs: 1,
              // sm: 2,
              // md: 4,
              // lg: 4,
              // xl: 6,
              // xxl: 3,
            }
          }
          renderItem={(item: Item) => (
            <List.Item style={{ width: '200px' }}>
              <RowCard
                src={item?.['im:image'][2]?.label}
                title={item['im:name'].label}
                description={item.category.attributes.label}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default Recommendation
