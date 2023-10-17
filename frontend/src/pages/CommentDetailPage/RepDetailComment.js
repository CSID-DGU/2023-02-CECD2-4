import React from 'react';
import styled from 'styled-components';

const RDCContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
width:55%;
font-family: "aggro";
font-weight: 500;
color:#777;
`;
const Comment = styled.div`
position:relative;
padding:15px 10px;
font-size:15px;
width:100%;
height:40%;
border: 2px solid #aaa;
border-radius:5px;
`;
const ArticleTitle = styled.div`
position:relative;
font-size:13px;
width:100%;
height:8%;
border: 2px solid #aaa;
padding:15px 10px;
border-radius:5px;
`;
const ArticleLink = styled.div`
position:relative;
font-size:13px;
width:100%;
height:8%;
border: 2px solid #aaa;
padding:15px 10px;
border-radius:5px;
`;
const BorderLabel = styled.label`
position:absolute;
left:7px;
top:-7px;
color:#777;
font-size:13px;
background-color:white;
padding-right:3px;
padding-left:3px;
`;

const RepDetailComment = (props) => {
    return (
        <RDCContainer>
            <Comment>
                <BorderLabel>댓글 내용</BorderLabel>
                {props.comment}
            </Comment>
            <ArticleTitle>
                <BorderLabel>기사 제목</BorderLabel>
                {props.title}
            </ArticleTitle>
            <ArticleLink>
                <BorderLabel>기사 링크</BorderLabel>
                {props.link}
            </ArticleLink>
        </RDCContainer>
    );
};

RepDetailComment.defaultProps = {
    emotion: "감정이 표시되는 영역입니다",
    comment: "댓글 내용이 표시되는 영역입니다.",
    title: "기사 제목이 표시되는 영역입니다.",
    link: "기사 링크가 표시되는 영역입니다.",
};

export default RepDetailComment;