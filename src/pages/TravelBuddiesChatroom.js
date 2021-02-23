import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function TravelBuddiesChatroom(props) {
  let { id } = useParams()
  let history = useHistory()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const user = userData.member_name
  const ws = new WebSocket('ws://localhost:8082')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [tbInfo, settbInfo] = useState('')
  const [tbMembers, settbMembers] = useState('')
  async function gettbInfo(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/owner/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        settbInfo(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    gettbInfo()
  }, [])

  async function gettbMembers(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/memberjoined/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        settbMembers(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    gettbMembers()
  }, [])

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('connected')
    })
    ws.addEventListener('message', ({ data }) => {
      console.log(data)
      const theMessage = JSON.parse(data)
      setMessages([...messages, theMessage])
    })
  })

  const sendMessageContent = (event) => {
    event.preventDefault()
    let data = {
      user: user,
      message: message,
    }
    ws.send(JSON.stringify(data))
    setMessage('')
  }

  return (
    <>
      <div className=" travelbuddies-chatroom-wrapper">
        <div className="d-flex">
          <h1>
            <span>{tbInfo.length > 0 && tbInfo[0].themeName + ' '}</span>
            的聊天室
          </h1>
          <Button
            className="tb-mainpage-goback"
            onClick={() => history.goBack()}
          >
            回我的揪團
          </Button>
        </div>
        <div className="d-flex mt-3">
          <div className=" travelbuddies-chatroom-members">
            <div className="mb-5">
              <div className=" travelbuddies-chatroom-members-identity mb-3">
                揪團主
              </div>
              {tbInfo.length > 0 &&
                tbInfo.map((v, i) => (
                  <ul>
                    <li className="tb-li">{v.ownerName}</li>
                  </ul>
                ))}
            </div>
            <div>
              <div className=" travelbuddies-chatroom-members-identity mb-3">
                團員
              </div>
              {tbMembers.length > 0 &&
                tbMembers.map((v, i) => (
                  <ul>
                    <li className="tb-li">{v.memberName}</li>
                  </ul>
                ))}
            </div>
          </div>
          <div className=" travelbuddies-chatroom-main">
            <div className="travelbuddies-chatroom-display p-3">
              {messages.map((message) => (
                <div
                  className={
                    message.user === user ? 'messageMine' : 'messageOthers'
                  }
                >
                  <div className="message-user">{message.user}</div>
                  <div className="message-message">{message.message}</div>
                </div>
              ))}
            </div>
            <hr />
            <form onSubmit={sendMessageContent} id="form">
              <div className="tb-chatroom-input-group">
                <input
                  type="text"
                  className="tb-chatroom-input"
                  onChange={(e) => setMessage(e.currentTarget.value)}
                  value={message}
                  id="text"
                  autoComplete="off"
                />
                <span>
                  <button
                    id="submit"
                    type="submit"
                    className="tb-chatroom-submit"
                  >
                    傳送
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default TravelBuddiesChatroom

// const sentMessage = (event) => {
//   event.preventDefault()
//   ws.send(message)
//   setMessage('')
// }
// const [tb, settb] = useState('1')
// const ENDPOINT = 'localhost:9000'
// useEffect(() => {
//   // const { tb } = queryString.parse(location.search)

//   socket = io(ENDPOINT, {
//     transport: ['websocket', 'polling', 'flashsocket'],
//   })
//   socket.emit('join', { tb })

//   settb(tb)
//   console.log(socket)
// }, [])
