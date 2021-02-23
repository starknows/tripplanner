import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { withRouter } from 'react-router'

function TBButtonChatroom(props) {
  let history = useHistory()
  const id = props.id
  console.log(id)
  function Chatroom() {
    history.push('/travelBuddies/chatroom/' + id)
  }
  return (
    <>
      <Button className="tb-button-chatroom" onClick={Chatroom}>
        聊天室
      </Button>
    </>
  )
}

export default withRouter(TBButtonChatroom)
