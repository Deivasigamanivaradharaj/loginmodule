import React, { useState } from 'react'
import { getDatabase, ref, child, get } from "firebase/database";
import app from '../Firebase';

function ForgotPassword(props) {

  let imageUrl = require(".//back-button.png") 
  let[Userid, updateUserId] = useState("")
  let[Aadhar, updateAadhar] = useState("")
  let[alert,showAlert] = useState(false)
  let[WAalert,showWAAlert] = useState(false)
  let[WAcalert,showWACAlert] = useState(false)

  const dbRef = ref(getDatabase(app));

  function onResetPassword(){
    if(Userid==="" || Aadhar==="")
    {
      showAlert(true)
    }
    else
    {
      get(child(dbRef, `USERS/StaffLogin/${Userid}`)).then((staffdata) => {
        if (staffdata.exists()) {
          if(Aadhar==staffdata.val().Aadhar){
            props.onChangePassword(Userid);
          }
          else{
            showWAAlert(true)
          }
        } else {
          get(child(dbRef, `USERS/StuddentLogin/${Userid}`)).then((studentdata) => {
            if (studentdata.exists()) {
              if(Aadhar==studentdata.val().Aadhar){
                props.onChangePassword(Userid);
              }
              else{
                showWAAlert(true)
              }
            } else {
              showWACAlert(true)
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
    <div className='forgotpasswordcontainer'>
      <div className='Header'>
      <a className='backbutton' onClick={(event) => {
            event.preventDefault();
            props.onCanceltoRP();
        }}><img src={imageUrl} style={{margin:'13px 0px 10px 0px'}} height='30px' alt='Back'></img></a>
      <h1>RESET PASSWORD</h1>
      </div>
        <input type={'text'} placeholder="Enter your User Id" onChange={(event) => {
          updateUserId(event.target.value)
          showAlert(false)
          showWACAlert(false)}}></input>
        <input type={'text'} placeholder="Enter Aadhar number" onChange={(event) => {
          updateAadhar(event.target.value)
          showAlert(false)
          showWAAlert(false)
        }}></input>
        {alert && <p>Please Fill All The Fields!</p>}
        {WAalert && <p>Wrong Aadhar number!</p>}
        {WAcalert && <p>No Such User Account Found!</p>}
        <button onClick={(event) => {
          event.preventDefault()
          onResetPassword()
        }}>RESET PASSWORD</button>
    </div>
  )
}

export default ForgotPassword
