import React from 'react';
import '../style/css/common.css';

const Input = (props) => {
    return (
        <div className='input '>
            <input type={props.type} style={props.style} 
                onInput={props.type != "checkbox" ? props.onChange : () => {}} 
                onClick={props.type == "checkbox" ? props.onChange : () => {}}
                onBlur={props.onBlur}
                defaultChecked={props.checked}
                defaultValue={props.defaultValue}
                value={props.value}
                name={props.name}
                id={props.id}
            />
        </div>
    );
}

export default Input;
