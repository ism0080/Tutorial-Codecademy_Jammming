import React, { useState } from 'react'

import { Routes } from 'util/Navigation/routes'

import './App.css'

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

  return (
    <>
      {!token ? (
        <div className='AppLogin'>
          <img className='logoImg' src='https://miro.medium.com/max/2400/1*BKoo1Q5PBuN87XT4bArK3w.jpeg' alt='logo' />
          <a
            className='btn'
            href={`${authEndpoint}?client_id=${clientId}&response_type=token&${scopes.join(
              '%20',
            )}&redirect_uri=${redirectUri}`}
          >
            Login to Spotify
          </a>
        </div>
      ) : (
        <Routes token={token} />
      )}
    </>
  )
}

export default App
