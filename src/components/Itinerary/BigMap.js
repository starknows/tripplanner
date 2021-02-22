/**
 * 檔案負責人: 柯政安
 * 此元件用來產生全螢幕寬的地圖
 * 主要用途是個人製作行程表時尋找景點之用
 * 以GoogleMapReact套件配合googlemap api製作而成
 * 擁有以下功能：
 * 1. 指定中心點開啟：目前預設為中央大學
 * 2. 給予座標自動轉移地圖中心：目前設定為搜尋景點後，自動轉移到點選之景點座標
 * 3. 搜尋中心點周遭景點：因google API限制，一次僅能取得20筆，難以掌控，
 *    故改造成能夠自動整理景點，寫入資料庫備用的景點爬取工具
 * 4. 根據給予的景點清單自動產生景點標誌
 * 5. 計算各景點與中心點經緯度距離，目前設定顯示 1 公里內景點
 * 其餘說明：
 * 因景點並非時常變動，故不從資料庫獲取，而是直接從資料庫匯出列表，使用靜態檔案，擴充景點時更新該檔即可
 * 爬取功能目前設定關閉中
 */
import React, { useState, useRef, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
import GoogleMapReact from 'google-map-react'
import { debounce } from 'lodash'
//利用debounce來避免敏感的onchange
//引入 API key
// import { Key } from '../../Key'
//
//靜態景點資料
let itinData = require('./itinlistXXXX.json')
let handleItinData = itinData[2].data
//
//marker元件
const PlaceMarker = ({
  id,
  title,
  lat,
  lng,
  city,
  // address,
  dataFromUser,
  setDataFromUser,
}) => (
  <div className="map-markerWrap d-flex flex-column align-items-center">
    <div className={`map-marker-info custom-box-shadow markerInfo${id}`}>
      <h5>{title}</h5>
      <Button
        variant="info"
        //按下按鈕後，將傳進元件內的景點資訊push到當前行程array最後一日的最後方
        onClick={(e) => {
          e.preventDefault()
          const originArray = Array.from(dataFromUser)
          const dayIndex = originArray.length
          const boxInedx =
            dayIndex > 0 ? originArray[dayIndex - 1].data.length : 0
          let time = ''
          if (boxInedx > 0) {
            time = originArray[dayIndex - 1].data[boxInedx - 1].begin
          } else {
            time = '0800'
          }
          const insertData = {
            place_id: id,
            day: null,
            order: null,
            title,
            begin: time,
            location: city,
            lat,
            lng,
            image: '',
            info: '',
          }
          originArray[dayIndex - 1].data.push(insertData)
          setDataFromUser(originArray)
        }}
      >
        加進行程
        <FaPlus />
      </Button>
    </div>
    <div className="d-flex flex-column align-items-center">
      <img
        className="map-markerIcon"
        src={'/images/marker.png'}
        alt={title}
        //按下景點時關閉所有infoBox，並判斷該景點開閉狀態，針對該景點進行開閉切換
        onClick={(e) => {
          e.stopPropagation()
          if (document.querySelector('.map-info-open')) {
            if (
              document.querySelector('.map-info-open') ===
              document.querySelector(`.markerInfo${id}`)
            ) {
              document
                .querySelector('.map-info-open')
                .classList.remove('map-info-open')
              return
            } else {
              document
                .querySelector('.map-info-open')
                .classList.remove('map-info-open')
            }
          }
          document
            .querySelector(`.markerInfo${id}`)
            .classList.add('map-info-open')
        }}
      />
      <h5>{title}</h5>
    </div>
  </div>
)
//整理並記錄googlemap API回傳的20筆附近景點資料
//景點資料分為沒有地址的「純地名」的以及擁有地址的景點，這邊只抓有地址的景點
function doRecord(data) {
  let handleDat = []
  data.forEach((ele, index) => {
    if (ele.hasOwnProperty('plus_code')) {
      handleDat.push({
        id: ele.place_id,
        title: ele.name,
        lat: ele.geometry.location.lat(),
        lng: ele.geometry.location.lng(),
        vicinity: ele.vicinity,
        town: ele.plus_code.compound_code,
      })
    }
  })
  if (handleDat) sendDatatoServer(handleDat)
}
//將整理好的附近景點資料，傳送至後端資料庫儲存
async function sendDatatoServer(data) {
  try {
    const response = await fetch(`http://localhost:5000/itinerary/addItin`, {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  } catch (err) {
    console.log(err)
  }
}
//給予兩經緯度計算直線距離 (網路上找來的現成function)
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === 'K') {
      //公里
      dist = dist * 1.609344
    }
    if (unit === 'N') {
      dist = dist * 0.8684
    }
    return dist
  }
}
//
//
//地圖元件本體
function BigMap({
  center = { lat: 24.969328305278708, lng: 121.1954124510366 }, //中央大學
  zoom = 18, //數字越大越詳細
  dataFromUser, //當下所有行程資料
  setDataFromUser, //因為會操作行程資料，故也傳入
}) {
  //
  // 預設中心點位置
  const [myPosition, setMyPosition] = useState({
    lat: 24.965173627005004, //中央路全家
    lng: 121.19192039564527,
  })
  //
  //地圖樣式
  const mapOptions = { styles: null } //若開啟，則地圖上會包含原生POI (point of interest)
  //
  //建立鉤子
  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  let inputRef = useRef(null) // 建立搜尋輸入框參考點
  const [inputText, setInputText] = useState('')
  const [autocompleteResults, setAutocompleteResults] = useState([])
  const [currentCenter, setCurrentCenter] = useState(center)
  const [places, setPlaces] = useState([]) //儲存搜尋到的地點
  //
  // 當地圖載入完成，將地圖實體與地圖 API 傳入 state 供之後使用
  const apiHasLoaded = (map, maps) => {
    setMapInstance(map) //map = 地圖實體
    setMapApi(maps) //maps = 各種map API
    setMapApiLoaded(true)
  }
  //處理改變中心點
  const handleCenterChange = () => {
    if (mapApiLoaded) {
      const newPosition = {
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng(),
      }
      setCurrentCenter(newPosition) // 改變地圖視角位置
      setMyPosition(newPosition) // 改變 MyPosition
      //自動記錄開關 1/2
      // doSearchPlace() //改變中心後重新搜尋地標
    }
  }
  //搜尋附近景點
  const doSearchPlace = () => {
    var loc = new mapApi.LatLng(
      mapInstance.center.lat(),
      mapInstance.center.lng()
    )
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance)
      const request = {
        location: loc,
        radius: '300',
      }
      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          console.log(results)
          setPlaces(results)
        }
      })
    }
  }
  // 送出自動填入請求
  const handleAutocomplete = () => {
    if (mapApiLoaded) {
      const service = new mapApi.places.AutocompleteService()
      const request = {
        input: inputText,
      }
      service.getPlacePredictions(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setAutocompleteResults(results) //寫入 state 供使用
        }
      })
    }
  }
  // 點擊自動完成地址時，更改 MyPosition
  const handleClickToChangeMyPosition = (e) => {
    const placeId = e.target.getAttribute('dataid')
    const service = new mapApi.places.PlacesService(mapInstance)
    const request = {
      placeId,
      fields: ['geometry'],
    }
    service.getDetails(request, (results, status) => {
      if (status === mapApi.places.PlacesServiceStatus.OK) {
        const newPosition = {
          lat: results.geometry.location.lat(),
          lng: results.geometry.location.lng(),
        }
        setCurrentCenter(newPosition) // 改變地圖視角位置
        setMyPosition(newPosition) // 改變 MyPosition
        setAutocompleteResults([]) // 清空自動搜尋地址清單
        inputRef.current.value = '' // 清空 <input>
      }
    })
  }
  //
  //取得輸入框值並寫入狀態
  const handleInput = () => {
    setInputText(inputRef.current.value)
  }
  useEffect(() => {
    handleAutocomplete()
  }, [inputText]) // eslint-disable-line react-hooks/exhaustive-deps
  //
  //自動記錄開關 2/2
  // useEffect(() => {
  //   doRecord(places)
  // }, [places])

  return (
    <div className="map-comp-wrapper">
      <div className="map-search-wrapper custom-box-shadow">
        <input
          className="form-custom"
          ref={inputRef}
          type="text"
          placeholder="搜尋景點"
          onChange={debounce(handleInput, 500)}
        />
        <div onClick={handleClickToChangeMyPosition}>
          {autocompleteResults && inputText
            ? autocompleteResults.map((item, index) => (
                <div className="d-flex">
                  <div
                    className="map-search-result"
                    key={index}
                    dataid={item.place_id}
                  >
                    　{item.structured_formatting.main_text}
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: Key,
          libraries: ['places'], // 在這邊放入要使用的googlemap API
        }}
        center={currentCenter}
        onBoundsChange={handleCenterChange} //移動地圖邊界時觸發 handleCenterChange
        defaultCenter={center}
        defaultZoom={zoom}
        // options={mapOptions} //設定是否要開啟原生POI
        yesIWantToUseGoogleMapApiInternals // 是否使用google map api
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)} // 載入完成後執行
        //點擊地圖任意點則關閉所有infoBox
        onClick={() => {
          if (document.querySelector('.map-info-open')) {
            document
              .querySelector('.map-info-open')
              .classList.remove('map-info-open')
          }
        }}
      >
        {/* 利用景點列表產生景點 */}
        {handleItinData.map(
          (item) =>
            distance(
              item.lat,
              item.lng,
              currentCenter.lat,
              currentCenter.lng,
              'K'
            ) < 1 && (
              <PlaceMarker
                key={item.id}
                id={item.place_id}
                // lat={item.geometry.location.lat()} //從googlemap api直接取得時的版本
                // lng={item.geometry.location.lng()}
                lat={item.lat} //用JSON檔引入時的版本
                lng={item.lng}
                title={item.title}
                city={item.city}
                address={item.address}
                dataFromUser={dataFromUser}
                setDataFromUser={setDataFromUser}
              />
            )
        )}
      </GoogleMapReact>
    </div>
  )
}

export default BigMap
// 檔案負責人: 柯政安
