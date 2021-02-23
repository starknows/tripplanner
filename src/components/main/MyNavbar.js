import React, { useState, useEffect } from 'react'
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap'

import { NavLink } from 'react-router-dom'
import Logo from '../../logo.svg'
import { FiShoppingCart } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";





function MyNavbar(props) {

  const imagePath = './images/testImage.jpg' 

  return (
    <>
      <Navbar 
        collapseOnSelect
        expand="lg"
        bg={"primary"}
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand href="#home"  className="Navbar-Logo">
      <img 
      src={Logo}
      width='150'  />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav  className="mr-auto">
            <Nav.Link  as={NavLink} to="/" exact className="Navbar-Title h5 ">
              行程規劃
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="Navbar-Title h5 ">
              揪團旅行
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="Navbar-Title h5 ">
              達人講座
            </Nav.Link>


          </Nav>
          <Nav  >
            <Nav.Link href="#deets">
            <FaCoins className="Navbar-icon"/>
            </Nav.Link>
            <Nav.Link href="#memes">
            <FiShoppingCart className="Navbar-icon" />
            </Nav.Link>
            <Nav.Link href="#mell" >
            <FaRegBell className="Navbar-icon" />
            </Nav.Link>
             <NavDropdown  
                title={
                  
                    <figure className='Navebar-figure '>
                    <img src={imagePath}/>
                    </figure>
                } 
                >
              <NavDropdown.Item
                as={NavLink}
                to="/product/men"
              >
                MEN 男性
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/product/baby"
              >
                Baby 嬰兒
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={NavLink}
                to="/product/women"
              >
                WOMEN 女性
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </>
    
  )
}


export default MyNavbar
