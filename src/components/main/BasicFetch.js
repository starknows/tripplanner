/**
 * 檔案負責人: 柯政安
 * 此元件用來做簡單的、只需要知道true/false的請求
 * 因製作時間較晚，很多地方未使用此元件取代已完成功能
 */

async function BasicFetch({ url, method = 'get', data = {} }) {
  let reqBody = { method: method }
  if (method !== 'get') {
    reqBody = {
      method: method,
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  }
  try {
    const response = await fetch(`http://localhost:5000/${url}`, reqBody)
    if (response.ok) {
      let data = await response.json()
      console.log(reqBody)
      if (data.length > 0) {
        return true
      } else {
        return false
      }
    }
  } catch (err) {
    alert('無法得到伺服器資料，請稍後再重試')
    console.log(err)
  }
}

export default BasicFetch
