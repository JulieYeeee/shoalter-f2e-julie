import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { AsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SEARCH_RESULT } from '../constants'

const getSearchResultThunk = createAsyncThunk(
  `${SEARCH_RESULT}/getSearchResult`,
  async (param, { rejectWithValue }) => {
    try {
      const rsp = await axios({
        method: 'get',
        url: 'https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json',
        responseType: 'json',
      })
      return rsp.data.feed
    } catch (e) {
      return rejectWithValue(e)
    }
  }
) as AsyncThunk<ReturnType<typeof getSearchResultThunk>, void, {}>

const getRecommendationThunk = createAsyncThunk(
  `${SEARCH_RESULT}/getRecommendation`,
  async (param, { rejectWithValue }) => {
    try {
      const rsp = await axios({
        method: 'get',
        url: 'https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json',
        responseType: 'json',
      })
      return rsp.data.feed
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const initialState = {
  searchResultRsp: {
    author: {},
    entry: [],
    updated: {},
    rights: {},
    title: {},
    icon: {},
    link: [],
    id: {},
  },
  recommendationRsp: {
    author: {},
    entry: [],
    updated: {},
    rights: {},
    title: {},
    icon: {},
    link: [],
    id: {},
  },
  keyword: '',
}

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    updateSearchResult: (state, action) => {
      state.searchResult = { ...action.payload }
    },
    updateKeyword: (state, action) => {
      state.keyword = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type === getSearchResultThunk.fulfilled.type ||
        action.type === getSearchResultThunk.rejected.type,
      (state, action) => {
        state.searchResultRsp = action.payload
      }
    )

    builder.addMatcher(
      (action) =>
        action.type === getRecommendationThunk.fulfilled.type ||
        action.type === getRecommendationThunk.rejected.type,
      (state, action) => {
        state.recommendationRsp = action.payload
      }
    )
  },
})

const searchResultSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.searchResultRsp,
  (state) => state[SEARCH_RESULT]?.keyword,
  (result, keyword) => {
    if (keyword) {
      const filterByName = result.entry.filter((item) => {
        return item['im:name'].label
          .toLowerCase()
          .includes(keyword.toLowerCase())
      })
      const filterBySummary = result.entry.filter((item) => {
        return item.summary.label.toLowerCase().includes(keyword.toLowerCase())
      })
      const filterByTitle = result.entry.filter((item) => {
        return item.title.label.toLowerCase().includes(keyword.toLowerCase())
      })
      // 去除重複
      const resultSet = new Set([
        ...filterByName,
        ...filterBySummary,
        ...filterByTitle,
      ])
      return { iskeyword: !!keyword, result: [...resultSet] }
    } else {
      return { iskeyword: !!keyword, result: result.entry }
    }
  }
)

const recommendationSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.recommendationRsp.entry,
  searchResultSelector,
  (recommendation, { iskeyword, result: searchResult }) => {
    console.log('isKeyword:', iskeyword)
    return { result: iskeyword ? searchResult : recommendation }
  }
)

export const { updateSearchResult, updateKeyword } = searchResultSlice.actions

export {
  getSearchResultThunk,
  getRecommendationThunk,
  searchResultSelector,
  recommendationSelector,
}

export const searchResultReducer = searchResultSlice.reducer
