import Nav from "../../components/navBar";
import { useState,useEffect } from 'react';
import Axios from 'axios';
import endpoint from "../../database/endpoint";

export default function Test(){
const [test , settest] = useState("")
const [price , setprice] = useState("")
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
Axios.get(endpoint + "/tests")
.then(docs=>{
setDocs(docs.data)
}).catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})
}
})

const addTest = ()=>{
if(test){

Axios.post(endpoint + "/tests", {test:test, price:price, date:new Date()})
.then(()=>{
setopenSnackbar(true)
setmessage("test added successfully")
document.querySelector("#test").value = ""
document.querySelector("#price").value = ""

})
.catch(err=>{
setopenSnackbar(true)
setmessage(err.message)
})

}else{
alert("Make sure to enter the name of your test")
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
            <img src="/medicine.svg" className="fit" alt="" />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <div className="width-500-max center">
            <div>
                <div className="h1">
                    Create new test
                </div>
                <div className="section text-bold">
                    Add a new test
                </div>
            </div>
            <div className="section2">
                <input className="input" id="test" type="text" placeholder="Test Name" onChange={(e)=>settest(e.target.value)} />
            </div>
            <div className="section2">
                <input className="input" id="price" type="number" placeholder="Price" onChange={(e)=>setprice(e.target.value)} />
            </div>
            <div>
            <button className="primaryBtn btn full-width" onClick={addTest}>
                Add Test
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