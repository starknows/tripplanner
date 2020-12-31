import React from 'react'

import Header from '../components/main/Header'
import Footer from '../components/main/Footer'
import StarRating from '../components/member/StarRating'
import MemberProfile from '../components/member/MemberProfile'
import CalendarApp from '../components/member/CalendarApp'
import FunctionBar from '../components/member/FunctionBar'

function Member() {
  return (
    <>
      <Header />
      <article className="article">
        <section className="section">
          <MemberProfile />
          <StarRating />
          <CalendarApp />
        </section>
        <nav>
          <FunctionBar />
        </nav>
      </article>
      <Footer />
    </>
  )
}

export default Member

//這是會員的共用項目 Ray