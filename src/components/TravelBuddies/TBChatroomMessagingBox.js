import React, { useState } from 'react'

function TBChatroomMessagingBox(props) {
  const [messageContent, setMessageContent] = useState('')
  console.log(messageContent)
  const sendMessageContent = (event) => {
    event.preventDefault()
    props.setMessage(messageContent)
    setMessageContent('')
  }
  return (
    <>
      <div className="d-flex">
        <input
          type="text"
          onChange={(e) => {
            setMessageContent(e.target.value)
          }}
        ></input>
        <button onClick={sendMessageContent}>送出</button>
      </div>
    </>
  )
}

export default TBChatroomMessagingBox
