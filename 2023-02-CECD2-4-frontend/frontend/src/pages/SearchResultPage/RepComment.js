import React from 'react';
import styled from 'styled-components';
import "./RepComment.css";

const Emotion = styled.div`
    font-size:25px;
    margin-right: 10px;
    border-left: 10px solid ${(props) => props.color};
`;

const RepComment = (props) => {
    return (
        <div className="rep_comment">
            <Emotion color={props.color}>{props.emotion}</Emotion>
            <div className="comment">{props.comment}</div>
            <div className="likes">{props.likes}</div>
        </div>
    );
};

RepComment.defaultProps = {
    emotion: "감정",
    comment: "댓글내용",
    likes: "좋아요개수",

};

export default RepComment;