import React, { useLayoutEffect, useState } from 'react';
import moment from 'moment';
import Button from '@component/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard, Mousewheel } from "swiper/core";

import '@scss/common.scss'
import 'swiper/css';

SwiperCore.use([Keyboard, Mousewheel]);

const ampm = [
    { label : '오전', value : 'am' },
    { label : '오후', value : 'pm' },
]

const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]

const amHours = ["6","7","8","9","10","11","12"]
const pmHours = ["1","2","3","4","5","6","7","8","9","10","11","12"]

const minutes = ["00", "05","10","15","20","25","30","35","40","45","50","55"]

const BottomTimePopUp = (props) => {
    const [ selectedTime, setSelectedTime ] = useState({
        ampm : ampm[0],
        hours : pmHours[0],
        minutes : minutes[0]
    }) 

    const [ selectedDate, setSelectedDate ] = useState({
        year : Number(moment().format("YYYY")),
        months : months[0],
        day : "01"
    })

    const [ yearList, setYearList ] = useState([])
    const [ dateList, setDateList ] = useState([])

    const [ selectedHour, setSelectedHour ] = useState()

    useLayoutEffect(() => {
        setSelectedHour(amHours)
        makeYearList()
        makeDateList()
    },[])
    
    const makeYearList = () => {
        let thisYear = Number(moment().format("YYYY"))

        let tempYearList = []

        for(let i = thisYear; i < thisYear + 3; i++){
            tempYearList.push(i)
        }

        setYearList(tempYearList)
    }

    const makeDateList = () => {
        let endofdaythismonth = Number(moment(String(selectedDate.year)+String(selectedDate.months)).daysInMonth());

        let tempDateList = []

        for(let i = 1; i <= endofdaythismonth; i++){
            if( i < 10 ) {
                tempDateList.push("0"+String(i))
            } else {
                tempDateList.push(i)
            }
        }

        setDateList(tempDateList)
    }

    const handleTimeClick = () => {
        let tempSelectedTime = {...selectedTime};

        tempSelectedTime.targetId = props.id

        tempSelectedTime.timeLabel = selectedTime.ampm.label + " " + selectedTime.hours + ":" + selectedTime.minutes

        let tempMomentType = selectedTime.ampm === "pm" ?  Number(selectedTime.hours) + 12 : selectedTime.hours + ":" + selectedTime.minutes

        tempSelectedTime.momentType = moment(tempMomentType)

        props.onChange(tempSelectedTime)
    }

    const handleDateClick = () => {
        let tempSelectedDate = {...selectedDate};

        tempSelectedDate.targetId = props.id

        tempSelectedDate.dateLabel = selectedDate.year + "-" + selectedDate.months + "-" + selectedDate.day

        tempSelectedDate.momentType = moment(selectedDate.year + "-" + selectedDate.months + "-" + selectedDate.day)

        console.log(tempSelectedDate)

        props.onChange(tempSelectedDate)
    }

    const closePopup = () =>{
        props.setIsOpen(false)
    }

    return (
        <div className={"bottomtimepopup "} style={{display : !props.open ? "none" : ""}}>
            <div className='dim' onClick={closePopup}></div>
            <div className='bottompopupwarp'>
                <div className='title'>
                    <span>
                        원하시는 시간을 선택해 주세요.
                    </span>
                </div>
                {
                    props.type === "date" ? 
                        (
                            <>
                                <div className='time-swiper flex-center-center' style={{height : '55%'}}>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        mousewheel={true}
                                        direction="vertical"
                                        // onSlideChange={(e) => console.log(e)}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={(swiperCore) => {
                                            const { activeIndex } = swiperCore;
                                            setSelectedDate({
                                                ...selectedDate,
                                                year : yearList[activeIndex]
                                            })
                                            setSelectedHour(activeIndex === 0 ? amHours : pmHours)
                                        }}
                                        className="swiper-component"
                                        >
                                            {
                                                yearList?.map((element) => (
                                                    <SwiperSlide className="flex-center-center" id={element}>{element}</SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        mousewheel={true}
                                        direction="vertical"
                                        onSlideChange={(swiperCore) => {
                                            const { activeIndex } = swiperCore;
                                            setSelectedDate({
                                                ...selectedDate,
                                                months : months[activeIndex]
                                            })
                                        }}
                                        className="swiper-component"
                                        >
                                            {
                                                months.map((element) => (
                                                    <SwiperSlide className="flex-center-center" id={element}>{element}</SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        mousewheel={true}
                                        direction="vertical"
                                        onSlideChange={(swiperCore) => {
                                            const { activeIndex } = swiperCore;
                                            setSelectedDate({
                                                ...selectedDate,
                                                day : dateList[activeIndex]
                                            })
                                        }}
                                        className="swiper-component"
                                        >
                                            {
                                                dateList?.map((element) => (
                                                    <SwiperSlide className="flex-center-center" id={element}>{element}</SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                </div>
                                <div className='button-area'>
                                    <Button label="선택" style={{height : '30px'}} black noarrow onChange={handleDateClick}/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='time-swiper flex-center-center' style={{height : '55%'}}>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        mousewheel={true}
                                        direction="vertical"
                                        // onSlideChange={(e) => console.log(e)}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={(swiperCore) => {
                                            const { activeIndex } = swiperCore;
                                            setSelectedTime({
                                                ...selectedTime,
                                                ampm : ampm[activeIndex]
                                            })
                                            setSelectedHour(activeIndex === 0 ? amHours : pmHours)
                                        }}
                                        className="swiper-component"
                                        >
                                            {
                                                ampm.map((element) => (
                                                    <SwiperSlide className="flex-center-center" id={element.value}>{element.label}</SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        mousewheel={true}
                                        direction="vertical"
                                        onSlideChange={(swiperCore) => {
                                            const { activeIndex } = swiperCore;
                                            setSelectedTime({
                                            ...selectedTime,
                                                hours : pmHours[activeIndex]
                                            })
                                        }}
                                        className="swiper-component"
                                        >
                                            {
                                                pmHours.map((element) => (
                                                    <SwiperSlide className="flex-center-center" id={element}>{element}</SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                    <Swiper
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        mousewheel={true}
                                        direction="vertical"
                                        onSlideChange={(swiperCore) => {
                                            const { activeIndex } = swiperCore;
                                            setSelectedTime({
                                                ...selectedTime,
                                                minutes : minutes[activeIndex]
                                            })
                                        }}
                                        className="swiper-component"
                                        >
                                            {
                                                minutes.map((element) => (
                                                    <SwiperSlide className="flex-center-center" id={element}>{element}</SwiperSlide>
                                                ))
                                            }
                                    </Swiper>
                                </div>
                                <div className='button-area'>
                                    <Button label="선택" style={{height : '30px'}} black noarrow onChange={handleTimeClick}/>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    );
}

export default BottomTimePopUp;
