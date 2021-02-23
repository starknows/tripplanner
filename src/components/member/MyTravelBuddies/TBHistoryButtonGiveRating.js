import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function TBHistoryButtonGiveRating(props) {
  let history = useHistory()
  let id = props.id
  return (
    <>
      <Button
        className="tbhistory-button-giverating"
        onClick={() => {
          history.push('/travelBuddies/starRating/' + id)
        }}
      >
        評價團員
      </Button>
    </>
  )
}

export default TBHistoryButtonGiveRating
