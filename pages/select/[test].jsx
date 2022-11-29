import Nav from "../../components/navBar";
import { useState,useEffect } from 'react';
import Axios from 'axios';
import endpoint from "../../database/endpoint";
import { useRouter } from 'next/router';

export default function User(){
    const router = useRouter()
    const {test} = router.query
const [User , setUser] = useState("")
const [password , setpassword] = useState("")
const [openSnackbar, setopenSnackbar] = useState(false)
const [message , setmessage] = useState("")
const [Docs, setDocs] = useState("")
const [selected, setselected] = useState("")

useEffect(() => {
    setTimeout(()=>{
        setopenSnackbar(false)
        clearTimeout()
    } ,3000)
}, [openSnackbar])


useEffect(() => {
if(!Docs){
Axios.get(endpoint + "/tests")
.then(docs=>{
setDocs(docs.data)
}).catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})
}
})

const makeChanges = ()=>{
if(selected){
Axios.patch(endpoint + "/patients/" + test , {price:parseInt(selected.price) , test:selected.test})
.then(()=>{
setmessage("Success")
setopenSnackbar(true)
window.location.assign("/register")
})
.catch(err=>alert(err.message))
}else{
setmessage("Make sure to select a test")
setopenSnackbar(true)
}
}

const handleTest = (e)=>{
Axios.get(endpoint + "/tests/" + e.target.value)
.then(doc=>setselected(doc.data))
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
            <img src="/care.svg" className="fit" alt="" />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <div className="width-500-max center">
            <div>
                <div className="h1 section">
                Select patient test
                </div>
                <div className="text-bold">
                    Make sure to select the appropraite test for the patient
                </div>
            </div>
            <div className="padding-top-20">
                {
                    <div className="h4">
                        GHC {selected ? selected.price : ""}.00
                    </div>
                }
            <div className="section2">
                <select className="input" id="user" type="text" placeholder="User Name" onChange={handleTest} >
                    <option value="">SELECT TEST</option>
                    {
                        Docs ?
                        Docs.map(doc=>(
                            <option value={doc.id} key={doc.id} > {doc.test} </option>
                        ))
                        :""
                    }
                </select>
            </div>
            <div>
            <button className="primaryBtn btn full-width" onClick={makeChanges}>
             Make Changes
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