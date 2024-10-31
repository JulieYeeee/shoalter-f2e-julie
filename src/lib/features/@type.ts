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

interface RatingsResult {
  resultCount: number
  results:
    | {
        averageUserRating: number
        userRatingCount: number
        version: string
        releaseNotes: string
        currentVersionReleaseDate: string
      }[]
    | null
}

export type {
  Author,
  Entry,
  Label,
  Image,
  Price,
  ContentType,
  EntryId,
  Artist,
  Category,
  ReleaseDate,
  Link,
  AppLookupResult,
  RatingsResult,
}
