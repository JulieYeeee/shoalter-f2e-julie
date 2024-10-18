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
}

function ResultList() {
  const { result } = useAppSelector(searchResultSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSearchResultThunk())
  }, [dispatch])

  return (
    <div>
      <h1>Result List</h1>
      <List
        dataSource={result}
        renderItem={(item: SearchResultItem) => (
          <List.Item>
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
    </div>
  )
}

export default ResultList
