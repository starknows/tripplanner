import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'

function TBButtonRead(props) {
  let history = useHistory()
  let id = props.id
  function toMainPage() {
    history.push('/travelBuddies/view/' + id)
  }
  return (
    <>
      <Button className="tb-button-read" onClick={toMainPage}>
        查看
      </Button>
    </>
  )
}

export default withRouter(TBButtonRead)
