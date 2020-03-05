import React, { useEffect, useState } from 'react'

import { Nav, UserPlayList } from 'components'
import Spotify from 'util/Spotify/Spotify'

const UserPlayListScene = () => {
  const [userPlaylists, setUserPlaylists] = useState([])

  useEffect(() => {
    Spotify.getUserPlaylists().then((playlists: any) => {
      setUserPlaylists(playlists)
    })
    setUserPlaylists([])
  }, [])

  return (
    <>
      <Nav />
      <UserPlayList playlists={userPlaylists} />
    </>
  )
}

export default UserPlayListScene
