import AOS from 'aos'
import 'aos/dist/aos.css'

function HomeP4(props) {
  AOS.init()

  return (
    <>
      <div className="p4-txt-relative Home-container">
        <h1
          className="p4-title"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-duration="900"
          data-aos-delay="300"
        >
          探索離島
        </h1>

        <div className="row justify-content-end">
          <div className="p4-scoll1-txt col-4">
            <div className="p4-txt">
              <div className="row ">
                <div className="col-6">
                  <h1
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-out"
                    data-aos-duration="900"
                    data-aos-delay="300"
                  >
                    離島風情
                  </h1>
                </div>
                <div className="col-1">
                  <h1 data-aos="flip-down" data-aos-delay="500">
                    |
                  </h1>
                </div>
                <div className="col-5 ">
                  <h2
                    className=" home-vlr"
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-out"
                    data-aos-duration="900"
                    data-aos-delay="300"
                  >
                    金門
                  </h2>
                </div>
              </div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-out"
                data-aos-duration="900"
                data-aos-delay="600"
              >
                <h5>小小的島嶼上共有66處縣定古蹟</h5>
                <p>
                  漫步在金門時，抬頭便可看見閩南建築風格的古厝或是巴洛克式洋樓，而如此豐富有著歷史故事必遊景點，非常值得您一一前來拜訪。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="parallax">
        <div class="bg1 "></div>
      </div>
    </>
  )
}

export default HomeP4
