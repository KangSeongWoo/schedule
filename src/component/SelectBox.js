import React, { useState } from 'react';
import '@scss/common.scss';

const SelectBox = (props) => {
    const [isShow, setIsShow] = useState(false) 

    const changeOption = (target) => {
        props.onChange(target)
        setIsShow(!isShow)
    }
    const showOptions = () => {
        setIsShow(!isShow)
    }
    
    return (
        <div className="selectbox">
            <div className={"selectBox-custom flex-center-center " + (props.border == true ? "border " : '')} onClick={showOptions}>
                <i className="svgicon" dangerouslySetInnerHTML={ {__html: props?.arr?.find((element, index) => element.value == props.value.value)?.icon} }></i>
                <span style={{marginLeft : props.border ? '8px' : ''}}>{ props?.arr?.find((element, index) => element.value == props.value.value)?.name }</span>
                <div className='spacer'></div>
                <i className='flex-center-center' style={{width : '15px'}}>
                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.36603 4.5C2.98112 5.16667 2.01887 5.16667 1.63397 4.5L0.334936 2.25C-0.0499643 1.58333 0.431161 0.75 1.20096 0.75L3.79904 0.75C4.56884 0.75 5.04996 1.58333 4.66506 2.25L3.36603 4.5Z" fill="#444444"/>
                    </svg>
                </i>
            </div>
            <div className={'option-area ' + (!isShow ? 'no-show' : '')} style={props.style}>
                <ul style={{ display : props.horizental ? "flex" : "" }}>
                    { 
                        props?.arr?.map((element) => (
                            <li key={element.value} onClick={() => changeOption(element)} style={{margin : props.type == 'icon' ? '10px 6px -4px 6px' : ''}}>
                                <i className="svgicon" dangerouslySetInnerHTML={ {__html: element.icon} }></i>
                                <span style={{marginLeft : '8px'}}>{ element.name }</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default SelectBox;
