//忘記密碼
import React, { useState } from 'react'
import { FaUserAlt, FaFacebook, FaGoogle } from 'react-icons/fa'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'
import '../pages/sign/sign.scss'
function Login(props) {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  //   const emailtext = (
  //   <>
  //   <div>
  //   Email.send({
  //     Host : "smtp.yourisp.com",
  //     Username : "username",
  //     Password : "password",
  //     To : 'them@website.com',
  //     From : "you@isp.com",
  //     Subject : "This is the subject",
  //     Body : "And this is the body"
  // })
  // .then(
  //   message => alert(message)
  // );
  // </div>
  // </>
  //   )
  // const srcemail = 'https://smtpjs.com/v3/smtp.js'
  return (
    <>
      <body className="body-sigon">
        <div className="sogin-form form-group">
          <h1>忘記密碼</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FaUserAlt />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="您的信箱"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入正確的信箱格式
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Button type="submit" className="login-btn">
              送出
            </Button>
            <div className="sogin-samp-text d-flex">
              <span>
                <a href="http://localhost:3000/login">登入</a>
              </span>
            </div>
            <div className="d-flex sogin-line-center">
              <span className="sogin-line"></span>
              <h1>OR</h1>
              <span className="sogin-line"></span>
            </div>
            <div className="sogin-icon-fa d-flex">
              <span>
                <FaFacebook />
              </span>
              <span>
                <FaGoogle />
              </span>
            </div>
          </Form>
        </div>
      </body>
    </>
  )
}
export default Login
