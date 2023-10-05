import React from 'react';
import "./RepInfo.css";

const RepInfo = (props) => {
    return (
        <div className="bigger_top_container">
            <div className="search_keyword_container">
                <div>KEYWORD:&nbsp;{props.keyword}</div>
            </div>
            <div className="detail_emotion_container">
                <div>상세 감정:&nbsp;{props.emotion}</div>
            </div>
        </div>
        
    );
};

RepInfo.defaultProps = {
    keyword: "EXAMPLE",
    emotion: "EXAMPLE"
};

export default RepInfo;