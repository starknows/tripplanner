import React, { useState, useEffect } from 'react'
import { Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import MyBreadCrumb from '../components//main/MyBreadCrumb/MyBreadCrumb'
import SearchBar from '../components//main/SearchBar'
import CardListTravelBuddies from '../components/TravelBuddies/CardListTravelBuddies'
import Pages from '../components//main/Pages'
import Carousel from '../components/TravelBuddies/Carousel'

function TravelBuddies(props) {
  const [searchFilter, setSearchFilter] = useState({})
  const [tbDataMain, settbDataMain] = useState([])
  let history = useHistory()

  function createTravelBuddies() {
    history.push('/travelBuddies/new')
  }

  useEffect(() => {
    console.log(searchFilter)
  }, [searchFilter])

  async function gettbDataMain(props) {
    try {
      const response = await fetch('http://localhost:5000/travelbuddies', {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        settbDataMain(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    gettbDataMain()
  }, [])
  return (
    <>
      <div className="container itin-close-wrap">
        <MyBreadCrumb />
        <div className="d-flex justify-content-between">
          <h1>旅行揪團</h1>
          <Button variant="info" size="sm" onClick={createTravelBuddies}>
            建立揪團
          </Button>
        </div>
      </div>
      <Carousel />
      <div className="container">
        <Col md={12}>
          <SearchBar setSearchFilter={setSearchFilter} />
        </Col>
        <CardListTravelBuddies tbDataMain={tbDataMain} type="travelBuddies" />
        <Pages />
      </div>
    </>
  )
}

export default TravelBuddies
