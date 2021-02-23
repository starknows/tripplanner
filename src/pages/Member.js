//會員中心
import React, { useState, useEffect } from 'react'
import StarRating from '../components/member/StarRating'
import MemberProfile from '../components/member/MemberProfile/index'
import CalendarApp from '../components/member/CalendarApp'
import FunctionBar from '../components/member/FunctionBar'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'

function Member({ setAuth }) {
  let history = useHistory()
  //登入狀態
  const [isLoading, setIsLoading] = useState(true)
  //引入localStorage
  const [member, setMember] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )

  //更新訊息
  const key = 'updatable'
  const openMessage = () => {
    message.loading({ content: 'Loading...', key })
    setTimeout(() => {
      message.success({ content: 'Loaded!', key, duration: 1 })
    }, 500)
  }

  //資料庫連結
  async function getMember(id) {
    try {
      const response = await fetch(`http://localhost:5000/member/${id}`, {
        mode: 'cors',
        method: 'get',
      })

      if (response.ok) {
        const data = await response.json()
        // console.log('response:', response)
        setMember(data)
        localStorage.setItem('userData', JSON.stringify(data))
        // console.log('memberdata:', data)
        setTimeout(() => {
          setIsLoading(false)
          openMessage()
        }, 0)
      }
    } catch (err) {
      // alert('無法得到伺服器資料，請稍後再重試')
      history.push('/login')
      console.log(err)
    }
  }

  useEffect(() => {
    getMember(member.newsId)
    // console.log('me有資料嗎?', member)
  }, [])
  const Loading = <h1> </h1>

  const display = (
    <>
      <article className="article">
        <div className="aside">
          <section className="aboutMember">
            <MemberProfile
              // 子層
              member={member}
              setMember={setMember}
              setAuth={setAuth}
            />
            <StarRating />
            <CalendarApp />
          </section>
          <nav>
            <FunctionBar />
          </nav>
        </div>
      </article>
    </>
  )
  return <>{isLoading ? Loading : display}</>
}

export default Member
