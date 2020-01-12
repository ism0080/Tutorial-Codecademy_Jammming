import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import React from 'react'

import { TrackList } from 'components/Tracks'
import './Playlist.css'

export const Playlist = ({ onNameChange, playlistName, playlistTracks, onRemove, onSave }: PlaylistProps) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value)
  }

  return (
    <div className='Playlist'>
      <input defaultValue={playlistName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} isSmall={true} />
      <button className='Playlist-save' onClick={onSave}>
        <PlaylistAddIcon />
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}

interface PlaylistProps {
  onNameChange: (event: string) => void
  playlistName: string
  playlistTracks: Array<import('scenes/Home').TrackProps>
  onRemove: (track: import('scenes/Home').TrackProps) => void
  onSave: () => void
}