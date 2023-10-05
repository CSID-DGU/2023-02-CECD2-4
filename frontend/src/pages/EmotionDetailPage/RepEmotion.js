import React from 'react';
import styled from 'styled-components';
import "./RepEmotion.css";

const Emotion = styled.div`
    font-size:20px;
    margin-right: 10px;
    border-left: 5px solid ${(props) => props.color};
`;

const RepEmotion = (props) => {
    return (
        <div className="rep_emotion">
            <Emotion color={props.color}>{props.emotion}</Emotion>
            <div className="emotion">{props.comment}</div>
        </div>
    );
};

RepEmotion.defaultProps = {
    emotion: "감정",
    comment: "대표 댓글"
};

export default RepEmotion;