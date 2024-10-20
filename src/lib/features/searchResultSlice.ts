import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { SEARCH_RESULT } from '../constants'

interface Author {
  name: Label
  uri: Label
}

interface Entry {
  'im:name': Label
  'im:image': Image[]
  summary: Label
  'im:price': Price
  'im:contentType': ContentType
  rights: Label
  title: Label
  link: Link[]
  id: EntryId
  'im:artist': Artist
  category: Category
  'im:releaseDate': ReleaseDate
}

interface Label {
  label: string
  attributes?: Record<string, string>
}

interface Image {
  label: string
  attributes: {
    height: string
  }
}

interface Price {
  label: string
  attributes: {
    amount: string
    currency: string
  }
}

interface ContentType {
  attributes: {
    term: string
    label: string
  }
}

interface EntryId {
  label: string
  attributes: {
    'im:id': string
    'im:bundleId': string
  }
}

interface Artist {
  label: string
  attributes: {
    href: string
  }
}

interface Category {
  attributes: {
    'im:id': string
    term: string
    scheme: string
    label: string
  }
}

interface ReleaseDate {
  label: string
  attributes: {
    label: string
  }
}

interface Link {
  attributes: Record<string, string>
}
interface AppLookupResult {
  author: Author
  entry: Entry[]
  updated: Label
  rights: Label
  title: Label
  icon: Label
  link: Link[]
  id: Label
}

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
)

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

const initialState: {
  searchResultRsp: AppLookupResult | null
  recommendationRsp: AppLookupResult | null
  keyword: string | null
} = {
  searchResultRsp: null,
  recommendationRsp: null,
  keyword: null,
}

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    updateKeyword: (state, action) => {
      state.keyword = action.payload
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
  },
})

const searchResultSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.searchResultRsp?.entry,
  (state) => state[SEARCH_RESULT]?.keyword,
  (result: Entry[], keyword: string) => {
    if (!keyword) {
      return { isKeyword: false, result: result || [] }
    }

    const lowercasedKeyword = keyword.toLowerCase()
    const matchesKeyword = (text: string) =>
      text.toLowerCase().includes(lowercasedKeyword)

    const filteredEntries = result.filter(
      (item: Entry) =>
        matchesKeyword(item['im:name'].label) ||
        matchesKeyword(item.summary.label) ||
        matchesKeyword(item.title.label)
    )
    return { isKeyword: true, result: filteredEntries }
  }
)

const recommendationSelector = createSelector(
  (state) => state[SEARCH_RESULT]?.recommendationRsp?.entry,
  searchResultSelector,
  (
    recommendation: Entry[],
    { isKeyword, result: searchResult }: { isKeyword: boolean; result: Entry[] }
  ) => {
    return { result: isKeyword ? searchResult : recommendation || [] }
  }
)
export const { updateKeyword } = searchResultSlice.actions

export {
  getSearchResultThunk,
  getRecommendationThunk,
  searchResultSelector,
  recommendationSelector,
}

export const searchResultReducer = searchResultSlice.reducer
