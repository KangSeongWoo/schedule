import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('@view/home/Home'));
const Detail = loadable(() => import('@view/home/detail/Detail'));
const Mypage = loadable(() => import('@view/mypage/Mypage'));
const StoresManage = loadable(() => import('@view/mypage/detail/StoresManage'));
const StoresManageDetail = loadable(() => import('@view/mypage/detail/StoresManageDetail'));
const WorkingdaysManage = loadable(() => import('@view/mypage/detail/WorkingdaysManage'));
const HolidaysManage = loadable(() => import('@view/mypage/detail/HolidaysManage'));

const Test = loadable(() => import('@view/test/Test'));

const Contents = (props) => {
  const { match } = props.props

  return (
    <div className='contents'>
      <Route exact path={match.path} component={Home} />
      <Route path={`${match.path}home`} component={Home} />
      <Route path={`${match.path}detail`} component={Detail} />
      <Route path={`${match.path}mypage`} component={Mypage} />
      <Route path={`${match.path}storesmanage`} component={StoresManage} />
      <Route path={`${match.path}storesmanagedetail`} component={StoresManageDetail} />
      <Route path={`${match.path}workingdaysmanage`} component={WorkingdaysManage} />
      <Route path={`${match.path}holidaysmanage`} component={HolidaysManage} />

      <Route path={`${match.path}test`} component={Test} />
    </div>
  );
}

export default Contents;
