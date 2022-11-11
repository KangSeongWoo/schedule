import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('@view/home/Home'));
const Detail = loadable(() => import('@view/home/detail/Detail'));
const Mypage = loadable(() => import('@view/mypage/Mypage'));
const StoresManage = loadable(() => import('@view/mypage/detail/StoresManage'));
const WorkingdaysManage = loadable(() => import('@view/mypage/detail/WorkingdaysManage'));
const HolidaysManage = loadable(() => import('@view/mypage/detail/HolidaysManage'));

const Contents = (props) => {
  const { match } = props.props

  return (
    <div className='contents'>
      <Route exact path={match.path} component={Home} />
      <Route path={`${match.path}home`} component={Home} />
      <Route path={`${match.path}detail`} component={Detail} />
      <Route path={`${match.path}mypage`} component={Mypage} />
      <Route path={`${match.path}storesmanage`} component={StoresManage} />
      <Route path={`${match.path}workingdaysmanage`} component={WorkingdaysManage} />
      <Route path={`${match.path}holidaysmanage`} component={HolidaysManage} />
    </div>
  );
}

export default Contents;