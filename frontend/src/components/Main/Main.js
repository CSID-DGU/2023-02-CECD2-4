import React from 'react';
import "./Main.css";

const Main = (props) => {
    return (
        <div className='main_container'>
            {props.children}
        </div>
    );
};

export default Main;