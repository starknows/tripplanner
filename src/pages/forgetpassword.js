//忘記密碼
import React from 'react'
import { FaUserAlt, FaFacebook, FaGoogle } from 'react-icons/fa'
import { Form, Button, Col, InputGroup } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import '../pages/sign/sign.scss'
import { message } from 'antd'
// import ContactUsfrom from './ContactUs'

import emailjs from 'emailjs-com'
function Login(props) {
  let history = useHistory()
  // const [email, setEmail] = useState([])
  const success = () => {
    message.success('成功寄出!')
  }
  // const [validated, setValidated] = useState(false)

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.preventDefault()
  //     event.stopPropagation()
  //   }

  //   setValidated(true)
  // }

  //email js
  function sendEmail(e) {
    e.preventDefault()

    emailjs
      .sendForm(
        'gmail',
        'template_f8ljmko',
        e.target,
        'user_sl9k8pn5cOSyv3mbGesif'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
    // alert('成功寄出!')
    success()
    history.push('/login')
  }
  return (
    <>
      <body className="body-sigon">
        <div className="sogin-form form-group">
          <h1>忘記密碼</h1>
          {/* <ContactUsfrom /> */}
          <Form onSubmit={sendEmail}>
            {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
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
                {/* <Link
                  to="Login"
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
