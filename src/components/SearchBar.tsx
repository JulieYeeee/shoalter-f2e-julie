import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import styled from 'styled-components'
import { updateKeyword } from '@/lib/features/searchResultSlice'
import { useAppDispatch } from '@/lib/hooks'

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`

const StyledInput = styled(Input)<{ $isSearch: boolean }>`
  background-color: #d1d1d1;
  &::placeholder {
    color: red;
    text-align: center;
  }
  .ant-input-affix-wrapper {
    position: relative;
  }
  .ant-input-prefix {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #bfbfbf;
    visibility: ${(props) => (props.$isSearch ? 'hidden' : 'visible')};
  }
`

function SearchBar() {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<{ keyword: string }>()
  const keyword = Form.useWatch('keyword', form)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (keyword && keyword.trim()) {
      dispatch(updateKeyword(keyword))
    } else {
      dispatch(updateKeyword(''))
    }
  }, [dispatch, keyword])

  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <StyledFormItem name="keyword">
        <StyledInput
          $isSearch={isFocused || !!keyword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          prefix={
            <div>
              <SearchOutlined />
              <span>搜尋</span>
            </div>
          }
        />
      </StyledFormItem>
    </Form>
  )
}

export default SearchBar
