import React from 'react';
import "./RepInfo.css";

const RepInfo = (props) => {
    return (
        <div className="top_container">
            <div className="search_keyword_container">
                <div>KEYWORD:&nbsp;{props.keyword}</div>
            </div>
            <div className="time_setting_container">
                기간설정:&nbsp;<input type="date"></input>&nbsp;~&nbsp;<input type="date"></input>
            </div>
        </div>
    );
};

RepInfo.defaultProps = {
    keyword: "EXAMPLE"
};

export default RepInfo;