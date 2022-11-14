import React from 'react';
import '@scss/common.scss'

const Button = (props) => {
    return (
        <div className={"button-custom " + props.className + (props.border == true ? " border " : '') + (props.black == true ? " black " : '') + (props.children !== null ? " flex-center-center" : '')} onClick={() => props.onChange()} style={props.style}>
            {
                props.children && (
                    <div className='svgicon' style={{marginRight : '8px'}}>{props.children !== null ? props.children : ""}</div>
                )
            }
            <span>
                {props.label}
            </span>
            <i className='flex-center-center' style={{width : '15px', display : props.noarrow && 'none'}}>
                <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.36603 4.5C2.98112 5.16667 2.01887 5.16667 1.63397 4.5L0.334936 2.25C-0.0499643 1.58333 0.431161 0.75 1.20096 0.75L3.79904 0.75C4.56884 0.75 5.04996 1.58333 4.66506 2.25L3.36603 4.5Z" fill="#444444"/>
                </svg>
            </i>
        </div>
    );
}

export default Button;
