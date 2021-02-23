import React from 'react'
import HomeSliderP3 from './HomeSliderP3'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
function HomeP3(props) {
  return (
    <>
      <div className="p3">
        <h1 data-aos="fade-right" data-aos-delay="300" data-aos-duration="900">
          旅遊達人
        </h1>
        <div className="p3-title">
          <h2
            className="home-vlr "
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="900"
          >
            講座
          </h2>
        </div>
        <div className="row">
          <div className="col-1"></div>
          <div
            className="col-5"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="1000"
            data-aos-offset="200"
          >
            <h3>你想嘗試用旅行寫自己的精彩故事嗎?</h3>
            <p>
              每月邀請旅遊達人分享豐富精采的旅遊經驗場次遍及全台灣帶您壯遊世界的美好「如何準備自助旅行/全球必到景點」旅遊講座！
            </p>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-zoom-in"
        data-aos-easing="ease-out"
        data-aos-duration="900"
        data-aos-delay="1600"
        // data-aos-offset="-200"
      >
        <HomeSliderP3 />
      </div>
      <div
        className="p3-line"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-out"
        data-aos-duration="900"
        data-aos-delay="300"
      />
    </>
  )
}

export default HomeP3
