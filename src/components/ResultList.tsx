import { useEffect } from 'react'
import { List, Avatar } from 'antd'
import {
  getSearchResultThunk,
  searchResultSelector,
} from '@/lib/features/searchResultSlice'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'

interface SearchResultItem {
  'im:image': { label: string }[]
  'im:name': { label: string }
  category: { attributes: { label: string } }
  id: { attributes: { 'im:id': string } }
}

function ResultList() {
  const { result } = useAppSelector(searchResultSelector)
  const dispatch = useAppDispatch()
  const isLoading = result.length === 0

  useEffect(() => {
    dispatch(getSearchResultThunk())
  }, [dispatch])

  return (
    <List
      pagination={{
        position: 'bottom',
        align: 'center',
        pageSize: 10,
      }}
      dataSource={result}
      loading={isLoading}
      renderItem={(item: SearchResultItem) => (
        <List.Item key={item?.id.attributes['im:id']}>
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
