import React from 'react'
import Card from './Card'
import HomeBtn from '../../components/main/HomeBtn'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
function HomeP2(props) {
  return (
    <>
      <div className="row justify-content-end p2-main">
        <div className="P2card">
          <div className="P2card-title">
            <h2
              data-aos="fade-zoom-in"
              data-aos-easing="ease-out"
              data-aos-duration="900"
              data-aos-delay="600"
              data-aos-offset="200"
            >
              #即將開團
            </h2>
            <div
              className="card-line"
              data-aos="zoom-in-left"
              data-aos-delay="200"
              data-aos-duration="600"
            />
            <div className="row">
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-out"
                data-aos-duration="900"
                data-aos-delay="1200"
                data-aos-offset="200"
              >
                <Card
                  className="home-card"
                  title={'臺北故宮滿載而歸一日遊'}
                  text={`刻年在一真升友在，夜長能前路大她力去主保：頭的母打字會，然算子在待的際和體，會作且名說館失古林假母談就這同……只兒兩就適，他數說講中日發形：獎有深升感會重，存的其再因家平家得的過相著有小考外今告臺男無起全朋他非油是間演是世也，仍件實工相回方。花未布你就益統質兒。就家益歌酒得道舉象水。這存總，遊假一笑演動爾他來充麼青道線活作理麼可們省合夫水精所！會著於生了機業我劇我鄉電那你大親河坐這議象不時推們時是然油……夜加前水集都他，因林受用者是起氣照然為車區活運青外車差事土再然軍勢廣太？入生風演叫率究元好克回起不哥地使。功保說經化活座比著，健排的前花相結洲全條灣書？市大死平龍像險愛重，獲石水作實，父大以他吸，樓高法今科推的實變動兒在認製世也子必期同；出她心地已比心外孩輪頭飛……這所報的，舞色初類……歌中軍於全往管義、問濟一，飛等人會入快，不眼園技，少玩之，沒言不期動那下……件投去痛但說義民來……可人緊發心舉雖人亞生他大物商因所長於臺去分土詩成時！`}
                  location={'台北市'}
                  image={'homePhoto/homeImgP2/a1.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={1}
                  price={-1}
                  person={'孫小美'}
                  like={742}
                  mark={62}
                  //
                />
              </div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-out"
                data-aos-duration="900"
                data-aos-delay="1200"
                data-aos-offset="200"
              >
                <Card
                  className="home-card"
                  title={'三義龍騰斷橋~發現舊山線之美'}
                  text={`魚藤坪斷橋又名龍騰斷橋，原名魚藤坪橋，位於臺灣苗栗縣三義鄉龍騰村，為縱貫線鐵路（後屬臺中線）全線開通前一年（即1907年）所興建完成的磚造橋墩、鋼鈑`}
                  location={'苗栗縣'}
                  image={'homePhoto/homeImgP2/a2.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={1}
                  price={-1}
                  person={'蔡中新'}
                  like={482}
                  mark={88}
                />
              </div>
            </div>
            <div className="row">
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-out"
                data-aos-duration="900"
                data-aos-delay="300"
                data-aos-offset="200"
              >
                <Card
                  className="home-card"
                  title={'台南北門井仔腳瓦盤鹽田'}
                  text={`刻年在一真升友在，夜長能前路大她力去主保：頭的母打字會，然算子在待的際和體，會作且名說館失古林假母談就這同……只兒兩就適，他數說講中日發形：獎有深升感會重，存的其再因家平家得的過相著有小考外今告臺男無起全朋他非油是間演是世也，仍件實工相回方。花未布你就益統質兒。就家益歌酒得道舉象水。這存總，遊假一笑演動爾他來充麼青道線活作理麼可們省合夫水精所！會著於生了機業我劇我鄉電那你大親河坐這議象不時推們時是然油……夜加前水集都他，因林受用者是起氣照然為車區活運青外車差事土再然軍勢廣太？入生風演叫率究元好克回起不哥地使。功保說經化活座比著，健排的前花相結洲全條灣書？市大死平龍像險愛重，獲石水作實，父大以他吸，樓高法今科推的實變動兒在認製世也子必期同；出她心地已比心外孩輪頭飛……這所報的，舞色初類……歌中軍於全往管義、問濟一，飛等人會入快，不眼園技，少玩之，沒言不期動那下……件投去痛但說義民來……可人緊發心舉雖人亞生他大物商因所長於臺去分土詩成時！`}
                  location={'台南市'}
                  image={'homePhoto/homeImgP2/a3.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={3}
                  price={-1}
                  person={'金大垂'}
                  like={554}
                  mark={212}
                />
              </div>
              <div
                data-aos="fade-zoom-in"
                data-aos-easing="ease-out"
                data-aos-duration="900"
                data-aos-delay="300"
                data-aos-offset="200"
              >
                <Card
                  className="home-card"
                  title={'部落客帶你玩日月潭一日遊'}
                  text={`2021年1月4日 — 南投景點,日月潭一日遊,一直是國人喜歡來渡假的地方,其實青青也好喜歡日月潭,只要想要渡假放空的時候,就會安排來南投日月潭小旅行,不管是一日`}
                  location={'南投縣'}
                  image={'homePhoto/homeImgP2/a4.jpg'}
                  time1={-1}
                  time2={-1}
                  duration={1}
                  price={-1}
                  person={'黃小新'}
                  like={652}
                  mark={142}
                />
              </div>
            </div>
          </div>
          <div
            className="P2-btn"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-duration="900"
            data-aos-delay="300"
            data-aos-offset="200"
          >
            <HomeBtn />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeP2
