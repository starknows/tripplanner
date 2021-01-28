import { FaCcVisa, FaCcApplePay } from 'react-icons/fa'
import { SiJcb, SiMastercard } from 'react-icons/si'
import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { MdLocalAtm } from 'react-icons/md'
import Icons from './Icons'
import './cash.scss'
import { useHistory } from 'react-router-dom'
import ShowCreditCard from './ShowCreditCard'

function CashStep1({ className, classDate, ticket_price, ticketData }) {
  const [tichectButton, setTichectButton] = useState(true)
  let { product_id } = useParams()

  const aboutClass = JSON.parse(localStorage.getItem(product_id))

  const earlyTicket = aboutClass.early
  const singleTicket = aboutClass.single
  const groupTicket = aboutClass.group
  function ShowTicketType() {
    if (earlyTicket > 0) {
      return '早鳥票'
    } else if (singleTicket > 0) {
      return '單人票'
    } else if (groupTicket > 0) {
      return '雙人票'
    } else {
      return '你沒買票'
    }
  }
  function HowMany() {
    if (earlyTicket > 0) {
      return earlyTicket
    } else if (singleTicket > 0) {
      return singleTicket
    } else if (groupTicket > 0) {
      return groupTicket
    } else {
      return '你沒買票'
    }
  }
  const [totalTicket, setTotalTicket] = useState(HowMany())

  const reallyPrice = ticket_price.split('-')
  function showTicketPrice() {
    if (earlyTicket > 0) {
      return totalTicket * reallyPrice[0]
    } else if (singleTicket > 0) {
      return totalTicket * reallyPrice[1]
    } else if (groupTicket > 0) {
      return totalTicket * reallyPrice[2]
    }
  }
  let history = useHistory()
  function carThree() {
    history.push('/productList/car3')
  }
  function goBack() {
    history.push(`/productList`)
  }

  const step1 = (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
      <div className="In-the-car">
        <div className="car-one">
          <Icons />
        </div>

        <div className="ticket-buy">
          <div className="ticket-title">
            <h4>{aboutClass.className}</h4>
          </div>

          <div className="you-sure">
            <div className="table-head">
              <div>
                <p>日期</p>
              </div>
              <div>
                <p>名稱</p>
              </div>
              <div>
                <p>數量</p>
              </div>
              <div>
                <p>價格</p>
              </div>
            </div>
            <hr />
            <div className="chose-your-ticket animate__animated  animate__pulse">
              <div>
                <h3>{aboutClass.classDate}</h3>
              </div>
              <div>{ShowTicketType()}</div>

              <div className="how-many-ticket">
                {totalTicket <= 0 ? (
                  <Button
                    variant="light"
                    className="minus-and-plus"
                    onClick={() => setTotalTicket(totalTicket - 1)}
                    disabled
                  >
                    <AiFillMinusCircle />
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    className="minus-and-plus"
                    onClick={() => setTotalTicket(totalTicket - 1)}
                  >
                    <AiFillMinusCircle />
                  </Button>
                )}
                <p>{totalTicket}</p>

                <Button
                  variant="light"
                  className="minus-and-plus"
                  onClick={() => setTotalTicket(totalTicket + 1)}
                >
                  <AiFillPlusCircle />
                </Button>
              </div>
              <div className="pay-it">
                <h3>NT$ </h3>

                <h3>{showTicketPrice()}</h3>
              </div>
            </div>
            <hr />

            <div className="how-much">
              <div className="total">
                <h3>總金額</h3>
                <h3>{showTicketPrice()}</h3>
              </div>
              <div className="btn-zone">
                <Button variant="light" className="cancel" onClick={goBack}>
                  取消
                </Button>
                <Button
                  variant="info"
                  onClick={(e) => {
                    setTichectButton(false)
                  }}
                >
                  下一步
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  const [user_name, setUser_name] = useState('')
  const [user_mail, setUser_mail] = useState('')
  const [user_phone, setUser_phone] = useState('')
  const [user_gender, setUser_gender] = useState('')
  const buy_ticket_price = showTicketPrice()
  const buy_ticket_type = ShowTicketType()
  const math = '125476768981876643252'
  const ticket_number = Math.floor(Math.random(math) * math)
  const now = new Date()
  const year = now.getFullYear()
  const month_rank = now.getMonth()
  const month_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const month = month_array[month_rank]
  const day = now.getDate()
  const buy_ticket_day = year + '-' + month + '-' + day
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const buy_ticket_time =
    year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds
  const [credit, setCredit] = useState()
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
    } else {
      event.preventDefault()
      event.stopPropagation()
      getUser()
    }
    setValidated(true)
  }
  async function getUser() {
    try {
      const response = await fetch(
        'http://localhost:5000/historyOrder/gohistory',
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            className,
            buy_ticket_type,
            totalTicket,
            buy_ticket_price,
            buy_ticket_day,
            user_name,
            user_gender,
            user_phone,
            user_mail,
            credit,
            ticket_number,
            buy_ticket_time,
          }),
        }
      )
      if (response.ok) {
        console.log('ok')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const [buttontype, setButtontype] = useState(false)
  const aboutuser = JSON.parse(localStorage.getItem('userData'))

  function removeCar() {
    const productIDdata = JSON.parse(localStorage.getItem(product_id))
    const delproductData = localStorage.removeItem(product_id)
    const productIDarray = JSON.parse(localStorage.getItem('product_id'))
    const IDarray = productIDarray.split(',')
    const findID = IDarray.indexOf(product_id)
    const cutID = IDarray.splice(findID, 1)
    const strArray = IDarray.toString()
    console.log(IDarray)

    const newIDarray = localStorage.setItem(
      'product_id',
      JSON.stringify(strArray)
    )
  }

  const step2 = (
    <>
      <div className="In-the-car">
        <div className="car-two">
          <Icons />
        </div>
        <div className="ticket-buy">
          <div className="ticket-title">
            <h4>{className}</h4>
            <h4>{ShowTicketType()}</h4>
          </div>

          <div className="you-sure">
            <div className="table-head">
              <div>
                <p>日期</p>
              </div>
              <div>
                <p>名稱</p>
              </div>
              <div>
                <p>數量</p>
              </div>
              <div>
                <p>價格</p>
              </div>
            </div>
            <hr />
            <div className="chose-your-ticket">
              <div>
                <h3>{classDate}</h3>
              </div>
              <div>
                <h3>{ShowTicketType()}</h3>
              </div>

              <div className="how-many-ticket">
                <p>{totalTicket}</p>
              </div>
              <div className="pay-it">
                <h3>NT$ </h3>
                <h3>{showTicketPrice()}</h3>
              </div>
            </div>
            <hr />

            <h3 className="about-member">填寫參加人資訊</h3>
            <Form
              noValidate
              className="step2-member-from"
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Control type="hidden" value={className} />
              <Form.Control type="hidden" value={classDate} />
              <Form.Control type="hidden" value={totalTicket} />
              <Form.Control type="hidden" value={showTicketPrice()} />
              <Form.Control type="hidden" value={ShowTicketType()} />
              <Form.Control type="hidden" value={ticket_number} />
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="11"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>姓名</Form.Label>
                  <span className="med-add-text-red">*</span>
                  <Form.Control
                    type="text"
                    placeholder="請輸入姓名"
                    defaultValue={
                      buttontype === true ? aboutuser.member_name : ''
                    }
                    onChange={(e) => {
                      setUser_name(e.target.value)
                    }}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                {/* email */}
                <Form.Group as={Col} md="11" controlId="validationCustom01">
                  <Form.Label>信箱</Form.Label>
                  <span className="med-add-text-red">*</span>
                  <Form.Control
                    required
                    type="text"
                    placeholder="請輸入信箱"
                    defaultValue={buttontype === true ? aboutuser.email : ''}
                    onChange={(e) => {
                      setUser_mail(e.target.value)
                    }}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="11" controlId="validationCustom04">
                  <Form.Label>電話</Form.Label>
                  <span className="med-add-text-red">*</span>

                  <Form.Control
                    type="text"
                    placeholder="0988888888"
                    required
                    defaultValue={
                      buttontype === true ? aboutuser.member_phone : ''
                    }
                    onChange={(e) => {
                      setUser_phone(e.target.value)
                    }}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row className="have_button">
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="exampleForm.SelectCustom"
                >
                  <Form.Label>性別</Form.Label>
                  <span className="med-add-text-red">*</span>
                  <Form.Control
                    as="select"
                    custom
                    defaultValue="-請選擇-"
                    onChange={(e) => {
                      setUser_gender(e.target.value)
                    }}
                  >
                    <option disabled>-請選擇-</option>
                    <option value="1">男性</option>
                    <option value="2">女性</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="info"
                  className="fast_input_button"
                  onClick={() => {
                    setButtontype(true)
                    setUser_name(aboutuser.member_name)
                    setUser_mail(aboutuser.email)
                    setUser_phone(aboutuser.member_phone)
                  }}
                >
                  快速填寫
                </Button>
              </Form.Row>
              <hr />

              <h3 className="about-member ">請選擇付款方式</h3>
              <div className="pay-form">
                <div>
                  <div className="mb-3">
                    <Form.Check type="radio">
                      <Form.Check.Input
                        type="radio"
                        name="pay-radio"
                        value="applepay"
                        id="applepay"
                        onChange={(e) => {
                          setCredit(e.target.value)
                        }}
                      />
                      <span>
                        <Form.Check.Label
                          className="pay-label"
                          htmlFor="applepay"
                        >
                          ApplePay
                        </Form.Check.Label>
                        <Form.Check.Label
                          className="pay-icon"
                          htmlFor="applepay"
                        >
                          <FaCcApplePay />
                        </Form.Check.Label>
                      </span>
                    </Form.Check>
                  </div>

                  <div className="mb-3">
                    <Form.Check type="radio">
                      <Form.Check.Input
                        type="radio"
                        name="pay-radio"
                        value="atm"
                        id="atm"
                        onChange={(e) => {
                          setCredit(e.target.value)
                        }}
                      />
                      <span>
                        <Form.Check.Label className="pay-label" htmlFor="atm">
                          ATM
                        </Form.Check.Label>

                        <Form.Check.Label className="pay-icon" htmlFor="atm">
                          <MdLocalAtm />
                        </Form.Check.Label>
                      </span>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="radio">
                      <Form.Check.Input
                        type="radio"
                        name="pay-radio"
                        value="visa"
                        id="visa"
                        onChange={(e) => {
                          setCredit(e.target.value)
                        }}
                      />
                      <span>
                        <Form.Check.Label className="pay-label" htmlFor="visa">
                          信用卡
                        </Form.Check.Label>
                        <Form.Check.Label className="pay-icon" htmlFor="visa">
                          <FaCcVisa />
                          <SiJcb />
                          <SiMastercard />
                        </Form.Check.Label>
                      </span>
                    </Form.Check>
                  </div>
                  {credit === 'visa' ? <ShowCreditCard /> : <span></span>}
                </div>
              </div>
              <div className="check-and-btn">
                <Form.Check
                  className="warning"
                  type="checkbox"
                  label="若本人後續辦理退票作業，同意由旅歷代為處理銷售憑證"
                />

                <div className="btn-zone">
                  <Button variant="light" className="cancel" onClick={goBack}>
                    取消
                  </Button>
                  <Button
                    type="submit"
                    variant="info"
                    onClick={
                      user_name === '' && user_phone === '' && user_mail === ''
                        ? console.log('還有資料還沒填寫喔')
                        : () => {
                            getUser()
                            carThree()
                            removeCar()
                          }
                    }
                  >
                    結帳
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )

  return tichectButton ? step1 : step2
}
export default CashStep1
