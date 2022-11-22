import React from 'react';
import Button from '@component/Button'
import { connect } from 'react-redux'
import * as actions from '@store/actionCreators'

import '@scss/common.scss';

const Popup = (props) => {
    const { popup } = props;
    return (
        <div className={"popup " + (popup?.flag ? '' : 'hide')} style={props.style}>
            <div className='dim'></div>
            <div className='contents'>
                <div className='title'>
                    {popup?.title}
                </div>
                <div className='message'>
                    {popup?.message}
                </div>
                <div className='button-area' style={{ display: (popup?.type != 'confirm' ? '' : 'inline-flex')}}>
                    {
                        popup?.type == 'confirm' && (
                            <>
                                <Button label={popup?.cancelButton} style={{height : '44px', borderRadius : '40px', width : '130px', color : '#B0B0B0', fontSize : '16px'}} border noarrow onChange={() => popup?.cancelFunction()}/>
                                <div style={{width : '20px'}}></div>
                            </>
                        )
                    }
                    <Button label={popup?.okButton} style={{height : '44px', borderRadius : '40px', width : '100px',fontSize : '16px'}} black noarrow onChange={() => popup?.callbackFunction()}/>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
   
})


const mapReduxStateToReactProps = (state) => {
    return ({
        popup : state.reduxState.popup
    })
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(Popup)
