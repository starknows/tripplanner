//我的揪團
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaUsers, FaRegCalendarCheck } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Pages from '../../main/Pages'

//引入json
// let cardData = require('../../Itinerary/testJsonData.json')
// let handleTestData = cardData[2].data

function MeFavoritesgroup({
  id = 1, //資料的id
  time1 = -1, //第一個日期
  time2 = -1, //第二個日期
  price = -1, //價格
  itemPerPage = 9,
}) {
  const [metbJoined, setMetbJoined] = useState([])
  console.log('metbJoined', metbJoined)
  let type = 'travelBuddies'
  if (time1 === -1) {
    type = 'travelBuddies'
  } else if (time2 !== -1) {
    type = 'travelBuddies'
    // 改
  } else if (price !== -1) {
    type = 'travelBuddies'
  }
  //超連結
  let detailUrl = `/${type}/view/${id}`

  //引入資料庫
  async function gettbJoined() {
    try {
      const response = await fetch(`http://localhost:5000/travelBuddies`, {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        setMetbJoined(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  useEffect(() => {
    gettbJoined()
  }, [])

  //pages
  let [showRange, setShowRange] = useState([0, itemPerPage])
  let dataLength = metbJoined.length
  let totalPage = Math.floor(dataLength / itemPerPage)
  function changePage(orderPage) {
    setShowRange([(orderPage - 1) * itemPerPage, orderPage * itemPerPage])
    window.scrollTo(0, 0)
  }

  let display = <></>

  if (type === 'travelBuddies') {
    display = metbJoined.map((v, index) => {
      // pages
      if (index < showRange[0] || index >= showRange[1]) {
        return null
      } else {
        return (
          <div key={index} className="card-ingroup-box mb-3">
            <div className="row no-gutters me-favorites-back-style">
              <div className="col-md-4">
                <Link to={detailUrl}>
                  <img
                    src={
                      'http://localhost:5000/images/tbPhoto/' + v.tb_themePhoto
                    }
                    className="card-img img-fluid"
                    alt={v.tb_themePhoto}
                  />
                </Link>
              </div>
              <div className="col-md-8 align-items-end">
                <div className="card-body">
                  <h3 className="card-title">{v.tb_themeName}</h3>
                  <span className="mef-icno-style">
                    {/* 時間切割 */}
                    <IoMdTime />{' '}
                    {metbJoined[0].tb_dateBegin.slice(0, 4) +
                      '/' +
                      metbJoined[0].tb_dateBegin.slice(5, 7) +
                      '/' +
                      metbJoined[0].tb_dateBegin.slice(8, 10) +
                      '-' +
                      metbJoined[0].tb_dateEnd.slice(0, 4) +
                      '/' +
                      metbJoined[0].tb_dateEnd.slice(5, 7) +
                      '/' +
                      metbJoined[0].tb_dateEnd.slice(8, 10)}
                  </span>
                  <span className="mef-icno-style d-flex justify-content-between">
                    {metbJoined[0].tb_region.split(',').length > 0 &&
                      metbJoined[0].tb_region.split(',').map((v, i) => {
                        return (
                          <p className="card-style-mef">
                            <FaMapMarkerAlt />
                            <span>{v}</span>
                          </p>
                        )
                      })}
                    {metbJoined[0].tb_city.split(',').length > 0 &&
                      metbJoined[0].tb_city.split(',').map((v, i) => {
                        return (
                          <p className="card-style-mef">
                            <FaMapMarkerAlt />
                            <span>{v}</span>
                          </p>
                        )
                      })}
                    <FaUsers />
                    &emsp;
                    {metbJoined.length > 0 && metbJoined[0].tb_owner}{' '}
                    &emsp;&emsp;
                    <FaRegCalendarCheck />
                    &emsp;
                    {metbJoined[0].tb_daysCategory}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
  }

  return (
    <>
      {display}
      <Pages pages={totalPage} changePage={changePage} />
    </>
  )
}
export default MeFavoritesgroup
