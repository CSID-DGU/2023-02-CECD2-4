import React from 'react';
import styled from 'styled-components';
import "./RepRelated.css";

const RepRelated = (props) => {
    return (
        <div className="related_info">{props.content}</div>
    );
};

RepRelated.defaultProps = {
    content: "기사 본문 연관 문장"
};

export default RepRelated;