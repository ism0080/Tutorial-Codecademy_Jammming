import React from 'react'

import { TrackList } from '../../Tracks'
import './SearchResults.css'

export const SearchResults = ({ searchResults, onAdd }: SearchResultsProps) => (
  <div className='SearchResults'>
    <h2>Results</h2>
    <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
  </div>
)

interface SearchResultsProps {
  searchResults: TrackSearch[]
  onAdd: (track: TrackSearch) => void
}
