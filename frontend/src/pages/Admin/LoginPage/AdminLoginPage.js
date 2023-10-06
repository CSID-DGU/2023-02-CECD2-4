import React from 'react';
import Main from '../../../components/Main/Main';
import LoginForm from './LoginForm';
import IssueContact from './IssueContact';
import styled from 'styled-components';

const CaptionContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:50%;
    height:10%;
    font-family:"aggro";
    font-weight:700;
    font-size:35px;
`;

const AdminLoginPage = (props) => {
    return (
        <Main>
            <CaptionContainer>
                관리자 로그인
            </CaptionContainer>
            <LoginForm/>
            <IssueContact/>
        </Main>
    );
};

export default AdminLoginPage;