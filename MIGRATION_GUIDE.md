# Migration Guide: nuxt-content to API-based SSR

This document describes the migration from a static nuxt-content based site to a dynamic SSR application using the Cloud of Worship API.

## Overview

The application has been migrated from:
- **Before**: Static site using @nuxt/content to read markdown files from the `/content` directory
- **After**: Dynamic SSR application fetching data from https://api.cloudofworship.com

## Key Changes

### 1. Configuration Updates

#### nuxt.config.ts
- ✅ Enabled SSR: `ssr: true` (was `ssr: false`)
- ✅ Removed `@nuxt/content` from modules
- ✅ Removed content configuration block
- ✅ Cleared prerender routes (no longer needed)

#### package.json
- ✅ Removed `@nuxt/content` dependency
- ✅ Removed `fuse.js` dependency (search now handled by API)

### 2. New API Integration

#### composables/useApi.ts (NEW)
Created a new composable to handle all API calls to the Cloud of Worship backend:

**Available Functions:**
- `getFeaturedArtists(limit?)` - Get featured artists with song counts
- `getTopLyricCreators(limit?)` - Get top lyric contributors
- `fuzzySearchSongs(query, options?)` - Search songs by query
- `getRandomSongs(limit?)` - Get random songs
- `getPublicSong(songId)` - Get a specific song by ID

**API Endpoints Used:**
- `GET /api/v1/public-songs/featured-artists`
- `GET /api/v1/public-songs/top-creators`
- `GET /api/v1/public-songs/search`
- `GET /api/v1/public-songs/random`
- `GET /api/v1/public-songs/:songId`

### 3. Updated Composables

#### composables/useSongs.ts
Completely rewritten to use API instead of queryContent:
- `getRecentSongs()` - Now uses `getRandomSongs()` API endpoint
- `getPopularArtists()` - Now uses `getFeaturedArtists()` API endpoint
- `searchSongs()` - Now uses `fuzzySearchSongs()` API endpoint
- `getSongBySlug()` - Now uses `getPublicSong()` API endpoint
- `getStats()` - Calculates stats from API data (artists + creators)

### 4. Updated Pages

#### pages/index.vue
- Changed from `queryContent('songs')` to `useSongs().getRecentSongs()`
- Artists data now fetched from `useSongs().getPopularArtists()`
- Stats now calculated from API data via `useSongs().getStats()`

#### pages/songs/[slug].vue
- Changed from `queryContent('songs').where({ id: route.params.slug })` to `useSongs().getSongBySlug()`

#### pages/search.vue
- Already using `useSongs().searchSongs()` - no changes needed (works with updated implementation)

### 5. Removed Files

- ✅ `content.config.ts` - No longer needed without @nuxt/content

### 6. Data Format

#### API Response Format (Songs)
```json
{
  "lyrics": "Song lyrics text...",
  "title": "Song Title",
  "cover": "https://...",
  "artist": "Artist Name",
  "id": "song-slug-id",
  "createdBy": "user-id"
}
```

#### API Response Format (Featured Artists)
```json
{
  "songCount": 52,
  "artist": "Artist Name"
}
```

#### API Response Format (Top Creators)
```json
{
  "songsCreated": 129,
  "userId": "user-id",
  "fullname": "User Name",
  "avatar": "https://..."
}
```

## Environment Variables

The API base URL can be configured via environment variable:
```bash
NUXT_PUBLIC_API_BASE_URL=https://api.cloudofworship.com
```

Default value: `https://api.cloudofworship.com`

## Development

### Running the App
```bash
npm install
npm run dev
```

The app will run on http://localhost:3032

### Building for Production
```bash
npm run build
```

## Testing

Since the app now requires external API access, ensure:
1. The API endpoints are accessible
2. The API returns data in the expected format
3. Error handling works when API is unavailable

## Notes

1. **SSR Benefits**: 
   - Better SEO (content rendered on server)
   - Faster initial page load
   - Dynamic content updates without redeployment

2. **API Dependency**: 
   - The app now requires the Cloud of Worship API to be available
   - Offline functionality is not available
   - Consider adding loading states and error boundaries

3. **Content Management**: 
   - Songs are now managed via the Cloud of Worship platform
   - No need to create/manage markdown files
   - Real-time updates when new songs are added to the API

4. **Performance**: 
   - API calls are cached via Nuxt's data fetching
   - Consider adding additional caching strategies if needed
   - Monitor API response times

## Rollback

If needed to rollback to the previous version:
1. Checkout the commit before this migration
2. Run `npm install` to restore old dependencies
3. The content files should still be in the `/content` directory

## Support

For issues with:
- **API**: Contact Cloud of Worship API team
- **Frontend**: Check this repository's issues
