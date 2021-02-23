import React from 'react'
import CardTravelBuddies from './CardTravelBudddies'
import { Col, Row, Container } from 'react-bootstrap'
//
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
//
function CardListTravelBudddies(props) {
  const data = props.tbDataMain
  return (
    <div
      data-aos-easing="ease-in"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="800"
    >
      <Row>
        {data.length > 0 &&
          data.map((element, index) => (
            <Col key={index} xs={6} md={4}>
              <CardTravelBuddies
                id={element.id}
                title={element.tb_themeName}
                location={element.tb_city} //此行連接後端後請修正
                image={'/tbPhoto/' + element.tb_themePhoto} //此行連接後端後請修正
                time1={element.tb_dateBegin}
                time2={element.tb_dateEnd}
                duration={element.tb_daysCategory}
                person={element.tb_owner} //此行連接後端後請修正
                like={element.tb_liked}
                mark={element.tb_mark}
              />
            </Col>
          ))}
      </Row>
    </div>
  )
}
export default CardListTravelBudddies
