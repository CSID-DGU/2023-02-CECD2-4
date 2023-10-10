import React from 'react';
import styled from 'styled-components';

const ContentBox = styled.div`
display: flex;
flex-direction: column;
font-size:20px;
width:60%;
height:75%;
border: 2px solid #aaa;
align-items: center;
`;

const SubContentBox = styled.div`
display: grid;
grid-template-columns:repeat(2, 50%);
justify-items:center;
font-size:20px;
width:90%;
height:50%;
border: 2px solid #aaa;
align-items: center;
margin-top:30px;
`;

const TextBoxContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items:flex-start;
width:80%;
height:70px;
border: 2px solid #aaa;
`;

const Label = styled.label`
position:absolute;
top: 0;
left:0;
color:#aaa;
font-family: "aggro";
font-size:20px;
transform-origin: 0 0;
transition: transform 0.2s ease-in-out;
pointer-events: none;
`;

const Value = styled.label`
position:absolute;
left:0;
bottom: 0;
color:#000;
font-family: "aggro";
font-size:20px;
transform-origin: 0 100%;
transition: transform 0.2s ease-in-out;
pointer-events: none;
`;

const BackBtn = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:40%;
height:50px;
font-family:"aggro";
font-size:25px;
color:#444;
border:0 none;
border-radius:15px;
background-color:#bbb;
margin-top:30px;
margin-bottom:30px;
`;

const ContentContainer = (props) => {
    return (
        <ContentBox>
            <SubContentBox>
                <TextBoxContainer>
                    <Label>키워드</Label>
                    <Value>{props.key}</Value>
                </TextBoxContainer>
                <TextBoxContainer>
                    <Label>등록자 ID</Label>
                    <Value>{props.id}</Value>
                </TextBoxContainer>
            </SubContentBox>
            <SubContentBox>
                <TextBoxContainer>
                    <Label>등록일</Label>
                    <Value>{props.day}</Value>
                </TextBoxContainer>
                <TextBoxContainer>
                    <Label>갱신일</Label>
                    <Value>{props.updated}</Value>
                </TextBoxContainer>
                <TextBoxContainer>
                    <Label>상태</Label>
                    <Value>{props.state}</Value>
                </TextBoxContainer>
                <TextBoxContainer>
                    <Label>설명</Label>
                    <Value>{props.explain}</Value>
                </TextBoxContainer>
            </SubContentBox>
            <BackBtn>돌아가기</BackBtn>
        </ContentBox>
    );
};

ContentContainer.defaultProps = {
    key : "Keyword",
    id : "asdf",
    day  : "2023-10-11",
    updated : "2023-10-12",
    state : "good",
    explain : "asdf",
};

export default ContentContainer;