import React from 'react'
import './Track.css'

export const Track = ({ isRemoval, track, onAdd, onRemove }: TrackProps) => {
  const { name, artist, album } = track

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className='Track-action' onClick={removeTrack}>
          -
        </button>
      )
    } else {
      return (
        <button className='Track-action' onClick={addTrack}>
          +
        </button>
      )
    }
  }

  const addTrack = () => {
    if (onAdd) {
      onAdd(track)
    }
  }

  const removeTrack = () => {
    if (onRemove) {
      onRemove(track)
    }
  }

  return (
    <div className='Track'>
      <div className='Track-information'>
        <h4>{name}</h4>
        <p>
          {artist} | {album}
        </p>
      </div>
      {renderAction()}
    </div>
  )
}

interface TrackProps {
  isRemoval: boolean
  track: import('../App').TrackProps
  onAdd?: (track: import('../App').TrackProps) => void
  onRemove?: (track: import('../App').TrackProps) => void
}
