import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80%;
height: 20%;  
`;
const SearchContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
height: 50%;
`;
const SearchItemContainer = styled.div`
position:relative;
width: 30%;
height: 50%;
margin-left: auto;
`;
const Caption = styled.h2`
font-family: "aggro";
font-weight: 700;
color:#444;
`;
const SearchInput = styled.input`
border:none;
border-bottom: 2px solid #ccc;
background-color: unset;
outline:none;
width:95%;
height: 40px;
font-family: "aggro";
font-size: 25px;
color:#444;
caret-color: #bbb;
input:focus + label, input:not(:placeholder-shown) + label{
    transform: translateY(-27px) scale(0.7);
}
`;
const SearchInputLabel = styled.label`
position:absolute;
left:3px;
top:10px;
color:#ccc;
margin:0;
font-family: "aggro";
font-size:20px;
transform-origin: 0 0;
transition: transform 0.2s ease-in-out;
pointer-events: none;
`;
const SearchBtn = styled(Link)`
position:absolute;
right:15px;
top:0;
width:50px;
height:40px;
font-family: "aggro";
font-size: 20px;
text-align: center;
line-height: 40px;
color:#444;
background-color:#ccc;
text-decoration: none;
&:hover {
    background-color:#aaa;
}
`;
const UnderLine = styled.hr`
width:100%;
margin:0;
margin-top:10px;
border: 0;
height: 3px;
background-color: #ccc;
`;


const KeywordSearchBox = (props) => {
    return (
        <MainContainer>
            <SearchContainer>
                <Caption>키워드 관리</Caption>
                <SearchItemContainer>
                    <SearchInput type="text" placeholder=" "></SearchInput>
                    <SearchInputLabel>SEARCH</SearchInputLabel>
                    <SearchBtn>검색</SearchBtn>
                </SearchItemContainer>
            </SearchContainer>
            <UnderLine/>
        </MainContainer>
    );
};

export default KeywordSearchBox;