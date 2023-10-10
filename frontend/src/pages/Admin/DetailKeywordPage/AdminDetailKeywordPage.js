import React from 'react';
import Main from "../../../components/Main/Main";
import styled from 'styled-components';
import ContentContainer from './ContentContainer';

const TopContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
width:90%;
height:20%;
`;

const Label = styled.div`
display: flex;
align-items: center;
height:100%;
margin-top:30px;
font-family: "aggro";
font-weight: 700;
font-size:30px;
color:#555;
`;

const Line = styled.div`
width:100%;
height:50%;
border-top: 1px solid #aaa;
margin: 30px auto;
`;


const AdminDetailKeywordPage = () => {
    return (
        <Main>
        <TopContainer>
            <Label>상세 키워드</Label>
            <Line/>
        </TopContainer> 
        <ContentContainer/>
        </Main>
    );
};

export default AdminDetailKeywordPage;