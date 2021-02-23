//登入
import React, { useState } from 'react'
import { FaUserAlt, FaUnlockAlt, FaFacebook, FaGoogle } from 'react-icons/fa'
import { Form, Button, Col, InputGroup, Toast } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import './login.scss'
import LoginHooks from './LoginHooks'
import { message } from 'antd'
// import LogoutHooks from './LogoutHooks'

function Login(props) {
  //訊息
  const success = () => {
    message.success('歡迎蒞臨~旅歷!')
  }
  //是否登入
  // 從App元件得到兩個屬性值，解構出來
  const { setIsAuth, setAuth } = props
  let history = useHistory()
  const [member, setMember] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //表單提示警告
  const [showA, setShowA] = useState(false)
  const toggleShowA = () => setShowA(!showA)
  //驗證表單
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      getMember()
    }
    setValidated(true)
  }
  //連結伺服器端
  async function getMember() {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      console.log('email?', email)
      if (response.ok) {
        const data = await response.json()
        console.log('我是誰', data)
        if (data) {
          setMember(data)
          localStorage.setItem('userData', JSON.stringify(data))
          localStorage.setItem('product_id', JSON.stringify('0'))
          setAuth(true)
          history.push(`/myAccount`)
        } else {
          console.log('請輸入正確的帳號密碼')
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  //表單提示警告 沒有則跳空的
  const mesin = <samp></samp>
  const meserr = (
    <Toast
      show={showA}
      onClose={toggleShowA}
      className="d-flex message-login-err"
    >
      <Toast.Body>請輸入正確帳號密碼</Toast.Body>
    </Toast>
  )

  //form 登入輸入表單
  const display = (
    <div className="body-login">
      <div className="login-form form-group">
        <h1>會員帳號登入</h1>
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
                {/* <Form.Control.Feedback type="invalid">
                  請輸入正確的信箱格式
                </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              md="10"
              controlId="validationCustomUsernamepassword"
            >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FaUnlockAlt />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="login-input-br"
                  type="password"
                  placeholder="您的密碼"
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
                {/* <Form.Control.Feedback type="invalid">
                  請輸入正確的密碼格式
                </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Form.Row>
          {/* 跳訊息 */}
          {member === true ? mesin : meserr}
          <Button
            type="submit"
            className="login-btn"
            onClick={() => {
              if (password.length < 6) {
                toggleShowA()
              }
              if (email === true) {
                success()
                setIsAuth(true)
              }
            }}
          >
            登入
          </Button>
          <div className="login-samp-text d-flex">
            <span>
              <Link
                to="/sigon"
                onClick={() => {
                  history.push('/sigon')
                }}
              >
                註冊
              </Link>
            </span>
            <span className="login-samp-text-pas">
              <Link
                to="forgetpassword"
                onClick={() => {
                  history.push('/forgetpassword')
                }}
              >
                忘記密碼
              </Link>
            </span>
          </div>
          <div className="d-flex login-line-center">
            <span className="login-line"></span>
            <h1>OR</h1>
            <span className="login-line"></span>
          </div>
          <div className="login-icon-fa d-flex">
            <span>
              <FaFacebook />
            </span>
            <span>
              {/* <FaGoogle /> */}
              <LoginHooks />
              {/* <LogoutHooks /> */}
            </span>
          </div>
        </Form>
      </div>
    </div>
  )
  return display
}
export default Login
