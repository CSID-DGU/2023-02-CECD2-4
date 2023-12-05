import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./SearchBox.css";

const SearchBox = () => {
    const navigate = useNavigate();
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
    const EnterKey = event => {
        if(window.event.keyCode === 13) {
            navigate("/search_result?keyword=" + searchKeyword);
        }
    }
    return (
        <div className="search_container">
            <input type="text" className="text_box" placeholder=" " onChange={UpdateSearchKeyword} onKeyUp={EnterKey}></input>
            <label>KEYWORD</label>
            {}
            <Link to={"/search_result?keyword=" + searchKeyword} className="search_btn" ref={search_btn}></Link>
        </div>
    );
};

export default SearchBox;