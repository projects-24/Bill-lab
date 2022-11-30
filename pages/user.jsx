import Nav from "../components/navBar";
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import endpoint from "../database/endpoint";
export default function User(){
const [User , setUser] = useState("")
const [password , setpassword] = useState("")
const [openSnackbar, setopenSnackbar] = useState(false)
const [message , setmessage] = useState("")
const [Docs, setDocs] = useState("")
const [user, setuser] = useState(null)
const [currentUser, setcurrentUser] = useState(null)
const form = useRef(null)
useEffect(() => {
    setTimeout(()=>{
        setopenSnackbar(false)
    } ,2000)
}, [openSnackbar])


useEffect(()=>{
    if(!user){
      if(localStorage.getItem("user")){
      setuser(
        JSON.parse(localStorage.getItem("user"))
      )
      }else{
        window.location.assign("/")
      }
    }
  })

useEffect(() => {
if(!Docs && user){
Axios.get(endpoint + "/users")
.then(docs=>{
docs.data.filter((filtDocs)=>{
    if(user.user === filtDocs.user){
        setcurrentUser(filtDocs)
    }
})
}).catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})
}
})

const updateProfile = ()=>{
const current = form.current
const userName = current["user"].value
const password = current["password"].value
if(userName && password){
Axios.patch(endpoint + "/users/" + currentUser.id, {user:userName, password:password})
.then(()=>{
setopenSnackbar(true)
setmessage("Account Successfully updated")

})
.catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})

}else{
alert("Make sure to enter the name of your User")
}
}

if(currentUser){
    return(
        <div className="">
            <Nav />
            {
                openSnackbar ?
                <div className="snack">
                    {message}
                </div>
                :""
            }
            <div className="homeContainer">
                <div className="formContainer">
                <div className="row">
            <div className="col sm-12 md-4 lg-4 padding">
                <img src="/profile.svg" className="fit" alt="" />
            </div>
            <div className="col sm-12 md-8 lg-8 padding">
            <div className="width-500-max center">
                <div>
                    <div className="h1">
                        Edit Profile
                    </div>
                    <div className="text-bold section">
                        Change your username and password
                    </div>
                </div>
                <form ref={form}>
                <div className="section2">
                    <div className="text-bold">USERNAME</div>
                    <input name="user" className="input" defaultValue={currentUser.user} id="user" type="text" placeholder="User Name" onChange={(e)=>setUser(e.target.value)} />
                </div>
                <div className="section2">
                <div className="text-bold">PASSWORD</div>
                    <input name="password" className="input"  defaultValue={currentUser.password} id="password" type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
                </div>
                    </form>
                <button className="primaryBtn btn full-width" onClick={updateProfile}>
                    Update Profile
                </button>
                </div>
            </div>
            </div>
          </div>
                </div>
            </div>
    )
}else{
    return ""
}

}