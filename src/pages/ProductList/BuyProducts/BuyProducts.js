import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './buy-products.scss'
import MyBreadCrumb from '../../../components/main/MyBreadCrumb/MyBreadCrumb'
import Spinner from '../../../components/main/Spinner'

// icon
import { FiClock } from 'react-icons/fi'
import { FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa'
import { RiSurgicalMaskFill } from 'react-icons/ri'
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineHeart,
  AiTwotoneHeart,
} from 'react-icons/ai'

function BuyProducts({
  earlyTicket,
  singleTicket,
  groupTicket,
  earlyPrice,
  singlePrice,
  groupPrice,
  classPhoto,
  className,
  classDate,
  classTimeStart,
  classTimeEnd,
  location,
  address,
  ticket_type,
  ticket_price,
  warning,
  classValue,
  classOutline,
  teacher_name,
  teacher_title,
  needToKnow,
  teacher_photo,
  teacher_history,
  like,
  mapSrc,
  changeData,
}) {
  // 這是modal
  // teacher Modal
  const [smShow, setSmShow] = useState(false)

  // shoppingcar modal
  const [smallShow, setSmallShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)

  const handleShow = () => setSmShow(true)

  // 計數器
  const [early, setEarly] = useState(earlyPrice)
  const [single, setSingle] = useState(singlePrice)
  const [group, setGroup] = useState(groupPrice)

  useEffect(() => {
    changeData(early, single, group)
  }, [early, single, group])
  // 愛心
  const [liked, setLiked] = useState(0)
  const [count, setCount] = useState(like)
  const tbLiked = (value) => {
    if (value === 0) {
      setLiked(1)
      setCount(count + 1)
    } else {
      setLiked(0)
      setCount(count - 1)
    }
  }
  let { product_id } = useParams()

  // 換頁
  let history = useHistory()
  function InTheCar() {
    history.push(`/productList/car1/${product_id}`)
  }
  function backProductList() {
    history.push(`/productList`)
  }
  function goLogin() {
    history.push(`/login`)
  }
  const data = {
    className,
    classDate,
    early,
    single,
    group,
    classPhoto,
    product_id,
    classTimeStart,
    classTimeEnd,
    address,
    location,
  }

  const getIDdata = JSON.parse(localStorage.getItem('product_id'))

  const getproductdata = JSON.parse(localStorage.getItem(product_id))
  // console.log(getproductdata)
  function newclass() {
    //寫入商品資訊
    localStorage.setItem(product_id, JSON.stringify(data))
    if (getIDdata === 0) {
      //第一筆寫入
      localStorage.setItem('product_id', JSON.stringify(product_id))
    } else if (getIDdata.indexOf(product_id) !== -1) {
      // indexOf 字串搜索 找到會就不等於-1
      console.log('加過了')
    } else if (getIDdata.indexOf(product_id) === -1) {
      // indexOf 字串搜索 找不到會回傳-1
      //就把新的商品ID加進去
      const plusID = getIDdata + ',' + product_id
      localStorage.setItem('product_id', JSON.stringify(plusID))
    }
  }

  const pageUrl = '/images/classPhoto/'
  const teacherUrl = '/images/teacher/'

  const dispalyBuy = (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <div className="container">
        <MyBreadCrumb />
        {/* 麵包屑 */}
        <figure className="heroPhoto">
          <img
            src={pageUrl + classPhoto}
            alt="圖片替代文字"
            className="animate__animated animate__backInDown"
          />
        </figure>
        <div className="title">
          <h2>{className}</h2>
          <Button variant="info">收藏</Button>
        </div>
        <div className="buyTheTicket">
          {/* 上半部買票區 */}

          <div className="aboutClass">
            {/* 上半部左邊 資訊區 */}

            <div className="aboutIcon">
              <FiClock />
              <div>
                <p>活動時間</p>
                <p>
                  {classDate} {classTimeStart}-{classTimeEnd}
                </p>
              </div>
            </div>

            <div className="aboutIcon">
              <FaMapMarkerAlt />
              <div>
                <p>活動地點</p>
                <p>{location}</p>
                <p>{address}</p>
              </div>
            </div>

            <div className="aboutIcon">
              <FaDollarSign />

              <div>
                <p>價格</p>
                <div className="ticketAndPrice">
                  <ul>
                    {ticket_type.split(',').map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                  <ul>
                    {ticket_price.split('-').map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="aboutIcon">
              <RiSurgicalMaskFill />
              <div className="tag">
                <p>{warning}</p>
              </div>
            </div>
            <hr />
          </div>

          <div className="IWantBuy">
            {/* 上半部右邊選擇區 */}

            <p>{className}</p>
            <div className="clock-time">
              <FiClock />
              <p>
                {classDate} {classTimeStart}-{classTimeEnd}
              </p>
            </div>

            <div className="ticketBuy">
              <p>{earlyTicket}</p>
              <div className="plusAndMinus">
                {early <= 0 ? (
                  <Button
                    variant="light"
                    onClick={() => setEarly(early - 1)}
                    disabled
                  >
                    <AiFillMinusCircle />
                  </Button>
                ) : (
                  <Button variant="light" onClick={() => setEarly(early - 1)}>
                    <AiFillMinusCircle />
                  </Button>
                )}
                {getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <p>{early <= 0 ? 0 : early}</p>
                  ) : (
                    <p>{getproductdata.early}</p>
                  )
                ) : (
                  <p>{early <= 0 ? 0 : early}</p>
                )}
                {getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <Button variant="light" onClick={() => setEarly(early + 1)}>
                      <AiFillPlusCircle />
                    </Button>
                  ) : (
                    <Button variant="light" disabled>
                      <AiFillPlusCircle />
                    </Button>
                  )
                ) : (
                  <Button variant="light" onClick={() => setEarly(early + 1)}>
                    <AiFillPlusCircle />
                  </Button>
                )}
              </div>
            </div>
            <div className="ticketBuy">
              <p>{singleTicket}</p>
              <div className="plusAndMinus">
                {single <= 0 ? (
                  <Button
                    variant="light"
                    onClick={() => setSingle(single - 1)}
                    disabled
                  >
                    <AiFillMinusCircle />
                  </Button>
                ) : (
                  <Button variant="light" onClick={() => setSingle(single - 1)}>
                    <AiFillMinusCircle />
                  </Button>
                )}
                {getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <p>{single <= 0 ? 0 : single}</p>
                  ) : (
                    <p>{getproductdata.single}</p>
                  )
                ) : (
                  <p>{single <= 0 ? 0 : single}</p>
                )}

                {getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <Button
                      variant="light"
                      onClick={() => setSingle(single + 1)}
                    >
                      <AiFillPlusCircle />
                    </Button>
                  ) : (
                    <Button variant="light" disabled>
                      <AiFillPlusCircle />
                    </Button>
                  )
                ) : (
                  <Button variant="light" onClick={() => setSingle(single + 1)}>
                    <AiFillPlusCircle />
                  </Button>
                )}
              </div>
            </div>
            <div className="ticketBuy">
              <p>{groupTicket}</p>
              <div className="plusAndMinus">
                {group <= 0 ? (
                  <Button
                    variant="light"
                    onClick={() => setGroup(group - 1)}
                    disabled
                  >
                    <AiFillMinusCircle />
                  </Button>
                ) : (
                  <Button variant="light" onClick={() => setGroup(group - 1)}>
                    <AiFillMinusCircle />
                  </Button>
                )}
                {getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <p>{group <= 0 ? 0 : group}</p>
                  ) : (
                    <p>{getproductdata.group}</p>
                  )
                ) : (
                  <p>{group <= 0 ? 0 : group}</p>
                )}
                {getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <Button variant="light" onClick={() => setGroup(group + 1)}>
                      <AiFillPlusCircle />
                    </Button>
                  ) : (
                    <Button variant="light" disabled>
                      <AiFillPlusCircle />
                    </Button>
                  )
                ) : (
                  <Button variant="light" onClick={() => setGroup(group + 1)}>
                    <AiFillPlusCircle />
                  </Button>
                )}
              </div>
            </div>
            <div className="buttonAndHeart">
              {/* 上半部右邊下面按鈕 */}

              {early === 0 && group === 0 && single === 0 ? (
                getIDdata != null ? (
                  getIDdata.indexOf(product_id) === -1 ? (
                    <Button variant="info" disabled>
                      加入購物車
                    </Button>
                  ) : (
                    <Button variant="info" onClick={() => InTheCar()}>
                      現在就去結帳
                    </Button>
                  )
                ) : (
                  <Button variant="info" onClick={() => setLoginShow(true)}>
                    加入購物車
                  </Button>
                )
              ) : getIDdata != null ? (
                getIDdata.indexOf(product_id) === -1 ? (
                  <Button
                    variant="info"
                    onClick={() => {
                      newclass()
                      setSmallShow(true)
                    }}
                  >
                    加入購物車
                  </Button>
                ) : (
                  <Button variant="info" onClick={() => InTheCar()}>
                    現在就去結帳
                  </Button>
                )
              ) : (
                <Button variant="info" onClick={() => setLoginShow(true)}>
                  加入購物車
                </Button>
              )}
              <Modal
                size="sm"
                show={smallShow}
                onHide={() => setSmallShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    已加入購物車
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalButton">
                  <Button
                    variant="info"
                    className="keepShop"
                    onClick={() => backProductList()}
                  >
                    繼續購物
                  </Button>
                  <Button
                    variant="info"
                    className="goNextOne"
                    onClick={() => InTheCar()}
                  >
                    下一步
                  </Button>
                </Modal.Body>
              </Modal>

              <Modal
                size="sm"
                show={loginShow}
                onHide={() => setLoginShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    請先登入
                  </Modal.Title>
                  <small className="none">
                    {loginShow === true
                      ? setTimeout(() => {
                          goLogin()
                        }, 2000)
                      : console.log('ok')}
                  </small>
                </Modal.Header>
              </Modal>

              <div className="followMyHeart">
                <Button variant="light" onClick={() => tbLiked(liked)}>
                  {liked === 1 ? <AiTwotoneHeart /> : <AiOutlineHeart />}
                </Button>
                <p>{count}</p>
              </div>
            </div>
          </div>
        </div>
        {/* 上半部結束 */}
        <div className="aboutClassDetails">
          <div className="introduction">
            <p className="classTitel">活動介紹</p>
            <p className="calssInside">{classValue}</p>
          </div>
          <div className="introduction">
            <p className="classTitel">活動大綱</p>
            <ul>
              {classOutline.split('-').map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="introduction">
            <p className="classTitel">活動資訊</p>
            <ul>
              <li>日期：{classDate}</li>
              <li>
                時間：{classTimeStart}-{classTimeEnd}
              </li>
              <li>地點：{location}</li>
              <li>講師：{teacher_name}</li>
            </ul>
          </div>

          <div className="introduction">
            <p className="classTitel">活動地點－{location}</p>
            <p className="calssInside">地點：{address}</p>
          </div>
          <div className="introduction">
            <p className="classTitel">報名須知</p>

            <ul className="shouldKnow">
              {needToKnow.split('-').map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="introduction">
            <p className="classTitel">關於講師</p>
            <Button variant="link" onClick={handleShow}>
              <img src={teacherUrl + teacher_photo} alt="圖片替代文字" />
            </Button>
            <Modal
              size="400x400"
              show={smShow}
              onHide={() => setSmShow(false)}
              aria-labelledby="example-modal-sizes-title-sm"
              className="modalPage"
            >
              <Modal.Header closeButton>
                <Modal.Title
                  id="example-modal-sizes-title-sm"
                  className="modalPhoto"
                >
                  <img src={teacherUrl + teacher_photo} alt="圖片替代文字" />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="nameAndTitle">
                <h1>{teacher_name}</h1>
                <p>{teacher_title}</p>
                <p className="teacher_history">{teacher_history}</p>
              </Modal.Body>
            </Modal>
          </div>
          <hr />
          <div className="introduction">
            <p className="classTitel">活動地圖</p>

            <iframe
              src={mapSrc}
              width="700px"
              height="300px"
              frameBorder="0"
              aria-hidden="false"
              tabIndex="0"
              className="thisIsMap"
              title="Map"
            />
          </div>
        </div>
      </div>
    </>
  )
  const [isLoading, setIsLoading] = useState(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  return isLoading === true ? <Spinner text={'讀取中'} /> : dispalyBuy
}
export default BuyProducts
