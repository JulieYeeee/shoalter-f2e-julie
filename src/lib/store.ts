import { configureStore } from '@reduxjs/toolkit'
import { searchResultReducer } from './features/searchResultSlice'
import { SEARCH_RESULT } from './constants'
export const makeStore = () => {
    return configureStore({
        reducer: {
            [SEARCH_RESULT]: searchResultReducer,
        },
    })
}