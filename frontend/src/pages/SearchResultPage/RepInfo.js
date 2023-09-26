import React from 'react';
import "./RepInfo.css";

const RepInfo = (props) => {
    return (
        <>
            <div className="search_keyword_container">
                <div>KEYWORD : {props.keyword}</div>
            </div>
            <div className="time_setting_container">
                기간설정
            </div>
        </>
    );
};

RepInfo.defaultProps = {
    keyword: "EXAMPLE"
};

export default RepInfo;