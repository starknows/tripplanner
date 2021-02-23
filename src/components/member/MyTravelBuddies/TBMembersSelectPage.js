import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import TBButtonSelect from './TBButtonSelect'

function TBMemberSelectPage() {
  let history = useHistory()
  let { id } = useParams()
  const [tbMemberJoined, settbMemberJoined] = useState([])
  async function getTBMembers(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/membersselect/${id}`,
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
    getTBMembers()
  }, [])
  return (
    <>
      <div className="add-travelbuddies-outbox">
        <div className="add-travelbuddies-middle">
          <h1 className="add-travelbuddies-topic">選擇團員</h1>
          <tbody>
            <div className="travelbuddiesselect-outbox">
              <Table>
                <thead>
                  <tr>
                    <th width="100px">No.</th>
                    <th width="300px">旅行揪團名稱</th>
                    <th width="200px">報名團員</th>
                    <th width="200px">狀態</th>
                    <th>操作</th>
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
                          <td>{v.membersStatus}</td>
                          <td>
                            <TBButtonSelect
                              tb_id={v.tb_id}
                              m_id={v.m_id}
                              membersStatus={v.membersStatus}
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
            className="tb-members-select-back-to-account"
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

export default TBMemberSelectPage
