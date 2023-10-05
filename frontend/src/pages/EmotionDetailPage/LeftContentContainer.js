import React from 'react';
import "./LeftContentContainer.css";

const LeftContentContainer = (props) => {
    return (
        <div className="left_content_container">
            {props.children}
        </div>
    );
};

export default LeftContentContainer;
