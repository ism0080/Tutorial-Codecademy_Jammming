import React from 'react'

import { TrackList } from 'components/TrackList'
import './SearchResults.css'

export const SearchResults = ({ searchResults, onAdd }: SearchResultsProps) => (
  <div className='SearchResults'>
    <h2>Results</h2>
    <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
  </div>
)

interface SearchResultsProps {
  searchResults: Array<import('components/App').TrackProps>
  onAdd: (track: import('components/App').TrackProps) => void
}
