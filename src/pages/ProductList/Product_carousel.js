import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

function Carousel() {
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
      const response = await fetch(
        `http://localhost:5000/productList/product_carousel`,
        {
          method: 'get',
        }
      )
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
              <Link to={'/productList/view/' + v.id}>
                <div
                  key={i}
                  className={
                    i === imgIndex
                      ? 'carousel-active-slide carousel-slide'
                      : 'carousel-slide'
                  }
                >
                  <img
                    src={
                      'http://localhost:5000/images/classPhoto/' + v.classPhoto
                    }
                    alt={v.classPhoto}
                  />
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </>
  )
}

export default Carousel
