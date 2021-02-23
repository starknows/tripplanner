import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
function HomeP2scoll2() {
  let history = useHistory()
  function Goitinerary22() {
    history.push('travelBuddies/new')
  }
  return (
    <>
      <div className="p2-scoll">
        <div class="parallax2">
          <div class="bg2-1 ">
            <div className="P2scoll-backgroumd"></div>
            <div
              className="row justify-content-around "
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-offset="350"
            >
              <div className="p2-scoll1-txt col-6   ">
                <div className="row justify-content-around">
                  <div className="col-7.2">
                    <h1>建立屬於自己的專屬旅行</h1>
                  </div>
                  <div className="col-2 ">
                    <hr data-aos="flip-left" data-aos-delay="900" />
                  </div>
                  <div
                    className="col-1.2"
                    data-aos="zoom-in-down"
                    data-aos-delay="1500"
                  >
                    <FiMapPin className="p2-icon  " />
                  </div>
                </div>
                <h4 className="p2-scoll1-h4">
                  看到某個旅行社推出的行程很心動，但人數不夠開不了團？現在立即開創屬於自己的旅行，
                  告訴大家你的行程，找找看有沒有人願意一起報名。
                  從此不必在煩惱行程，湊到足夠的人數及可出發!
                </h4>
                <div className="row justify-content-around">
                  <button onClick={Goitinerary22} className="Homebtn2">
                    <h4>立馬揪團</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomeP2scoll2
