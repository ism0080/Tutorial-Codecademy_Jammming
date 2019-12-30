import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlist.css'

export const Playlist = ({onNameChange, playlistName, playlistTracks, onRemove, onSave}) => {

    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    }

    return (
        <div className="Playlist">
            <input defaultValue={playlistName} onChange={handleNameChange} />
            <TrackList tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true} />
            <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}