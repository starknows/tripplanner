/**
 * 檔案負責人: 柯政安
 * 在/itinerary路由之下所有子路由的設定
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Itinerary from '../../pages/Itinerary'
import ItinEditView from './ItinEditView'
import ItinPublishView from './ItinPublishView'
import MyItinView from './MyItinView'

function ItinRoute() {
  return (
    <Switch>
      <Route path="/itinerary/new">
        <ItinEditView />
        {/* 準備新增用的 */}
      </Route>
      <Route path="/itinerary/my/:itin_id">
        <MyItinView isEdit={false} />
        {/* 私人的有大地圖的 */}
      </Route>
      <Route path="/itinerary/edit/:itin_id">
        <ItinEditView isNew={false} />
        {/* 私人修改用的 */}
      </Route>
      <Route path="/itinerary/view/:itin_id">
        <ItinPublishView isEdit={false} />
        {/* 公開的沒有大地圖的 */}
      </Route>
      <Route path="/itinerary/publish/:itin_id">
        <ItinPublishView isEdit={true} />
        {/* 公開的修改含準備發表 */}
      </Route>
      <Route exact path="/itinerary">
        <Itinerary />
        {/* 行程總表 */}
      </Route>
    </Switch>
  )
}

export default ItinRoute
// 檔案負責人: 柯政安
