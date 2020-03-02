import React from 'react'

import css from './UserPlayList.less'

export const UserPlayList = ({ playlists }: UserPlayListProps) => (
  <div className={css.UserPlayList}>
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
