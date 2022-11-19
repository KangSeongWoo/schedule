import React, { useEffect, useLayoutEffect,useState } from 'react';
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
import { HashRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const schedulerData = [
  {
    title: 'All Day Event',
    start: '2022-11-18T16:00:00',
    end: '2022-11-18T17:00:00',
    color : '#000000'
  },
  {
    title: 'Long Event',
    start: '2022-11-17',
    end: '2022-11-18',
    color : 'yellow'
  },
  {
    title: 'Repeating Event',
    start: '2022-11-19T16:00:00',
    end: '2022-11-19T20:00:00',
    color : 'blue'
  },
  {
    title: 'Repeating Event1',
    start: '2022-11-20T09:00:00',
    end: '2022-11-20T14:00:00',
    color : 'green'
  },
];

const StoresManage = (props) => {
  let history = useHistory();

  useEffect(() => {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      selectable: false,
      timeZone: 'UTC',
      initialView: 'timeGridWeek',   
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek'
      },
      slotMinTime: "06:00:00",
      slotMaxTime: "23:59:59",
      dayHeaderContent: function(target){
        console.log(target)
        return { 
          html : "<div class='date-format'><div>" + moment(target.date).lang("ko").format("dddd").substring(0,1) + "</div><div>" + moment(target.date).format("MM.DD") + "</div></div>"
        }
      },
      allDaySlot: false,
      height: 'auto',
      locale: 'en-GB',
      scrollTime: '00:00',
      slotLabelFormat: {  
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
      },
      eventClick : function(info) {
        history.push({
          pathname: "/storesmanagedetail",
          state: info
        })
      },
      dateClick: function(info) {
        history.push({
          pathname: "/storesmanagedetail",
          state: info
        })
      },
      events: schedulerData
    })
    calendar.render();
  },[])

  return (
    <>
      <Headers title="근무 스케쥴 관리" goback gobackFunction = "/mypage"/>
      <div className='workingdaysmanage'>
        <div className='scheduler'>
          <div id='calendar'></div>
        </div> 
      </div>
    </>
  );
}

export default StoresManage;
