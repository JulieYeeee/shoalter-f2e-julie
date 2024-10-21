import type { Entry } from '@/lib/features/@type'
import {
  searchResultReducer,
  searchResultSelector,
  recommendationSelector,
  initialState,
  updateKeyword,
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
  })
  describe('selectors', () => {
    let mockStore: { [key: string]: typeof initialState }
    let mockEntry: Entry
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
    })
    it('未取得 API 資料及 keyword，應回傳預設空陣列結果與空字串關鍵字 - searchResultSelector', () => {
      const result = searchResultSelector(mockStore)
      expect(result).toEqual({ isKeyword: false, result: [] })
    })
    it('已取得 API 資料及 keyword，應回傳實際結果與關鍵字 - searchResultSelector', () => {
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
      expect(result).toEqual({ isKeyword: true, result: [mockEntry] })
    })
    it('未取得 API 資料，應回傳預設空陣列推薦結果 - recommendationSelector', () => {
      const result = recommendationSelector(mockStore)
      expect(result).toEqual({ result: [] })
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

      const result = recommendationSelector(mockStore)
      expect(result).toEqual({ result: [mockEntry] })
    })
  })
})
