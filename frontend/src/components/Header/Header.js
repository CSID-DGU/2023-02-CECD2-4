import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
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
const Btn = styled(Link)`
display:flex;
justify-content:center;
align-items:center;
width:120px;
height:40px;
margin-right:10px;
font-family: "aggro";
font-weight: 500;
font-size:15px;
color:#222;
background-color: #ddd;
text-decoration:none;;
transition: all 0.2s ease-in-out;
border-radius:10px;
&:hover {
    background-color: #888;
    transition: all 0.2s ease-in-out;
}
`;
const PageState = styled(Link)`
display:flex;
justify-content:center;
align-items:center;
font-family:"aggro";
font-weight:500;
font-size:20px;
color: ${props => props.theme.color};
text-decoration:none;
`;
const activate_theme = { 
    color: "whitesmoke"
}
const disabled_theme = {
    color: "#777"
}

const Header = (props) => {
    const navigate = useNavigate();

    const isAdmin = useSelector(state => state.toggleAdminHeader.isAdmin);
    const currentPageState = useSelector(state => state.toggleAddManage);

    const onClickLogout = async () => {
        window.sessionStorage.clear();
        const response = await axios.get("https://"+process.env.REACT_APP_ADDRESS+"/auth/signout");
    }

    return (
        <div className="header">
            <Link to={"/"} className="project_title">KEYWORD-ON</Link>
            {isAdmin === true
            ? <><CurrentPageContainer>
                {currentPageState.isAddPage === true
                ?   <ThemeProvider theme={activate_theme}>
                    <PageState to="/admin/add/">키워드 추가</PageState>
                    </ThemeProvider>
                :   <ThemeProvider theme={disabled_theme}>
                    <PageState to="/admin/add/">키워드 추가</PageState>
                    </ThemeProvider>
                }
                {currentPageState.isManagePage === true
                ?   <ThemeProvider theme={activate_theme}>
                    <PageState to="admin/manage/index">키워드 관리</PageState>
                    </ThemeProvider>
                :   <ThemeProvider theme={disabled_theme}>
                    <PageState to="admin/manage/index">키워드 관리</PageState>
                    </ThemeProvider>
                }
            </CurrentPageContainer>
            <HelloLabel>
                안녕하세요, 관리자님!
            </HelloLabel>
            <Btn to="/admin/login/" onClick={onClickLogout}>
                로그아웃
            </Btn></>
            : 
            <Btn to="/admin/login">
                관리자 로그인
            </Btn>}
        </div>
    );
};

export default Header;