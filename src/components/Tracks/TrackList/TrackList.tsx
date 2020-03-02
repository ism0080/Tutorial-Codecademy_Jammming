import React from 'react'

import { Track } from 'components'

import css from './TrackList.less'

export const TrackList = ({ onAdd, onRemove, isRemoval, tracks, isSmall }: TrackListProps) => (
  <div className={css.TrackList}>
    {tracks.map((track) => {
      return (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} isSmall={isSmall} />
      )
    })}
  </div>
)
