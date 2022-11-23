import instance from './index'

const baseUrl = process.env.API_URL    

class KioskService {
    // 로그인 후 회원 정보 호출
    fetchUserProfile = params => instance.get(baseUrl + '/api/public/profile')

    fetchWorkStores = () => instance.get(baseUrl + '/api/proLesson/workStores')

    fetchWorkStoreList = () => instance.get(baseUrl + '/api/proLesson/WorkStoresList')

    fetchGetLessonSchedulesList = (params) => instance.get(baseUrl + '/api/proLesson/schedule?dayList=' + params.list.join(","));

    fetchSetWorkingList = (params) => instance.post(baseUrl + '/api/proLesson/workPlan?stoerColor=' + params.storeColor + '&storeEmployeeId=' + params.storeEmployeeId, params.list)

    fetchDeleteWorkingTime = (params) => instance.delete(baseUrl + '/api/stores/'+params.storeId+'/employees/'+params.storeEmployeeId+'/schedules?ids='+params.lessonerWorkPlanIds)

    fetchHolidays = (params) => instance.get(baseUrl + '/api/proLesson/holidays?year=' + params.year)

    fetchRegsisterHoliday = (params) => instance.post(baseUrl + '/api/proLesson/holidays', params)
     
    fetchDeleteHoliday = (params) => instance.put(baseUrl + '/api/proLesson/holidays', params)
}

export default new KioskService()
