/**
 * 檔案負責人: 柯政安
 * 網站主要路由器
 * 先將大項目功能切開，後續組員再各自進行細分
 * 也實現了判斷是否登入才允許進入的路由
 */

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ItinRoute from '../Itinerary/ItinRoute'
import Member from '../../pages/Member'
import ProductsRoute from '../../pages/ProductList/ProductsRoute'
import LineChart from '../../pages/LineChart '
import TravelBuddiesRoute from '../TravelBuddies/TravelBuddiesRoute'

// 私人路由，若未登入則會被重新導向
function MainRoute({ setAuth }) {
  function PrivateRoute({ component: Component, authed, setAuth, ...rest }) {
    return (
      <Route
        {...rest}
        setAuth={setAuth}
        render={(props) =>
          authed === true ? (
            <Component setAuth={setAuth} {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    )
  }

  return (
    <>
      <Switch>
        <PrivateRoute
          authed={localStorage.getItem('userData') && true}
          path="/myAccount"
          component={Member}
          setAuth={setAuth}
        />
        <Route path="/itinerary">
          <ItinRoute />
        </Route>
        <Route path="/productList">
          <ProductsRoute />
        </Route>
        <Route path="/LineChart">
          <LineChart />
        </Route>
        <Route path="/travelBuddies">
          <TravelBuddiesRoute />
        </Route>
      </Switch>
    </>
  )
}

export default MainRoute
