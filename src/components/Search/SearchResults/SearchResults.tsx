import React from 'react'

import { TrackList } from 'components'
import './SearchResults.css'

export const SearchResults = ({ searchResults, onAdd }: SearchResultsProps) => (
  <div className='SearchResults'>
    <h2>Results</h2>
    <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
  </div>
)
