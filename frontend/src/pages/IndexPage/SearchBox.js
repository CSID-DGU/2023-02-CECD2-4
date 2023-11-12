import React, {useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";
import "./SearchBox.css";

const SearchBox = () => {
    const search_btn = useRef();
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        if(searchKeyword === '')
            search_btn.current.style.pointerEvents = "none";
        
        if(!(searchKeyword === '') && search_btn.current.style.pointerEvents === "none")
            search_btn.current.style.pointerEvents = "auto";
    },[searchKeyword]);

    const UpdateSearchKeyword = event => {
        setSearchKeyword(event.target.value);
    }

    return (
        <div className="search_container">
            <input type="text" className="text_box" placeholder=" " onChange={UpdateSearchKeyword}></input>
            <label>KEYWORD</label>
            {}
            <Link to={"/search_result?keyword=" + searchKeyword} className="search_btn" ref={search_btn}></Link>
        </div>
    );
};

export default SearchBox;