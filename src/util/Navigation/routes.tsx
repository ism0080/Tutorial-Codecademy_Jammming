import { RouteComponentProps, Router } from '@reach/router'
import { UserPlayList } from 'components'
import React from 'react'
import { HomeScene } from 'scenes'

const Home = (props: RouteComponentProps) => <HomeScene />
const PlaylistScene = (props: RouteComponentProps) => <UserPlayList playlists={[]} />

export const Routes = () => (
  <Router>
    <Home path='/' default />
    <PlaylistScene path='/myPlaylist' />
  </Router>
)
