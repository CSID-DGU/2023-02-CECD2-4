import React from 'react';
import styled from 'styled-components';

const Emotion = styled.div`
    font-size:20px;
    margin-right: 10px;
    border-left: 5px solid ${(props) => props.color};
`;
const RepEmotionContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width:100%;
height:45%;
font-family: "aggro";
font-weight: 500;
color:#777;
`;
const Comment = styled.div`
font-size:20px;
width:75%;
height:27px;
margin-right: 10px;
margin-top: 15px;
margin-bottom: 15px;
border: 2px solid #aaa;
`;

const RepEmotion = (props) => {
    return (
        <RepEmotionContainer>
            <Emotion color={props.color}>{props.emotion}</Emotion>
            <Comment>{props.comment}</Comment>
        </RepEmotionContainer>
    );
};

RepEmotion.defaultProps = {
    emotion: "감정",
    comment: "대표 댓글"
};

export default RepEmotion;