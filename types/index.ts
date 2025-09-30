export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  lyrics: string
  slug: string
  genre?: string
  key?: string
  bpm?: number
  createdAt: string
  updatedAt: string
  imageUrl?: string
  youtubeUrl?: string
  spotifyUrl?: string
  tags: string[]
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