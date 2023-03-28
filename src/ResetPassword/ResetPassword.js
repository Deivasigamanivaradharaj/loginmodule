import React, { useState } from 'react'
import CreatePassword from './CreatePassword'
import ForgotPassword from './ForgotPassword'
import UserContext from './UserContext'

function ResetPassword(props) {

  let [uid, updateuid] = useState("")
  let[showCreatePassword,updateShowCreatePassword] = useState(false)

    function onCanceltoAuth(){
        props.onCancel()
    }

    function ChangePassword(Userid){
      updateShowCreatePassword(true)
      updateuid(Userid);
    }

  return (
    <UserContext.Provider value={{UserId:uid}}>
        {!showCreatePassword && <ForgotPassword onCanceltoRP={onCanceltoAuth} onChangePassword={ChangePassword} ></ForgotPassword>}
        {showCreatePassword && <CreatePassword  onCanceltoFP={onCanceltoAuth}></CreatePassword>}
    </UserContext.Provider>
  )
}

export default ResetPassword
