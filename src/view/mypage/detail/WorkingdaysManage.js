import React, { useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import moment from 'moment';
import { ViewState,EditingState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@component/Button'
import Divider from '@component/Divider'
import SelectBox from '@component/SelectBox'
import Input from '@component/Input'
import BottomTimePopUp from '@component/BottomTimePopUp';
import { WeekOfDays, selectColors } from '@utils/constant';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const currentDate = moment().format("YYYY-MM-DD");

const schedulerData = [
  { startDate: '2022-11-10T09:45', endDate: '2022-11-10T11:00', title: 'Meeting' },
  { startDate: '2022-11-11T12:00', endDate: '2022-11-11T13:30', title: 'Go to a gym' },
];

const StoresManage = (props) => {
  const AppointmentContent = (e) => {
    return (
      <div className="appointment" onClick={() => detailAppointment(e)}>
        <span>{e.data.title}</span><br/>
        <span>{moment(e.data.startDate).format("h:mm a")} ~ {moment(e.data.endDate).format("h:mm a")}</span>
      </div>
    )
  }

  const detailAppointment = (e) => {
    history.push({
      pathname: "/storemanagedetail",
      state: e
    })
  }

  return (
    <>
      <Headers title="근무 스케쥴 관리" goback gobackFunction = "/mypage"/>
      <div className='workingdaysmanage'>
        <div className='scheduler'>
          <Scheduler
            data={schedulerData}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              currentViewName="Week"
            />

            <WeekView
              startDayHour={6}
              endDayHour={23}
            />
            <Appointments appointmentContentComponent={AppointmentContent}/>
          </Scheduler>
        </div> 
      </div>
    </>
  );
}

export default StoresManage;
