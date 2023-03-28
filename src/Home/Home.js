import './Home.css'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import { getDatabase, ref, child, get } from "firebase/database";
import app from '../Firebase';

function Home() {

    let [Name,setName] = useState("")
  let Context = useContext(AuthContext)
  const dbRef = ref(getDatabase(app));

  useEffect(()=>{
    get(child(dbRef, `USERS/StaffLogin/${Context.Userid}`)).then((data) => {
      if (data.exists()) {
        setName(data.val().Name)
      } else {
        get(child(dbRef, `USERS/StuddentLogin/${Context.Userid}`)).then((data) => {
          if (data.exists()) {
            setName(data.val().Name)
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  return (
    <div className='homecontainer'>
      <h1>{Name}</h1>
    </div>
  )
}

export default Home
