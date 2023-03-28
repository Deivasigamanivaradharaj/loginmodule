import React, { useState } from 'react'
import './Authentication.css'
import Login from './Login'
import ResetPassword from '../ResetPassword/ResetPassword'

function Authentication() {

    let[showResetPassword,updateShowResetPassword] = useState(false)

  function forgotPassword(){
    updateShowResetPassword(true)
  }

  function onCancel(){
    updateShowResetPassword(false)
  }

  return (
    <div className='Authentication'>
      {!showResetPassword && <Login forgotpassword={forgotPassword}></Login>}
      {showResetPassword && <ResetPassword onCancel={onCancel}></ResetPassword>}
    </div>
  )
}

export default Authentication
