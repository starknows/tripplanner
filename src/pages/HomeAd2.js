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
function HomeAd(props) {
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
          一間大廟就像是在地的博物館，從廟口出發的深度旅行{' '}
        </h1>

        <p
          className="HomeAdTeg"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="100"
        >
          #Animation #Contents #Gamification #UI
        </p>
        <div className="HomeAd">
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd2Img/l1.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            新北-烘爐地夜色
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            全台最為知名土地公廟，南有車城福安宮。北有烘爐地台北縣中和地區相當出名的烘爐地土地公廟，是200年前來台的呂氏子孫所建，因為坐落在南勢角的「南山」山頭，所以又稱「南山福德宮」。山頭設一高達七十八尺的土地公巨像，是全台灣最大尊的土地公，也是中和的地標。烘爐地上的南山福德宮，以靈驗著稱香客不斷，想要求財求事業的，來此跟土地公求一定能有所獲。且福德宮內廟中有廟，更是一特殊的景象。
            烘爐地山頂平坦開闊，展望良好，尤其俯視大台北地區景色，難得的景點。更是夜間拍攝S彎道知名場景，停車場正是欣賞夜景及拍攝前景S彎道車燈光芒四射，配合南二高中景，加上大台北城市夜色，光彩奪目，夜晚夜美麗，不管是假日非假日，總是車水馬龍、光跡四射，將Ｓ灣道渲染成七彩色般的彩帶，成為光影的魔術師跟著光影一起舞動，交織出一幅又一幅獨特的圖畫。2005夜曝土地公
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd2Img/l2.jpg"
            className="HomeAdImg "
          />

          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            跟著大甲媽祖遶境{' '}
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            年漢人渡海來台，開墾平原、建立庄社，初期大多是在家中奉祀神像，待村落經濟發展越趨穩定，有共同的信仰，開始集資蓋廟，「這時候有趣的事情就跑出來了。」臺南藝術大學建築藝術研究所專任教授曾旭正這麼說。
            嘉南平原的聚落型態，因為水源、防禦等需求，以集居型為多。一般都以為廟宇會蓋在村落正中央，實際上卻座落在外圍，曾旭正推測與聚落發展脫不了關係，「當市街都已成形，中心區域沒有足夠空間，就會往外圍像是連繫鄰村的主要路口來興建廟宇。」但也不是沒有例外，曾旭正舉故鄉下營的上帝廟為例，三百多年前村民覺得腹地有限又受淹水所苦，擲筊一問，神明指示搬到北邊可人丁興旺，才從東南邊一公里外的地方遷至現址，「所以現在看到一些廟宇在中心位置的，探究背景會發現往往都是遷村再重新規畫的。」
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd2Img/l3.jpg"
            className="HomeAdImg "
          />
          <h1
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            南蜂炮慶佳節-2021台南鹽水蜂炮{' '}
          </h1>
          <p
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
          >
            水區靠近海，多住以討海為生的漁民，一些移民來自中國，福建沿海，蜂炮的活動耆老推測起於清，光緒11年（1885年），當時瘟疫流行，居民基於民間習俗，向當地的「關聖帝君」（關公）祈求平安，並依請示結果，在元宵節晚上，請出鹽水鎮上的鎮南宮周倉爺[1]做開路先鋒官，關聖帝君殿後，一路燃放炮竹繞境。相傳清光緒年間鹽水發生大瘟疫，民眾祈求神蹟降臨，沿途燃放炮竹直至天明，遶境結束後，鹽水疫情就此消退，民眾感念神恩，每年元宵夜沿襲成例，演變為今日赫赫有名之蜂炮盛會。
          </p>
          <img
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="100"
            src="./images/homePhoto/HomeAd2Img/l4.jpg"
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

export default HomeAd
