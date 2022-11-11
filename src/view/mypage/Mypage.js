import React from 'react';
import Headers from '@template/Header'
import { HashRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const MyPage = (props) => {
  let history = useHistory();

  const movePage = (target) => {
    history.push({
      pathname: target,
      state: {}
    })
  }

  const logout = () => {
    console.log("로그아웃")
  }

  return (
    <>
        <Headers title="MY"/>
        <div className='mypage'>
            <ul>
                <li onClick={() => movePage()}>
                    <div>
                        <span className='label'>내 정보 수정</span>
                        <div className='spacer'></div>
                    </div>
                </li>
                <li onClick={() => movePage('/storesmanage')}>
                    <div>
                        <span className='label'>근무 매장 관리</span>
                        <div className='spacer'></div>
                    </div>
                </li>
                <li onClick={() => movePage('/workingdaysmanage')}>
                    <div>
                        <span className='label'>근무 스케줄 관리</span>
                        <div className='spacer'></div>
                    </div>
                </li>
                <li onClick={() => movePage('/holidaysmanage')}> 
                    <div>
                        <span className='label'>휴무일 관리</span>
                        <div className='spacer'></div>
                    </div>
                </li>
                <li onClick={() => logout()}>
                    <div>
                        <span className='label' style={{ color : '#FF0000' }}>로그아웃</span>
                        <div className='spacer'></div>
                    </div>
                </li>
            </ul>
        </div>
    </>
  );
}

export default MyPage;
