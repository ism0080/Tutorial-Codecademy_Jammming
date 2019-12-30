import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './SearchResults.css';

export const SearchResults = ({searchResults, onAdd}) => (
    <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={searchResults}
            onAdd={onAdd}
            isRemoval={false} />
    </div>
)