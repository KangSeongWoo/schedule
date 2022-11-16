import React from 'react';
import Button from '@component/Button'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import '@scss/login.scss'

const Login = (props) => {
  const login = () => {
    window.location.href = process.env.API_URL + '/oauth/authorize?redirect_uri=' + encodeURIComponent(window.location.origin);
  }

  const signin = () => {
    window.location.href = process.env.AUTH_SIGN_IN + "/signup/step1"
  }

  return (
    <div className='login ' style={{ backgroundImage:`url("images/loginBackground.svg")` }}>
      <div className='logo flex-center-center'>
        <img src="images/logo_top.png"/>
      </div>
      <div className='login-button'>
        <Button label="로그인" style={{height : '52px',  margin : '0px 20px'}} onChange={login} white noarrow/>
        <span>QED 통합회원이면 로그인이 가능합니다.</span>
      </div>
      <div className='sign-in flex-center-center'>
        <span>아직 회원이 아니신가요?</span>
        <Button label="회원가입" style={{color : '#ffffff', fontSize : '13px', fontWeight:'700', marginLeft : '10px' }} onChange={signin} noarrow/>
      </div>
    </div>
  );
}

export default Login;
