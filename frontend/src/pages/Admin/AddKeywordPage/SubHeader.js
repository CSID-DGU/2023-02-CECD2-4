import React from 'react';
import styled from 'styled-components';

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

const SubHeader = (props) => {
    return (
        <TopContainer>
            <Label>{props.text}</Label>
            <Line/>
        </TopContainer>        
    );
};

export default SubHeader;