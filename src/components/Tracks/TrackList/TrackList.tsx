import React from 'react'

import { Track } from 'components'

import styles from './TrackList.module.css'

export const TrackList = ({ onAdd, onRemove, isRemoval, tracks, isSmall }: TrackListProps) => (
  <div className={styles.TrackList}>
    {tracks.map((track) => {
      return (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} isSmall={isSmall} />
      )
    })}
  </div>
)
