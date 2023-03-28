import React, { useContext, useState } from 'react'
import { getDatabase, ref, child, get } from "firebase/database";
import app from '../Firebase';
import AuthContext from '../Context/AuthContext';

function Login(props) {

  let Context = useContext(AuthContext);

  let[Userid, updateUserId] = useState("")
  let[Password, updatePassword] = useState("")
  let[alert,showAlert] = useState(false)
  let[WPalert,showWPAlert] = useState(false)
  let[WUalert,showWUAlert] = useState(false)
  let[showPassword,setShowPassword] = useState(false)
  const dbRef = ref(getDatabase(app));

  function showpassword(){
    var x = document.getElementById("pswinput");
  if (x.type === "password") {
    x.type = "text";
    setShowPassword(true)
  } else {
    x.type = "password";
    setShowPassword(false)
  }
  }

  function onLogin(){
    if(Userid==="" || Password==="")
    {
      showAlert(true)
    }
    else
    {
      get(child(dbRef, `USERS/StaffLogin/${Userid}`)).then((data) => {
        if (data.exists()) {
          showWUAlert(false)
          if(Password===data.val().Password){
            Context.onLogin(Userid)
          }
          else{
            showWPAlert(true)
          }
          
        } else {
          get(child(dbRef, `USERS/StuddentLogin/${Userid}`)).then((data) => {
            if (data.exists()) {
              if(Password===data.val().Password){
                Context.onLogin(Userid);
              }
              else{
                showWPAlert(true)
              }
              
            } else {
              showWUAlert(true)
            }
          }).catch((error) => {
            console.error(error);
          });
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  return (
    <div className='logincontainer'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"></link>
      <form className='loginform'>
      <h1>LOGIN</h1>
        {/* <h3>User id:</h3> */}
        <input type={'text'} placeholder="Enter your User ID" onChange={(event) => {
          updateUserId(event.target.value)
          showAlert(false);
          showWUAlert(false)
          }}></input>
        {/* <h3>Password:</h3> */}
        <div style={{display:'flex'}}>
          <input style={{borderRadius:'5px', width:'100%'}} id='pswinput' type={'password'} placeholder="Enter your Password" onChange={(event) => {
          updatePassword(event.target.value)
          showWPAlert(false);
          showAlert(false);
        }} ></input>
        {/* <i style={{margin: '10px 0px 20px 0px',padding: '15px 10px 10px 10px',cursor: 'pointer',background:'rgba(232,240,254,255)', borderRadius:'0px 5px 5px 0px', border:'none'}} className="far fa-eye" onClick={showpassword}></i>
         */}
        {showPassword &&<i className="fas fa-eye-slash" id='showpwd' onClick={showpassword}></i>}
        {!showPassword && <i className="fas fa-eye" id='showpwd' onClick={showpassword}></i>}
        </div>
        {alert && <p>Please Fill All The Fields!</p>}
        {WPalert && <p>Wrong Password!</p>}
        {WUalert && <p>No Such User Account Found!</p>}
        <a onClick={(event) => {
            event.preventDefault()
            props.forgotpassword()
        }}>Forgot password?</a>
        <button onClick={(event) => {
          event.preventDefault()
          onLogin();
        }}>LOGIN</button>
      </form>
    </div>
  )
}

export default Login
