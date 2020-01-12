import React, { useState } from 'react'

import { Bar, SideDrawer, UserPlayList } from 'components'

export const UserPlayListScene = () => {
  const [sideDrawer, setSideDrawer] = useState<boolean>(false)

  const sideDrawerHandler = () => {
    setSideDrawer(!sideDrawer)
  }

  return (
    <>
      <Bar drawerClick={sideDrawerHandler} />
      <UserPlayList playlists={[]} />
      {sideDrawer ? <SideDrawer drawerClick={sideDrawerHandler} /> : null}
    </>
  )
}
