import Nav from "../../components/navBar";
import { useState,useEffect } from 'react';
import Axios from 'axios';
import endpoint from "../../database/endpoint";

export default function User(){
const [User , setUser] = useState("")
const [password , setpassword] = useState("")
const [openSnackbar, setopenSnackbar] = useState(false)
const [message , setmessage] = useState("")
const [Docs, setDocs] = useState("")

useEffect(() => {
    setTimeout(()=>{
        setopenSnackbar(false)
    } ,2000)
}, [openSnackbar])


useEffect(() => {
if(!Docs){
Axios.get(endpoint + "/users")
.then(docs=>{
setDocs(docs.data)
}).catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})
}
})

const addUser = ()=>{
if(User){

Axios.post(endpoint + "/users", {user:User, password:password})
.then(()=>{
setopenSnackbar(true)
setmessage("User added successfully")
document.querySelector("#user").value = ""
document.querySelector("#password").value = ""

})
.catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})

}else{
alert("Make sure to enter the name of your User")
}
}

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
            <div className="row container">
        <div className="col sm-12 md-6 lg-6 padding">
            <img src="/doctors.svg" className="fit" alt="" />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <div className="width-500-max center">
            <div>
                <div className="h1">
                    Create new User
                </div>
                <div className="text-bold">
                    Add a new User
                </div>
            </div>
            <div className="section2">
                <input className="input" id="user" type="text" placeholder="User Name" onChange={(e)=>setUser(e.target.value)} />
            </div>
            <div className="section2">
                <input className="input" id="password" type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
            </div>
            <div>
            <button className="primaryBtn btn full-width" onClick={addUser}>
                Add User
            </button>
            </div>
        </div>
        </div>
      </div>
            </div>
        </div>
    </div>
)
}