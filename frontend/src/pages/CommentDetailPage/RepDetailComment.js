import React from 'react';
import styled from 'styled-components';

const RDCContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width:55%;
font-family: "aggro";
font-weight: 500;
color:#777;
`;
const Comment = styled.div`
font-size:20px;
width:100%;
height:70%;
border: 2px solid #aaa;
`;
const ArticleTitle = styled.div`
font-size:20px;
width:100%;
height:15%;
border: 2px solid #aaa;
`;
const ArticleLink = styled.div`
font-size:20px;
width:100%;
height:15%;
border: 2px solid #aaa;
`;

const RepDetailComment = (props) => {
    return (
        <RDCContainer>
            <Comment>{props.comment}</Comment>
            <ArticleTitle>{props.title}</ArticleTitle>
            <ArticleLink>{props.link}</ArticleLink>
        </RDCContainer>
    );
};

RepDetailComment.defaultProps = {
    emotion: "감정",
    comment: "댓글내용",
    title: "기사제목",
    link: "기사링크",
};

export default RepDetailComment;