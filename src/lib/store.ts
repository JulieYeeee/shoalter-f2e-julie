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

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']
