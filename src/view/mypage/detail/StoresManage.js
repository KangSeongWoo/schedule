import React, { useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import Button from '@component/Button'
import Divider from '@component/Divider'
import SelectBox from '@component/SelectBox'
import Input from '@component/Input'
import { WeekOfDays } from '@utils/constant';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/mypage.scss'

const selectStores = [
  { name : "Golfus 반포", value : "1",},
  { name : "Golfus 대치", value : "2"},
  { name : "QED 골프아카데미 판교점", value : "3"}
]

const selectColors = [
  { icon : '<div class="coloricon" style="background-color : #152B5A"></div>', value : "#152B5A"},
  { icon : '<div class="coloricon" style="background-color : #4898C0"></div>', value : "#4898C0"},
  { icon : '<div class="coloricon" style="background-color : #86BE72"></div>', value : "#86BE72"},
  { icon : '<div class="coloricon" style="background-color : #ABA631"></div>', value : "#ABA631"},
  { icon : '<div class="coloricon" style="background-color : #3C66D3"></div>', value : "#3C66D3"},
  { icon : '<div class="coloricon" style="background-color : #159A6A"></div>', value : "#159A6A"},
  { icon : '<div class="coloricon" style="background-color : #71367A"></div>', value : "#71367A"},
  { icon : '<div class="coloricon" style="background-color : #433737"></div>', value : "#433737"},
  { icon : '<div class="coloricon" style="background-color : #777777"></div>', value : "#777777"},
  { icon : '<div class="coloricon" style="background-color : #AC154B"></div>', value : "#AC154B"},
]

const StoresManage = (props) => {
  const [ defaultStore, setDefaultStore ] = useState({ value : selectStores[0].value })
  const [ defaultColor, setDefaultColor ] = useState({ value : selectColors[0].value })
  const [ selectedWeekOfDays, setSelectedWeekOfDays ] = useState([]);

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
    console.log(target)
    let tempData = [...selectedWeekOfDays];
    tempData.push(target.value)
    setSelectedWeekOfDays(tempData)
  }

  return (
    <>
        <Headers title="근무 매장 관리" goback gobackFunction = "/mypage"/>
        <div className='stores'>
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
                      <Button label={ element.label } className = {( selectedWeekOfDays.includes(element.value) ? "selected" : "")} noarrow onChange = {() => selectWorkingDays(element)}/>
                    </li>
                  )) }
                </ul>
              </div>
              <div>
                <span className='label'>시간 설정</span>
                <div className='spacer'></div>
              </div>
              <div className='times'>
                <Input style={{ width : '100px', height: "26px", }} disabled/>
                ~
                <Input style={{ width : '100px', height: "26px" }} disabled/>
                <Button label="적용" black noarrow/>
              </div>
              <Divider direction="horizental" />
            </div>
        </div>
    </>
  );
}

export default StoresManage;
