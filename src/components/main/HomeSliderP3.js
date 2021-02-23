import React from 'react'
import Card from './Card'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import AOS from 'aos'
import 'aos/dist/aos.css'
function HomeSliderP3(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1202 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 12002, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  return (
    <Router>
      <>
        <div className="p3Slider-relative">
          <div className="Carousel1">
            <Carousel responsive={responsive}>
              <div>
                <Card
                  className="home-card"
                  title={'資深領隊與您一起探索東部風華'}
                  text={`2021 瘋玩東海岸．秘境新景點. 邀請旅遊達人分享您所不知道的東部，跟著前往最秘境的海域，水上活動、浮潛、自然生態探索，地質景觀、大啖`}
                  location={'台北市'}
                  image={'homePhoto/HomeSliderP3/q1.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={1}
                  price={-1}
                  person={'徐正一'}
                  like={351}
                  mark={52}
                />
              </div>
              <div>
                <Card
                  className="home-card"
                  title={'遇見旅途中的風情'}
                  text={`旅遊攝影達人Allen，擁有超過10年的攝影資歷並曾多次獲得專業攝影獎項，具有國際領隊資格，從規劃專業攝影行程到親自帶團都可一手包辦`}
                  location={'桃園市'}
                  image={'homePhoto/HomeSliderP3/q2.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={1}
                  price={-1}
                  person={'吳家駿'}
                  like={622}
                  mark={262}
                />
              </div>
              <div>
                <Card
                  className="home-card"
                  title={'一瞬心動！台灣支線、輕便鐵路的風景故事'}
                  text={`提到澎湖，一般人可能先想到望安、七美、馬公等地。但澎湖之南，還有被稱為「南方四島」的小島早在八百萬年前，岩漿湧出，玄武岩形成東吉嶼、西吉嶼、東嶼坪嶼、西嶼坪嶼等，周圍環繞著大片珊瑚礁與漁群。清朝、日治時期，這裡作為海上貿易的中繼站，繁榮一時，東吉甚至比望安還熱鬧，擁有「小上海」的美稱。`}
                  location={'桃園市'}
                  image={'homePhoto/HomeSliderP3/q4.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={1}
                  price={-1}
                  person={'王大明'}
                  like={774}
                  mark={226}
                />
              </div>
            </Carousel>
          </div>
          <Link to="/travelBuddy">
            <div className="p3-all-more">
              <h4>
                更多 <AiOutlineDoubleRight />
              </h4>
            </div>
          </Link>
        </div>
      </>
    </Router>
  )
}

export default HomeSliderP3
