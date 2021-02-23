import React, { useEffect } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/main/Header'
import MyFooter from './components/main/MyFooter'

import Login from './pages/Login'
import Sigon from './pages/sign'
import Home from './pages/Home'
import Forgetpassword from './pages/forgetpassword'
import HomeAd1 from './pages/HomeAd1'
import HomeAd2 from './pages/HomeAd2'
import HomeAd3 from './pages/HomeAd3'

//
import MainRoute from './components/main/MainRoute'
import ScrollToTop from './components/main/ScrollToTop'
function App() {
  const [auth, setAuth] = React.useState(false)
  useEffect(() => {
    setAuth(localStorage.getItem('userData'))
  }, [auth])

  return (
    <Router>
      <>
        <Header
          auth={localStorage.getItem('userData') && true}
          // auth={auth}
          setAuth={setAuth}
        />
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              <Home auth={auth} setAuth={setAuth} />
            </Route>
            <Route exact path="/HomeAd1">
              <HomeAd1 auth={auth} setAuth={setAuth} />
            </Route>
            <Route exact path="/HomeAd2">
              <HomeAd2 auth={auth} setAuth={setAuth} />
            </Route>
            <Route exact path="/HomeAd3">
              <HomeAd3 auth={auth} setAuth={setAuth} />
            </Route>
            <Route exact path="/login">
              <Login auth={auth} setAuth={setAuth} />
            </Route>
            <Route exact path="/sigon">
              <Sigon />
            </Route>
            <Route path="/forgetpassword">
              <Forgetpassword />
            </Route>
            <Route path="/">
              <MainRoute setAuth={setAuth} />
            </Route>
          </Switch>
        </ScrollToTop>
        <MyFooter />
      </>
    </Router>
  )
}

export default App
