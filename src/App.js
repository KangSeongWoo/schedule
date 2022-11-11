import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import { connect } from 'react-redux'
import * as actions from './store/actionCreators'

import '@scss/common.scss'

const Login = loadable(() => import('@view/login/Login'));
const Layout = loadable(() => import('@view/template/Layout'));

const App = (props) => {
  const { admin } = props

  return (
      <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route component={Layout} />
          </Switch>
      </Router>  
  )
}

// const mapDispatchToProps = (dispatch) => ({
//   setLogin: () => {
//       dispatch(actions.setLogin())
//   }
// })


// const mapReduxStateToReactProps = (state) => {
//   return ({
//     admin : state.reduxState.admin
//   })
// }


// export default connect(mapReduxStateToReactProps, mapDispatchToProps)(App)
export default App;
