import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function FunctionBar() {
  return (
    <Router>
      <>
        <div className="FunctionBar">
          <Link to="/myAccount">我的帳戶</Link>
          <Link to="/myStroke">我的行程</Link>
          <Link to="/myGroup">我的揪團</Link>
          <Link to="/myCollection">我的收藏</Link>
          <Link to="/myNotice">我的通知</Link>
          <Link to="/shoppingRecord">購物紀錄</Link>
        </div>
        <Switch></Switch>
      </>
    </Router>
  )
}

export default FunctionBar

// 這是上面那條工具列 Ray

//路徑還沒做