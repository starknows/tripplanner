/**
 *檔案負責人: 柯政安
 此元件負責顯示行程總表頁面，用來組合所需的小元件
 */

import React, { useState, useEffect } from 'react'
import { Col, Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
//
import MyBreadCrumb from '../components//main/MyBreadCrumb/MyBreadCrumb'
import SearchBar from '../components//main/SearchBar'
import CardListPublic from '../components//main/CardListPublic'
import ItinCaro from '../components/Itinerary/ItinCaro'
import Spinner from '../components/main/Spinner'
import NoData from '../components/main/NoData'

function Itinerary(props) {
  const [searchFilter, setSearchFilter] = useState({})
  const [dataFromDB, segDataFromDB] = useState([])
  const [isLoading, setIsLoading] = useState(1)
  let history = useHistory()
  let location = useLocation()
  // 按下新增行程會先判斷是否登入中
  function createItinerary() {
    if (localStorage.getItem('userData')) {
      history.push('/itinerary/new')
    } else {
      history.push('/login')
    }
  }
  useEffect(() => {
    getDataFromDB()
  }, [searchFilter])
  async function getDataFromDB() {
    setIsLoading(1)
    try {
      const response = await fetch(
        `http://localhost:5000/itinerary${location.search}`,
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

  const displayView = (
    <div>
      <div className="container itin-close-wrap">
        <MyBreadCrumb />
        <div className="d-flex justify-content-between">
          <h1>行程規劃</h1>
          <Button variant="info" size="sm" onClick={createItinerary}>
            建立行程
          </Button>
        </div>
      </div>
      <ItinCaro />
      <div className="container">
        <Col md={12}>
          <SearchBar setSearchFilter={setSearchFilter} />
        </Col>
        <CardListPublic data={dataFromDB} type="itinerary" itemPerPage={9} />
      </div>
    </div>
  )

  if (isLoading === 0) {
    return displayView
  } else if (isLoading === 1) {
    return <Spinner text={'讀取中'} />
  } else {
    return <NoData text={'查無此行程'} />
  }
}

export default Itinerary
// 檔案負責人: 柯政安
