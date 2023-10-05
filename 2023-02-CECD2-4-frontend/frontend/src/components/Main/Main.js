import React, {useEffect} from 'react';
import "./Main.css";

const Main = (props) => {
    console.log(props.direction + " " + props.wrap);
    useEffect(()=>{
        document.getElementById("main").style.flexDirection = props.direction
        document.getElementById("main").style.flexWrap = props.wrap;
    }, [props.direction, props.wrap]);

    return (
        <div id="main" className='main_container'>
            {props.children}
        </div>
    );
};

Main.defaultProps = {
    direction: "column",
    wrap: "nowrap"
}

export default Main;