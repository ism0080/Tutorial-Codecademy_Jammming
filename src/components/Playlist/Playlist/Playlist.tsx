// import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import React from 'react'

import { DefaultButton, TrackList } from 'components'
import css from './Playlist.less'

export const Playlist = ({ onNameChange, playlistName, playlistTracks, onRemove, onSave }: PlaylistProps) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value)
  }

  return (
    <div className={css.Playlist}>
      <input defaultValue={playlistName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} isSmall={true} />
      <DefaultButton
        testID='save.button'
        onPress={onSave}
        containerStyle={{ width: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        text={'SAVE TO SPOTIFY'}
      />
      {/* <PlaylistAddIcon />
        SAVE TO SPOTIFY */}
    </div>
  )
}
