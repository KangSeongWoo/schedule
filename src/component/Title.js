import React from 'react';
import '../style/css/common.css';

const Title = (props) => {
    return (
        <div className={"title "}>
           <span style={{whiteSpace : 'nowrap'}}>
                {props.label}
           </span>
        </div>
    );
}

export default Title;
