// 일주일 정보
export const WeekOfDays = [
    { label : "월", value : 'Monday',   valueNum : 1},
    { label : "화", value : 'Tuesday',  valueNum : 2},
    { label : "수", value : 'Wednesday',valueNum : 3},
    { label : "목", value : 'Thursday', valueNum : 4},
    { label : "금", value : 'Friday',   valueNum : 5},
    { label : "토", value : 'Saturday', valueNum : 6},
    { label : "일", value : 'Sunday',   valueNum : 0},
]

// 매장 색상
export const selectColors = [
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

// 일정 노출 주기
export const selectDaysInterval = [
    { name : "일", value : "1", icon:'<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="4.15771" width="11" height="9.8421" rx="1" stroke="#444444" strokeWidth="2"/><rect width="13" height="1.57895" rx="0.789474" fill="#444444"/></svg>'},
    { name : "3일", value : "3", icon:'<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="3.82354" height="15" rx="1" fill="#444444"/><rect x="9.17676" width="3.82354" height="15" rx="1" fill="#444444"/><rect x="4.58789" width="3.82354" height="15" rx="1" fill="#444444"/></svg>'},
    { name : "주간", value : "7", icon:'<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="6" width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="3" width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="12" width="1.8782" height="15" rx="0.939101" fill="#444444"/><rect x="9" width="1.8782" height="15" rx="0.939101" fill="#444444"/></svg>'}
]