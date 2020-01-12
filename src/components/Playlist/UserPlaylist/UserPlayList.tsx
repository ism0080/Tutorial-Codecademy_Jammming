import React, { useState } from 'react'

import { Bar, SideDrawer } from 'components'
import './UserPlayList.css'

export const UserPlayList = ({ playlists }: UserPlayListProps) => {
  const [sideDrawer, setSideDrawer] = useState<boolean>(false)

  const sideDrawerHandler = () => {
    setSideDrawer(!sideDrawer)
  }

  return (
    <div>
      <Bar drawerClick={sideDrawerHandler} />
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
        {sideDrawer ? <SideDrawer drawerClick={sideDrawerHandler} /> : null}
      </div>
    </div>
  )
}

interface UserPlayListProps {
  playlists: Array<import('scenes/Home').TrackProps>
}
