import React from 'react';
import "./RepDetailComment.css";

const RepDetailComment = (props) => {
    return (
        <div className="rep_detail_comment">
            <div className="comment_content">{props.comment}</div>
            <div className="article_title">{props.title}</div>
            <div className="article_link">{props.link}</div>
        </div>
    );
};

RepDetailComment.defaultProps = {
    emotion: "감정",
    comment: "댓글내용",
    title: "기사제목",
    link: "기사링크",
};

export default RepDetailComment;