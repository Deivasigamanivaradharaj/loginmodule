import React, { createContext, useState } from 'react'


let AuthContext = createContext({isLoggedIn:false, Userid:undefined, onLogin:undefined, onLogout:undefined})

export function AuthContextProvider(props) {

    let[isLoggedIn,updateisLoggedIn] = useState(false)
    let[Userid,updateUserId] = useState("")

    function LoginHandler(Userid){
        updateUserId(Userid)
        updateisLoggedIn(true)
    }

    function LogoutHandler(){
        updateisLoggedIn(false)
    }

  return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, Userid:Userid, onLogin:LoginHandler, onLogout:LogoutHandler}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
