import React, { useEffect, useLayoutEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Headers from '@template/Header'
import Button from '@component/Button'
import SelectBox from '@component/SelectBox'
import KioskService from '@api/KioskService'
import { selectDaysInterval, WeekOfDays } from '@utils/constant';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { HashRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import loadable from '@loadable/component'
import { connect } from 'react-redux'
import * as actions from '@store/actionCreators'

import 'react-calendar/dist/Calendar.css';
import '@scss/home.scss'

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

const Home = (props) => {
  const { setUserInfo, openPopup, closePopup } = props;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [defaultFilter, setDefaultFilter] = useState({ value : 3 })
  const [viewState, setViewState] = useState({
    category : "Week",
    excludedDays : []
  })

  let history = useHistory();

  useLayoutEffect(() => {
    changeFilter(defaultFilter)
    getProfile();
  },[])

  useEffect(() => {
    showCalendar();
  },[defaultFilter])

  useEffect(() => {
    showCalendar();
  },[selectedDate])

  const getProfile = () => {
    KioskService.fetchUserProfile()
      .then(response => {
          let result = response.data

          setUserInfo(result)
      })
      .catch(error => {
          console.error(error)
      })
      .finally(() => {
        getWorkStores()
      })
  }

  const getWorkStores = () => {
    KioskService.fetchWorkStores()
      .then(response => {
        let result = response.data[0]
        if(result.stores?.lenght == 0){
          openPopup({
            title : '타이틀!',
            message : '메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!',
            callbackFunction : () => callbackFunction()
          });
        }
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  const callbackFunction = () =>{
    closePopup();
  }

  const showCalendar = () => {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      selectable: false,
      timeZone: 'UTC',
      initialView: 'timeGridThreeDay',
      initialDate: moment(selectedDate).format("YYYY-MM-DD"),      
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridThreeDay,timeGridWeek'
      },
      views: {
        timeGridThreeDay: {
          type: 'timeGrid',
          duration: { days: Number(defaultFilter.value) },
          buttonText: '3 day',
        },
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
          pathname: "/detail",
          state: info
        })
      },
      // dateClick: function(info) {
      //   alert('clicked ' + info.dateStr);
      // },
      events: schedulerData
    });
  
    calendar.render();

    var hammertime = new Hammer(calendarEl, {
      domEvents: true
    });
  
    hammertime.on("swipeleft", function (event) {
      console.log("Go to Next");
      var action = { action: event };
      calendar.next(action);
    });
  
    hammertime.on("swiperight", function (event) {
      console.log("Go to Previous");
      var action = { action: event };
      calendar.prev(action);
    });
  }

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
              onChange={setSelectedDate} 
              value={selectedDate} 
              tileContent={({ date, view }) => {
                let mark = schedulerData.map((element) => {
                  return element.start.split("T")[0]
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
          <div id='calendar'></div>
          {/* <Scheduler
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
          </Scheduler> */}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (params) => {
    dispatch(actions.setUserInfo(params))
  },
  openPopup: (params) => {
    dispatch(actions.openPopup(params))
  },
  closePopup: () => {
    dispatch(actions.closePopup())
  },
})


const mapReduxStateToReactProps = (state) => {
  return ({
    user : state.reduxState.user
  })
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(Home)
