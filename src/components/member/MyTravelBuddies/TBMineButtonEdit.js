import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { useHistory } from 'react-router-dom'

function TBMineButtonEdit(props) {
  let history = useHistory()
  let id = props.id
  function toEdit() {
    history.push('/travelBuddies/edit/' + id)
  }
  return (
    <>
      <Button className="tbmine-button-edit" onClick={toEdit}>
        編輯
      </Button>
    </>
  )
}

export default withRouter(TBMineButtonEdit)
