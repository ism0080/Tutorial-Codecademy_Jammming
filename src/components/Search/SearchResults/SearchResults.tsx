import React from 'react'

import { TrackList } from 'components'
import styles from './SearchResults.module.css'

export const SearchResults = ({ searchResults, onAdd }: SearchResultsProps) => (
  <div className={styles.SearchResults}>
    <h2>Results</h2>
    <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
  </div>
)
