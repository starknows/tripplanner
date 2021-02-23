import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import FormFile from 'react-bootstrap/FormFile'
import TBPicUploadRect from './TBPicUploadRect'
import Modal from 'react-bootstrap/Modal'
import $ from 'jquery'

function EditTravelBuddiesForm(props) {
  let history = useHistory()
  let { id } = useParams()
  const [validated, setValidated] = useState(false)
  const [importFromItinerary, setImportFromItinerary] = useState(false)
  const [importFromCollection, setImportFromCollection] = useState(false)
  const [tbThemeName, settbThemeName] = useState('')
  const [tbThemePhotoToBack, settbThemePhotoToBack] = useState('')
  const [tbThemePhoto, settbThemePhoto] = useState('')
  const [tbCityCategory, settbCityCategory] = useState([])
  const [tbDateBegin, settbDateBegin] = useState('')
  const [tbDateEnd, settbDateEnd] = useState('')
  const [tbDaysCategory, settbDaysCategory] = useState('')
  const [tbLastApprovedDate, settbLastApprovedDate] = useState('')
  const [tbEstimatedCost, settbEstimatedCost] = useState('')
  const [tbPersonsNeeded, settbPersonsNeeded] = useState('')
  const [tbGenderNeeded, settbGenderNeeded] = useState('')
  const [tbThemeIntro, settbThemeIntro] = useState('')

  function checkChange(e) {
    $('input[name="tbCityCategory[]"]:checked').each(function (i) {
      tbCityCategory[i] = this.value
    })
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
        updateTravelBuddies(tbThemePhoto)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function updateTravelBuddies(tbThemePhoto) {
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
    try {
      const response = await fetch(
        `http://localhost:5000/travelBuddies/${id}`,
        {
          mode: 'cors',
          method: 'put',
          body: JSON.stringify(newTravelBuddies),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        const data = await response.json()
        // settbThemeName(data.)
        console.log(data)
        // history.push('/myAccount')
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  function getCities(cities) {
    $('input:checkbox').each(function () {
      if (cities.includes($(this).val())) {
        $(this).prop('checked', true)
      } else {
        $(this).prop('checked', false)
      }
    })
  }

  async function getTravelBuddies(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/edit/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        settbThemeName(data[0].tb_themeName)
        settbThemePhotoToBack(data[0].tb_themePhoto)
        let cities = data[0].tb_city.split(',')
        getCities(cities)
        settbDateBegin(data[0].tb_dateBegin.slice(0, 10))
        settbDateEnd(data[0].tb_dateEnd.slice(0, 10))
        settbDaysCategory(data[0].tb_daysCategory)
        settbLastApprovedDate(data[0].tb_lastApprovedDate.slice(0, 10))
        settbEstimatedCost(data[0].tb_estimatedCost)
        settbPersonsNeeded(data[0].tb_personsNeeded)
        settbGenderNeeded(data[0].tb_genderNeeded)
        settbThemeIntro(data[0].tb_themeIntro)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  useEffect(() => {
    getTravelBuddies()
  }, [])

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
            <h1 className="add-travelbuddies-topic">編輯旅行揪團</h1>
            <Form.Group controlId="travelBuddiesThemeName">
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
                required
                value={tbThemeName}
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
                    onChange={(e) => checkChange(e)}
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
                    onChange={(e) => checkChange(e)}
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
                    onChange={(e) => checkChange(e)}
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
                    value={tbDateBegin}
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
                    value={tbDateEnd}
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
                    value={tbDaysCategory}
                    placeholder={tbDaysCategory}
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
                    placeholder={tbLastApprovedDate}
                    required
                    onChange={(e) => {
                      settbLastApprovedDate(e.target.value)
                    }}
                    value={tbLastApprovedDate}
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
                    value={tbEstimatedCost}
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
                    value={tbPersonsNeeded}
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
                    value={tbGenderNeeded}
                    placeholder=""
                    onChange={(e) => {
                      settbGenderNeeded(e.target.value)
                    }}
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
                value={tbThemeIntro}
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
              onClick={() => history.push('/myAccount/TravelBuddies')}
            >
              {' '}
              取消
            </Button>
            <Button
              id="insertTravelBuddies"
              className="add-travelbuddies-confirm"
              onClick={() => {
                handlePicToDB()
                history.push('/myAccount/TravelBuddies')
              }}
            >
              {' '}
              更新
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
                <Button
                  variant=""
                  className="add-travelbuddy-importconfirm"
                  //   onClick={UpdateTravelBuddies()}
                >
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

export default EditTravelBuddiesForm
