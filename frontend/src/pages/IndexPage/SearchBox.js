import React from 'react';
import {Link} from "react-router-dom";
import "./SearchBox.css";

const SearchBox = () => {
    return (
        <div className="search_container">
            <input type="text" className="text_box" placeholder=" "></input>
            <label>KEYWORD</label>
            <Link to="/search_result" className="search_btn"></Link>
        </div>
    );
};

export default SearchBox;