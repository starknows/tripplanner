//google 登出
import React from 'react'
import { useGoogleLogout } from 'react-google-login'
import { useHistory } from 'react-router-dom'
//貼上key
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com'

function LogoutHooks() {
  let history = useHistory()
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success')
    // alert('Logged out Successfully ✌')
    history.push('/')
  }

  const onFailure = () => {
    console.log('Handle failure cases')
  }

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  })

  return (
    // <button>
    <>
      {/* <img src="icons/google.svg" alt="google login" className="icon"></img> */}
      <span onClick={signOut} className="button">
        登出
      </span>
      {/* </button> */}
    </>
  )
}

export default LogoutHooks
