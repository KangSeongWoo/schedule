import React, { useLayoutEffect, useState } from 'react';
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
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const startYear = 2022 

const HolidaysManage = (props) => {
  const [ chosenYear, setChosenYear ] = useState({ "value" : Number(moment().format("YYYY")) })
  const [ yearList, setYearList ] = useState([])
  const [ holiday, setHoliday ] = useState({ startDate : '', endDate : '', reason : '' })
  const [ isOpen, setIsOpen ] = useState(false)
  const [ targetId, setTargetId ] = useState("");

  useLayoutEffect(() => {
    changeStore({ "value" : Number(moment().format("YYYY")) })
    let thisYear = Number(moment().format("YYYY"));

    let list = []

    for(let i = startYear; i < thisYear + 1; i++){
      list.push({ "name" : i, "value" : i})
    }

    setYearList(list)
  },[])

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
  return (
    <>
        <Headers title="휴무일 관리" goback gobackFunction = "/mypage"/>
        <div className='holidays'>
          <div className='subheader'>
              <Button label="휴무 설정" noarrow style={{ display : 'block', borderBottom : '1px solid #000000', padding: '10px 0px' }}/>
              <div className='spacer'></div>
          </div>
          <Divider direction="horizental" style={{ margin : '0px' }}/>
          <div className='holiday-register'>
            <div className='title'>
              <Title label="휴무 일정" style={{fontWeight : '500', fontSize : '13px', lineHeight : '23px', color : '#343233'}}/>
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
                <Button label="등록" style={{ padding : '5px 30px'}} black noarrow/>
              </div>
              <div className='area2'>
                <Textarea 
                  id="reason"
                  value={holiday.reason} 
                  placeholder="사유"
                  onChange={handleReason}
                  style={{ width : '100%', height: "66px" }} />  
              </div>
              <div className='holidaynotice'>
                <p>※ 등록한 휴무일에는 레슨을 등록할 수 없습니다.</p>
              </div>
            </div>
          </div>
          <Divider direction="horizental"/>
          <div className='holiday-list'>
            <div className='title flex-center-center'>
              <Title label="휴무일 목록" style={{fontWeight : '500', fontSize : '13px', lineHeight : '23px', color : '#343233'}}/>
              <div className='spacer'></div>
              <SelectBox value={chosenYear} arr={yearList} onChange={changeStore} border/>
            </div>
            <div className='area1'>
              <Card style={{ marginTop :'10px' }}>
                <div className='info'>
                  <div className='period'>
                    <span className='period'>2022-11-05 ~ 2022-11-06(1일)</span>
                    <span className='delete'>삭제</span>
                  </div>
                  <div className='reason'>
                    <span>휴가</span>
                  </div>
                </div>
              </Card>
              <Card style={{ marginTop :'10px' }}>
                <div className='info'>
                  <div className='period'>
                    <span className='period'>2022-11-05 ~ 2022-11-06(1일)</span>
                    <span className='delete'>삭제</span>
                  </div>
                  <div className='reason'>
                    <span>휴가</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <BottomTimePopUp type="date" id={targetId} open={isOpen} setIsOpen={setIsOpen} onChange={handleDate}/>
    </>
  );
}

export default HolidaysManage;
