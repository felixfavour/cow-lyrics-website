export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  lyrics?: string
  body?: any // For Nuxt Content parsed body
  slug: string
  genre?: string
  key?: string
  bpm?: number
  cover?: string
  is_public?: boolean
  created_at?: string
  updated_at?: string
  createdAt?: string
  updatedAt?: string
  imageUrl?: string
  youtubeUrl?: string
  spotifyUrl?: string
  tags: string[]
  _path?: string // For Nuxt Content
  _id?: string // For Nuxt Content
}

export interface Artist {
  id: string
  name: string
  slug: string
  imageUrl?: string
  bio?: string
  website?: string
  songCount: number
}

export interface SearchParams {
  q: string
  page?: number
  limit?: number
  sortBy?: 'relevance' | 'newest' | 'alphabetical' | 'popular'
  genre?: string
}

export interface SearchResponse {
  data: Song[]
  total: number
  page: number
  limit: number
  totalPages: number
}