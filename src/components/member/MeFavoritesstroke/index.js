//我的收藏行程
import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaUsers, FaRegCalendarCheck } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'

function MeFavoritesstroke({
  id = 1, //資料的id
  time1 = -1, //第一個日期
  time2 = -1, //第二個日期
  price = -1, //價格})
}) {
  let type = 'travelBuddies'
  if (time1 === -1) {
    type = 'itinerary'
  } else if (time2 !== -1) {
    type = 'itinerary'
    // 改
  } else if (price !== -1) {
    type = 'itinerary'
  }
  let detailUrl = `/${type}/view/${id}`
  const [meitinerary, setMeitinerary] = useState([])

  async function getProductCard(props) {
    try {
      const response = await fetch(`http://localhost:5000/itinerary`, {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        setMeitinerary(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getProductCard()
  }, [])

  function cityToRegion(city) {
    let region = '北部'
    switch (city) {
      case '台北':
      case '新北':
      case '基隆':
      case '桃園':
      case '新竹':
        region = '北部'
        break
      case '雲林':
      case '南投':
      case '彰化':
      case '台中':
      case '苗栗':
        region = '中部'
        break
      case '屏東':
      case '高雄':
      case '台南':
      case '嘉義':
        region = '南部'
        break
      case '宜蘭':
      case '花蓮':
      case '台東':
        region = '東部'
        break
      case '蘭嶼':
      case '綠島':
      case '馬祖':
      case '金門':
      case '澎湖':
      case '小琉球':
        region = '離島'
        break
    }
    return region
  }
  return (
    <>
      {meitinerary.map((element, index) => (
        <div key={index} className="card-ingroup-box mb-3">
          <div className="row no-gutters me-favorites-back-style">
            <div className="col-md-4">
              <Link to={detailUrl}>
                <img
                  src={'/images/' + element.image}
                  className="card-img img-fluid"
                  alt={element.image}
                />
              </Link>
            </div>
            <div className="col-md-8 align-items-end">
              <div className="card-body">
                <h3 className="card-title">{element.title}</h3>
                <span className="mef-icno-style">
                  <IoMdTime />
                  {element.publish_time} - {element.publish_time}
                </span>
                <span className="mef-icno-style d-flex justify-content-between">
                  {/* 地圖位置1 */}
                  {/* <p className="card-style-mef ">
                    <FaMapMarkerAlt />
                    {element.region.cityToRegion()}
                  </p> */}
                  <p className="card-style-mef">
                    <FaMapMarkerAlt />
                    {element.location}
                  </p>
                  <FaUsers />
                  &emsp;
                  {element.nickname}
                  &emsp;&emsp;
                  <FaRegCalendarCheck />
                  &emsp;
                  {/* {duration + '天'} */}
                  {element.duration - element.duration + 1 + '天'}
                  {/* {price !== -1 && priceMark} */}
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default MeFavoritesstroke
