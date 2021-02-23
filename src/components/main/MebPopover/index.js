//通知泡泡元件
import React from 'react'
import { Popover } from 'antd'
import { FaRegBell } from 'react-icons/fa'
import './MebPopover.scss'
import NewNotice from '../../member/NewNotice'
import { useHistory } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// import src from '*.avif'

function MebPopover() {
  let history = useHistory()
  const text = <span>通知</span>
  const content = (
    <div className="MebPopover-style">
      <NewNotice />
      <button
        className="d-flex"
        type="primary"
        trigger="click"
        onClick={() => {
          history.push('/myAccount/Notice')
        }}
      >
        更多
      </button>
      {/* <Link to="/myAccount/Notice" className="">
        更多
      </Link> */}
    </div>
  )
  const buttonWidth = 0
  return (
    <>
      <div className="demo">
        <div
          style={{
            marginLeft: buttonWidth,
            clear: 'both',
            whiteSpace: 'nowrap',
          }}
        >
          <Popover
            placement="topRight"
            title={text}
            content={content}
            trigger="click"
          >
            <FaRegBell className="Navbar-icon" />
          </Popover>
        </div>
      </div>
    </>
  )
}

export default MebPopover
