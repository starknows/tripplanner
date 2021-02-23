//會員中心頁連結
import React from 'react'
import { Nav } from 'react-bootstrap'
import { Route, NavLink, Switch, Link } from 'react-router-dom'
import HistiryRoute from '../member/ShoppingHistory/HistoryRoute'
import MyTravelBuddies from './MyTravelBuddies/MyTravelBuddies'
import MeFavorites from '../main/MeFavorites'
import Notice from '../../pages/Notice'
import MyAccount from '../member/MyAccount'
import MyItineraryTabs from './MyItinerary/MyItineraryTabs'
function FunctionBar() {
  return (
    //<Router>
    <>
      <div className="functio-bar">
        <Nav.Link as={NavLink} to="/myAccount" exact>
          我的帳戶
        </Nav.Link>
        <Nav.Link as={NavLink} to="/myAccount/itinerary">
          我的行程
        </Nav.Link>
        <Nav.Link as={NavLink} to="/myAccount/TravelBuddies">
          我的揪團
        </Nav.Link>
        <Nav.Link as={NavLink} to="/myAccount/favorites">
          我的收藏
        </Nav.Link>
        <Nav.Link as={NavLink} to="/myAccount/Notice">
          我的通知
        </Nav.Link>
        <Nav.Link as={NavLink} to="/myAccount/historyOrder">
          購物紀錄
        </Nav.Link>
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
    //</Router>
  )
}

export default FunctionBar
