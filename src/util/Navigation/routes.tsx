import { RouteComponentProps, Router } from '@reach/router'
import React from 'react'

import { UserPlayListScene } from 'scenes'
import { HomeScene } from 'scenes'

const Home = (props: RouteComponentProps) => <HomeScene />
const PlaylistScene = (props: RouteComponentProps) => <UserPlayListScene />

export const Routes = () => (
  <Router>
    <Home path='/' default />
    <PlaylistScene path='/myPlaylist' />
  </Router>
)
