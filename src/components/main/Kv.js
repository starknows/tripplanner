import React, { useState } from 'react'
import {
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll'
import TaiwanMap from './TaiwanMap'
import { withRouter, Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HomeSearchBar from './HomeSearchBar'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
// import useAxios from 'axios-hooks'

scroll.scrollToTop()
scroller.scrollTo('scroll-to-element', {
  duration: 800,
  delay: 0,
  smooth: 'easeInOutQuart',
})
function Kv(props) {
  AOS.init()

  // const [{ data }] = useAxios(
  //   'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-091?Authorization=CWB-CE3C77E2-B7C4-49F4-AE97-3E3F5E40BEAE&downloadType=WEB&format=JSON'
  // )
  let mapstory = props.mapstory

  return (
    <>
      <div className="kv-search">
        <h1
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="1300"
        >
          近在咫尺的美
        </h1>
        <HomeSearchBar />
      </div>
      <TaiwanMap mapstory={mapstory} />

      <a onClick={() => scroll.scrollMore(850)}>
        <div className="scroll-icon-relative">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
          <span className="text">Scroll down </span>
        </div>
      </a>
      <div className="top1">
        <div className="topitem1">
          <Link to="/productList"> 講座</Link>
        </div>
        <div className="topitem2">
          <Link to="/travelBuddies">揪團</Link>
        </div>
        <div className="topitem3">
          <Link to="/itinerary">行程</Link>
        </div>

        <a data-aos="fade-left" onClick={() => scroll.scrollTo(10)}>
          <section className="scrollTop row justify-content-center align-items-center">
            <div className="col">
              <span className="scroll-icon">
                <span className="scroll-icon__dot"></span>
              </span>
              <h5>TOP</h5>
            </div>
          </section>
        </a>
      </div>
    </>
  )
}
export default Kv
