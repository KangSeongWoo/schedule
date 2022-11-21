import instance from './index'

const baseUrl = process.env.API_URL    

class KioskService {
    // 로그인 후 회원 정보 호출
    fetchUserProfile = params => instance.get(baseUrl + '/api/public/profile')

    fetchWorkStores = () => instance.get(baseUrl + '/api/proLesson/workStores')
}

export default new KioskService()