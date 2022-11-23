import React, { useEffect, useLayoutEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Headers from '@template/Header'
import Button from '@component/Button'
import SelectBox from '@component/SelectBox'
import KioskService from '@api/KioskService'
import { selectDaysInterval, WeekOfDays, selectColors } from '@utils/constant';
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
  const { setUserInfo, openPopup, closePopup, clearAllState } = props;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [defaultFilter, setDefaultFilter] = useState({ value : 3 })
  const [searchedList, setSearchedList] = useState()

  const [viewState, setViewState] = useState({
    category : "Week",
    excludedDays : []
  })

  let history = useHistory();

  useLayoutEffect(() => {
    //clearAllState();
    changeFilter(defaultFilter)
    getProfile();
    getSchdules();
  },[])

  useEffect(() => {
    showCalendar();
  },[defaultFilter])

  useEffect(() => {
    showCalendar();
  },[selectedDate,searchedList])

  const getSchdules = () => {
    let params = {}

    params.list = []

    for(let i = 0; i < defaultFilter.value; i++){
      params.list.push(moment(selectedDate).add(String(i), 'days').format("YYYYMMDD"))
    }

    KioskService.fetchGetLessonSchedulesList(params)
      .then(response => {
        let result = response.data
        let temp = [];
        //setSearchedList(result)

        result.proHolidayList.map((element) => {
          let startDate = moment(element.startYmd + " 000000")
          let endDate = moment(element.endYmd + " 000000").add(1, "days")

          for(let i = 0; i < moment.duration(endDate.diff(startDate)).asDays(); i++){
            temp.push({
              title: '휴무일',
              start: moment(element.startYmd).format("YYYY-MM-DD") + 'T00:00:00',
              end: moment(element.endYmd).format("YYYY-MM-DD") + 'T23:59:59',
              color : '#254728'
            })
          }
        })

        result.coachScheduleHeads.map((element1) => {
          element1.scheduleList.map((element2) => {
            element2.details.map((element3) => {
              temp.push({
                title: element2.storeUser.userName,
                start: moment(element3.startTime).locale("ko").format(),
                end: moment(element3.endTime).locale("ko").format(),
                color : selectColors.find((element) => element.value === '#'+element2.employeeStoreColor) ? '#'+element2.employeeStoreColor : '#152B5A'
              })
            })
          })
        })

        setSearchedList(temp)

      })
      .catch(error => {
          console.error(error)
      })
      .finally(() => {

      })
  }

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
        if(result.stores?.length == 0){
          openPopup({
            title : '알림',
            message : '메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!메세지!',
            callbackFunction : () => callbackFunction(),
            okButton : '확인'
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
      locale: 'en-GB',
      scrollTime: '00:00',
      slotLabelFormat: {  
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
      },
      eventClick : function(info) {
        if(info.title != "휴무일"){
          history.push({
            pathname: "/detail",
            state: info
          })
        }
      },
      height : 'auto',
      events: searchedList
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
  clearAllState : () => {
    dispatch(actions.clearAllState())
  }
})


const mapReduxStateToReactProps = (state) => {
  return ({
    user : state.reduxState.user
  })
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(Home)
