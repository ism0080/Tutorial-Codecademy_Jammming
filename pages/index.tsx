import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'

import { DefaultButton } from '../src/components/Button'
import { Routes } from '../src/util/Navigation'
import Spotify from '../src/util/Spotify/Spotify'

const authEndpoint = 'https://accounts.spotify.com/authorize'
const clientId = 'b14de9fe7da744dba3bd803d7e62881f'
const redirectUri = 'http://localhost:3000/'
const scopes = ['playlist-modify-public']

// Get the hash of the url
let hash: any
let aToken: any

const App = () => {
  useEffect(() => {
    hash = window.location.hash
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
  }, [])
  const [token, setToken] = useState<string>()

  if (hash) {
    aToken = hash.access_token
  }

  if (aToken && !token) {
    setToken(aToken)
  }
  Spotify.setAccessToken(token)

  const onClickHandler = () => {
    navigate(
      `${authEndpoint}?client_id=${clientId}&response_type=token&${scopes.join('%20')}&redirect_uri=${redirectUri}`,
    )
  }

  return (
    <>
      {!token ? (
        <div className='AppLogin'>
          <img className='logoImg' src='https://miro.medium.com/max/2400/1*BKoo1Q5PBuN87XT4bArK3w.jpeg' alt='logo' />
          <DefaultButton
            testID='login-button'
            text='Login to Spotify'
            containerStyle={{ marginTop: 10 }}
            onPress={onClickHandler}
          />
        </div>
      ) : (
        <Routes />
      )}
    </>
  )
}

export default App
