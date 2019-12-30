import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export const TrackList = ({ onAdd, onRemove, isRemoval, tracks }) => (
    <div className="TrackList">
        {
            tracks.map(track => {
                return <Track key={track.id}
                    track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemoval={isRemoval} />
            })
        }
    </div>
)