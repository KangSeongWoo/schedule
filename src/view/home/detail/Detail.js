import React from 'react';
import Headers from '@template/Header'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/home.scss'

const Detail = (props) => {
  return (
    <>
        <Headers title="레슨 예약 내역" goback gobackFunction = "/home"/>
        <div className='homedetail'>
            <ul>
                <li>
                    <div>
                        <span className='label'>회원명</span>
                        <div className='spacer'></div>
                        <span className='value'>최대철</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span className='label'>연락처</span>
                        <div className='spacer'></div>
                        <span className='value'>010-5174-2860</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span className='label'>매장명</span>
                        <div className='spacer'></div>
                        <span className='value'>QED 아카데미 반포 1호점</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span className='label'>예약 타석</span>
                        <div className='spacer'></div>
                        <span className='value'>001</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span className='label'>예약 날짜</span>
                        <div className='spacer'></div>
                        <span className='value'>2022.08.28 (수)</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span className='label'>레슨 예정 시간</span>
                        <div className='spacer'></div>
                        <span className='value'>12:00 ~ 12:30</span>
                    </div>
                </li>
                <li>
                    <div>
                        <span className='label'>이용권/회원권</span>
                        <div className='spacer'></div>
                        <span className='value'>레슨권 1개월 8회</span>
                    </div>
                </li>
            </ul>
            <div className='daummap'>

            </div>
        </div>
    </>
  );
}

export default Detail;
