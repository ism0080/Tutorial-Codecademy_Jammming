import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import Spotify from 'util/Spotify/Spotify'

import css from './Nav.less'

export const Nav = () => {
  const [userData, setUserData] = useState()

  useEffect(() => {
    getUserData()
  }, [])
  const getUserData = () => {
    Spotify.getUserInformation().then((data: any) => {
      setUserData(data)
    })
    setUserData({ avatar: '', name: 'Isaac' })
  }

  return (
    <div className={css.navWrapper}>
      <div className={css.navLinks}>
        <Link href='/app'>
          <a>Home</a>
        </Link>
        <Link href='/playlist'>
          <a>Playlist</a>
        </Link>
      </div>
      <div className={css.userData}>
        {userData && (
          <>
            <img src={userData.avatar} alt='user avatar' />
            <p>{userData.name}</p>
          </>
        )}
      </div>
    </div>
  )
}
