import moment from 'moment';

// 객체 배열 내에 특정 key의 value가 중복되는지 확인
export const isDuplicated = (object, keyword) => {
    let flag = false;
    let duplicateCount = 0
    
    object.map((row1) => {
        duplicateCount = 0
        object.map((row2) => {
            if(row1[keyword] === row2[keyword]){
                duplicateCount++
            }
        })
        if(duplicateCount > 1){
            console.log("중복이 있습니다.")
            flag = true
        }
    })

    return flag;
}

// json이 비어있으면 true, 아니면 false
export const isEmptyJson = (json) => {
    if(json == undefined){
        return true
    }
    return Object.keys(json).length == 0
}

// trim
export const trim = object => {
    if (object == undefined || object == null) {
        return ''
    } else if (typeof object == 'string') {
        return object.trim()
    } else {
        return object
    }
}