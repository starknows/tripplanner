//我的揪團
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaUsers, FaRegCalendarCheck } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'

// let cardData = require('../../Itinerary/testJsonData.json')
// let handleTestData = cardData[2].data

function MeFavoritesgroup(id) {
  const [trmef, setTrmef] = useState([])

  async function getTrmef(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/meFavoritesgroup/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setTrmef(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getTrmef()
  }, [])

  return (
    <>
      {trmef.map((v, index) => (
        <div key={index} className="card-ingroup-box mb-3">
          <div className="row no-gutters me-favorites-back-style">
            <div className="col-md-4">
              <img
                // 要放絕對路徑
                src="http://localhost:3000/images/member/DSC_7437-37.jpg"
                className="card-img img-fluid"
                alt="..."
              />
            </div>
            <div className="col-md-8 align-items-end">
              <div className="card-body">
                <h3 className="card-title">{v.tr_name}</h3>
                <span className="mef-icno-style">
                  <IoMdTime />
                  {v.tr_datebegin} - {v.tr_dataend}
                </span>
                <span className="mef-icno-style d-flex justify-content-between">
                  {/* 地圖位置1 */}
                  <p className="card-style-mef ">
                    <FaMapMarkerAlt />
                    {v.tr_region}
                  </p>
                  <p className="card-style-mef">
                    <FaMapMarkerAlt />
                    {v.tr_city}
                  </p>
                  <FaUsers />
                  &emsp;
                  {v.tr_membername}
                  &emsp;&emsp;
                  <FaRegCalendarCheck />
                  &emsp;
                  {v.tr_needid !== -1 && v.tr_needid + '天'}
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
export default MeFavoritesgroup
