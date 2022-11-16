import React from 'react';
import '@scss/common.scss';

const Card = (props) => {
    return (
        <div className={"card "} style={props.style}>
            {props.children}
        </div>
    );
}

export default Card;
