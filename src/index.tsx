import { navigate } from '@reach/router'
import React, { useState } from 'react'
import { render } from 'react-dom'

import { DefaultButton } from './components/Button'
import { Routes } from './util/Navigation'
import Spotify from './util/Spotify/Spotify'
import SpotifyNew from './util/Spotify/SpotifyNew'

import './index.css'

const authEndpoint = 'https://accounts.spotify.com/authorize'
const clientId = 'b14de9fe7da744dba3bd803d7e62881f'
const redirectUri = 'http://localhost:3000/'
const scopes = ['playlist-modify-public']

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial: any, item) => {
    if (item) {
      const parts = item.split('=')
      initial[parts[0]] = decodeURIComponent(parts[1])
    }
    return initial
  }, {})
window.location.hash = ''

const App = () => {
  const [token, setToken] = useState<string>()

  const aToken = hash.access_token

  if (aToken && !token) {
    setToken(aToken)
  }
  Spotify.setAccessToken(token)
  SpotifyNew.setAccessToken(token)

  return (
    <>
      {!token ? (
        <div className='AppLogin'>
          <img className='logoImg' src='https://miro.medium.com/max/2400/1*BKoo1Q5PBuN87XT4bArK3w.jpeg' alt='logo' />
          <DefaultButton
            testID='login-button'
            text='Login to Spotify'
            containerStyle={{ marginTop: 10 }}
            onPress={() =>
              navigate(
                `${authEndpoint}?client_id=${clientId}&response_type=token&${scopes.join(
                  '%20',
                )}&redirect_uri=${redirectUri}`,
              )
            }
          />
        </div>
      ) : (
        <Routes />
      )}
    </>
  )
}

render(<App />, document.getElementById('root'))
