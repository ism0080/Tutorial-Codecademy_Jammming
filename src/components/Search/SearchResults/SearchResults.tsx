import React from 'react'

import { TrackList } from 'components'
import css from './SearchResults.less'

export const SearchResults = ({ searchResults, onAdd }: SearchResultsProps) => (
  <div className={css.SearchResults}>
    <h2>Results</h2>
    <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
  </div>
)
