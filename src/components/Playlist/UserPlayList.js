import React from 'react'
import './Playlist.css'

export const UserPlayList = ({ playlists }) => (
    <div className="UserPlayList">
    <h1>Your Playlists</h1>
        {
            playlists.map((playlist) => {
                return <div key={playlist.id} className="UserPlayList-item">
                    <div className="Playlist-information">
                        <img src={playlist.image} alt='playlist cover art' />
                        <h4>{playlist.name}</h4>
                        <p>Number of Tracks: {playlist.tracks}</p>
                        <hr />
                    </div>
                </div>
            })
        }
    </div>
)