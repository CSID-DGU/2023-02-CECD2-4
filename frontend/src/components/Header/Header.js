import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";

const Header = (props) => {
    return (
        <div className="header">
            <Link to={"/"} className="project_title">팀 바나나</Link>
        </div>
    );
};

export default Header;