import React from 'react';
import '@scss/template.scss'

const Divider = (props) => {
    return (
        <div className={"divider " + props.direction} style={props.style} ></div>
    );
}

export default Divider;
