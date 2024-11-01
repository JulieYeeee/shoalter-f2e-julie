import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type {
  AppLookupResult,
  Entry,
  RatingsResult,
} from '@/lib/features/@type'
import { SEARCH_RESULT } from '../constants'

const getSearchResultThunk = createAsyncThunk(
  `${SEARCH_RESULT}/getSearchResult`,
  async (param, { rejectWithValue }) => {
    try {
      const rsp = await axios({
        method: 'get',
        url: 'https://itunes.apple.com/rss/topGrossingApplications/limit=100/json?cc=tw',
        responseType: 'json',
      })
      return rsp.data.feed
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const getRecommendationThunk = createAsyncThunk(
  `${SEARCH_RESULT}/getRecommendation`,
  async (param, { rejectWithValue }) => {
    try {
      const rsp = await axios({
        method: 'get',
        url: 'https://itunes.apple.com/rss/topgrossingapplications/limit=10/json?cc=tw',
        responseType: 'json',
      })
      return rsp.data.feed
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const getAppRatings = createAsyncThunk(
  'apps/fetchRatings',
  async (currentBatch: number, { getState, rejectWithValue }) => {
    try {
      /* 根據因 scroll 載入的最新十筆抓取 ratings*/
      const state = getState() as { [SEARCH_RESULT]: typeof initialState }
      const batchResult = state?.[SEARCH_RESULT]?.searchResultRsp?.entry.slice(
        0,
        currentBatch * 10
      )
      const lastTenAppIds =
        batchResult?.slice(-10).map((item) => item.id.attributes['im:id']) || []

      const rawRspArr = await Promise.allSettled(
        lastTenAppIds.map((id) =>
          axios.get(`https://itunes.apple.com/tw/lookup?id=${id}`)
        )
      )
      const rspArr = rawRspArr.map((result) =>
        result.status === 'fulfilled' ? result.value.data : { results: null }
      )

      return rspArr
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const initialState: {
  searchResultRsp: AppLookupResult | null
  recommendationRsp: AppLookupResult | null
  keyword: string | null
  ratingsRsp: RatingsResult[] | null
  currentBatch: number
} = {
  searchResultRsp: null,
  recommendationRsp: null,
  keyword: null,
  ratingsRsp: null,
  currentBatch: 1,
}

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    updateKeyword: (state, action) => {
      state.keyword = action.payload
    },
    updateCurrentBatch: (state, action) => {
      state.currentBatch = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher<PayloadAction<AppLookupResult>>(
      (action) =>
        action.type === getSearchResultThunk.fulfilled.type ||
        action.type === getSearchResultThunk.rejected.type,
      (state, action) => {
        state.searchResultRsp = action.payload
      }
    )
    builder.addMatcher<PayloadAction<AppLookupResult>>(
      (action) =>
        action.type === getRecommendationThunk.fulfilled.type ||
        action.type === getRecommendationThunk.rejected.type,
      (state, action) => {
        state.recommendationRsp = action.payload
      }
    )
    builder.addMatcher<PayloadAction<RatingsResult[]>>(
      (action) =>
        action.type === getAppRatings.fulfilled.type ||
        action.type === getAppRatings.rejected.type,
      (state, action) => {
        state.ratingsRsp = [...(state.ratingsRsp ?? []), ...action.payload]
      }
    )
  },
})

const searchResultSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.searchResultRsp?.entry,
  (state) => state[SEARCH_RESULT]?.keyword,
  (result: Entry[], keyword: string) => {
    const addNumberToEntry = (arr: Entry[]) => {
      return arr?.map((item, index) => ({ ...item, order: `${index + 1}` }))
    }
    if (!keyword) {
      const numberedEntries = addNumberToEntry(result)
      return { isKeyword: false, result: numberedEntries }
    }

    const lowercasedKeyword = keyword.toLowerCase()
    const matchesKeyword = (text: string) => {
      return text.toLowerCase().includes(lowercasedKeyword)
    }

    const filteredEntries = result.filter(
      (item: Entry) =>
        matchesKeyword(item['im:name'].label) ||
        matchesKeyword(item.summary.label) ||
        matchesKeyword(item.title.label)
    )

    const numberedEntries = addNumberToEntry(filteredEntries)
    return { isKeyword: true, result: numberedEntries }
  }
)

const resultWithRatingSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.ratingsRsp,
  (state) => state[SEARCH_RESULT]?.currentBatch,
  searchResultSelector,
  (
    ratingsRsp,
    currentBatch,
    { isKeyword, result: searchResult }: { isKeyword: boolean; result: Entry[] }
  ) => {
    const result = searchResult?.map((item, idx) => {
      return {
        ...item,
        rating: ratingsRsp[idx]?.results?.[0]?.averageUserRating || null,
        ratingCount: ratingsRsp[idx]?.results?.[0]?.userRatingCount || null,
      }
    })
    /* 根據 currentBatch 更新 result */
    const nextBatch = result?.slice(0, currentBatch * 10)

    return {
      result: nextBatch,
      isNoResult: Array.isArray(nextBatch) && nextBatch.length === 0,
      isKeyword,
      currentBatch,
    }
  }
)

const recommendationSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.recommendationRsp?.entry,
  resultWithRatingSelector,
  (
    recommendation: Entry[],
    {
      isKeyword,
      result: searchResult,
    }: { isKeyword: boolean; isNoResult: boolean; result: Entry[] }
  ) => {
    const result = isKeyword ? searchResult : recommendation
    const isNoResult = isKeyword
      ? Array.isArray(searchResult) && searchResult.length === 0
      : Array.isArray(recommendation) && recommendation.length === 0
    return { result, isNoResult }
  }
)

export const { updateKeyword, updateCurrentBatch } = searchResultSlice.actions

export {
  getSearchResultThunk,
  getRecommendationThunk,
  getAppRatings,
  searchResultSelector,
  recommendationSelector,
  resultWithRatingSelector,
}

export const searchResultReducer = searchResultSlice.reducer
