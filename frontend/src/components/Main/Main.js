import React, {useEffect} from 'react';
import "./Main.css";

const Main = (props) => {
    console.log(props.direction + " " + props.wrap);
    useEffect(()=>{
        document.getElementById("main").style.flexDirection = props.direction
        document.getElementById("main").style.flexWrap = props.wrap;
        document.getElementById("main").style.justifyContent = props.justify;
    }, [props.direction, props.wrap, props.justify]);

    return (
        <div id="main" className='main_container'>
            {props.children}
        </div>
    );
};

Main.defaultProps = {
    direction: "column",
    wrap: "nowrap",
    justify: "flex-start"
}

export default Main;