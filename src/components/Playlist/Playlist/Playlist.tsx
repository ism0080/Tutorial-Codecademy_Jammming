import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import React from 'react'

import { TrackList } from '../../Tracks'
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
  playlistTracks: TrackSearch[]
  onRemove: (track: TrackSearch) => void
  onSave: () => void
}
