import React from 'react';
import Headers from '@template/Header'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const HolidaysManage = (props) => {
  return (
    <>
        <Headers title="휴무일 관리" goback gobackFunction = "/mypage"/>
        <div className='holidays'>
            여기는 HolidaysManage 화면입니다.
        </div>
    </>
  );
}

export default HolidaysManage;
