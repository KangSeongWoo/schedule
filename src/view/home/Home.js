import React, { useLayoutEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Headers from '@template/Header'
import Button from '@component/Button'
import SelectBox from '@component/SelectBox'
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { HashRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import loadable from '@loadable/component'

import 'react-calendar/dist/Calendar.css';
import '@scss/home.scss'

const dayOfTheWeek = [
  { label : "Sunday",     value : 0 },
  { label : "Monday",     value : 1 },
  { label : "Tuesday",    value : 2 },
  { label : "Wednesday",  value : 3 },
  { label : "Thursday",   value : 4 },
  { label : "Friday",     value : 5 },
  { label : "Saturday",   value : 6 },
]

const selectOptions = [
  { name : "일", value : "1", icon:'<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="4.15771" width="11" height="9.8421" rx="1" stroke="#444444" stroke-width="2"/><rect width="13" height="1.57895" rx="0.789474" fill="#444444"/></svg>'},
  { name : "3일", value : "3", icon:'<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="3.82354" height="15" rx="1" fill="#444444"/><rect x="9.17676" width="3.82354" height="15" rx="1" fill="#444444"/><rect x="4.58789" width="3.82354" height="15" rx="1" fill="#444444"/></svg>'},
  { name : "주간", value : "7", icon:'<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="6" width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="3" width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="12" width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="9" width="1.8782" height="15" rx="0.939101" fill="#444444"/></svg>'}
]

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
    setDefaultFilter(target.value)
    if(target.value == '1'){
      setViewState({
        ...viewState,
        category : "Day",
        excludedDays : []
      })
    } else if(target.value == '3') {
      let today = dayOfTheWeek.find((element) => element.label === moment().format("dddd")).value  

      let tempExcludedDays = []

      for(let i = 0; i < 3; i++){
        tempExcludedDays.push(today)
        today++
        if(today >= 7) today = today - 7
      }

      setViewState({
        ...viewState,
        category : "Week",
        excludedDays : dayOfTheWeek.filter(element => !tempExcludedDays.includes(element.value)).map((ele => {return ele.value}))
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
    console.log(e)
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
            <SelectBox value={defaultFilter} arr={selectOptions} onChange={changeFilter} border/>
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
