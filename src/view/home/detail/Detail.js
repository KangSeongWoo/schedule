import React, { useEffect } from 'react';
import Headers from '@template/Header'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/home.scss'

const Detail = (props) => {
    useEffect(() => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
    
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
		geocoder.addressSearch('서울 서초구 반포대로 304 금정빌딩 지하1층', function(result, status) {
	
		    // 정상적으로 검색이 완료됐으면 
		     if (status === kakao.maps.services.Status.OK) {
		        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		        
		        // 결과값으로 받은 위치를 마커로 표시합니다
		        var marker = new kakao.maps.Marker({
		            map: map,
		            position: coords
		        });
	
		        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		        map.setCenter(coords);
		    } 
		}); 
    },[])
    return (
        <>
            <Headers title="레슨 예약 내역" goback gobackFunction = "/home"/>
            <div className='homedetail'>
                <ul>
                    <li>
                        <div>
                            <span className='label'>회원명</span>
                            <div className='spacer'></div>
                            <span className='value'>최대철</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='label'>연락처</span>
                            <div className='spacer'></div>
                            <span className='value'>010-5174-2860</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='label'>매장명</span>
                            <div className='spacer'></div>
                            <span className='value'>QED 아카데미 반포 1호점</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='label'>예약 타석</span>
                            <div className='spacer'></div>
                            <span className='value'>001</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='label'>예약 날짜</span>
                            <div className='spacer'></div>
                            <span className='value'>2022.08.28 (수)</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='label'>레슨 예정 시간</span>
                            <div className='spacer'></div>
                            <span className='value'>12:00 ~ 12:30</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span className='label'>이용권/회원권</span>
                            <div className='spacer'></div>
                            <span className='value'>레슨권 1개월 8회</span>
                        </div>
                    </li>
                </ul>
                <div id="map" className='kakaomap' style={{height : '250px', borderRadius : '10px', margin : '0px 20px'}}></div>
                <div className='notice'>
                    <p>※ 근무설정을 수정해도 이미 등록된 레슨은 취소되지 않습니다.</p>
                </div>
            </div>
        </>
    );
}

export default Detail;
