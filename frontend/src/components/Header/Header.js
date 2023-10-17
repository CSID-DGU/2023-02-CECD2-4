import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";
import styled from 'styled-components';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CurrentPageContainer = styled.div`
width:20%;
height:100%;
background-color: #555555;
`;
const HelloLabel = styled.div`
width:15%;
height:100%;
background-color: azure;
`;
const LogoutBtn = styled.div`
width:10%;
height:100%;
background-color: #888888;
`;

const Header = (props) => {
    const isAdmin = useSelector(state => state.toggleAdminHeader.isAdmin);

    return (
        <div className="header">
            <Link to={"/"} className="project_title">팀 바나나</Link>
            {isAdmin === true
            ? <><CurrentPageContainer>

            </CurrentPageContainer>
            <HelloLabel>
                hello, admin.
            </HelloLabel>
            <LogoutBtn>

            </LogoutBtn></>
            : null}
        </div>
    );
};

export default Header;