//我的收藏講座
import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaUsers, FaRegCalendarCheck } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { Link } from 'react-router-dom'
//引入卡片
// let cardData = require('../../Itinerary/testJsonData.json')
// let handleTestData = cardData[2].data

function MeFavoritesLecture({
  map1 = '北部', //地區1
  map2 = '桃園', //地區2
  duration = '19:00-21:00', //天數
}) {
  //拉取id1
  const [productCard, setProductCard] = useState('1')

  //引入資料庫
  async function getProductCard() {
    try {
      const response = await fetch('http://localhost:5000/productList', {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        setProductCard(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getProductCard()
  }, [])

  return (
    <div className="card-ingroup-box mb-3">
      <div className="row no-gutters me-favorites-back-style">
        <div className="col-md-4">
          <Link to="/productList/view/1">
            <img
              // 要放絕對路徑
              src={
                'http://localhost:5000//images/classPhoto/' +
                productCard[0].classPhoto
              }
              className="card-img img-fluid"
              alt="productCard[0].classPhoto"
            />
          </Link>
        </div>
        <div className="col-md-8 align-items-end">
          <div className="card-body">
            <h3 className="card-title">{productCard[0].className}</h3>
            <span className="mef-icno-style">
              <IoMdTime />
              {productCard[0].classDate}
            </span>
            <span className="mef-icno-style d-flex justify-content-between">
              {/* 地圖位置1 */}
              <p className="card-style-mef ">
                <FaMapMarkerAlt />
                {map1}
              </p>
              <p className="card-style-mef">
                <FaMapMarkerAlt />
                {map2}
              </p>
              <FaUsers />
              &emsp;
              {productCard[0].teacher_name}
              &emsp;&emsp;
              <FaRegCalendarCheck />
              &emsp;
              {duration}
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
export default MeFavoritesLecture
