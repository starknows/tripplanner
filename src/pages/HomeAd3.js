import React from 'react'

// BreadCrumb
import MyBreadCrumb from '../components//main/MyBreadCrumb/MyBreadCrumb'
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
function HomeAd3(props) {
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
          探索城市未知的角落
        </h1>

        <p
          className="HomeAdTeg"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="100"
        >
          #親子樂園 #網美景點 #台北必玩 #情侶
        </p>
        <div className="HomeAd">
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd3Img/k1.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            情侶約會勝地-台北兒童樂園
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            台北兒童新樂園
            (台北兒童樂園)超精彩，交通怎麼去？捷運劍潭站轉公車41就到！來台北兒童新樂園門票30元，
            設施每項再收20元起，一日票玩到底約170元最省錢。兒童新樂園設施很多，恐龍、摩天輪、旋轉木馬等重點＆
            預約省時秘訣、免費設施、美食都會分享。台北市新兒童樂園、士林兒童樂園名稱眾多不重要，快來玩就對了～
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd3Img/k2.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            特色老街推薦-淡水老街{' '}
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            「淡水老街」不僅早已是全台知名熱門景點，同時也吸引不少外國人慕名而來。這裡街道兩旁林立熱鬧商店，有濃濃古早味的餅舖、雜貨店，也有賣潮流服飾、玩具，當然還有最吸引人的人氣美食如阿給、魚丸，另外還有古蹟可參觀，怎麼玩都不會膩。淡水老街分成外側靠淡水河岸的部分(金色水岸步道)與內側的老街，四處可見此區著名的古早味現烤蛋糕、烤魷魚、阿婆鐵蛋、魚酥、巨無霸冰淇淋還有淡水魚丸等等，都是來到此地必吃不可的美食。
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd3Img/k3.jpg"
            className="HomeAdImg "
          />
          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            華山1914文創園區怎麼玩？
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            台北華山文創園區
            (又稱：華山1914文化創意產業園區)，華山文創園區怎麼玩？華山文創園區展覽是大重點喔。
            很多超紅台北展覽都辦在這呢，再來華山美食餐廳咖啡廳、台灣麵食、早午餐等氛圍好人氣必訪。還有華山景點、
            電影院，以及磚屋、石牆、樹林等IG熱門打卡場景，到處有冷氣、屋簷遮蔽不怕日曬雨淋，台北一日遊快來這吧。
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd3Img/k4.jpg"
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

export default HomeAd3
