import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import TBButtonGiveStar from './TBButtonGiveStar'

function TBGiveMembersStarRating() {
  let history = useHistory()
  let { id } = useParams()
  const [tbOwner, settbOwner] = useState([])
  const [tbMemberJoined, settbMemberJoined] = useState([])
  async function getTBOwner() {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/owner/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        settbOwner(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  async function getTBMembers() {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/memberjoined/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        settbMemberJoined(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getTBOwner()
  }, [])

  useEffect(() => {
    getTBMembers()
  }, [])
  return (
    <>
      <div className="add-travelbuddies-outbox">
        <div className="add-travelbuddies-middle">
          <h1 className="add-travelbuddies-topic">評價團員</h1>
          <h3 className="mt-5">揪團主</h3>
          <tbody>
            <div className="travelbuddiesselect-outbox">
              <Table>
                <thead>
                  <tr>
                    <th width="100px">No.</th>
                    <th width="300px">旅行揪團名稱</th>
                    <th width="200px">揪團主名字</th>
                    <th>評分</th>
                  </tr>
                </thead>
                <tbody>
                  {tbOwner.length > 0 &&
                    tbOwner.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>#</td>
                          <td>{v.themeName}</td>
                          <td>{v.ownerName}</td>
                          <td>
                            <TBButtonGiveStar
                              memberName={v.ownerName}
                              m_id={v.ownerId}
                              tb_id={v.tb_id}
                              getTBMembers={getTBMembers}
                            />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            </div>
          </tbody>
          <h3 className="mt-3">團員</h3>
          <tbody>
            <div className="travelbuddiesselect-outbox">
              <Table>
                <thead>
                  <tr>
                    <th width="100px">No.</th>
                    <th width="300px">旅行揪團名稱</th>
                    <th width="200px">團員名字</th>
                    <th>評分</th>
                  </tr>
                </thead>
                <tbody>
                  {tbMemberJoined.length > 0 &&
                    tbMemberJoined.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{v.themeName}</td>
                          <td>{v.memberName}</td>
                          <td>
                            <TBButtonGiveStar
                              memberName={v.memberName}
                              m_id={v.memberId}
                              tb_id={v.tb_id}
                              getTBMembers={getTBMembers}
                            />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            </div>
          </tbody>
          <Button
            id="insertTravelBuddies"
            className="tb-give-star-back-to-account"
            onClick={() => {
              history.push('/myAccount/TravelBuddies')
            }}
          >
            {' '}
            返回我的揪團
          </Button>
          <br />
        </div>
      </div>
    </>
  )
}

export default TBGiveMembersStarRating
