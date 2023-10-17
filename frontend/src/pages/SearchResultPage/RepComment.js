import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Emotion = styled.div`
    font-size:25px;
    margin-right: 10px;
    border-left: 10px solid ${(props) => props.color};
`;
const RepCommentContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width:100%;
height:45vh;
font-family: "aggro";
font-weight: 500;
color:#777;
`;
const Comment = styled(Link)`
font-size:20px;
width:75%;
height:27px;
margin-right: 10px;
color:#777;
border: 2px solid #aaa;
text-decoration: none;
`;
const Likes = styled.div`
`;

const RepComment = (props) => {
    return (
        <RepCommentContainer>
            <Emotion color={props.color}>{props.emotion}</Emotion>
            <Comment to="/emotion_detail/*">{props.comment}</Comment>
            <Likes>{props.likes}</Likes>
        </RepCommentContainer>
    );
};

RepComment.defaultProps = {
    emotion: "감정",
    comment: "댓글내용",
    likes: "좋아요개수",

};

export default RepComment;