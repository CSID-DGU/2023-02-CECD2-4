import React from 'react';
import "./CommentsContainer.css";

const CommentsContainer = (props) => {
    return (
        <div className="comments_container">
            <div className="caption">대표 댓글</div>
            {props.children}
        </div>
    );
};

export default CommentsContainer;