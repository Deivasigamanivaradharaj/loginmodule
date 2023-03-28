import React, { useContext, useState } from 'react'
import { getDatabase, ref, child, get, update } from "firebase/database";
import app from '../Firebase';
import UserContext from './UserContext';

function CreatePassword(props) {

  let context = useContext(UserContext);
  let Userid=context.UserId;
  let imageUrl = require(".//back-button.png")
  let [NewPassword, updateNewPassword] = useState("")
  let [ConfirmPassword, updateConfirmPassowrd] = useState("")
  let[alert,showAlert] = useState(false)
  let[matchalert,showMatchAlert] = useState(false)

  const dbRef = ref(getDatabase(app));

  function onCreatePassword(){
    if(NewPassword==="" || ConfirmPassword==="")
    {
      showAlert(true)
    }
    else
    {
      if(NewPassword===ConfirmPassword)
      {
        console.log("password changed")
        get(child(dbRef, `USERS/StaffLogin/${Userid}`)).then((data) => {
          if (data.exists()) {
            update(child(dbRef,`USERS/StaffLogin/${Userid}` ),{
              Password:NewPassword
            }).catch((error) => {
            console.error(error);
          });
          } else {
            get(child(dbRef, `USERS/StuddentLogin/${Userid}`)).then((data) => {
              if (data.exists()) {
                update(child(dbRef,`USERS/StuddentLogin/${Userid}` ),{
                  Password:NewPassword
                }).catch((error) => {
                console.error(error);
              });
                }
              else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
          }
        }).catch((error) => {
          console.error(error);
        });
      }
      else{
        showMatchAlert(true)
      }
    }
  }

  return (
    <div className='createpasswordcontainer'>
      <div className='Header'>
      <a className='backbutton' onClick={(event) => {
            event.preventDefault();
            props.onCanceltoFP();
        }}><img src={imageUrl} height='30px' alt='Back'></img></a>
      <h1>CREATE PASSWORD</h1>
      </div>
        <input type={'password'} placeholder="Enter new password" onChange={(event) => {
          updateNewPassword(event.target.value)
          showAlert(false);
          }}></input>
        <input type={'password'} placeholder="Confirm password" onChange={(event) => {
          updateConfirmPassowrd(event.target.value)
          showAlert(false);
          showMatchAlert(false);
          }}></input>
        {alert && <p>Please Fill All The Fields!</p>}
        {matchalert && <p>Password and Confirm password do not match!</p>}
        <button onClick={(event) => {
          event.preventDefault()
          onCreatePassword()
          props.onCanceltoFP();
        }}>CREATE PASSWORD</button>
    </div>
  )
}

export default CreatePassword
