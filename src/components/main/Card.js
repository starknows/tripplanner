//卡片元件
//
import React, { useState } from 'react'
import StrCutter from './StrCutter'
import { Link } from 'react-router-dom'
import {
  FaMapMarkerAlt,
  FaUsers,
  FaRegCalendarCheck,
  FaDollarSign,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from 'react-icons/fa'

function Card({
  imgFrom = 'front',
  id = 1, //資料的id
  title, //標題
  text, //內文
  location, //左上角的地標
  image, //圖片的檔名與附檔名ex: 'testImage.jpg'
  time1 = -1, //第一個日期
  time2 = -1, //第二個日期
  duration = -1, //天數
  price = -1, //價格
  person, //卡片內顯示的人名
  like, //愛心人數
  mark, //收藏人數
}) {
  const imagePath = '/images/' + image
  const backImage = 'http://localhost:5000/images/' + image
  const [nowLike, setNowLike] = useState(like)
  const [nowMark, setNowMark] = useState(mark)
  const [isLike, setIsLike] = useState(0)
  const [isFollow, setIsFollow] = useState(0)
  let handelTitle = StrCutter(title, 15)
  let handelText = text && StrCutter(text, 42)
  let type = 'itinerary'
  if (time1 === -1) {
    type = 'itinerary'
  } else if (time2 !== -1) {
    type = 'travelBuddy'
  } else if (price !== -1) {
    type = 'productList'
  }
  let detailUrl = `/${type}/view/${id}`
  const calenderMark = (
    <>
      <FaRegCalendarCheck />
      &ensp;
      {duration + '天'}
      &emsp;&emsp;
    </>
  )
  const priceMark = (
    <>
      <FaDollarSign />
      &ensp;
      {price}
      &emsp;&emsp;
    </>
  )
  return (
    <>
      <div className="card-wrapper custom-box-shadow">
        <p className="card-label content-small">
          <FaMapMarkerAlt />
          <span> {location}</span>
        </p>
        <figure className="card-figure">
          <Link to={detailUrl}>
            {imgFrom === 'front' ? (
              <img className="card-image" alt={title} src={imagePath} />
            ) : (
              <img className="card-image" alt={title} src={backImage} />
            )}
          </Link>
        </figure>
        <div className="card-content">
          <p className="content-small">
            {time1 !== -1 && time1}
            {time1 !== -1 && time2 !== -1 && ' - ' + time2}
          </p>
          <h4>{handelTitle}</h4>
          <p className="content-small card-text">{text !== -1 && handelText}</p>
        </div>
        <p className="card-info content-small d-flex justify-content-between">
          <span>
            <FaUsers />
            &ensp;
            {person}
            &emsp;&emsp;
            {duration !== -1 && calenderMark}
            {price !== -1 && priceMark}
          </span>

          <Link to={detailUrl} className="card-detail">
            詳細 &gt;
          </Link>
        </p>
        <div className="buttonWrap d-flex">
          <div
            role="button"
            className="card-button card-like"
            onClick={(e) => {
              console.log(e.target)
              if (e.target.classList.contains('card-like')) {
                isLike ? setIsLike(0) : setIsLike(1)
              }
            }}
          >
            <p
              onClick={(e) => {
                console.log(e.target)
                isLike ? setIsLike(0) : setIsLike(1)
              }}
            >
              {isLike ? <FaHeart /> : <FaRegHeart />}
              &emsp;
              {isLike ? nowLike + 1 : nowLike}
            </p>
          </div>
          <div className="card-slice"></div>
          <div role="button" className="card-button  card-follow">
            <p
              onClick={(e) => {
                console.log(e.target)
                isFollow ? setIsFollow(0) : setIsFollow(1)
              }}
            >
              {isFollow ? <FaBookmark /> : <FaRegBookmark />}
              &emsp;
              {isFollow ? nowMark + 1 : nowMark}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
// 檔案負責人: 柯政安
