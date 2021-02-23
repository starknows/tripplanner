import React, { useEffect, useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'

import MyBreadCrumb from '../../components/main/MyBreadCrumb/MyBreadCrumb'
import SearchBar from '../../components/main/SearchBar'
import Card from '../../components/main/Card'
import Carousel from './Product_carousel'
//
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
//
function ProductList() {
  const [searchFilter, setSearchFilter] = useState({})
  const [dataFromDB, segDataFromDB] = useState([])
  const [isLoading, setIsLoading] = useState(1)

  useEffect(() => {
    getProductCard()
  }, [searchFilter])

  useEffect(() => {
    getDataFromDB()
  }, [searchFilter])

  async function getDataFromDB() {
    try {
      const response = await fetch(
        `http://localhost:5000/productList?` +
          new URLSearchParams(searchFilter),
        {
          method: 'get',
          mode: 'cors',
        }
      )
      if (response.ok) {
        const data = await response.json()
        segDataFromDB(data)
        setTimeout(() => {
          if (data.length === 0) {
            setIsLoading(3)
          } else {
            setIsLoading(0)
          }
        }, 0)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }

  const [productCard, setProductCard] = useState([])

  async function getProductCard(props) {
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

  const displayView = (
    <>
      <Container>
        <MyBreadCrumb />
        <h1>達人講座</h1>
      </Container>
      <Carousel />
      <Container>
        <div
          data-aos-easing="ease-in"
          data-aos="fade-in"
          data-aos-delay="50"
          data-aos-duration="800"
        >
          <SearchBar setSearchFilter={setSearchFilter} />
          <Row>
            {productCard.map((v, i) => (
              <Col xs={6} md={4} key={i}>
                <Card
                  id={v.id}
                  time1={v.classDate}
                  title={v.className}
                  text={v.location}
                  person={v.teacher_name}
                  price={v.ticket_price}
                  like={v.likeheart}
                  mark={v.mark}
                  image={'/classPhoto/' + v.classPhoto}
                  location={v.classCity}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  )

  if (isLoading === 0) {
    return displayView
  } else if (isLoading === 1) {
    return <h1>讀取中</h1>
  } else {
    return <h1>查無行程</h1>
  }
}

export default ProductList
