import React from 'react'
import Card from './Card'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
function HomeSlider(props) {
  AOS.init()

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  return (
    <>
      <div>
        <div
          className="Carousel"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="1000"
        >
          <Carousel responsive={responsive}>
            <div>
              <Card
                className="home-card"
                title={'九份一日遊景點'}
                text={`九份是一座浸潤著黃金歲月的浪漫城鎮，越過一路蜿蜒陡峭的山路，便是交融著觀光客與歷史痕跡的山城。 來九份不要只有在老街吃吃東西`}
                location={'基隆市'}
                image={'homePhoto/homeImgslider/z1.jpg'}
                time1={-1}
                time2={-1}
                duration={1}
                price={-1}
                person={'鄧超'}
                like={449}
                mark={95}
              />
            </div>
            <div>
              <Card
                className="home-card"
                title={'六十石山金針花海1日'}
                text={`六十石山、赤科山、太麻里山為花東縱谷三大金針栽植區，也是每年8月至9月賞金針花海的好去處。六十石山位在富里鄉竹田村東側海拔約800公尺的海岸山脈上`}
                location={'花蓮縣'}
                image={'homePhoto/homeImgslider/z2.jpg'}
                time1={-1}
                time2={-1}
                duration={1}
                price={-1}
                person={'王小明'}
                like={312}
                mark={232}
              />
            </div>
            <div>
              <Card
                className="home-card"
                title={'玉山西峰雲海二日行'}
                text={`玉山身為百岳之首、台灣屋脊，連一般沒在爬山的台灣人、外國遊客都會來朝聖了，何況是山友，遲早都要去的，玉山主峰日出、西峰雲海二日行`}
                location={'南投縣'}
                image={'homePhoto/homeImgslider/z3.jpg'}
                time1={-1}
                time2={-1}
                duration={2}
                price={-1}
                person={'王華'}
                like={658}
                mark={77}
              />
            </div>
            <div>
              <Card
                className="home-card"
                title={'武陵櫻花季-國內賞花最前線'}
                text={`武陵農場櫻花 可以說是每年春季台灣最有名的美景之一，2021 武陵農場櫻花季 02/12~02/28浪漫盛開中，不用到日本就能享受絕美櫻花盛宴！本篇介紹2021武陵農場櫻花季的賞櫻看點與賞櫻路線，除了粉紅櫻花花海以外，還有白色的浪漫霧社山櫻，`}
                location={'台中市'}
                image={'homePhoto/homeImgslider/z4.jpg'}
                time1={-1}
                time2={-1}
                duration={1}
                price={-1}
                person={'鍾金民'}
                like={872}
                mark={122}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default HomeSlider
