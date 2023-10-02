import React from 'react';
import "./CommentsDetailContainer.css";

const CommentsDetailContainer = (props) => {
    return (
        <div className="comments_detail_container">
            {props.children}
        </div>
    );
};

export default CommentsDetailContainer;