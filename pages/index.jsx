import { useState,useEffect } from 'react';
import Axios from 'axios';
import endpoint from "../database/endpoint"
export default function Home() {
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const [Docs, setDocs] = useState(null)
  const [openSnackbar, setopenSnackbar] = useState(false)
  const [message , setmessage] = useState("")
  const [authenticate, setauthenticate] = useState(false)
  const [admin, setadmin] = useState(null)
  const [isAdmin, setisAdmin] = useState(false)
  const [adminPassword, setadminPassword] = useState("")

  useEffect(() => {
    setTimeout(()=>{
        setopenSnackbar(false)
    } ,2000)
}, [openSnackbar])


  //get all users
  useEffect(() => {
    if(!Docs){
    Axios.get(endpoint + "/users")
    .then(docs=>{
    setDocs(docs.data)
    console.log(docs.data)
    }).catch(err=>{
    setopenSnackbar(true)
    setmessage(err.message)
    })
    }
    })

useEffect(() => {
if(authenticate && Docs){
  if(!isAdmin){
    Docs.filter(doc=>{
      if(doc.user === userName && doc.password === password){
        new Promise((resolve, reject) => {
          localStorage.setItem("user" , JSON.stringify({user:userName , isAdmin:false}))
          resolve()
        }).then(()=>window.location.assign("/dashboard"))
      }else{
        setmessage("Invalid username or password")
        setopenSnackbar(true)
        setauthenticate(false)
      }
      })
  }else{
        new Promise((resolve, reject) => {
          localStorage.setItem("user" , JSON.stringify({user:userName , isAdmin:isAdmin}))
          resolve()
        }).then(()=>window.location.assign("/dashboard"))
  }
}
})

    useEffect(() => {
      if(!admin){
        Axios.get(endpoint + "/admin")
        .then(doc=>{
          setadmin(doc.data)
          setadminPassword(doc.data.password)
        })
        .catch(err=>alert(err.message))
      }
    })
    
    

  // add user
  const handleLogin = ()=>{
    setisAdmin(false)
    if(userName && password){
      if(userName === "admin"){
        if(adminPassword === password){
          setauthenticate(true)
          setisAdmin(true)
        }else{
          setmessage("Invalid username or password")
          setopenSnackbar(true)
        }
      }else{
        //not admin
        setauthenticate(true)
        setisAdmin(false)
      }
    }else{
      alert("Make sure to enter your email and password")
    }
  }

  return (
    <div className='homeContainer'>
        {
            openSnackbar ?
            <div className="snack">
                {message}
            </div>
            :""
        }
      <div className="formContainer">
        <div className="row">
          <div className="col sm-12 md-4 lg-4 padding">
            <img src="/auth.svg" className='fit' alt="" />
          </div>
          <div className="col sm-12 md-8 lg-8 padding">
            <div className="width-400-max fit">
            <div className="h1">
              Login Account
            </div>
            <div className="text-bold">Enter a valid username and password.</div>
            <div className="padding-top-20">
              <div className="section">
                <input type="text" placeholder='USERNAME' className="input" onChange={(e)=>setuserName(e.target.value)}/>
              </div>
              <div className="section">
                <input type="password" placeholder='PASSWORD' className="input" onChange={(e)=>setpassword(e.target.value)}/>
              </div>
              <div className="section">
            <button className='button primaryBtn full-width' onClick={handleLogin}>Login Account</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
