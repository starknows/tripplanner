import React, { useState } from 'react'

function TBChatroomDisplay(props) {
  const messages = props.messages
  const setChat = () => {
    {
      messages.map((message) => (
        <div>
          {message.userName}:{message.message}
        </div>
      ))
    }
  }
  return <>{setChat()}</>
}

export default TBChatroomDisplay
