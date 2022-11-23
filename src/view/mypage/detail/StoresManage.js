import React, { useEffect, useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import moment from 'moment';
import KioskService from '@api/KioskService'
import { ViewState,EditingState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import Title from '@component/Title'
import Card from '@component/Card'
import SelectBox from '@component/SelectBox'
import Input from '@component/Input'
import BottomTimePopUp from '@component/BottomTimePopUp';
import * as Constant from '@utils/constant';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const StoresManage = (props) => {
  const [ rowData, setRowData ] = useState([]);

  useEffect(() => {
    getWorkStores();
  },[])

  const getWorkStores = () => {
    KioskService.fetchWorkStores()
      .then(response => {
        let result = response.data[0].stores

        setRowData(result)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  return (
    <>
      <Headers title="근무 매장 관리" goback gobackFunction = "/mypage"/>
      <div className='storemanage'>
        <Title label="근무 매장 관리" style={{fontWeight : '500', fontSize : '13px', lineHeight : '23px', color : '#343233'}}/>
        <div className='store-list'>
          {
            rowData.map((element1, index) => (
              <Card key={index} style={{marginTop : '10px'}}>
                <div className='info'>
                  <div className='storename'>{element1.storeName}</div>
                  <div className='workingdays'>
                    { 
                        element1.schedules.sort((a, b) => {
                          return Number(a.week.code) - Number(b.week.code)
                        }).map((element3) => {
                          return(
                            <div className='workingday flex-center-center'>{Constant.WeekOfDays.find((element4) => element4.valueNum === Number(element3.week.code)).label}</div>
                          )
                        })
                    }
                  </div>
                </div>
              </Card>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default StoresManage;
