import React, { useLayoutEffect,useState } from 'react';
import Headers from '@template/Header'
import Button from '@component/Button'
import Divider from '@component/Divider'
import SelectBox from '@component/SelectBox'
import Input from '@component/Input'
import KioskService from '@api/KioskService'
import BottomTimePopUp from '@component/BottomTimePopUp';
import { useHistory } from 'react-router-dom'
import { WeekOfDays, selectColors } from '@utils/constant';
import loadable from '@loadable/component'
import * as Common from '@utils/common.js';
import { connect } from 'react-redux'
import * as actions from '@store/actionCreators'

import '@scss/mypage.scss'
import moment from 'moment';

const StoresManageDetail = (props) => {
  const defaultData = props.location.state
  const { setUserInfo, openPopup, closePopup, clearAllState } = props;

  const [ defaultStore, setDefaultStore ] = useState({ value : defaultData?.storeId })
  const [ defaultColor, setDefaultColor ] = useState({ value : Common.trim(defaultData?.employeeStoreColor) !== '' ? "#"+defaultData?.employeeStoreColor : '#152B5A' })
  const [ storeList, setStoreList ] = useState([{ name : defaultData?.storeName, value : defaultData?.storeId }])
  const [ workStores, setWorkStores ] = useState()
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

  let history = useHistory();

  useLayoutEffect(() => {
    setDefaultPage();
    if(Common.trim(defaultData) == ''){
      getWorkStoreList();
      getWorkStores();
    }
    changeStore(defaultStore);
    changeColor(defaultColor);
  },[])

  const getWorkStores = () => {
    KioskService.fetchWorkStores()
      .then(response => {
        let result = response.data[0].stores

        setWorkStores(result)
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  const getWorkStoreList = () => {
    KioskService.fetchWorkStoreList()
      .then(response => {
        let result = response.data

        setStoreList(
          result.map((element) => {
            return {
              name : element.storeName,
              value : element.storeId
            }
          })
        )

        setDefaultStore({ value : result[0].storeId})
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  const setDefaultPage = () => {
    let tempList = []

    defaultData?.schedules.map((element1) => {
      tempList.push(WeekOfDays.find((element2) => Number(element1.week.code) === element2.valueNum))
    })

    setSelectedTimeZone({
      ...selectedTimeZone,
      SundayStartTime :     defaultData?.schedules.find((element) => element.week.code === "0")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "0")?.workingStartTime) : '',
      SundayEndTime :       defaultData?.schedules.find((element) => element.week.code === "0")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "0")?.workingEndTime) : '',
      MondayStartTime :     defaultData?.schedules.find((element) => element.week.code === "1")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "1")?.workingStartTime) : '',
      MondayEndTime :       defaultData?.schedules.find((element) => element.week.code === "1")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "1")?.workingEndTime) : '',
      TuesdayStartTime :    defaultData?.schedules.find((element) => element.week.code === "2")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "2")?.workingStartTime) : '',
      TuesdayEndTime :      defaultData?.schedules.find((element) => element.week.code === "2")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "2")?.workingEndTime) : '',
      WednesdayStartTime :  defaultData?.schedules.find((element) => element.week.code === "3")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "3")?.workingStartTime) : '',
      WednesdayEndTime :    defaultData?.schedules.find((element) => element.week.code === "3")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "3")?.workingEndTime) : '',
      ThursdayStartTime :   defaultData?.schedules.find((element) => element.week.code === "4")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "4")?.workingStartTime) : '',
      ThursdayEndTime :     defaultData?.schedules.find((element) => element.week.code === "4")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "4")?.workingEndTime) : '',
      FridayStartTime :     defaultData?.schedules.find((element) => element.week.code === "5")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "5")?.workingStartTime) : '',
      FridayEndTime :       defaultData?.schedules.find((element) => element.week.code === "5")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "5")?.workingEndTime) : '',
      SaturdayStartTime :   defaultData?.schedules.find((element) => element.week.code === "6")?.workingStartTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "6")?.workingStartTime) : '',
      SaturdayEndTime :     defaultData?.schedules.find((element) => element.week.code === "6")?.workingEndTime !== undefined ? moment(moment().format("YYYYMMDD") + " " + defaultData?.schedules.find((element) => element.week.code === "6")?.workingEndTime) : '',
    })

    setSelectedWeekOfDays(tempList.sort((a, b) => {
      return a.valueNum - b.valueNum
    }))
  }

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

    temp[e.targetId] = e.momentType

    console.log(e.momentType)

    setSelectedTimeZone({
      ...selectedTimeZone,
      ...temp
    })
  }

  const setAllTimeSet = () => {
    if( selectedTimeZone.totalStartTime != '' && selectedTimeZone.totalEndTime == '' ){
      setSelectedTimeZone({
        ...selectedTimeZone,
        MondayStartTime : selectedTimeZone.totalStartTime,
        TuesdayStartTime : selectedTimeZone.totalStartTime,
        WednesdayStartTime : selectedTimeZone.totalStartTime,
        ThursdayStartTime : selectedTimeZone.totalStartTime,
        FridayStartTime : selectedTimeZone.totalStartTime,
        SaturdayStartTime : selectedTimeZone.totalStartTime,
        SundayStartTime : selectedTimeZone.totalStartTime,
      })
    } else if( selectedTimeZone.totalStartTime == '' && selectedTimeZone.totalEndTime != '' ) {
      setSelectedTimeZone({
        ...selectedTimeZone,
        MondayEndTime : selectedTimeZone.totalEndTime,
        TuesdayEndTime : selectedTimeZone.totalEndTime,
        WednesdayEndTime : selectedTimeZone.totalEndTime,
        ThursdayEndTime : selectedTimeZone.totalEndTime,
        FridayEndTime : selectedTimeZone.totalEndTime,
        SaturdayEndTime : selectedTimeZone.totalEndTime,
        SundayEndTime : selectedTimeZone.totalEndTime,
      })
    } else {
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
  }

  const deleteSchedule = (target) => {
    let params = {}

    params.storeId = defaultData?.storeId
    params.storeEmployeeId = defaultData?.storeEmployeeId
    params.lessonerWorkPlanIds = defaultData?.schedules.find((element) => Number(element.week.code) === target.valueNum).lessonerWorkPlanId

    KioskService.fetchDeleteWorkingTime(params)
      .then(response => {
        let result = response.data


      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

      })
  }

  const saveTheWorkingSchedule = () => {
    if(Common.trim(defaultData) == '' && workStores.find((element) => element.storeId === defaultStore.value)){
      openPopup({
        type : 'confirm',
        title : '저장 하시겠습니까?',
        message : '기존에 일정이 존재하는 매장입니다. 그래도 저장하시겠습니까?',
        callbackFunction : () => sendParams(),
        cancelFunction : () => closePopup(),
        okButton : '예',
        cancelButton : '아니오'
      });
    } else {
      sendParams();
    }
  }

  const sendParams = () => {
    let params = {}

    params.storeColor = defaultColor.value.substring(1,7)
    params.storeEmployeeId = defaultData.storeEmployeeId
    params.list = []

    selectedWeekOfDays.map((element) => {
      params.list.push({
        week : element.valueNum,
        lessonerWorkPlanId : defaultData.schedules.find((element1) => Number(element1.week.code) === element.valueNum) !== undefined ? defaultData.schedules.find((element1) => Number(element1.week.code) === element.valueNum).lessonerWorkPlanId : '',
        workingStartTime : selectedTimeZone[WeekOfDays?.find((element1) => element1.valueNum === Number(element.valueNum))?.value + "StartTime"].format("HHmm"),
        workingEndTime : selectedTimeZone[WeekOfDays?.find((element1) => element1.valueNum === Number(element.valueNum))?.value + "EndTime"].format("HHmm")
      })
    })

    console.log(params)
    
    KioskService.fetchSetWorkingList(params)
      .then(response => {
        let result = response.data

        history.push('/workingdaysmanage')
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {

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
                <SelectBox value={defaultStore} arr={storeList} onChange={changeStore} disabled={Common.trim(defaultData) != '' ? true : false}/>
              </div>
              <div className='selectcolor'>
                <span className='label'>매장 색상설정</span>
                <div className='spacer'></div>
                <SelectBox value={defaultColor} arr={selectColors} style={{height : '45px'}} onChange={changeColor} type="icon" horizental/>
              </div>
              <div className='selectcolor'>
                <span className='label'>근무요일 선택</span>
                <div className='spacer'></div>
              </div>
              <div className='selectWeekOfDays'>
                <ul>
                  { WeekOfDays.map((element, index) => (
                    <li>
                      <Button label={ element.label } key={index} className = {( selectedWeekOfDays.find((row) => row.value === element.value) ? "selected" : "")} noarrow onChange = {() => selectWorkingDays(element)}/>
                    </li>
                  )) }
                </ul>
              </div>
              <div>
                <span className='label'>시간 설정</span>
                <div className='spacer'></div>
              </div>
              <div className='times'>
                <Input id="totalStartTime" style={{ width : '100px', height: "26px", }} value={selectedTimeZone.totalStartTime != '' ? selectedTimeZone.totalStartTime.lang("ko").format("LT") : ''} onChange = {(e) => openModal(e)} readOnly/>
                ~
                <Input id="totalEndTime" style={{ width : '100px', height: "26px" }} value={selectedTimeZone.totalEndTime != '' ? selectedTimeZone.totalEndTime.lang("ko").format("LT") : ''} onChange = {(e) => openModal(e)} readOnly/>
                <Button label="적용" onChange={setAllTimeSet} black noarrow/>
              </div>
            </div>
            <Divider direction="horizental" style={{margin : '20px'}}/>
            <div className='selectedDays'>
              { selectedWeekOfDays?.map((element1, index) => (
                 <div className='times' key={index} style={{marginTop : '10px'}}>
                  <div className="flex-center-center time-row" style={{borderRadius : '20px', width : '32px', height : '32px', backgroundColor : "#1A1A1A", fontWeight : '500', fontSize : '15px', color : '#FFFFFF' }}>
                    { WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.label }
                  </div>
                  <Input 
                    id={ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value + "StartTime") } 
                    value={selectedTimeZone[ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value) + "StartTime"] != '' ? selectedTimeZone[ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value) + "StartTime"].lang("ko").format("LT") : ''} 
                    style={{ width : '100px', height: "26px", }} 
                    onChange = {(e) => openModal(e)} readOnly/>
                  ~
                  <Input 
                    id={ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value + "EndTime") } 
                    value={selectedTimeZone[ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value) + "EndTime"] != '' ? selectedTimeZone[ (WeekOfDays?.find((element2) => element2.valueNum === element1.valueNum)?.value) + "EndTime"].lang("ko").format("LT") : ''}
                    style={{ width : '100px', height: "26px" }} 
                    onChange = {(e) => openModal(e)} readOnly/>
                  <i className='flex-center-center' style={{width : '15px'}} onClick={() => deleteSchedule(element1)}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="1.48212" height="13.8331" transform="matrix(0.718233 -0.695803 0.718233 0.695803 0 1.375)" fill="#939393"/>
                      <rect width="1.48212" height="13.8331" transform="matrix(0.718233 0.695803 -0.718233 0.695803 9.93555 0)" fill="#939393"/>
                    </svg>
                  </i>
                </div>
              )) }        
            </div>
            <div className='button-area'>
              <Divider direction="horizental" />
              <Button label="저장" style={{height : '30px'}} black noarrow onChange={saveTheWorkingSchedule}/>
            </div>
        </div>
        <BottomTimePopUp type="time" id={targetId} open={isOpen} setIsOpen={setIsOpen} onChange={handleTime}/>
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

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(StoresManageDetail)
