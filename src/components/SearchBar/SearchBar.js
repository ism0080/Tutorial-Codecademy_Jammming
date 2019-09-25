import React from 'react';

class SearchBar extends React.Component {
    render() {
        retrun(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" />
                <button claas="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;