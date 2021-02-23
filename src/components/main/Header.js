import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import '../../style/header.scss'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../../logo.svg'
import { FiShoppingCart } from 'react-icons/fi'
// import { FaCoins } from 'react-icons/fa'
import MebPopover from './MebPopover'
import LogoutHooks from '../../pages/Login/LogoutHooks'

function Header({ auth, setAuth }) {
  // const imagePath = '/images/testImage.jpg'
  let location = useLocation()
  const [headerStyle, setHeaderStyle] = useState(0)
  //判斷是否登入?
  const [memberData, setMemberData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )

  //監聽登入狀態
  useEffect(() => {
    setMemberData(JSON.parse(localStorage.getItem('userData')))
    console.log('hhhhhuserData', memberData)
  }, [auth])

  useEffect(() => {
    // console.log(location)
    if (location.pathname === '/') {
      setHeaderStyle(0)
    } else {
      setHeaderStyle(1)
    }
  }, [location.pathname, auth])

  //有登入
  const login = (
    <>
      <Nav.Link as={NavLink} to="/productList/car">
        {/* <div className="not-icon-mover"> */}
        <FiShoppingCart className="Navbar-icon" />
        {/* </div> */}
        {/* <Badge variant="light">2</Badge> */}
      </Nav.Link>
      <Nav.Link>
        <div className="not-icon-mover">
          <MebPopover className="Navbar-icon" />
        </div>
        {/* <Badge variant="light">5</Badge> */}
      </Nav.Link>
      <NavDropdown
        title={
          <figure className="Navebar-figure">
            {/* 登入大頭照 */}
            {memberData && (
              <img
                className="header-img-br"
                src={
                  'http://localhost:5000/images/member/' +
                  memberData.member_photo_id
                }
                alt={
                  'http://localhost:5000/images/member/' +
                  memberData.member_photo_id
                }
              />
            )}
          </figure>
        }
      >
        <NavDropdown.Item as={NavLink} to="/myAccount">
          會員中心
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          as={NavLink}
          to="/"
          onClick={() => {
            localStorage.clear()
            sessionStorage.clear()
            setAuth(false)
          }}
        >
          <LogoutHooks />
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )

  //登出狀態
  const loginout = (
    <>
      {/* <LogoutHooks />
      testgoogle登出用 */}
      <Nav.Link as={NavLink} to="/productList/car">
        <FiShoppingCart className="Navbar-icon" />
        {/* <Badge variant="light">2</Badge> */}
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        to="/login"
        exact
        className="Navbar-Title h6 d-flex"
      >
        登入/註冊
      </Nav.Link>
    </>
  )

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg={'primary'}
        variant="dark"
        className={headerStyle === 0 ? 'HomeNavbar-color' : 'HomeNavbar-inner'}
      >
        <Navbar.Brand as={NavLink} to="/" className="Navbar-Logo">
          <img src={Logo} width="150" alt="圖片替代文字" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={NavLink}
              to="/itinerary"
              exact
              className="Navbar-Title h5 "
            >
              行程規劃
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/travelBuddies"
              className="Navbar-Title h5 "
            >
              揪團旅行
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/productList"
              className="Navbar-Title h5 "
            >
              達人講座
            </Nav.Link>
          </Nav>
          {/* 判斷登入 */}
          <Nav>{auth ? login : loginout}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
