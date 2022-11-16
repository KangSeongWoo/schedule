import React from 'react';

import { connect } from 'react-redux'
import * as actions from '@store/actionCreators'
import { useHistory } from 'react-router-dom'

import '@scss/template.scss'
import '@scss/common.scss'

const Headers = (props) => {
    let history = useHistory();

    if(props.mode === "header") {
        const goMypage = () => {
            history.push('/mypage')
        }
        return (
            <div className="headers main flex-center-center">
                <div>
                    <img style={{width : '60px', height : '60px', borderRadius : '35px'}} src='https://img.hankyung.com/photo/202109/BF.27474984.1.jpg' />
                </div>
                <div className='user ml-1'>
                    <div className='useraccount'>
                        <span className="--white" style={{fontSize : '11px'}}>123123</span>
                    </div>
                    <div className='username'>
                        <span className="--white" style={{whiteSpace : 'nowrap', fontSize : '14px'}}><f className='fontbold'>김민정</f> 프로님</span>
                    </div>
                </div>
                <div className='spacer'></div>
                <div className='mypage --white' onClick={goMypage}>
                    <svg width="14" height="28" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.05594 25H2.09594V21.36C2.09594 20.7 2.00594 19.75 1.95594 19.08H1.99594L2.57594 20.78L3.86594 24.29H4.58594L5.86594 20.78L6.45594 19.08H6.49594C6.43594 19.75 6.34594 20.7 6.34594 21.36V25H7.42594V17.63H6.08594L4.75594 21.36C4.58594 21.85 4.44594 22.35 4.27594 22.84H4.22594C4.05594 22.35 3.90594 21.85 3.73594 21.36L2.38594 17.63H1.05594V25ZM10.5667 25H11.7267V22.21L13.9467 17.63H12.7367L11.8767 19.59C11.6567 20.14 11.4167 20.65 11.1767 21.21H11.1367C10.8867 20.65 10.6767 20.14 10.4467 19.59L9.59672 17.63H8.35672L10.5667 22.21V25Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.4255 4C11.4255 6.20914 9.63459 8 7.42546 8C5.21632 8 3.42546 6.20914 3.42546 4C3.42546 1.79086 5.21632 0 7.42546 0C9.63459 0 11.4255 1.79086 11.4255 4ZM10.0921 4C10.0921 5.47276 8.89822 6.66667 7.42546 6.66667C5.9527 6.66667 4.75879 5.47276 4.75879 4C4.75879 2.52724 5.9527 1.33333 7.42546 1.33333C8.89822 1.33333 10.0921 2.52724 10.0921 4Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.4255 8.66667C5.46875 8.66667 4.05792 9.07256 3.04588 9.68116C2.02981 10.2922 1.4591 11.0816 1.14394 11.7721C0.878288 12.3541 0.999198 12.9472 1.35215 13.3697C1.6886 13.7725 2.21172 14 2.75882 14H12.0921C12.6392 14 13.1623 13.7725 13.4988 13.3697C13.8517 12.9472 13.9727 12.3541 13.707 11.7721C13.3919 11.0817 12.8212 10.2922 11.8051 9.68117C10.7931 9.07256 9.38227 8.66667 7.4255 8.66667ZM2.35689 12.3257C2.57566 11.8465 2.97752 11.2781 3.73302 10.8238C4.49256 10.367 5.65231 10 7.4255 10C9.19871 10 10.3585 10.367 11.118 10.8238C11.8735 11.2781 12.2753 11.8465 12.4941 12.3257C12.5199 12.3823 12.5188 12.4164 12.5162 12.4337C12.5132 12.4536 12.5035 12.4814 12.4755 12.515C12.4154 12.5869 12.2814 12.6667 12.0921 12.6667H2.75882C2.56954 12.6667 2.43556 12.5869 2.37546 12.5149C2.34747 12.4814 2.33774 12.4536 2.33478 12.4337C2.33218 12.4164 2.33106 12.3823 2.35689 12.3257Z" fill="white"/>
                    </svg>
                </div>
            </div>
        );
    } else {
        const goBack = (target) => {
            history.push(target)
        }
        return (
            <div className="headers othersheader flex-center-center" style={{height : '15px'}}>
                {
                    props.goback && (
                        <div className='go-back' onClick={() => goBack(props.gobackFunction)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    )
                }
                <div className='spacer'></div>
                <div className='title --white'>
                   <span>{props.title}</span>
                </div>
                <div className='spacer'></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
   
})


const mapReduxStateToReactProps = (state) => {
    return ({

    })
}


export default connect(mapReduxStateToReactProps, mapDispatchToProps)(Headers)

//export default Headers;
