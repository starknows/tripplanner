import React, { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import { useHistory } from 'react-router-dom'

//利用debounce來避免敏感的onchange
//

function HomeSearchBar({
  pageList = ['行程', '揪團', '講座'],
  areaList = ['全部', '北部', '中部', '南部', '東部', '離島'],
  townList = [
    ['全部'],
    ['全部', '台北', '新北', '基隆', '桃園', '新竹'],
    ['全部', '台中', '苗栗', '彰化', '南投', '雲林'],
    ['全部', '高雄', '台南', '嘉義', '屏東'],
    ['全部', '宜蘭', '花蓮', '台東'],
    ['全部', '澎湖', '金門', '馬祖', '綠島', '蘭嶼', '小琉球'],
  ],
  day = ['不限', '1日', '2-3日', '4-5日', '6-7日', '8日以上'],

  setSearchFilter = () => {},
}) {
  let inputRef = useRef(null) // 建立輸入框參考點
  //建立回傳用物件
  const [returnObject, setReturnObject] = useState({
    page: pageList[0],
    area: areaList[0],
    town: townList[0][0],
    day: 0,
    keyword: '',
  })

  const searchParams = new URLSearchParams({
    page: returnObject.page,
    area: returnObject.area,
    town: returnObject.town,
    day: returnObject.day,
    keyword: returnObject.keyword,
  })

  //
  const [inputText, setInputText] = useState('')
  const [selectPage, setSelectPage] = useState('行程')
  const [selectArea, setSelectArea] = useState('全部')
  const [selectTown, setSelectTown] = useState('全部')
  const [selectDay, setSelectDay] = useState(0)
  // const [searchParams, setsearchParams] = useState([])

  const [nowArea, setNowArea] = useState(0)

  //偵測地區變化
  useEffect(() => {
    let currentValue = {
      page: selectPage,
      keyword: inputText,
      area: selectArea,
      town: selectTown,
      day: selectDay,
    }

    setReturnObject(currentValue)
    setNowArea(areaList.indexOf(selectArea))
  }, [selectArea]) // eslint-disable-line react-hooks/exhaustive-deps
  //偵測其他選擇與輸入框變化
  useEffect(() => {
    let currentValue = {
      page: selectPage,
      keyword: inputText,
      area: selectArea,
      town: selectTown,
      day: selectDay,
    }

    setReturnObject(currentValue)
  }, [inputText, selectPage, selectTown, selectDay]) // eslint-disable-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(
  //     {
  //       page: selectPage,
  //       keyword: inputText,
  //       area: selectArea,
  //       town: selectTown,
  //       day: selectDay,
  //     },
  //     setsearchParams(searchParams)
  //   )
  // }, [searchParams])
  //記錄輸入框字串
  const handleInput = () => {
    setInputText(inputRef.current.value)
  }
  //處理選項變化
  function handleChange(e, type) {
    let valueChange = e.target.value
    switch (type) {
      case 'page':
        setSelectPage(valueChange)
        break
      case 'area':
        setSelectArea(valueChange)
        break
      case 'town':
        setSelectTown(valueChange)
        break
      case 'day':
        setSelectDay(valueChange)
        break
      default:
        break
    }
  }
  let history = useHistory()

  // function Goitinerary() {
  //   history.push('/itinerary')

  // }
  function Goitinerary(data) {
    history.push(`/itinerary?${data}`)
  }

  function GotravelBuddies(data) {
    history.push(`/travelBuddies?${data}`)
  }
  function GoproductList(data) {
    history.push(`/productList?${data}`)
  }
  //
  return (
    <>
      <div
        className="homesearchbar-wrapper d-flex justify-content-between"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-out"
        data-aos-duration="900"
        data-aos-delay="1500"
      >
        <div className="homesearchbar-form-wrapper d-flex align-items-center">
          <input
            ref={inputRef}
            onChange={debounce(handleInput, 500)}
            className="form-custom homesearchbar-input"
            type="text"
          />
          <select
            onChange={(e) => {
              handleChange(e, 'page')
            }}
            className="form-custom searchbar-page"
            name="searchbar-page"
          >
            {pageList.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              handleChange(e, 'area')
            }}
            className="form-custom searchbar-area"
            name="searchbar-area"
          >
            {areaList.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              handleChange(e, 'town')
            }}
            className="form-custom searchbar-town"
            name="searchbar-town"
          >
            {townList[nowArea].map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              handleChange(e, 'day')
            }}
            className="form-custom searchbar-day"
            name="searchbar-day"
          >
            {day.map((element, index) => (
              <option key={index} value={index}>
                {element}
              </option>
            ))}
          </select>
        </div>
        <div
          role="button"
          onClick={() => {
            if (returnObject.page == '行程') {
              Goitinerary(searchParams)
            } else if (returnObject.page == '揪團') {
              GotravelBuddies(searchParams)
            } else if (returnObject.page == '講座') {
              GoproductList(searchParams)
            }
          }}
          className="homedo-search-button"
        ></div>
      </div>
    </>
  )
}

export default HomeSearchBar
// 檔案負責人: 柯政安
