//會員中心我的帳戶
import React from 'react'

import LineChart from '.././LineChart'
import Ingroup from '.././Ingroup'
import './MyAccount.scss'

function MyAccount() {
  return (
    <>
      <div className="notice-style">
        <h4 className="MyAccount-title">收藏行程的人數：</h4>
        <LineChart />
      </div>
      <div className="notice-style">
        <h4 className="MyAccount-title">即將參加的揪團：</h4>
        <Ingroup />
      </div>
    </>
  )
}
export default MyAccount
