import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import { navigate } from '@reach/router'
import React from 'react'

export const SideDrawer = ({ drawerClick }: SideDrawProps) => {
  const playlistNavigationHandler = () => {
    navigate(`/myPlaylist`)
  }

  const homeNavigationHandler = () => {
    navigate(`/`)
  }

  const sideList = () => (
    <div style={{ width: 250 }} role='presentation'>
      <List>
        <ListItem button onClickCapture={homeNavigationHandler}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button onClickCapture={playlistNavigationHandler}>
          <ListItemIcon>
            <PlaylistPlayIcon />
          </ListItemIcon>
          <ListItemText primary='Playlists' />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div>
      <Drawer open={true} onClose={drawerClick}>
        {sideList()}
      </Drawer>
    </div>
  )
}
