import React from 'react';
import "./SearchBox.css";

const SearchBox = () => {
    return (
        <div className="search_container">
            <input type="text" className="text_box" placeholder=" "></input>
            <label>KEYWORD</label>
            <span className="search_btn"></span>
        </div>
    );
};

export default SearchBox;