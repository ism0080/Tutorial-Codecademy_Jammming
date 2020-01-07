import React from 'react'

import { Track } from '../Track'
import './TrackList.css'

export const TrackList = ({ onAdd, onRemove, isRemoval, tracks, isSmall }: TrackListProps) => (
  <div className='TrackList'>
    {tracks.map((track) => {
      return (
        <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} isSmall={isSmall} />
      )
    })}
  </div>
)

interface TrackListProps {
  onAdd?: (track: import('../App').TrackProps) => void
  onRemove?: (track: import('../App').TrackProps) => void
  isRemoval: boolean
  tracks: Array<import('../App').TrackProps>
  isSmall?: boolean
}
