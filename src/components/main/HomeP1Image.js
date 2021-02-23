import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { withRouter, Link } from 'react-router-dom'

AOS.init()
function HomeP1Image(props) {
  return (
    <>
      <div className="row home-p1">
        <div className="col-5">
          <figure
            className="home-p1-figure-left"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <div>
              <img src="./images/homePhoto/p3.jpg" className="HomeAdImg" />
              <div className="P1Logo">
                <img class="P1logo1" src="./images/homePhoto/logo.svg" />
              </div>
            </div>
          </figure>
          <Link to="/itinerary/new">
            <figure
              className="home-p1-figure-left"
              data-aos="fade-zoom-in"
              data-aos-easing="ease-out"
              data-aos-duration="900"
              data-aos-delay="300"
              data-aos-offset="210"
            >
              <img src="./images/homePhoto/p2.jpg" />
              <h2
                data-aos="zoom-in-right"
                data-aos-delay="600"
                data-aos-duration="1000"
              >
                個人化旅歷製作
              </h2>
              <div
                className="line"
                data-aos="zoom-in-right"
                data-aos-delay="600"
                data-aos-duration="1000"
                data-aos-offset="-50"
              />
            </figure>
          </Link>
        </div>
        <div className="col-7">
          <figure
            className="home-p1-figure-right-top"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <img src="./images/homePhoto/p4.png" />
          </figure>

          <div
            className="row home-p1-figure-right-bottom"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
          >
            <div className="col-4   ">
              <Link to="/HomeAd1">
                <figure>
                  <img src="./images/homePhoto/p5.png" />
                  <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-out"
                    data-aos-duration="900"
                    data-aos-delay="900"
                    data-aos-offset="-90"
                  >
                    <h3>文青之旅</h3>
                  </div>
                </figure>
              </Link>
            </div>
            <div className="col-4">
              <Link to="/HomeAd2">
                <figure>
                  <img src="./images/homePhoto/p6.jpg" />
                  <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-out"
                    data-aos-duration="900"
                    data-aos-delay="900"
                    data-aos-offset="-90"
                  >
                    <h3>慶典文化</h3>
                  </div>
                </figure>
              </Link>
            </div>

            <div className="col-4">
              <Link to="/HomeAd3">
                <figure>
                  <img src="./images/homePhoto/p7.png" />
                  <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-out"
                    data-aos-duration="900"
                    data-aos-delay="900"
                    data-aos-offset="-90"
                  >
                    <h3>城市探索</h3>
                  </div>
                </figure>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeP1Image
