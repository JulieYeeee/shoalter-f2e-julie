
"use client"
import SearchBar from "@/components/SearchBar"
import Recommendation from "@/components/Recommendation"
import ResultList from "@/components/ResultList"
function Home() {
    return <>
        <SearchBar />
        <Recommendation />
        <ResultList />
    </>
}

export default Home