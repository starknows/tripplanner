import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { MdAttachMoney } from 'react-icons/md'
import { BiCalendarCheck } from 'react-icons/bi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { ImManWoman } from 'react-icons/im'
import { IoIosPeople } from 'react-icons/io'
import { FaMapMarkerAlt } from 'react-icons/fa'

import TravelBuddiesLiked from '../components/TravelBuddies/TravelBuddiesLiked'

function TravelBuddiesReadPage(props) {
  let { id } = useParams()
  let history = useHistory()
  const [travelBuddies, setTravelBuddies] = useState([])
  const [signedUp, setSignedUp] = useState(0)
  async function getTravelBuddies(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setTravelBuddies(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getTravelBuddies()
  }, [])

  return (
    travelBuddies.length > 0 && (
      <>
        <div className="tb-mainpage-wrapper">
          <Button
            className="tb-mainpage-goback"
            onClick={() => history.goBack()}
          >
            回我的揪團
          </Button>
          <div className="tb-mainpage-hero-image">
            <img
              src={'/images/tbPhoto/' + travelBuddies[0].tb_themePhoto}
              alt={travelBuddies.tb_themePhoto}
            />
          </div>

          <div className="tb-mainpage-flex">
            <div className="tb-mainpage-nameAndPhoto">
              <figure className="tb-mainpage-profilephoto">
                <img src="/images/member/DSC_7875.jpg" alt="揪團主頭貼" />
              </figure>
              <h4 className="tb-mainpage-owner">
                {travelBuddies.length > 0 && travelBuddies[0].tb_owner}
              </h4>
            </div>

            <div className="tb-mainpage-condition">
              <div className="d-flex tb-mainpage-icons-group">
                <div className="tb-mainpage-icons-subgroup">
                  <div className="tb-mainpage-howMany">
                    <div className="tb-mainpage-friend">
                      <IoIosPeople className="tb-mainpage-icons" />
                      <p>旅伴</p>
                    </div>
                    <div className="tb-mainpage-people">
                      <h1>{travelBuddies[0].tb_personsNeeded}</h1>
                      <p>人</p>
                    </div>
                  </div>
                </div>

                <div className="tb-mainpage-icons-subgroup">
                  <div className="tb-mainpage-gender">
                    <ImManWoman className="tb-mainpage-icons" />
                    <div className="tb-mainpage-icons-word">
                      {travelBuddies[0].tb_genderNeeded}
                    </div>
                  </div>
                </div>

                <div className="tb-mainpage-icons-subgroup">
                  <div className="tb-mainpage-price">
                    <MdAttachMoney className="tb-mainpage-icons" />
                    <p>預估</p>
                  </div>
                  <h3 className="tb-mainpage-much">
                    {travelBuddies[0].tb_estimatedCost}
                  </h3>
                </div>
              </div>

              <h4 className="tb-mainpage-lastapproved">
                最後審核時間：
                {travelBuddies.length > 0 &&
                  travelBuddies[0].tb_lastApprovedDate.slice(0, 4) +
                    '/' +
                    travelBuddies[0].tb_lastApprovedDate.slice(5, 7) +
                    '/' +
                    travelBuddies[0].tb_lastApprovedDate.slice(8, 10)}
              </h4>
            </div>
          </div>

          <div className="d-flex tb-mainpage-label-group">
            {travelBuddies[0].tb_region.split(',').length > 0 &&
              travelBuddies[0].tb_region.split(',').map((v, i) => {
                return (
                  <p className="tb-mainpage-label content-small">
                    <FaMapMarkerAlt />
                    <span>{v}</span>
                  </p>
                )
              })}
            {travelBuddies[0].tb_city.split(',').length > 0 &&
              travelBuddies[0].tb_city.split(',').map((v, i) => {
                return (
                  <p className="tb-mainpage-label content-small">
                    <FaMapMarkerAlt />
                    <span>{v}</span>
                  </p>
                )
              })}
          </div>
          <div className="d-flex tb-mainpage-title">
            <h1> {travelBuddies[0].tb_themeName}</h1>
          </div>
          <div className="tb-mainpage-maincontent-wrapper">
            <div className="tb-mainpage-maincontent">
              <div className="d-flex tb-mainpage-dategroup">
                <div className="d-flex tb-mainpage-date">
                  <BiCalendarCheck className="tb-mainpage-maincontent-icons" />
                  <div>
                    {' '}
                    {travelBuddies[0].tb_dateBegin.slice(0, 4) +
                      '/' +
                      travelBuddies[0].tb_dateBegin.slice(5, 7) +
                      '/' +
                      travelBuddies[0].tb_dateBegin.slice(8, 10) +
                      '-' +
                      travelBuddies[0].tb_dateEnd.slice(0, 4) +
                      '/' +
                      travelBuddies[0].tb_dateEnd.slice(5, 7) +
                      '/' +
                      travelBuddies[0].tb_dateEnd.slice(8, 10)}
                  </div>
                </div>
                <div className="d-flex tb-mainpage-date">
                  <AiOutlineClockCircle className="tb-mainpage-maincontent-icons" />
                  <div>{travelBuddies[0].tb_daysCategory}</div>
                </div>
                <div className="tb-mainpage-liked">
                  <TravelBuddiesLiked />
                </div>
              </div>
              <hr />
              <div className="tb-mainpage-intro">
                {travelBuddies[0].tb_themeIntro}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default TravelBuddiesReadPage
