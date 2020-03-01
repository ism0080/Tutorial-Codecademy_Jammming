import { RouteComponentProps, Router } from '@reach/router'
import React from 'react'

import { UserPlayListScene } from '../../scenes'
import { HomeScene } from '../../scenes'

export const Routes = () => {
  const Home = (props: RouteComponentProps) => <HomeScene />
  const PlaylistScene = (props: RouteComponentProps) => <UserPlayListScene />

  return (
    <Router>
      <Home path='/' default />
      <PlaylistScene path='/myPlaylist' />
    </Router>
  )
}
