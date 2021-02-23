/**
 * 因幻燈片未製作成reuse的共用元件，故僅能從組員那邊直接複製回來使用
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

function ItinCaro() {
  const [imgIndex, setImgIndex] = useState(0)
  const [carouselImg, setCarouselImg] = useState('')

  const settings = {
    infinite: true,
    lazyload: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    variableHeight: true,
    centerPadding: '270px',
    autoplay: true,
    autoplaySpeed: 2000,
    arrow: false,
    beforeChange: (current, next) => setImgIndex(next),
  }

  async function getCarousel(props) {
    try {
      const response = await fetch(`http://localhost:5000/itinerary/carousel`, {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        setCarouselImg(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getCarousel()
  }, [])

  return (
    <>
      <div className="carousel-main">
        <Slider {...settings} className="carousel-outbox row">
          {carouselImg.length > 0 &&
            carouselImg.map((v, i) => (
              <Link to={'/itinerary/view/' + v.itin_id}>
                <div
                  key={i}
                  className={
                    i === imgIndex
                      ? 'carousel-active-slide carousel-slide'
                      : 'carousel-slide'
                  }
                >
                  <img
                    src={'http://localhost:5000/images/' + v.image}
                    alt={v.title}
                  />
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </>
  )
}

export default ItinCaro
