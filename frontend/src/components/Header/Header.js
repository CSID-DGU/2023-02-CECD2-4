import React from 'react';
import {Link} from 'react-router-dom';
import "./Header.css";
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CurrentPageContainer = styled.div`
display:flex;
justify-content:space-evenly;
align-items:center;
width:20%;
height:100%;
`;
const HelloLabel = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:15%;
height:100%;
font-family: "aggro";
font-weight: 500;
font-size: 20px;
color:whitesmoke;
`;
const LogoutBtn = styled(Link)`
display:flex;
justify-content:center;
align-items:center;
width:120px;
height:40px;
margin-right:10px;
font-family: "aggro";
font-weight: 500;
font-size:20px;
color:#444;
background-color: #888888;
text-decoration:none;;
transition: all 0.2s ease-in-out;
border-radius:10px;
&:hover {
    background-color: #ccc;
    transition: all 0.2s ease-in-out;
}
`;
const PageState = styled.div`
display:flex;
justify-content:center;
align-items:center;
font-family:"aggro";
font-weight:500;
font-size:20px;
color: ${props => props.theme.color};
`;
const activate_theme = { 
    color: "whitesmoke"
}
const disabled_theme = {
    color: "#777"
}

const Header = (props) => {
    const isAdmin = useSelector(state => state.toggleAdminHeader.isAdmin);
    const currentPageState = useSelector(state => state.toggleAddManage);
    return (
        <div className="header">
            <Link to={"/"} className="project_title">KEYWORD-ON</Link>
            {isAdmin === true
            ? <><CurrentPageContainer>
                {currentPageState.isAddPage === true
                ?   <ThemeProvider theme={activate_theme}>
                    <PageState>키워드 추가</PageState>
                    </ThemeProvider>
                :   <ThemeProvider theme={disabled_theme}>
                    <PageState>키워드 추가</PageState>
                    </ThemeProvider>
                }
                {currentPageState.isManagePage === true
                ?   <ThemeProvider theme={activate_theme}>
                    <PageState>키워드 관리</PageState>
                    </ThemeProvider>
                :   <ThemeProvider theme={disabled_theme}>
                    <PageState>키워드 관리</PageState>
                    </ThemeProvider>
                }
            </CurrentPageContainer>
            <HelloLabel>
                안녕하세요, 관리자님!
            </HelloLabel>
            <LogoutBtn to="/admin/login">
                로그아웃
            </LogoutBtn></>
            : null}
        </div>
    );
};

export default Header;