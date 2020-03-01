import React from 'react'

import styles from './UserPlayList.module.css'

export const UserPlayList = ({ playlists }: UserPlayListProps) => (
  <div className={styles.UserPlayList}>
    <h2>Your Playlists</h2>
    {playlists.map((playlist) => {
      return (
        <div key={playlist.id}>
          <div>
            <img src={playlist.image} alt='playlist cover art' />
            <h4>{playlist.name}</h4>
            <p>Number of Tracks: {playlist.tracks}</p>
            <hr />
          </div>
        </div>
      )
    })}
  </div>
)
