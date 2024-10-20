'use client'
import styled from 'styled-components'
import Recommendation from '@/components/Recommendation'
import ResultList from '@/components/ResultList'
import SearchBar from '@/components/SearchBar'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`
const MainConatiner = styled.div`
  width: 50%;
`

const StickyZone = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f5f5f5;
  padding: 8px;
  border-bottom: 1px solid lightgray;
  height: fit-content;
`

function Home() {
  return (
    <Wrapper>
      <MainConatiner>
        <StickyZone>
          <SearchBar />
        </StickyZone>
        <Recommendation />
        <ResultList />
      </MainConatiner>
    </Wrapper>
  )
}

export default Home
