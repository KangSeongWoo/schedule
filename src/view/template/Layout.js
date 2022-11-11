import React from 'react';
import Contents from '@template/Contents'

import { connect } from 'react-redux'
import * as Common from '@utils/common.js';
import * as actions from '@store/actionCreators'

const Layout = (props) => {
    return (
        <>
            <input type="checkbox" id="openSideMenu" name="openSideMenu" value="" hidden/>
            <div className='layout'>
                <div className='mainwrap'>
                    <div className='dim'></div>
                    <Contents props={{...props}}/>
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    // setLogin: () => {
    //     dispatch(actions.setLogin())
    // }
})


const mapReduxStateToReactProps = (state) => {
    return ({
     
    })
}
  
  
export default connect(mapReduxStateToReactProps, mapDispatchToProps)(Layout)
