import React from 'react';
import '@scss/common.scss';

const Title = (props) => {
    return (
        <div className={"title "} style={props.style}>
           <span style={{whiteSpace : 'nowrap'}}>
                {props.label}
           </span>
        </div>
    );
}

export default Title;
