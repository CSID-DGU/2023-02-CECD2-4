import React from 'react';
import styled from 'styled-components';

const ContentBox = styled.div`
display: flex;
flex-direction: column;
font-size:20px;
width:60%;
height:65%;
align-items: center;
justify-content: space-evenly;
`;

const InfoContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
font-size:20px;
`;

const TopContainer = styled(InfoContainer)`
width:90%;
height:15%;
`;

const BottomContainer = styled(InfoContainer)`
width:90%;
height:65%;
`;

const iContainer = styled.div`
position: relative;
display: flex;
justify-content:space-evenly;
align-items:center;
border: 2px solid #aaa;
border-radius: 3px;
`;

const KeywordContainer = styled(iContainer)`
width:45%;
height:40px;
`;
const IDContainer = styled(iContainer)`
width:45%;
height:40px;
`;
const DetailContainer = styled(iContainer)`
width: 30%;
height:50px;
`;
const DescContainer = styled(iContainer)`
width:100%;
height:60%;
align-items:flex-start;
margin-top:20px;
`;

const Label = styled.label`
position:absolute;
top: -7px;
left:7px;
color:#aaa;
font-family: "aggro";
font-size:14px;
background-color: white;
pointer-events: none;
padding-left: 3px;
padding-right: 3px;
`;

const Value = styled.label`
color:#000;
font-family: "aggro";
font-size:14px;
pointer-events: none;
margin: 10px;
`;

const ContentContainer = (props) => {
    return (
        <ContentBox>
            <TopContainer>
                <KeywordContainer>
                    <Label>키워드</Label>
                    <Value>{props.key}</Value>
                </KeywordContainer>
                <IDContainer>
                    <Label>등록자 ID</Label>
                    <Value>{props.id}</Value>
                </IDContainer>
            </TopContainer>
            <BottomContainer>
                <DetailContainer>
                    <Label>등록일</Label>
                    <Value>{props.day}</Value>
                </DetailContainer>
                <DetailContainer>
                    <Label>갱신일</Label>
                    <Value>{props.updated}</Value>
                </DetailContainer>
                <DetailContainer>
                    <Label>상태</Label>
                    <Value>{props.state}</Value>
                </DetailContainer>
                <DescContainer>
                    <Label>설명</Label>
                    <Value>{props.explain}</Value>
                </DescContainer>
            </BottomContainer>
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