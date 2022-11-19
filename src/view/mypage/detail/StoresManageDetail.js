import React, { useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import Button from '@component/Button'
import Divider from '@component/Divider'
import SelectBox from '@component/SelectBox'
import Input from '@component/Input'
import BottomTimePopUp from '@component/BottomTimePopUp';
import { WeekOfDays, selectColors } from '@utils/constant';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const selectStores = [
  { name : "Golfus 반포", value : "1",},
  { name : "Golfus 대치", value : "2"},
  { name : "QED 골프아카데미 판교점", value : "3"}
]

const StoresManageDetail = (props) => {
  const [ defaultStore, setDefaultStore ] = useState({ value : selectStores[0].value })
  const [ defaultColor, setDefaultColor ] = useState({ value : selectColors[0].value })
  const [ selectedWeekOfDays, setSelectedWeekOfDays ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedTimeZone, setSelectedTimeZone ] = useState({
    totalStartTime : "",
    totalEndTime : "",
    MondayStartTime : "",
    MondayEndTime : "",
    TuesdayStartTime : "",
    TuesdayEndTime : "",
    WednesdayStartTime : "",
    WednesdayEndTime : "",
    ThursdayStartTime : "",
    ThursdayEndTime : "",
    FridayStartTime : "",
    FridayEndTime : "",
    SaturdayStartTime : "",
    SaturdayEndTime : "",
    SundayStartTime : "",
    SundayEndTime : "",
  })

  const [ targetId, setTargetId ] = useState("");

  useLayoutEffect(() => {
    changeStore(defaultStore)
    changeColor(defaultColor)
  },[])

  const changeStore = (target) => {
    setDefaultStore({value : target.value})
  }

  const changeColor = (target) => {
    setDefaultColor({value : target.value})
  }

  const selectWorkingDays = (target) => {
    let tempData = [...selectedWeekOfDays];

    if(tempData.includes(target)){
      tempData = tempData.filter((element) => element.valueNum !== target.valueNum)
    } else {
      tempData.push(target)
    }

    setSelectedWeekOfDays(tempData.sort((a, b) => {
      return a.valueNum - b.valueNum
    }))
  }

  const openModal = (e) => {
    setTargetId(e.target.id)
    setIsOpen(true)
  }

  const handleTime = (e) => {
    setIsOpen(false)

    let temp = { ...selectedTimeZone }

    temp[e.targetId] = e.timeLabel

    setSelectedTimeZone({
      ...selectedTimeZone,
      ...temp
    })
  }

  const setAllTimeSet = () => {
    setSelectedTimeZone({
      ...selectedTimeZone,
      MondayStartTime : selectedTimeZone.totalStartTime,
      MondayEndTime : selectedTimeZone.totalEndTime,
      TuesdayStartTime : selectedTimeZone.totalStartTime,
      TuesdayEndTime : selectedTimeZone.totalEndTime,
      WednesdayStartTime : selectedTimeZone.totalStartTime,
      WednesdayEndTime : selectedTimeZone.totalEndTime,
      ThursdayStartTime : selectedTimeZone.totalStartTime,
      ThursdayEndTime : selectedTimeZone.totalEndTime,
      FridayStartTime : selectedTimeZone.totalStartTime,
      FridayEndTime : selectedTimeZone.totalEndTime,
      SaturdayStartTime : selectedTimeZone.totalStartTime,
      SaturdayEndTime : selectedTimeZone.totalEndTime,
      SundayStartTime : selectedTimeZone.totalStartTime,
      SundayEndTime : selectedTimeZone.totalEndTime,
    })
  }

  return (
    <>
        <Headers title="근무 매장 관리" goback gobackFunction = "/workingdaysmanage"/>
        <div className='storemanagedetail'>
            <div className='subheader'>
                <Button label="근무 설정" noarrow style={{ display : 'block', borderBottom : '1px solid #000000', padding: '10px 0px' }}/>
                <div className='spacer'></div>
            </div>
            <Divider direction="horizental" style={{ margin : '0px' }}/>
            <div className='storemanagenotice'>
              <p>※ 근무설정을 수정해도 이미 등록된 레슨은 취소되지 않습니다.</p>
            </div>
            <div className='storemanageoptions'>
              <div className='selectstores'>
                <span className='label'>선택 매장</span>
                <div className='spacer'></div>
                <SelectBox value={defaultStore} arr={selectStores} onChange={changeStore}/>
              </div>
              <div className='selectcolor'>
                <span className='label'>매장 색상설정</span>
                <div className='spacer'></div>
                <SelectBox value={defaultColor} arr={selectColors} style={{height : '45px'}} onChange={changeColor} type="icon" horizental/>
              </div>
              <div className='selectWeekOfDays'>
                <ul>
                  { WeekOfDays.map((element) => (
                    <li>
                      <Button label={ element.label } className = {( selectedWeekOfDays.find((row) => row.value === element.value) ? "selected" : "")} noarrow onChange = {() => selectWorkingDays(element)}/>
                    </li>
                  )) }
                </ul>
              </div>
              <div>
                <span className='label'>시간 설정</span>
                <div className='spacer'></div>
              </div>
              <div className='times'>
                <Input id="totalStartTime" style={{ width : '100px', height: "26px", }} value={selectedTimeZone.totalStartTime} onChange = {(e) => openModal(e)} readOnly/>
                ~
                <Input id="totalEndTime" style={{ width : '100px', height: "26px" }} value={selectedTimeZone.totalEndTime} onChange = {(e) => openModal(e)} readOnly/>
                <Button label="적용" onChange={setAllTimeSet} black noarrow/>
              </div>
            </div>
            <Divider direction="horizental" />
            <div className='selectedDays'>
              { selectedWeekOfDays?.map((element1) => (
                 <div className='times' style={{marginTop : '10px'}}>
                  <div className="flex-center-center time-row" style={{borderRadius : '20px', width : '32px', height : '32px', backgroundColor : "#1A1A1A", fontWeight : '500', fontSize : '15px', color : '#FFFFFF' }}>
                    { WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.label }
                  </div>
                  <Input 
                    id={ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value + "StartTime") } 
                    value={selectedTimeZone[ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value) + "StartTime"]} 
                    style={{ width : '100px', height: "26px", }} 
                    onChange = {(e) => openModal(e)} readOnly/>
                  ~
                  <Input 
                    id={ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value + "EndTime") } 
                    value={selectedTimeZone[ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value) + "EndTime"]}
                    style={{ width : '100px', height: "26px" }} 
                    onChange = {(e) => openModal(e)} readOnly/>
                  <Button label="X" noarrow/>
                </div>
              )) }        
            </div>
            <div className='button-area'>
              <Divider direction="horizental" />
              <Button label="저장" style={{height : '30px'}} black noarrow/>
            </div>
        </div>
        <BottomTimePopUp type="time" id={targetId} open={isOpen} setIsOpen={setIsOpen} onChange={handleTime}/>
    </>
  );
}

export default StoresManageDetail;
