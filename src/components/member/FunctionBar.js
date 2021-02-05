//會員中心頁連結
import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import HistiryRoute from '../member/ShoppingHistory/HistoryRoute'
import MyTravelBuddies from './MyTravelBuddies/MyTravelBuddies'
import MeFavorites from '../main/MeFavorites'
import Notice from '../../pages/Notice'
import MyAccount from '../member/MyAccount'
import MyItineraryTabs from './MyItinerary/MyItineraryTabs'
function FunctionBar() {
  return (
    <>
      <div className="functio-bar">
        <Link to="/myAccount">我的帳戶</Link>
        <Link to="/myAccount/itinerary">我的行程</Link>
        <Link to="/myAccount/TravelBuddies">我的揪團</Link>
        <Link to="/myAccount/favorites">我的收藏</Link>
        <Link to="/myAccount/Notice">我的通知</Link>
        <Link to="/myAccount/historyOrder">購物紀錄</Link>
      </div>
      <Switch>
        <Route path="/myAccount/historyOrder">
          <HistiryRoute />
        </Route>
        <Route path="/myAccount/itinerary">
          <MyItineraryTabs />
        </Route>
        <Route path="/myAccount/TravelBuddies">
          <MyTravelBuddies />
        </Route>
        <Route path="/myAccount/favorites">
          <MeFavorites />
        </Route>
        <Route path="/myAccount/Notice">
          <Notice />
        </Route>
        <Route path="/myAccount" exact>
          <MyAccount />
        </Route>
      </Switch>
    </>
  )
}

export default FunctionBar
