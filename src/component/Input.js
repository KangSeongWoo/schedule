import React from 'react';

import '@scss/common.scss'

const Input = (props) => {
    return (
        <div className='input '>
            <input 
                style={props.style} 
                onClick={props.onChange} 
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

export default Input;
