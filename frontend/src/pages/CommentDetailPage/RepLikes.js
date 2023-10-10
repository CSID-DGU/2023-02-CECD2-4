import React from 'react';
import "./RepLikes.css";

const RepLikes = (props) => {
    return (
        <div className="likes_info">{props.likes}</div>
    );
};

RepLikes.defaultProps = {
    likes: "댓글 좋아요/싫어요 정보"
};

export default RepLikes;