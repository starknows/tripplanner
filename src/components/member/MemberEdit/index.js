//會員查改
import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import './MemberEdit.scss'

function MemberEdit({ member }) {
  let history = useHistory()
  let { id } = useParams()
  console.log('ed member:', member)

  //資料狀態
  const [member_name, setMember_name] = useState(member.member_name)
  const [email, setEmail] = useState(member.email)
  const [member_phone, setPhone] = useState(member.member_phone)
  const [birthday, setBirthday] = useState(member.birthday)
  const [member_sex, setMember_sex] = useState(member.member_sex)
  const [member_id, setMember_id] = useState(member.member_id)
  const [member_aboutme, setMember_aboutme] = useState(member.member_aboutme)

  //更新
  async function updateMember(id) {
    const newMember = {
      id,
      email,
      member_name,
      member_phone,
      birthday,
      member_sex,
      member_id,
      member_aboutme,
    }
    try {
      const response = await fetch(`http://localhost:5000/member/${id}`, {
        mode: 'cors',
        method: 'put',
        body: JSON.stringify(newMember),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setEmail(data)
        console.log(data)
        // if (data) success()
        //  alert('更新成功')
        history.push('/myAccount')
      }
    } catch (err) {
      // alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  //member and id 監聽
  useEffect(() => {
    if (member === 1) {
      console.log('hi model沒有值', id)
      updateMember(id)
      console.log('沒有值', id)
      updateMember(member.newsId)
      console.log('member.newsId:我有值', member.newsId)
      console.log('ud:', member)
    }
  }, [member, id])

  //元件狀態
  const [validated, setValidated] = useState(false)
  //事件
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          {/* email */}
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>信箱</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              required
              type="text"
              placeholder="請輸入信箱"
              defaultValue={member.email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Form.Control.Feedback>正確!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 姓名 */}
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustomUsername">
            <Form.Label>姓名</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              type="text"
              placeholder="請輸入姓名"
              defaultValue={member.member_name}
              aria-describedby=""
              required
              onChange={(e) => {
                setMember_name(e.target.value)
              }}
            />
            <Form.Control.Feedback type="invalid">
              請輸入正確的姓名
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 電話 */}
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>電話</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              type="text"
              placeholder="0988888888"
              defaultValue={member.member_phone}
              required
              onChange={(e) => {
                setPhone(e.target.value)
              }}
            />
            <Form.Control.Feedback type="invalid">
              請輸入正確的電話號碼
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>出生日期</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              type="date"
              placeholder=""
              defaultValue={member.birthday}
              required
              onChange={(e) => {
                setBirthday(e.target.value)
              }}
            />
            <Form.Control.Feedback type="invalid">
              請輸入出生日期
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 性別 */}
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="exampleForm.SelectCustom">
            <Form.Label>性別</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              as="select"
              custom
              defaultValue={member.member_sex}
              onChange={(e) => {
                setMember_sex(e.target.value)
              }}
            >
              <option disabled>-請選擇-</option>
              <option value="1">男性</option>
              <option value="2">女性</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        {/* 暱稱 */}
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom06">
            <Form.Label>暱稱</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              required
              type="text"
              placeholder="例：小智"
              defaultValue={member.member_id}
              onChange={(e) => {
                setMember_id(e.target.value)
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* 自我介紹 */}
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom07">
            <Form.Label>自我介紹</Form.Label>
            {/* <span className="med-add-text-red">*</span> */}
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              placeholder="例：我在資策會學習網頁前端"
              defaultValue={member.member_aboutme}
              onChange={(e) => {
                setMember_aboutme(e.target.value)
              }}
            />
          </Form.Group>
        </Form.Row>
        <Button
          type="submit"
          className="memed-submit"
          onClick={() => {
            updateMember(member.newsId)
            console.log('onclick ed', member.newsId)
            setTimeout(() => {}, 3000)
          }}
        >
          確定
        </Button>
      </Form>
    </>
  )
}

export default MemberEdit
