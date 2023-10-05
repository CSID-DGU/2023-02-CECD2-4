import React from 'react';
import "./EmotionsContainer.css";

const EmotionsContainer = (props) => {
    return (
        <div className="emotions_container">
            <div className="caption">감정 비율</div>
            {props.children}
        </div>
    );
};

export default EmotionsContainer;