import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { FaShoppingCart, FaRegCheckSquare } from 'react-icons/fa'
import { GoCreditCard } from 'react-icons/go'
import { MdKeyboardArrowRight } from 'react-icons/md'
import CashStep1 from './CashStep1'
import CashStep2 from './CashStep2'
import CashStep3 from './CashStep3'
import './cash.scss'

function IconRouter() {
  return (
    <Router>
      <>
        <div className="icons">
          <div className=" active">
            <Link to="shoppingcar/Step1">
              <FaShoppingCart />
            </Link>
            <p>我的購物車</p>
          </div>

          <MdKeyboardArrowRight className="arrow" />

          <div>
            <Link to="/shoppingcar/step2">
              <GoCreditCard />
            </Link>
            <p>付款方式</p>
          </div>

          <MdKeyboardArrowRight className="arrow" />

          <div>
            <Link to="/shoppingcar/step3">
              <FaRegCheckSquare />
            </Link>
            <p>訂單完成</p>
          </div>
        </div>
        <Switch>
          <Route path="shoppingcar/Step1">
            <CashStep1 />
          </Route>
          <Route path="/shoppingcar/step2">
            <CashStep2 />
          </Route>
          <Route path="/shoppingcar/step3">
            <CashStep3 />
          </Route>
        </Switch>
      </>
    </Router>
  )
}
export default IconRouter