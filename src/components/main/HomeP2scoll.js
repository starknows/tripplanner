import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
function HomeP2scoll(props) {
  let history = useHistory()
  function travelBuddies(data) {
    history.push(`/travelBuddies?${data}`)
  }

  return (
    <>
      <div className="p2-scoll1">
        <div class="parallax2">
          <div class="bg2 ">
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
                    <h1>和附近朋友一起揪團旅行</h1>
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
                  對於許多來說，最享受的莫過於三五好友，一同旅行。吃吃玩玩，彷彿重溫年輕的記憶。但對有些大人來說，也常常為了找不到旅伴而煩惱。
                  不妨透過旅歷認識旅伴，來場翻轉心情的冒險之旅！一起遊覽世界。
                </h4>
                <div className="row justify-content-around">
                  <button
                    onClick={() => {
                      let mapstory = props.mapstory
                      // travelBuddies(JSON.stringify(mapstory))
                      travelBuddies('桃園市')
                    }}
                    className="Homebtn2"
                  >
                    <h4>尋找揪團</h4>
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
export default HomeP2scoll
