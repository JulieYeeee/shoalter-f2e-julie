import { configureStore } from '@reduxjs/toolkit'
import { SEARCH_RESULT } from './constants'
import { searchResultReducer } from './features/searchResultSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [SEARCH_RESULT]: searchResultReducer,
    },
  })
}
