import React, { useLayoutEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Headers from '@template/Header'
import Button from '@component/Button'
import SelectBox from '@component/SelectBox'
import { selectDaysInterval, WeekOfDays } from '@utils/constant';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { HashRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import loadable from '@loadable/component'

import 'react-calendar/dist/Calendar.css';
import '@scss/home.scss'

const currentDate = moment().format("YYYY-MM-DD");

const schedulerData = [
  { startDate: '2022-11-10T09:45', endDate: '2022-11-10T11:00', title: 'Meeting' },
  { startDate: '2022-11-11T12:00', endDate: '2022-11-11T13:30', title: 'Go to a gym' },
];

const Home = (props) => {
  const [today, setToday] = useState(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [defaultFilter, setDefaultFilter] = useState({ value : 3 })
  const [viewState, setViewState] = useState({
    category : "Week",
    excludedDays : []
  })

  let history = useHistory();

  useLayoutEffect(() => {
    changeFilter(defaultFilter)
  },[])

  const calendarView = () => {
    setIsShowCalendar(!isShowCalendar)
  }

  const changeFilter = (target) => {
    setDefaultFilter({ value : target.value })
    if(target.value == '1'){
      setViewState({
        ...viewState,
        category : "Day",
        excludedDays : []
      })
    } else if(target.value == '3') {
      let today = WeekOfDays.find((element) => element.value === moment().format("dddd")).valueNum  

      let tempExcludedDays = []

      for(let i = 0; i < 3; i++){
        tempExcludedDays.push(today)
        today++
        if(today >= 7) today = today - 7
      }

      setViewState({
        ...viewState,
        category : "Week",
        excludedDays : WeekOfDays.filter(element => !tempExcludedDays.includes(element.valueNum)).map((ele => {return ele.valueNum}))
      })
    } else if(target.value == '7'){
      setViewState({
        ...viewState,
        category : "Week",
        excludedDays : []
      })
    }
  }
        
  const detailAppointment = (e) => {
    history.push({
      pathname: "/detail",
      state: e
    })
  }

  const AppointmentContent = (e) => {
    return (
      <div className="appointment" onClick={() => detailAppointment(e)}>
        <span>{e.data.title}</span><br/>
        <span>{moment(e.data.startDate).format("h:mm a")} ~ {moment(e.data.endDate).format("h:mm a")}</span>
      </div>
    )
  }
  return (
    <>
      <Headers mode="header"/>
      <div className='home'>
        <div className='subheader'>
          <div>
          <Button label="📆 9월" onChange={calendarView} />
            <div className='spacer'></div>
            <SelectBox value={defaultFilter} arr={selectDaysInterval} onChange={changeFilter} border/>
          </div>
          <div className='calendar'>
            <Calendar 
              className={"mx-auto w-full text-sm border-b " + (!isShowCalendar ? 'no-show' : '')}
              calendarType="US"
              formatDay={(locale, date) => {
                return moment(date).format("D")
              }}
              onChange={setToday} 
              value={today} 
              tileContent={({ date, view }) => {
                let mark = schedulerData.map((element) => {
                  return element.startDate.split("T")[0]
                })
                if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                  return (
                  <>
                    <div className="flex-center-center">
                      <div className="dot"></div>
                    </div>
                  </>
                );
                }
              }}
            />
          </div>
        </div>
        <div className='scheduler'>
          <Scheduler
            data={schedulerData}
          >
            <ViewState
              defaultCurrentDate={currentDate}
              currentViewName={viewState.category}
            />

            <WeekView
              startDayHour={6}
              endDayHour={23}
              excludedDays={viewState.excludedDays}
            />
            <DayView
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

export default Home;
