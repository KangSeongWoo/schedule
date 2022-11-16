import React from 'react';

import '@scss/common.scss'

const Textarea = (props) => {
    return (
        <div className='textarea '>
            <textarea 
                style={props.style} 
                onChange={props.onChange} 
                defaultChecked={props.checked}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                readOnly={props.readOnly}
                placeholder={props.placeholder}
                value={props.value}
                name={props.name}
                id={props.id}
            />
        </div>
    );
}

export default Textarea;
