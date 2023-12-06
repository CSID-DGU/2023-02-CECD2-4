import React, {useRef}from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Emotion = styled.div`
    font-size:20px;
    margin-right: 10px;
    border-left: 10px solid ${(props) => props.color};
`;
const RepEmotionContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width:100%;
height:100%;
font-family: "aggro";
font-weight: 500;
color:#777;
`;
const Comment = styled(Link)`
font-size:16px;
width:450px;
min-height:30px;
margin-right: 10px;
margin-top: 5px;
margin-bottom: 5px;
padding:5px;
border: 2px solid #aaa;
border-radius: 5px;
text-decoration: none;
color: #777;
`;
const Text = styled.div`
overflow: hidden;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
text-align:justify;
`;
const More = styled.div`
font-size: 20px;
cursor: pointer;
`;
const Less = styled.div`
font-size: 20px;
cursor: pointer;
display:none;
`;

const RepEmotion = (props) => {
    const more_btn = useRef();
    const less_btn = useRef();
    const comment = useRef();

    const OnMoreClick = (e) => {
        more_btn.current.style.display = 'none';
        less_btn.current.style.display = 'inline-block';
        comment.current.style.display = 'inline-block';
    }

    const OnLessClick = (e) => {
        less_btn.current.style.display = 'none';
        more_btn.current.style.display = 'inline-block';
        comment.current.style.display = '-webkit-box';
    }
    return (
        <RepEmotionContainer>
            <Emotion color={props.color}>{props.emotion}</Emotion>
            <Comment to={"/comment_detail?keyword="+props.keyword+"&emotion="+props.emotion}
                state={{keyword: props.keyword, emotion: props.emotion, comment: props.comment}}>
                <Text ref={comment}>{props.comment.content}</Text>
            </Comment>
            <More onClick={OnMoreClick} ref={more_btn}>▼</More>
            <Less onClick={OnLessClick} ref={less_btn}>▲</Less>
        </RepEmotionContainer>
    );
};

export default RepEmotion;