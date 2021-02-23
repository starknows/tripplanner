import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import FormFile from 'react-bootstrap/FormFile'
import TBPicUploadRect from './TBPicUploadRect'
import Modal from 'react-bootstrap/Modal'
import $ from 'jquery'

function AddTravelBuddiesForm() {
  let history = useHistory()
  const [validated, setValidated] = useState(false)
  const [importFromItinerary, setImportFromItinerary] = useState(false)
  const [importFromCollection, setImportFromCollection] = useState(false)
  const [tbThemeName, settbThemeName] = useState('')
  const [tbThemePhotoToBack, settbThemePhotoToBack] = useState('')
  // const [tbThemePhoto, settbThemePhoto] = useState('')
  const [tbCityCategory, settbCityCategory] = useState([])
  const [tbDateBegin, settbDateBegin] = useState('')
  const [tbDateEnd, settbDateEnd] = useState('')
  const [tbDaysCategory, settbDaysCategory] = useState('')
  const [tbLastApprovedDate, settbLastApprovedDate] = useState('')
  const [tbEstimatedCost, settbEstimatedCost] = useState('')
  const [tbPersonsNeeded, settbPersonsNeeded] = useState('')
  const [tbGenderNeeded, settbGenderNeeded] = useState('')
  const [tbThemeIntro, settbThemeIntro] = useState('')
  const [buttonDemo, setButtonDemo] = useState(false)

  // settbCityCategory(
  //   $('input:checkbox:checked[name="tbCityCategory"]').each(function (i) {
  //     tbCityCategory[i] = this.value
  //   })
  // )

  function checkChange(e) {
    $('input[name="tbCityCategory[]"]:checked').each(function (i) {
      tbCityCategory[i] = this.value
    })
  }

  function setDemo() {
    settbThemeName('綠島一週小旅行')
    settbDateBegin('2021-04-01')
    settbDateEnd('2021-04-07')
    settbLastApprovedDate('2021-03-25')
    settbEstimatedCost('10000')
    settbPersonsNeeded('5')
    settbThemeIntro(
      '綠島舊名火燒島，位於臺東市東方約33公里的海面上，面積16.2平方公里，由火山集塊岩所構成的島嶼，因長年受風化及海水侵蝕，形成曲折多變的海岸景觀。巍峨奇岩巨石、陡峭台地海岸、潔淨的白色沙灘、翠綠草原、獨特的海底溫泉、嶙峋珊瑚礁裙、綺麗海底世界、以及豐盛的植物等優渥的條件，使得綠島這個遺世獨立的小島，搖身一變成東部的海上樂園。'
    )
  }

  async function handlePicToDB() {
    let formData = new FormData()
    let imgFile = document.querySelector('#tbMainPhoto')
    formData.append('file', imgFile.files[0])
    try {
      let reqUrl = `http://localhost:5000/upload/tbPhoto`
      let reqBody = {
        method: 'post',
        body: formData,
      }
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        const data = await response.json()
        const tbThemePhoto = data.name[0]
        console.log(data.name[0])
        addTravelBuddies(tbThemePhoto)
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function addTravelBuddies(tbThemePhoto) {
    const newTravelBuddies = {
      tbThemeName,
      tbThemePhoto,
      tbCityCategory,
      tbDateBegin,
      tbDateEnd,
      tbDaysCategory,
      tbLastApprovedDate,
      tbEstimatedCost,
      tbPersonsNeeded,
      tbGenderNeeded,
      tbThemeIntro,
    }
    console.log(newTravelBuddies)
    try {
      // 從伺服器得到資料
      const response = await fetch('http://localhost:5000/travelbuddies', {
        method: 'post',
        body: JSON.stringify(newTravelBuddies),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        console.log('data:', data)
        if (data.id) console.log('success')
        // history.push('/travlBuddies')
      }
    } catch (err) {
      // 發生錯誤的處理情況
      // alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

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
      <div className="add-travelbuddies-outbox">
        <div className="add-travelbuddies-middle">
          <Form validated={validated} onSubmit={handleSubmit}>
            <div className="d-flex">
              <h1 className="add-travelbuddies-topic">新增旅行揪團</h1>
              <Button
                className="demo-button"
                onClick={() => {
                  setButtonDemo(true)
                  setDemo()
                }}
              >
                Demo 小幫手
              </Button>
            </div>
            <Form.Group className="mt-3" controlId="travelBuddiesThemeName">
              <Form.Label htmlFor="travelBuddiesThemeName">
                旅行揪團名稱：
              </Form.Label>
              <Form.Control
                id="tbThemeName"
                name="tbThemeName"
                type="text"
                placeholder="請輸入30字元內的旅行揪團名稱"
                onChange={(e) => {
                  settbThemeName(e.target.value)
                }}
                defaultValue={buttonDemo === true ? '綠島一週小旅行' : ''}
                required
              />
              <Form.Control.Feedback type="invalid">
                旅行揪團名稱為必填欄位
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="" controlId="travelBuddiesThemePhoto">
              <Form.File id="travelBuddiesThemePhoto">
                <Form.File.Label>旅行揪團主圖片：</Form.File.Label>
                <Form.File.Input
                  id="tbMainPhoto"
                  onChange={(e) => {
                    settbThemePhotoToBack(e.target.value)
                  }}
                />
              </Form.File>
            </Form.Group>

            <Form.Group controlId="travelBuddieCityCategory">
              <Form.Label htmlFor="travelBuddieCityCategory">
                縣市分類：
              </Form.Label>
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="台北"
                    type={type}
                    id={`inline-${type}-citycategory1`}
                    name="tbCityCategory[]"
                    value="1"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="新北"
                    type={type}
                    id={`inline-${type}-citycategory2`}
                    name="tbCityCategory[]"
                    value="2"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="基隆"
                    type={type}
                    id={`inline-${type}-citycategory3`}
                    name="tbCityCategory[]"
                    value="3"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="桃園"
                    type={type}
                    id={`inline-${type}-citycategory4`}
                    name="tbCityCategory[]"
                    value="4"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="新竹"
                    type={type}
                    id={`inline-${type}-citycategory5`}
                    name="tbCityCategory[]"
                    value="5"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="苗栗"
                    type={type}
                    id={`inline-${type}-citycategory6`}
                    name="tbCityCategory[]"
                    value="6"
                  />
                  <Form.Check
                    inline
                    label="台中"
                    type={type}
                    id={`inline-${type}-citycategory7`}
                    name="tbCityCategory[]"
                    value="7"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="彰化"
                    type={type}
                    id={`inline-${type}-citycategory8`}
                    name="tbCityCategory[]"
                    value="8"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="南投"
                    type={type}
                    id={`inline-${type}-citycategory9`}
                    name="tbCityCategory[]"
                    value="9"
                  />
                  <Form.Check
                    inline
                    label="雲林"
                    type={type}
                    id={`inline-${type}-citycategory10`}
                    name="tbCityCategory[]"
                    value="10"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="嘉義"
                    type={type}
                    id={`inline-${type}-citycategory11`}
                    name="tbCityCategory[]"
                    value="11"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="台南"
                    type={type}
                    id={`inline-${type}-citycategory12`}
                    name="tbCityCategory[]"
                    value="12"
                  />
                  <Form.Check
                    inline
                    label="高雄"
                    type={type}
                    id={`inline-${type}-citycategory13`}
                    name="tbCityCategory[]"
                    value="13"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="屏東"
                    type={type}
                    id={`inline-${type}-citycategory14`}
                    name="tbCityCategory[]"
                    value="14"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="宜蘭"
                    type={type}
                    id={`inline-${type}-citycategory15`}
                    name="tbCityCategory[]"
                    value="15"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="花蓮"
                    type={type}
                    id={`inline-${type}-citycategory16`}
                    name="tbCityCategory[]"
                    value="16"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="台東"
                    type={type}
                    id={`inline-${type}-citycategory17`}
                    name="tbCityCategory[]"
                    value="17"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="澎湖"
                    type={type}
                    id={`inline-${type}-citycategory18`}
                    name="tbCityCategory[]"
                    value="18"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="金門"
                    type={type}
                    id={`inline-${type}-citycategory19`}
                    name="tbCityCategory[]"
                    value="19"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="馬祖"
                    type={type}
                    id={`inline-${type}-citycategory20`}
                    name="tbCityCategory[]"
                    value="20"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="綠島"
                    type={type}
                    id={`inline-${type}-citycategory21`}
                    name="tbCityCategory[]"
                    value="21"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="蘭嶼"
                    type={type}
                    id={`inline-${type}-citycategory22`}
                    name="tbCityCategory[]"
                    value="22"
                    onChange={(e) => checkChange(e)}
                  />
                  <Form.Check
                    inline
                    label="小琉球"
                    type={type}
                    id={`inline-${type}-citycategory23`}
                    name="tbCityCategory[]"
                    value="23"
                    onChange={(e) => checkChange(e)}
                  />
                </div>
              ))}
              <Form.Control.Feedback type="invalid">
                縣市分類為必選
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Col>
                <Form.Group controlId="travelBuddiesDateBegin">
                  <Form.Label htmlFor="travelBuddiesDateBegin">
                    旅行開始日期：
                  </Form.Label>
                  <Form.Control
                    id="tbDateBegin"
                    name="tbDateBegin"
                    type="date"
                    placeholder=""
                    required
                    onChange={(e) => {
                      settbDateBegin(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '2021-04-01' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    請選擇旅行開始日期
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="travelBuddiesDateEnd">
                  <Form.Label htmlFor="travelBuddiesDateEnd">
                    旅行結束日期：
                  </Form.Label>
                  <Form.Control
                    id="tbDateEnd"
                    name="tbDateEnd"
                    type="date"
                    placeholder=""
                    required
                    onChange={(e) => {
                      settbDateEnd(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '2021-04-07' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    請選擇旅行結束日期
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="travelBuddiesDaysCategory">
                  <Form.Label htmlFor="travelBuddiesDaysCategory">
                    天數分類：
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="tbDaysCategory"
                    name="tbDaysCategory"
                    onChange={(e) => {
                      settbDaysCategory(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '4' : ''}
                  >
                    <option value="1">1日遊</option>
                    <option value="2">2-3日遊</option>
                    <option value="3">4-5日遊</option>
                    <option value="4">6-7日遊</option>
                    <option value="5">8日遊或以上</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    請選擇旅行天數分類
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="travelBuddiesLastApprovedDate">
                  <Form.Label htmlFor="travelBuddiesLastApprovedDate">
                    最後審核日期：
                  </Form.Label>
                  <Form.Control
                    id="tbLastApprovedDate"
                    name="tbLastApprovedDate"
                    type="date"
                    placeholder=""
                    required
                    onChange={(e) => {
                      settbLastApprovedDate(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '2021-03-25' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    請選擇最後審核日期
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="travelBuddiesEstimatedCost">
                  <Form.Label htmlFor="travelBuddiesEstimatedCost">
                    預估花費：
                  </Form.Label>
                  <Form.Control
                    id="tbEstimatedCost"
                    name="tbEstimatedCost"
                    type="number"
                    placeholder=""
                    required
                    onChange={(e) => {
                      settbEstimatedCost(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '10000' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    請填寫預估花費
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId="travelBuddiesPersonsNeeded">
                  <Form.Label htmlFor="travelBuddiesPersonsNeeded">
                    需求人數：
                  </Form.Label>
                  <Form.Control
                    id="tbPersonsNeeded"
                    name="tbPersonsNeeded"
                    type="number"
                    placeholder=""
                    required
                    onChange={(e) => {
                      settbPersonsNeeded(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '5' : ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    請填寫需求人數
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="travelBuddiesGenderNeeded">
                  <Form.Label htmlFor="travelBuddiesGenderNeeded">
                    需求性別：
                  </Form.Label>
                  <Form.Control
                    as="select"
                    id="tbGenderNeeded"
                    name="tbGenderNeeded"
                    placeholder=""
                    onChange={(e) => {
                      settbGenderNeeded(e.target.value)
                    }}
                    defaultValue={buttonDemo === true ? '男女皆可' : ''}
                  >
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                    <option value="男女皆可">男女皆可</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    請選擇需求性別
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group controlId="travelBuddiesThemeIntro">
              <Form.Label htmlFor="travelBuddiesThemeIntro">
                旅行揪團介紹：
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                id="tbThemeIntro"
                name="tbThemeIntro"
                placeholder="請盡情介紹您的旅行揪團，吸引更多人報名參加唷！"
                onChange={(e) => {
                  settbThemeIntro(e.target.value)
                }}
                defaultValue={
                  buttonDemo === true
                    ? '綠島舊名火燒島，位於臺東市東方約33公里的海面上，面積16.2平方公里，由火山集塊岩所構成的島嶼，因長年受風化及海水侵蝕，形成曲折多變的海岸景觀。巍峨奇岩巨石、陡峭台地海岸、潔淨的白色沙灘、翠綠草原、獨特的海底溫泉、嶙峋珊瑚礁裙、綺麗海底世界、以及豐盛的植物等優渥的條件，使得綠島這個遺世獨立的小島，搖身一變成東部的海上樂園。'
                    : ''
                }
              />
              <Form.Control.Feedback type="invalid">
                旅行揪團介紹為必填欄位
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Button
              className="add-travelbuddies-importfromi"
              onClick={() => setImportFromItinerary(true)}
            >
              從我的行程匯入
            </Button>{' '}
            <Button
              className="add-travelbuddies-importfromc"
              onClick={() => setImportFromCollection(true)}
            >
              從我收藏的行程匯入
            </Button> */}
            <br />
            <br />
            <br />
            <Button
              id="insertTravelBuddies"
              className="add-travelbuddies-cancel"
              onClick={() => history.push('/travelbuddies')}
            >
              {' '}
              取消
            </Button>
            <Button
              id="insertTravelBuddies"
              className="add-travelbuddies-confirm"
              onClick={() => {
                handlePicToDB()
                history.push('/travelbuddies')
              }}
            >
              {' '}
              新增
            </Button>
            <br />
            <Modal
              size="lg"
              show={importFromItinerary}
              onHide={() => setImportFromItinerary(false)}
              aria-labelledby="travelBuddiesImportfromI"
            >
              <Modal.Header closeButton>
                <Modal.Title id="travelBuddiesImportfromI">
                  選擇我的行程並匯入
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex importfrom-row-even">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-odd">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-even">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-odd">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-even">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-odd">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="" className="add-travelbuddy-importconfirm">
                  確認選擇
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              size="lg"
              show={importFromCollection}
              onHide={() => setImportFromCollection(false)}
              aria-labelledby="travelBuddiesImportfromC"
            >
              <Modal.Header closeButton>
                <Modal.Title id="travelBuddiesImportfromC">
                  選擇我收藏的行程並匯入
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex importfrom-row-even">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-odd">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-even">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-odd">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-even">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="d-flex importfrom-row-odd">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="" className="add-travelbuddy-importconfirm">
                  確認選擇
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddTravelBuddiesForm
