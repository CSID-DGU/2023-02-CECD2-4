import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
width:100%;
height:20%;
`;
const SKContainer = styled.div`
display: flex;
align-items: center;
height:100%;
margin-left: 15px;
margin-right: auto;
font-family: "aggro";
font-weight: 700;
font-size:30px;
color:#555;
`;
const DEContainer = styled.div`
display: flex;
align-items: center;
height:100%;
margin-left: 15px;
margin-right: auto;
font-family: "aggro";
font-weight: 700;
font-size:30px;
color:#555;
`;

const RepInfo = (props) => {
    return (
        <MainContainer>
            <SKContainer>
                <div>KEYWORD:&nbsp;{props.keyword}</div>
            </SKContainer>
            <DEContainer>
                <div>상세 감정:&nbsp;{props.emotion}</div>
            </DEContainer>
        </MainContainer>
        
    );
};

export default RepInfo;