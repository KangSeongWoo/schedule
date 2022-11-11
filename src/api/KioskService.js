import instance from './index'

const baseUrl = process.env.API_URL    

class KioskService {
    // Admin 로그인
    adminLogin = params => instance.post(baseUrl + '/manage/login', params)

    // Admin 매장 목록
    getStoreList = () => instance.get(baseUrl + '/manage/l/stores')

    // 관리 매장 정보조회
    getStoreInfo = params => instance.get(baseUrl + '/member/store/' + params.storeId +"/spaces?ableTime="+params.ableTime)
}

export default new KioskService()