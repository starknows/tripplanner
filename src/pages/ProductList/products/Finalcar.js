import React, { useState } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { Container, Button } from 'react-bootstrap'
import MyBreadCrumb from '../../../components/main/MyBreadCrumb/MyBreadCrumb'
import { useHistory } from 'react-router-dom'
import Spinner from '../../../components/main/Spinner'
import './cash.scss'

function Example() {
  let history = useHistory()
  function goHome() {
    history.push('/')
  }
  const [isLoading, setIsLoading] = useState(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 3000)

  const display = (
    <>
      <Container>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <MyBreadCrumb />
        <div className="final-page">
          <h1 className="animate__animated animate__bounceInRight">完成購買</h1>
          <FaRegPaperPlane className="airplanner animate__animated animate__fadeInBottomLeft " />
          <Button variant="primary" className="gohomePage" onClick={goHome}>
            回首頁
          </Button>
        </div>
      </Container>
    </>
  )

  return isLoading === true ? <Spinner text={'讀取中'} /> : display
}

export default Example
