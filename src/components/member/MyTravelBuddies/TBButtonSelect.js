import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { Button, Modal, Form } from 'react-bootstrap'

function TBButtonSelect(props) {
  let tb_id = props.tb_id
  let m_id = props.m_id
  let membersStatus = props.membersStatus
  const [beSelected, setBeSelected] = useState(membersStatus)

  async function membersSelect() {
    const newSignedUp = {
      tb_id,
      m_id,
    }
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        'http://localhost:5000/travelbuddies/tbselect/',
        {
          method: 'put',
          body: JSON.stringify(newSignedUp),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )

      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        console.log(data)
        props.getTBMembers()
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }
  return (
    <>
      {beSelected === '審核中' ? (
        <Button
          className="tb-members-select"
          onClick={() => {
            membersSelect()
            setBeSelected('參與中')
          }}
        >
          選擇
        </Button>
      ) : (
        <Button className="tb-members-select">已選擇</Button>
      )}
    </>
  )
}

export default TBButtonSelect
