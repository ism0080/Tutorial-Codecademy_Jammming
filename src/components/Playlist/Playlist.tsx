import React from 'react'

import { TrackList } from '../TrackList'
import './Playlist.css'

export const Playlist = ({ onNameChange, playlistName, playlistTracks, onRemove, onSave }: PlaylistProps) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value)
  }

  return (
    <div className='Playlist'>
      <input defaultValue={playlistName} onChange={handleNameChange} />
      <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className='Playlist-save' onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  )
}

interface PlaylistProps {
  onNameChange: (event: string) => void
  playlistName: string
  playlistTracks: Array<import('../App').TrackProps>
  onRemove: (track: import('../App').TrackProps) => void
  onSave: () => void
}
