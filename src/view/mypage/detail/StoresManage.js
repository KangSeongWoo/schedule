import React from 'react';
import Headers from '@template/Header'
import Button from '@component/Button'
import Divider from '@component/Divider'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const StoresManage = (props) => {
  return (
    <>
        <Headers title="근무 매장 관리" goback gobackFunction = "/mypage"/>
        <div className='stores'>
            <div className='subheader'>
                <Button label="근무 설정" noarrow style={{ display : 'block', borderBottom : '1px solid #000000', padding: '10px 0px' }}/>
                <div className='spacer'></div>
            </div>
            <Divider direction="horizental" style={{ margin : '0px' }}/>
        </div>
    </>
  );
}

export default StoresManage;
