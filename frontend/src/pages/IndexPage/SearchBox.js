import React from 'react';
import "./SearchBox.css";

const SearchBox = () => {
    return (
        <div className="search_container">
            <input type="text" className="text_box"></input>
            <span className="search_btn">검색</span>
        </div>
    );
};

export default SearchBox;