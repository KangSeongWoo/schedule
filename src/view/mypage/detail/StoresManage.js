import React, { useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import moment from 'moment';
import { ViewState,EditingState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import Title from '@component/Title'
import Card from '@component/Card'
import SelectBox from '@component/SelectBox'
import Input from '@component/Input'
import BottomTimePopUp from '@component/BottomTimePopUp';
import { WeekOfDays, selectColors } from '@utils/constant';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const StoresManage = (props) => {
  return (
    <>
      <Headers title="근무 매장 관리" goback gobackFunction = "/mypage"/>
      <div className='storemanage'>
        <Title label="근무 매장 관리" style={{fontWeight : '500', fontSize : '13px', lineHeight : '23px', color : '#343233'}}/>
        <div className='store-list'>
          <Card>
            <div className='info'>
              <div className='storename'>Golfus 반포</div>
              <div className='workingdays'>
                {
                  WeekOfDays.map((element) => (
                    <div className='workingday flex-center-center'>{element.label}</div>
                  ))
                }
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default StoresManage;
