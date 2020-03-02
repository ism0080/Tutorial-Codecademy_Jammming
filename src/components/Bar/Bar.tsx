import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useEffect, useState } from 'react'

import Spotify from 'util/Spotify/Spotify'
import css from './Bar.less'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export const Bar = ({ drawerClick }: BarProps) => {
  const [userData, setUserData] = useState()

  const classes = useStyles()
  useEffect(() => {
    getUserData()
  }, [])
  const getUserData = () => {
    Spotify.getUserInformation().then((data: any) => {
      setUserData(data)
    })
    setUserData({ avatar: '', name: 'Isaac' })
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClickCapture={drawerClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Jammming
          </Typography>
          <div className={classes.grow} />
          <div className={css.useData}>
            {!userData ? null : (
              <>
                <img src={userData.avatar} alt='user avatar' />
                <p>{userData.name}</p>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
