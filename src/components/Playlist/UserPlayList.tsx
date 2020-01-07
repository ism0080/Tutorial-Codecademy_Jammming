import React from 'react'

import './UserPlayList.css'

export const UserPlayList = ({ playlists }: UserPlayListProps) => (
  <div className='UserPlayList'>
    <h2>Your Playlists</h2>
    {playlists.map((playlist) => {
      return (
        <div key={playlist.id} className='UserPlayList-item'>
          <div className='Playlist-information'>
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

interface UserPlayListProps {
  playlists: Array<import('../App').TrackProps>
}
