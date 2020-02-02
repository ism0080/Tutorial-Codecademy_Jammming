import React, { useEffect, useState } from 'react'

import { Bar, SideDrawer, UserPlayList } from '../../components'
import Spotify from '../../util/Spotify/Spotify'

export const UserPlayListScene = () => {
  const [sideDrawer, setSideDrawer] = useState<boolean>(false)
  const [userPlaylists, setUserPlaylists] = useState([])

  useEffect(() => {
    Spotify.getUserPlaylists().then((playlists: any) => {
      setUserPlaylists(playlists)
    })
    setUserPlaylists([])
  }, [])

  const sideDrawerHandler = () => {
    setSideDrawer(!sideDrawer)
  }

  return (
    <>
      <Bar drawerClick={sideDrawerHandler} />
      <UserPlayList playlists={userPlaylists} />
      {sideDrawer ? <SideDrawer drawerClick={sideDrawerHandler} /> : null}
    </>
  )
}
