import React, { useEffect, useLayoutEffect, useState } from 'react';
import Headers from '@template/Header'
import Button from '@component/Button'
import Divider from '@component/Divider'
import SelectBox from '@component/SelectBox'
import Title from '@component/Title'
import Input from '@component/Input'
import Textarea from '@component/Textarea'
import Card from '@component/Card'
import BottomTimePopUp from '@component/BottomTimePopUp';
import moment from 'moment'
import KioskService from '@api/KioskService'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import { connect } from 'react-redux'
import * as actions from '@store/actionCreators'

import '@scss/mypage.scss'

const startYear = 2022 

const HolidaysManage = (props) => {
  const { openPopup, closePopup } = props;

  const [ chosenYear, setChosenYear ] = useState({ "value" : Number(moment().format("YYYY")) })
  const [ yearList, setYearList ] = useState([])
  const [ holiday, setHoliday ] = useState({ startDate : '', endDate : '', reason : '' })
  const [ isOpen, setIsOpen ] = useState(false)
  const [ targetId, setTargetId ] = useState("");
  const [ holidayList, setHolidayList ] = useState([]);

  useLayoutEffect(() => {
    changeStore({ "value" : Number(moment().format("YYYY")) })
    let thisYear = Number(moment().format("YYYY"));

    let list = []

    for(let i = startYear; i < thisYear + 1; i++){
      list.push({ "name" : i, "value" : i})
    }

    setYearList(list)
    getHolidaysList();
  },[])

  useEffect(() => {
    getHolidaysList();
  },[chosenYear])

  const openModal = (e) => {
    setTargetId(e.target.id)
    setIsOpen(true)
  }

  const changeStore = (target) => {
    setChosenYear({value : target.value})
  }

  const handleReason = (e) => {
    setHoliday({
      ...holiday,
      reason : e.target.value
    })
  }

  const handleDate = (e) => {
    setIsOpen(false)

    let temp = { ...holiday }

    temp[e.targetId] = e.dateLabel

    setHoliday({
      ...holiday,
      ...temp
    })
  }

  const getHolidaysList = () => {
    let params = {}
    params.year = chosenYear.value;

    KioskService.fetchHolidays(params)
      .then(response => {
        let result = response.data

        setHolidayList(result)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  const regsisterHoliday = () => {
    let params = {}
    params.startYmd = holiday.startDate.replace(/-/gi,"");
    params.endYmd = holiday.endDate.replace(/-/gi,"");
    params.holidayReason = holiday.reason;
    params.reasonCode = "etc"
    params.holidayStatus = "Confirm";
    params.storeEmployeeId = [];
    params.storeEmployeeHolidayId = null
    params.cancelReason = null
    
    KioskService.fetchRegsisterHoliday(params)
      .then(response => {
        let result = response.data

        //setHolidayList(result)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        getHolidaysList();
      })
  }

  const ConfirmDeleteHoliday = (event) => {
    openPopup({
      type : 'confirm',
      title : '????????? ?????????????????????????',
      message : '??????????????? ???????????? ??? ????????????.',
      callbackFunction : () => deleteHolidayList(event),
      cancelFunction : () => closePopup(),
      okButton : '???',
      cancelButton : '?????????'
    });
  }

  const deleteHolidayList = (event) => {
    let params = {}

    params.storeEmployeeHolidayGroupId = event;
    params.cancelReason = null
    
    KioskService.fetchDeleteHoliday(params)
      .then(response => {
        let result = response.data

        //setHolidayList(result)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        closePopup()
        getHolidaysList();
      })
  }


  return (
    <>
        <Headers title="????????? ??????" goback gobackFunction = "/mypage"/>
        <div className='holidays'>
          <div className='subheader'>
              <Button label="?????? ??????" noarrow style={{ display : 'block', borderBottom : '1px solid #000000', padding: '10px 0px' }}/>
              <div className='spacer'></div>
          </div>
          <Divider direction="horizental" style={{ margin : '0px' }}/>
          <div className='holiday-register'>
            <div className='title'>
              <Title label="?????? ??????" style={{fontWeight : '500', fontSize : '13px', lineHeight : '23px', color : '#343233'}}/>
            </div>
            <div className='content'>
              <div className='area1'>
                <Input 
                  id="startDate" 
                  value={holiday.startDate} 
                  style={{ width : '100px', height: "26px", }} 
                  onChange = {(e) => openModal(e)} readOnly/>
                ~
                <Input 
                  id="endDate"
                  value={holiday.endDate} 
                  style={{ width : '100px', height: "26px" }} 
                  onChange = {(e) => openModal(e)} readOnly/>
                <Button label="??????" style={{ padding : '5px 30px'}} onChange={regsisterHoliday} black noarrow/>
              </div>
              <div className='area2'>
                <Textarea 
                  id="reason"
                  value={holiday.reason} 
                  placeholder="??????"
                  onChange={handleReason}
                  style={{ width : '100%', height: "66px" }} />  
              </div>
              <div className='holidaynotice'>
                <p>??? ????????? ??????????????? ????????? ????????? ??? ????????????.</p>
              </div>
            </div>
          </div>
          <Divider direction="horizental"/>
          <div className='holiday-list'>
            <div className='title flex-center-center'>
              <Title label="????????? ??????" style={{fontWeight : '500', fontSize : '13px', lineHeight : '23px', color : '#343233'}}/>
              <div className='spacer'></div>
              <SelectBox value={chosenYear} arr={yearList} onChange={changeStore} border/>
            </div>
            <div className='area1'>
              {
                holidayList.map((element) => (
                  <Card style={{ marginTop :'10px' }}>
                    <div className='info'>
                      <div className='period'>
                        <span className='period'>
                          {moment(element.startYmd).format("YYYY-MM-DD")} ~ {moment(element.endYmd).format("YYYY-MM-DD")}({Math.ceil(Number(moment.duration(moment(element.endTmd).diff(moment(element.startTmd))).asDays())) + 1}???)
                        </span>
                        <span className='delete' onClick={() => ConfirmDeleteHoliday(element.storeEmployeeHolidayGroupId)}>??????</span>
                      </div>
                      <div className='reason'>
                        <span>{element.holidayReason}</span>
                      </div>
                    </div>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
        <BottomTimePopUp type="date" id={targetId} open={isOpen} setIsOpen={setIsOpen} onChange={handleDate}/>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  openPopup: (params) => {
    dispatch(actions.openPopup(params))
  },
  closePopup: () => {
    dispatch(actions.closePopup())
  },
})


const mapReduxStateToReactProps = (state) => {
  return ({

  })
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(HolidaysManage)
