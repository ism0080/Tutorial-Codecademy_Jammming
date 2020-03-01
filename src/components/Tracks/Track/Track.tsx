import React from 'react'

import styles from './Track.module.css'

export const Track = ({ isRemoval, track, onAdd, onRemove, isSmall }: TrackProps) => {
  const { name, artist, album, image } = track

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className={styles.TrackAction} onClick={removeTrack}>
          -
        </button>
      )
    } else {
      return (
        <button className={styles.TrackAction} onClick={addTrack}>
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
    <div className={styles.Track}>
      <div className={styles.TrackInformation} style={{ height: isSmall ? '4em' : '6em' }}>
        <div>
          <img src={image} alt='album art' />
        </div>
        <div style={{ width: '100%', paddingLeft: 10, minWidth: 100 }}>
          <h4>{name}</h4>
          <p>{artist}</p>
          <p>{album}</p>
        </div>
        {renderAction()}
      </div>
    </div>
  )
}
