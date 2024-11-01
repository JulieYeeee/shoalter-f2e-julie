import type { Entry, RatingsResult } from '@/lib/features/@type'
import {
  searchResultReducer,
  searchResultSelector,
  resultWithRatingSelector,
  recommendationSelector,
  initialState,
  updateKeyword,
  updateCurrentBatch,
} from './searchResultSlice'
import { SEARCH_RESULT } from '../constants'

describe('searchResultSlice', () => {
  describe('reducer', () => {
    let mockState: typeof initialState
    beforeEach(() => {
      mockState = JSON.parse(JSON.stringify(initialState))
    })
    it('updateKeyword', () => {
      const expectedResult = 'MockKeyword'
      const result = searchResultReducer(
        mockState,
        updateKeyword(expectedResult)
      )
      expect(result.keyword).toEqual(expectedResult)
    })
    it('updateCurrentBatch', () => {
      const expectedResult = 1
      const result = searchResultReducer(
        mockState,
        updateCurrentBatch(expectedResult)
      )
      expect(result.currentBatch).toEqual(expectedResult)
    })
  })
  describe('selectors', () => {
    let mockStore: { [key: string]: typeof initialState }
    let mockEntry: Entry
    let mockRating: RatingsResult
    beforeEach(() => {
      mockStore = {
        [SEARCH_RESULT]: JSON.parse(JSON.stringify(initialState)),
      }
      mockEntry = {
        ['im:image']: [
          {
            label: 'MockLabel',
            attributes: {
              height: 'MockHeight',
            },
          },
        ],
        ['im:name']: {
          label: 'MockLabel',
        },
        summary: {
          label: 'MockLabel',
        },
        ['im:price']: {
          label: 'MockPrice',
          attributes: {
            amount: 'MockAmount',
            currency: 'MockCurrency',
          },
        },
        ['im:contentType']: {
          attributes: {
            label: 'MockContentType',
            term: 'MockTerm',
          },
        },
        rights: {
          label: 'MockRights',
        },
        title: {
          label: 'MockTitle',
        },
        link: [
          {
            attributes: {
              rel: 'MockRel',
              type: 'MockType',
              href: 'MockHref',
            },
          },
        ],
        id: {
          label: 'MockLabel',
          attributes: {
            'im:id': 'MockId',
            'im:bundleId': 'MockBundleId',
          },
        },
        ['im:artist']: {
          label: 'MockLabel',
          attributes: {
            href: 'MockHref',
          },
        },
        category: {
          attributes: {
            'im:id': 'MockId',
            term: 'MockTerm',
            scheme: 'MockScheme',
            label: 'MockLabel',
          },
        },
        ['im:releaseDate']: {
          label: 'MockLabel',
          attributes: {
            label: 'MockLabel',
          },
        },
      }
      mockRating = {
        resultCount: 1,
        results: [
          {
            averageUserRating: 4,
            userRatingCount: 10,
            version: '1.0.0',
            releaseNotes: 'MockNote',
            currentVersionReleaseDate: 'MockReleaseDate',
          },
        ],
      }
    })
    it('未取得 API 資料及 keyword，應回傳預設空陣列結果與空字串關鍵字 - searchResultSelector', () => {
      const result = searchResultSelector(mockStore)
      expect(result).toEqual({ isKeyword: false, result: undefined })
    })
    it('已取得 API 資料及 keyword，應回傳帶有 order 的結果與關鍵字 - searchResultSelector', () => {
      mockStore[SEARCH_RESULT].searchResultRsp = {
        author: {
          name: {
            label: 'MockLabel',
          },
          uri: {
            label: 'MockLabel',
          },
        },
        entry: [mockEntry],
        updated: {
          label: 'MockLabel',
        },
        rights: {
          label: 'MockLabel',
        },
        title: {
          label: 'MockLabel',
        },
        link: [
          {
            attributes: {
              rel: 'MockRel',
              type: 'MockType',
              href: 'MockHref',
            },
          },
        ],
        id: {
          label: 'MockLabel',
          attributes: {
            'im:id': 'MockId',
            'im:bundleId': 'MockBundleId',
          },
        },
        icon: {
          label: 'MockLabel',
        },
      }

      mockStore[SEARCH_RESULT].keyword = 'MockLabel' //關鍵字：符合指定欄位內容

      const result = searchResultSelector(mockStore)
      expect(result).toEqual({
        isKeyword: true,
        result: [{ ...mockEntry, order: '1' }],
      })
    })
    it('未取得 API 資料，應回傳預設空陣列推薦結果 - recommendationSelector', () => {
      const result = recommendationSelector(mockStore)
      expect(result).toEqual({ result: undefined, isNoResult: false })
    })
    it('已取得 API 資料，應回傳實際推薦結果 - recommendationSelector', () => {
      mockStore[SEARCH_RESULT].recommendationRsp = {
        author: {
          name: {
            label: 'MockLabel',
          },
          uri: {
            label: 'MockLabel',
          },
        },
        entry: [mockEntry],
        updated: {
          label: 'MockLabel',
        },
        rights: {
          label: 'MockLabel',
        },
        title: {
          label: 'MockLabel',
        },
        link: [
          {
            attributes: {
              rel: 'MockRel',
              type: 'MockType',
              href: 'MockHref',
            },
          },
        ],
        id: {
          label: 'MockLabel',
          attributes: {
            'im:id': 'MockId',
            'im:bundleId': 'MockBundleId',
          },
        },
        icon: {
          label: 'MockLabel',
        },
      }
      mockStore[SEARCH_RESULT].currentBatch = 1
      mockStore[SEARCH_RESULT].ratingsRsp = [mockRating]

      const result = recommendationSelector(mockStore)

      expect(result).toEqual({ result: [mockEntry], isNoResult: false })
    })
    it('未取得 Ratings API 資料應回傳空陣列及其他預設資料 - resultWithRatingSelector', () => {
      const result = resultWithRatingSelector(mockStore)
      expect(result).toEqual({
        result: undefined,
        isNoResult: false,
        isKeyword: false,
        currentBatch: 1,
      })
    })
    it('已取得 RatingsAPI 資料應回傳帶有評分資料的結果 - resultWithRatingSelector', () => {
      mockStore[SEARCH_RESULT].ratingsRsp = [mockRating]
      mockStore[SEARCH_RESULT].currentBatch = 1
      mockStore[SEARCH_RESULT].searchResultRsp = {
        author: {
          name: {
            label: 'MockLabel',
          },
          uri: {
            label: 'MockLabel',
          },
        },
        entry: [mockEntry],
        updated: {
          label: 'MockLabel',
        },
        rights: {
          label: 'MockLabel',
        },
        title: {
          label: 'MockLabel',
        },
        link: [
          {
            attributes: {
              rel: 'MockRel',
              type: 'MockType',
              href: 'MockHref',
            },
          },
        ],
        id: {
          label: 'MockLabel',
          attributes: {
            'im:id': 'MockId',
            'im:bundleId': 'MockBundleId',
          },
        },
        icon: {
          label: 'MockLabel',
        },
      }
      mockStore[SEARCH_RESULT].keyword = 'MockLabel'

      const result = resultWithRatingSelector(mockStore)
      expect(result).toEqual({
        result: [{ ...mockEntry, rating: 4, ratingCount: 10, order: '1' }],
        isNoResult: false,
        isKeyword: true,
        currentBatch: 1,
      })
    })
  })
})
