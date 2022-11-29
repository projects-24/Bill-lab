import Nav from "./../components/navBar";
import { useState,useEffect } from 'react';
import Axios from 'axios';
import endpoint from "./../database/endpoint";

export default function Register(){
const [openSnackbar, setopenSnackbar] = useState(false)
const [message , setmessage] = useState("")
const [Docs, setDocs] = useState("")
const [name, setname] = useState("")
const [nhis, setnhis] = useState("")
const [contact, setcontact] = useState("")
const [labNumber, setlabNumber] = useState("")
const [user, setuser] = useState(null)

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
    setTimeout(()=>{
        setopenSnackbar(false)
    } ,2000)
}, [openSnackbar])


useEffect(() => {
if(!Docs){
Axios.get(endpoint + "/patients")
.then(docs=>{
setDocs(docs.data)
}).catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})
}
})

const registerUser = ()=>{
    const today = new Date()
    const day = today.getDate() 
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const identify = contact + time

if(name && contact && nhis && labNumber){
Axios.post(endpoint + "/patients", 
{fullName:name,
contact:contact,
nhis:nhis, 
labNumber: labNumber, 
price:0,    
day:day,
month:month,
year:year,
time:time,
identify:identify,
id:identify,
attendant:user.user,
test:""
})
.then(()=>{
new Promise((resolve, reject) => {
setopenSnackbar(true)
setmessage("User successfully rgistered")
resolve()
}).then(()=>{window.location.assign(`/select/${identify}`)})
})
.catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})

}else{
    setopenSnackbar(true)
    setmessage("Make sure to enter all credentials")
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
        <div className="col sm-12 md-4 lg-4 padding">
            <img src="/medicine.svg" className="fit" alt="" />
        </div>
        <div className="col sm-12 md-8 lg-8 padding">
        <div className="">
            <div className="padding">
                <div className="h1">
                    Register patient
                </div>
                <div className="text-bold">
                    Register a new patient.
                </div>
            </div>
            
            <div className="row">
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input" id="fullname" type="text" placeholder="Full Name" onChange={(e)=>setname(e.target.value)} />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input" id="nhis" type="text" placeholder="NHIS Number" onChange={(e)=>setnhis(e.target.value)} />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input" id="contact" type="text" placeholder="Contact" onChange={(e)=>setcontact(e.target.value)} />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input" id="labnumber" type="text" placeholder="Lab number" onChange={(e)=>setlabNumber(e.target.value)} />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <button className="primaryBtn btn full-width" onClick={registerUser}>
                Register
            </button>
                </div>
            </div>
        </div>
        </div>
      </div>
            </div>
        </div>
    </div>
)
}