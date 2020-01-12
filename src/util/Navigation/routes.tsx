import { RouteComponentProps, Router } from '@reach/router'
import React from 'react'

import { UserPlayListScene } from 'scenes'
import { HomeScene } from 'scenes'

export const Routes = (token: any) => {
  const Home = (props: RouteComponentProps) => <HomeScene uri={token} />
  const PlaylistScene = (props: RouteComponentProps) => <UserPlayListScene uri={token} />

  return (
    <Router>
      <Home path='/' default uri={token} />
      <PlaylistScene path='/myPlaylist' uri={token} />
    </Router>
  )
}
