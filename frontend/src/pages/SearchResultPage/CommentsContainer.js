import React from 'react';
import "./CommentsContainer.css";

const CommentsContainer = (props) => {
    return (
        <div className="comments_container">
            {props.children}
        </div>
    );
};

export default CommentsContainer;