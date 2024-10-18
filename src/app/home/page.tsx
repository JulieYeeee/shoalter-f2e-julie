'use client'
import Recommendation from '@/components/Recommendation'
import ResultList from '@/components/ResultList'
import SearchBar from '@/components/SearchBar'

function Home() {
  return (
    <>
      <SearchBar />
      <Recommendation />
      <ResultList />
    </>
  )
}

export default Home
