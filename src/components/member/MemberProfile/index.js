//修改會員資料及更新大頭照
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import MemberEdit from '../MemberEdit'
import './MemberProfile.scss'
import $ from 'jquery'
import { FaCamera } from 'react-icons/fa'

//導入資料庫
function MemberProfile({ setMember }) {
  const [memberData, setMemberData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )

  //model
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //拉取資料
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
        //制定
        let chingimg = JSON.parse(localStorage.getItem('userData'))
        // 存入圖片
        chingimg.member_photo_id = url
        localStorage.setItem('userData', JSON.stringify(chingimg))
        document.querySelector(
          '.header-img-br'
        ).src = `http://localhost:5000/images/member/${url}`
      }
    } catch (err) {
      // alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  //更新大頭照
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

  const chingurl =
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
              backgroundImage: `url(${chingurl})`,
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
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title-h4">個人資料</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MemberEdit
            // 資料傳遞
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
