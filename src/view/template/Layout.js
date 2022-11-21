import React from 'react';
import Contents from '@template/Contents'
import Popup from '@component/Popup';

import { connect } from 'react-redux'
import * as Common from '@utils/common.js';
import * as actions from '@store/actionCreators'

const Layout = (props) => {
    return (
        <div className='layout'>
            <div className='mainwrap'>
                <Popup/>
                <Contents props={{...props}}/>
            </div>
        </div>
    );
}
  
export default Layout
