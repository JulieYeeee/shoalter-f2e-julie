'use client'
import { useEffect } from 'react'
import { List } from 'antd'
import { styled } from 'styled-components'
import VerticalInfoCard from '@/components/widgets/VerticalInfoCard'
import {
  recommendationSelector,
  getRecommendationThunk,
} from '@/lib/features/searchResultSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

type Item = {
  'im:name': {
    label: string
  }
  'im:image': {
    label: string
  }[]
  category: {
    attributes: {
      label: string
    }
  }
  'im:contentType': {
    attributes: {
      label: string
    }
  }
  id: {
    attributes: {
      'im:id': string
    }
  }
}

const Wrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const StyledList = styled(List)`
  /* 以下設定推薦序列方向及主要容器寬度 */
  .ant-list-items {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
` as typeof List

function Recommendation() {
  const dispatch = useAppDispatch()
  const { result, isNoResult } = useAppSelector(recommendationSelector)
  const isLoading = isNoResult ? false : !Array.isArray(result)

  useEffect(() => {
    dispatch(getRecommendationThunk())
  }, [dispatch])

  return (
    <div>
      <h1>推薦</h1>
      <Wrapper>
        <StyledList
          loading={isLoading}
          dataSource={result}
          renderItem={(item: Item) => (
            <List.Item key={item.id.attributes['im:id']}>
              <VerticalInfoCard
                src={item?.['im:image'][2]?.label}
                title={item?.['im:name'].label}
                description={item?.category.attributes.label}
              />
            </List.Item>
          )}
        />
      </Wrapper>
    </div>
  )
}

export default Recommendation
