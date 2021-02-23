//修改會員資料卡片
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import MemberEdit from '../MemberEdit'
// import { useParams } from 'react-router-dom'
import './MemberProfile.scss'
import $ from 'jquery'
import { message } from 'antd'
import { FaCamera } from 'react-icons/fa'
// import Upload from './Upload'
function MemberProfile({ setMember, setAuth }) {
  const [memberData, setMemberData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  // console.log('mp member:', memberData)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const success = () => {
    message.success({
      content: '更新成功!',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    })
  }
  // const handleChangeShow = () => setShow(true)
  // const handleChangeclose = () => setShow(true)
  //   handleChange(event) {
  //     this.setState({
  //       file: URL.createObjectURL(event.target.files[0]),
  //     })
  //   }

  async function memberPicUpload(id) {
    let formData = new FormData()
    let imgFile = document.querySelector('#imageUpload')
    if (imgFile) formData.append('file', imgFile.files[0])
    try {
      const response = await fetch(`http://localhost:5000/upload/member`, {
        mode: 'cors',
        method: 'post',
        body: formData,
      })
      if (response.ok) {
        const data = await response.json()
        let url = data.name[0]
        // let url = '' + data.url + data.name[0]
        memberPicChange(id, url)
        console.log('udid:', id)
        console.log('ud1img:', url)
        let ddddddddimg = JSON.parse(localStorage.getItem('userData'))
        // 存檔
        ddddddddimg.member_photo_id = url
        localStorage.setItem('userData', JSON.stringify(ddddddddimg))
        document.querySelector(
          '.header-img-br'
        ).src = `http://localhost:5000/images/member/${url}`
        success()
      }
    } catch (err) {
      // alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  async function memberPicChange(id, url) {
    try {
      const response = await fetch(
        `http://localhost:5000/member/updataPic/${id}`,
        {
          mode: 'cors',
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ img: url }),
        }
      )
      if (response.ok) {
        // console.log('ud id', id)
        // console.log('ud url', url)
      }
    } catch (err) {
      // alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  //前端改圖
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader()
      reader.onload = function (e) {
        $('#imagePreview').css(
          'backgroundImage',
          'url(' + e.target.result + ')'
        )
        $('#imagePreview').hide()
        $('#imagePreview').fadeIn(650)
        memberPicUpload(memberData.newsId)
        console.log('memberData.newsId', memberData.newsId)
      }
      reader.readAsDataURL(input.files[0])
    }
  }
  // $('#imageUpload').change(function () {
  //   readURL(this)
  // })

  const uuuurl =
    'http://localhost:5000/images/member/' + memberData.member_photo_id
  const img = (
    <>
      <div class="avatar-upload">
        <div class="avatar-edit">
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => readURL(e.target)}
          />
          <label for="imageUpload">
            <FaCamera className="mepo-img-ud-svg d-flex" />
          </label>
        </div>
        <div class="avatar-preview">
          <div
            id="imagePreview"
            style={{
              backgroundImage: `url(${uuuurl})`,
            }}
          ></div>
        </div>
      </div>
    </>
  )
  const display = (
    <>
      <div className="person">
        <h3>一般會員</h3>
        {img}
        {/* <img
          id="preview_ie"
          src={'/images/userphoto/' + memberData.member_photo_id}
          alt={memberData.member_name}
        /> */}
        <h4>{memberData.member_name}</h4>
        <Button
          variant="primary"
          className="MemberList-title"
          onClick={handleShow}
        >
          修改資料
        </Button>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        //backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-h4">個人資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MemberEdit
            member={memberData}
            setMember={setMember}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer className="Line-none"></Modal.Footer>
      </Modal>
    </>
  )

  return <>{display}</>
}

export default MemberProfile
