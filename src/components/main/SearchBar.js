/**
 * 檔案負責人: 柯政安
 * searchBar元件
 * 實現了根據第一欄地區的選擇內容，決定第二欄城市該顯示的項目
 * 會回傳所有選擇的項目
 */

import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { debounce } from 'lodash'
//利用debounce來避免敏感的onchange
//

function SearchBar({
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
  let history = useHistory()
  let location = useLocation()
  console.log(location)
  let inputRef = useRef(null) // 建立輸入框參考點
  //建立回傳用物件
  const [returnObject, setReturnObject] = useState({
    area: areaList[0],
    town: townList[0][0],
    day: 0,
    keyword: '',
  })
  //
  const [inputText, setInputText] = useState('')
  const [selectArea, setSelectArea] = useState('全部')
  const [selectTown, setSelectTown] = useState('全部')
  const [selectDay, setSelectDay] = useState(0)
  const [nowArea, setNowArea] = useState(0)

  useEffect(() => {
    let currentValue = {
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
      keyword: inputText,
      area: selectArea,
      town: selectTown,
      day: selectDay,
    }
    setReturnObject(currentValue)
  }, [inputText, selectTown, selectDay]) // eslint-disable-line react-hooks/exhaustive-deps
  //記錄輸入框字串
  const handleInput = () => {
    setInputText(inputRef.current.value)
  }
  //處理選項變化
  function handleChange(e, type) {
    let valueChange = e.target.value
    switch (type) {
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
  //
  return (
    <>
      <div className="searchbar-wrapper d-flex justify-content-between">
        <div className="searchbar-form-wrapper d-flex align-items-center">
          <input
            ref={inputRef}
            onChange={debounce(handleInput, 500)}
            className="form-custom searchbar-input"
            type="text"
          />
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
            setSearchFilter(returnObject)
            history.push(
              location.pathname + '?' + new URLSearchParams(returnObject)
            )
          }}
          className="do-search-button"
        ></div>
      </div>
    </>
  )
}

export default SearchBar
// 檔案負責人: 柯政安
