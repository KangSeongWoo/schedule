import React, { useEffect, useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import moment from 'moment';
import KioskService from '@api/KioskService'
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
import { connect } from 'react-redux'
import * as actions from '@store/actionCreators'

import '@scss/mypage.scss'

const StoresManage = (props) => {
  const [ stores, setStores ] = useState()
  const [ rowData, setRowData ] = useState();

  let history = useHistory();

  useEffect(() => {
    getWorkStores();
  },[])

  const getWorkStores = () => {
    KioskService.fetchWorkStores()
      .then(response => {
        let result = response.data[0].stores

        setRowData(result)

        let modifiedStore = []

        result.map((element1) => {
          element1.schedules.map((element2, index) => {
            modifiedStore.push(
              {
                title : element1.storeName,
                start: moment().startOf('week').add(Number(element2.week.code), "days").format("YYYY-MM-DD") + "T" + element2.workingStartTime.slice(0,2) + ":"+ element2.workingStartTime.slice(2,4) + ":00",
                end: moment().startOf('week').add(Number(element2.week.code), "days").format("YYYY-MM-DD") + "T" + element2.workingEndTime.slice(0,2) + ":"+ element2.workingEndTime.slice(2,4) + ":00",
                color : element1.employeeStoreColor != null ? "#"+element1.employeeStoreColor : '#152B5A',
                id : element1.storeId
              }
            )
          })
        })

        setStores(modifiedStore)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  useEffect(() => {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      selectable: false,
      timeZone: 'UTC',
      firstDay : 0,
      initialView: 'timeGridWeek',   
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek'
      },
      slotMinTime: "06:00:00",
      slotMaxTime: "23:59:59",
      dayHeaderContent: function(target){
        return { 
          html : "<div class='date-format'><div>" + moment(target.date).lang("ko").format("dddd").substring(0,1) + "</div><div>" + moment(target.date).format("MM.DD") + "</div></div>"
        }
      },
      eventContent: function(target){
        return { 
          html : "<div>" + target.event.title + "</div>"
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
          state: rowData.filter((element) => element.storeId !== info.event.id)[0]
        })
      },
      dateClick: function(info) {
        history.push({
          pathname: "/storesmanagedetail",
          state: info.event
        })
      },
      events: stores
    })
    calendar.render();
  },[stores])

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

const mapDispatchToProps = (dispatch) => ({
  setSchedule: (params) => {
    //dispatch(actions.setSchedule(params))
  },
})


const mapReduxStateToReactProps = (state) => {
  return ({
    //schedule : state.reduxState.schedule
  })
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(StoresManage)
