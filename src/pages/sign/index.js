//免費註冊
import React, { useState } from 'react'
import { FaUserAlt, FaUnlockAlt, FaFacebook } from 'react-icons/fa'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import './sign.scss'
import LoginHooks from '../Login/LoginHooks'
import { message } from 'antd'
function Login() {
  let history = useHistory()
  const [member, setMember] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //驗證表單
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      //event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      getMember()
    }
    setValidated(true)
  }

  const success = () => {
    message.success('註冊成功!')
  }
  //連結伺服器端
  async function getMember() {
    try {
      const response = await fetch('http://localhost:5000/sign', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        const data = await response.json()
        setMember(data.member)
        // alert('註冊成功!')
        success()
        history.push('/login')
      } else {
        history.push('/sigon')
      }
    } catch (err) {
      alert('請輸入正確的帳號密碼!')
      console.log(err)
    }
  }
  return (
    <>
      <body className="body-sigon">
        <div className="sogin-form form-group">
          <h1>免費註冊</h1>
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
                    type="email"
                    placeholder="您的信箱"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入正確的信箱格式
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="10" controlId="validationCustomUsername">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FaUnlockAlt />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    className="sogin-input-br"
                    type="password"
                    placeholder="您的密碼"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入正確的密碼格式
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Button type="submit" className="login-btn">
              註冊
            </Button>
            <div className="sogin-samp-text d-flex">
              <span>
                {/* <Link
                  to="/sigon"
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  登入
                </Link> */}
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
                <LoginHooks />
              </span>
            </div>
          </Form>
        </div>
      </body>
    </>
  )
}
export default Login
