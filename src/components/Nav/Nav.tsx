import React, { useEffect, useState } from 'react'

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
    <div style={{ backgroundColor: 'blue', height: 70, display: 'flex', alignItems: 'center' }}>
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
