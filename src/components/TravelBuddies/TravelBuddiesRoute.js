import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import TravelBuddies from '../../pages/TravelBuddies'
import AddTravelBuddies from '../../pages/AddTravelBuddies'
import TravelBuddiesMainPage from '../../pages/TravelBuddiesMainPage'
import TravelBuddiesReadPage from '../../pages/TravelBuddiesReadPage'
import TravelBuddiesChatroom from '../../pages/TravelBuddiesChatroom'
import EditTravelBuddiesForm from '../TravelBuddies/EditTravelBuddiesForm'
import TBGiveMembersStarRating from '../member/MyTravelBuddies/TBGiveMembersStarRating'
import TBMembersSelectPage from '../member/MyTravelBuddies/TBMembersSelectPage'

function TravelBuddiesRoute() {
  let { id } = useParams()
  return (
    <Switch>
      <Route path="/travelBuddies/selectMembers/:id">
        <TBMembersSelectPage />
      </Route>
      <Route path="/travelBuddies/starRating/:id">
        <TBGiveMembersStarRating />
      </Route>
      <Route path="/travelBuddies/edit/:id">
        <EditTravelBuddiesForm />
      </Route>
      <Route path="/travelBuddies/read/:id">
        <TravelBuddiesReadPage />
      </Route>
      <Route path="/travelBuddies/view/:id">
        <TravelBuddiesMainPage />
        {/* 自行更換成顯示用的元件，元件內使用import並useParams()可取得:id的值 */}
        {/* 實際做法可參考上方Test元件 */}
      </Route>
      <Route path="/travelBuddies/chatroom/:id">
        <TravelBuddiesChatroom />
      </Route>
      <Route path="/travelBuddies/mainpage">
        <TravelBuddiesMainPage />
      </Route>
      <Route path="/travelBuddies/new">
        <AddTravelBuddies />
      </Route>
      <Route exact path="/travelBuddies">
        <TravelBuddies />
      </Route>
    </Switch>
  )
}

export default TravelBuddiesRoute
