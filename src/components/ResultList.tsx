import { useEffect, useRef } from 'react'
import { List, Avatar } from 'antd'
import { styled } from 'styled-components'
import RatingDescription from '@/components/widgets/RatingDescription'
import {
  getSearchResultThunk,
  getAppRatings,
  updateCurrentBatch,
  resultWithRatingSelector,
} from '@/lib/features/searchResultSlice'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'

interface Item {
  'im:image': { label: string }[]
  'im:name': { label: string }
  category: { attributes: { label: string } }
  id: { attributes: { 'im:id': string } }
  order?: string
  rating: number
  ratingCount: number
}

const StyledList = styled(List)`
  /* 以下設定列表固定高度，溢出時自動滾動 */
  height: 100%;
  overflow-y: auto;
` as typeof List

const StyledNumber = styled.p`
  padding: 5px;
  margin: 5px;
  color: lightgray;
  font-weight: bold;
`

function ResultList() {
  const dispatch = useAppDispatch()
  const { result, isNoResult, currentBatch } = useAppSelector(
    resultWithRatingSelector
  )
  const listRef = useRef<HTMLDivElement>(null)
  const batchSize = 10 // 每次加載 10 筆資料
  const isLoading = isNoResult ? false : !Array.isArray(result)

  useEffect(() => {
    const getInitData = async () => {
      await dispatch(getSearchResultThunk())
      await dispatch(getAppRatings(1))
    }
    getInitData()
  }, [dispatch])

  // 依照當前載入的 batch 取得 ratings
  useEffect(() => {
    dispatch(getAppRatings(currentBatch))
  }, [currentBatch, dispatch])

  useEffect(() => {
    const listElement = listRef.current
    if (listElement && result) {
      const handleScroll = () => {
        const userViewHeight = listElement.scrollTop + listElement.clientHeight
        const containerScrollHeight = listElement.scrollHeight
        const hasMoreApps = currentBatch * batchSize <= result.length
        if (userViewHeight >= containerScrollHeight && hasMoreApps) {
          dispatch(updateCurrentBatch(currentBatch + 1))
        }
      }
      listElement.addEventListener('scroll', handleScroll)
      return () => {
        listElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [currentBatch, dispatch, result])

  return (
    <StyledList
      ref={listRef}
      dataSource={result}
      loading={isLoading}
      renderItem={(item: Item) => (
        <List.Item key={item?.id.attributes['im:id']}>
          <StyledNumber>{item?.order}</StyledNumber>
          <List.Item.Meta
            avatar={
              <Avatar
                src={item?.['im:image'][0]?.label}
                size={64}
                alt={item?.['im:name'].label}
              />
            }
            title={item?.['im:name'].label}
            description={
              <RatingDescription
                rating={item?.rating || 1}
                ratingCount={item?.ratingCount || 0}
                description={item?.category.attributes.label}
              />
            }
          />
        </List.Item>
      )}
    />
  )
}

export default ResultList
