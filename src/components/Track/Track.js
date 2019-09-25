import React from 'react';
import './Track.css';

class Track extends React.Component {
    renderAction() {
        const isRemoval = true;
        if (isRemoval) {
            return '-';
        } else {
            return '+';
        }
    }

    render() {
        const {track} = this.props;
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        )
    }
}

export default Track;