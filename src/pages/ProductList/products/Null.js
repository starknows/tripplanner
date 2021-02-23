import React, { useState, useEffect } from 'react'
import { AiOutlineInbox } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import { Container, Button } from 'react-bootstrap'
import './cash.scss'
import MyBreadCrumb from '../../../components/main/MyBreadCrumb/MyBreadCrumb'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Null() {
  const pageUrl = '/images/classPhoto/'
  const productUrl = 'view/'
  const checkUrl = 'car1/'
  //取值 是字串
  const aboutClass = JSON.parse(localStorage.getItem('product_id'))

  //轉成陣列
  const getarray = aboutClass.split(',')
  const shift0 = getarray.shift()

  // 抓商品data
  let getvalue = getarray.map((v, i) => JSON.parse(localStorage.getItem(v)))

  //remove localstorage

  //取得ID
  const [tackID, setTackID] = useState('')
  const [buttonType, setButtonType] = useState(true)
  const getCrash = getarray.indexOf(tackID)
  // console.log('找' + tackID + '在' + getCrash)
  if (getCrash != -1) {
    //進Array搜尋是否有相對應ID ＆取得位子
    const getCrash = getarray.indexOf(tackID)

    //刪掉陣列中相對位子的物件
    const splicearray = getarray.splice(getCrash, 1)
    // console.log('要刪掉的是' + splicearray)
    // console.log('只剩' + getarray)
    //把local上的對應id刪掉
    const removeLocal = localStorage.removeItem(splicearray)

    //把預設的0塞回去 不然會壞掉
    const unshiftArray = getarray.unshift(0)
    // console.log('加回預設的0 變成' + getarray)

    //轉回字串
    const strData = getarray.toString()
    // console.log('要更新的是' + getarray)
    if (strData === '0') {
      window.location.reload()
    }
    const goLocal = localStorage.setItem('product_id', JSON.stringify(strData))
  }

  return (
    <>
      <Container>
        <MyBreadCrumb />
        {getvalue.map((v, i) => (
          <div className="go_center">
            <Link to={productUrl + v.product_id}>
              <figure className="nullphoto">
                <img
                  src={pageUrl + v.classPhoto}
                  alt="圖片替代文字"
                  className="animate__animated animate__backInDown"
                />
              </figure>
            </Link>
            <div className="carlabel">
              <Link to={productUrl + v.product_id}>
                <h4>{v.className}</h4>
              </Link>
              <p>{v.location}</p>

              <p className="p1"> {v.classDate}</p>
              <p>
                {v.classTimeStart}-{v.classTimeEnd}
              </p>
            </div>
            {v.early > 0 ? (
              <p className="tickerZone">早鳥票：{v.early}</p>
            ) : (
              <span></span>
            )}
            {v.single > 0 ? (
              <p className="tickerZone">單人票：{v.single}</p>
            ) : (
              <span></span>
            )}
            {v.group > 0 ? (
              <p className="tickerZone">雙人票：{v.group}</p>
            ) : (
              <span></span>
            )}
            <div className="crashButtonAndbuyButton">
              <Button
                variant="link"
                className="crashButton"
                onClick={() => {
                  setTackID(v.product_id)
                  setButtonType(false)
                }}
              >
                <BsFillTrashFill />
              </Button>
              <Link to={checkUrl + v.product_id}>
                <Button variant="info" className="gocheck">
                  去結帳
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </>
  )
}
function Nothing() {
  let history = useHistory()
  function goToBuy() {
    history.push('/productList')
  }
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <Container>
        <MyBreadCrumb />

        <div className="center">
          <AiOutlineInbox className="animate__animated  animate__fadeInUp" />
          <h3 className="animate__animated animate__jackInTheBox">
            現在沒有想參加的講座喔
          </h3>

          <Button variant="info" onClick={goToBuy} className="gobuyProduct">
            現在就去參加
          </Button>
        </div>
      </Container>
    </>
  )
}
function Show() {
  const aboutClass = JSON.parse(localStorage.getItem('product_id'))
  if (aboutClass != null) {
    const getarray = aboutClass.split(',')
    const showOrNotShow = getarray.length
    return showOrNotShow > 1 ? <Null /> : <Nothing />
  } else {
    return <Nothing />
  }
}

export default Show
