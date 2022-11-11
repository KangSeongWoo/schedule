import React from 'react';
import Headers from '@template/Header'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const WorkingdaysManage = (props) => {
  return (
    <>
        <Headers title="근무 스케줄 관리" goback gobackFunction = "/mypage"/>
        <div className='workingdays'>
            여기는 WorkingdaysManage 화면입니다.
        </div>
    </>
  );
}

export default WorkingdaysManage;
