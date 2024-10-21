import { useEffect, useState, useRef } from 'react'
import { List, Avatar } from 'antd'
import { styled } from 'styled-components'
import {
  getSearchResultThunk,
  searchResultSelector,
} from '@/lib/features/searchResultSlice'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'

interface Item {
  'im:image': { label: string }[]
  'im:name': { label: string }
  category: { attributes: { label: string } }
  id: { attributes: { 'im:id': string } }
  order: string
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
  const { result } = useAppSelector(searchResultSelector)
  const [visibleItems, setVisibleItems] = useState<Item[]>([])
  const [currentBatch, setCurrentBatch] = useState(1)
  const listRef = useRef<HTMLDivElement>(null)
  const batchSize = 10 // 每次加載 10 筆資料
  const isLoading = result.length === 0

  useEffect(() => {
    dispatch(getSearchResultThunk())
  }, [dispatch])

  // 更新當前顯示的資料，依據當前 batch 加載
  useEffect(() => {
    const nextBatch = result.slice(0, currentBatch * batchSize)
    setVisibleItems(nextBatch)
  }, [result, currentBatch])

  useEffect(() => {
    const listElement = listRef.current
    if (listElement) {
      const handleScroll = () => {
        const userViewHeight = listElement.scrollTop + listElement.clientHeight
        const containerScrollHeight = listElement.scrollHeight
        const hasMoreApps = currentBatch * batchSize < result.length

        if (userViewHeight >= containerScrollHeight && hasMoreApps) {
          setCurrentBatch(currentBatch + 1)
        }
      }

      listElement.addEventListener('scroll', handleScroll)

      return () => {
        listElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [currentBatch, result.length])

  return (
    <StyledList
      ref={listRef}
      dataSource={visibleItems}
      loading={isLoading}
      renderItem={(item: Item) => (
        <List.Item key={item?.id.attributes['im:id']}>
          <StyledNumber>{item?.order}</StyledNumber>
          <List.Item.Meta
            avatar={
              <Avatar
                src={item?.['im:image'][0]?.label}
                size={64}
                alt={item['im:name'].label}
              />
            }
            title={item['im:name'].label}
            description={item.category.attributes.label}
          />
        </List.Item>
      )}
    />
  )
}

export default ResultList
