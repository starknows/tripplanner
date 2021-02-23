import React, { useState, useEffect } from 'react'
import '.././style/home.scss'
// import HomeHeader from '../components/main/HomeHeader'
// import Footer from '../components/main/Footer'
import Kv from '../components/main/Kv'
import HomeTitle1 from '../components/main/HomeTitle1'
import HomeP1Image from '../components/main/HomeP1Image'
import HomeSlider from '../components/main/HomeSlider'
import HomeBtn from '../components/main/HomeBtn'
import HomeP2 from '../components/main/HomeP2'
import HomeP3 from '../components/main/HomeP3'
import HomeP4 from '../components/main/HomeP4'
import HomeP4Card from '../components/main/HomeP4Card'
import HomeP5 from '../components/main/HomeP5'
import HomeP5Card from '../components/main/HomeP5Card'
import HomeP2scoll2 from '../components/main/HomeP2scoll2'

import HomeP2scoll from '../components/main/HomeP2scoll'
import Geocode from 'react-geocode'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

function Home() {
  const [mapstory, settmapstory] = useState([])
  function getmap(props) {
    if (navigator.geolocation) {
      function error() {
        alert('無法取得你的位置')
      }
      function success(position) {
        // console.log(position.coords.latitude, position.coords.longitude)
        //google

        Geocode.setApiKey('AIzaSyDIaG31GEY2rsiG931nQn2nvxuvS7PQE4k')
        Geocode.setLanguage('zh-TW')
        Geocode.enableDebug()
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            const address0 = response.results[0].formatted_address
            const address1 = Array.from(address0)
            const address = address1[5] + address1[6] + address1[7]
            settmapstory(address)

            console.log(address)
          },
          (error) => {
            console.error(error)
            const address = '桃園市'
            settmapstory(address)
          }
        )
      }

      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      alert('Sorry, 你的裝置不支援地理位置功能。')
      const address = '桃園市'
    }
  }
  useEffect(() => {
    getmap()
  }, [mapstory])

  return (
    <>
      <div className="navbar-background" />

      {/* <HomeHeader data-aos="fade-down" /> */}

      <Kv
        mapstory={mapstory}
        data-aos="fade-zoom-in"
        data-aos-easing="ease-out"
        data-aos-duration="900"
        data-aos-delay="100"
      />

      <article className="home-body">
        <div className="Home-container">
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            <HomeTitle1 />
          </div>
          <div>
            <HomeP1Image />
          </div>
          <div
            className="p1-cardtitle "
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <h2>熱門行程</h2>
          </div>
        </div>
        <div
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="300"
          data-aos-offset="200"
        >
          <div className="p1-cardbackground-relative">
            <div className="p1-cardbackground" />
          </div>
        </div>
        <div className="Home-container">
          <HomeSlider />
          <div
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <HomeBtn />
          </div>
        </div>
        <HomeP2scoll mapstory={mapstory} />
        <HomeP2scoll2 />

        <div className="p1-cardbackground-relative">
          <div className="Home-container">
            <div className="p3-cardbackground">
              <img src="../images/homePhoto/inada_txt.svg" />
            </div>
            <HomeP2 />
            <HomeP3 />
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-5 p3-circle-relative">
            <figure
              class="p3-circle"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="900"
            >
              <img src="../images/homePhoto/p9.jpg" />
            </figure>
          </div>
        </div>
        <HomeP4 />
        <div className="Home-container">
          <HomeP4Card />
          <div
            className="p4-btn"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <HomeBtn />
          </div>
        </div>

        <HomeP5 />
        <div className="Home-container">
          <HomeP5Card />
          <div
            className="p4-btn"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <HomeBtn />
          </div>
        </div>
      </article>

      {/* <Footer /> */}
    </>
  )
}

export default Home

//建議 img 使用絕對路徑
