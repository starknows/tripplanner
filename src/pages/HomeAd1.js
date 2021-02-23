import React from 'react'

// BreadCrumb
import MyBreadCrumb from '../components/main/MyBreadCrumb/MyBreadCrumb'
import HomeP1Image from '../components/main/HomeP1Image'
import '.././style/home.scss'
import AOS from 'aos'
import { withRouter, Link } from 'react-router-dom'

import 'aos/dist/aos.css'
import {
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll'
AOS.init()
scroll.scrollToTop()
scroller.scrollTo('scroll-to-element', {
  duration: 800,
  delay: 0,
  smooth: 'easeInOutQuart',
})
function HomeAd1(props) {
  // 從App元件得到登入狀態，解構出來
  const { isAuth } = props

  return (
    <>
      <div className="test-wrap col justify-content-center ">
        <MyBreadCrumb />
        {/* {isAuth ? '會員登入, XXX你好' : '未登入'} */}
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

        <h1
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="100"
        >
          樂天文青之旅 TOP 3
        </h1>
        <h4
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="100"
        >
          出發吧! 開始您的旅行吧!
        </h4>
        <p
          className="HomeAdTeg"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="100"
        >
          #文青 #療癒 #心靈雞湯 #UI
        </p>
        <div className="HomeAd">
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd1Img/o1.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            TOP3 福寶濕地
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            福寶濕地因有超過上百種的水鳥在此地棲息有中部水鳥天堂之稱，吸引了許多賞鳥人士、攝影人士來此造訪。藝術家以漂流木為素材點綴充滿荒野氣息的溼地，讓福寶濕地成了IG打卡熱點。
            除了攝影人士、網美旅客，福寶濕地的潮間帶也是養蚵人家重要的工作帶之一。夏天來彰化的朋友日落時間較晚，建議可以先順遊附近的乳牛彩繪村拍個照再來看夕彩。
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd1Img/o3.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            TOP2 扇形車庫
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            彰化扇形車庫是全台六座扇型車庫中，唯一仍有車輛的作業並開放參觀的歷史寶藏，扇形車庫現為彰化縣縣定古蹟，來此參觀的朋友有機會能看到車輛駛入轉車臺掉頭，以及火車回車庫休息的畫面。
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd1Img/o4.jpg"
            className="HomeAdImg "
          />
          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            TOP1 八卦山
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            八卦山無疑是彰化是最經典的景點了！除了參拜大佛，八卦山也是舉辦彰化大大小小活動的地方，像是跨年演唱會、煙火秀。
            建議來參觀的朋友也可以沿著八卦山天空步道走走，走到步道末端七號出口可以抵達彰化美學館品味一下藝文氣息。小編推薦大家傍晚或晚上時間來八卦山，在八卦山賞夕陽和夜景是滿不錯的玩法。
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd1Img/o2.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            行程規劃
          </h1>

          <HomeP1Image />
        </div>
      </div>
    </>
  )
}

export default HomeAd1
