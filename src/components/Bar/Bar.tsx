import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useEffect, useState } from 'react'

import Spotify from '../../util/Spotify'
import './Bar.css'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const Bar = ({ drawerClick }: BarProps) => {
  const [userData, setUserData] = useState({ avatar: '', name: '' })

  const classes = useStyles()
  useEffect(() => {
    getUserData()
  }, [userData])
  const getUserData = () => {
    Spotify.getUserInformation().then((data) => {
      setUserData(data)
    })
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='open drawer'>
            <MenuIcon onClickCapture={drawerClick} />
          </IconButton>
          <Typography variant='h6' noWrap>
            Jammming
          </Typography>
          <div className={classes.grow} />
          <div className='userData'>
            {/* <IconButton aria-label='show 4 new mails' color='inherit'>
              <AccountCircle />
            </IconButton> */}
            <img src={userData.avatar} alt='user avatar' />
            <p>{userData.name}</p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

interface BarProps {
  drawerClick: () => void
}
