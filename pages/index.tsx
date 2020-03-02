import { navigate } from '@reach/router'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import { DefaultButton } from 'components/Button'
import { Routes } from 'util/Navigation'
import Spotify from 'util/Spotify/Spotify'

const authEndpoint = 'https://accounts.spotify.com/authorize'
const clientId = process.env.CLIENT_ID
const redirectUri = process.env.URI
const scopes = ['playlist-modify-public']

import css from './styles.less'

// Get the hash of the url
let hash: any
let aToken: any

const App = () => {
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
  console.log(token)

  return (
    <>
      {!token ? (
        <div className={css.AppLogin}>
          <img
            className={css.logoImg}
            src='https://miro.medium.com/max/2400/1*BKoo1Q5PBuN87XT4bArK3w.jpeg'
            alt='logo'
          />
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

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
