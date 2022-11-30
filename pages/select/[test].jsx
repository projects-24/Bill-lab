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
const [selectItems, setselectItems] = useState([])
const [allTest, setallTest] = useState([])
const [prices, setprices] = useState([])
const [price, setprice] = useState(0)
const [filter, setfilter] = useState("")
const [discountPrice, setdiscountPrice] = useState(0)

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
Axios.patch(endpoint + "/patients/" + test , 
{realPrice :parseInt(price), price: parseInt(discountPrice), test:allTest}
)
.then(()=>{
setmessage("Success")
setopenSnackbar(true)
window.location.assign("/receipt/" + test)
})
.catch(err=>alert(err.message))
}else{
setmessage("Make sure to select a test")
setopenSnackbar(true)
}
}

const handleTest = (e)=>{
    setfilter(e.target.value)
Axios.get(endpoint + "/tests/" + e.target.value)
.then(doc=>{
    new Promise((resolve, reject) => {
        setselected(doc.data)
    selectItems.push({price:doc.data.price , test:doc.data.test})
    allTest.push(doc.data.test)
    prices.push(parseInt(doc.data.price))
     setprice(prices.reduce((a,b)=> a + b , 0))
     resolve()
    }).then(()=>{
        setdiscountPrice((prices.reduce((a,b)=> a + b , 0) * 90) / 100)
    })

})

}

const Cancel = (doc)=>{
    new Promise((resolve, reject) => {
    setprice(price - parseInt(doc.price))
        resolve()
}).then(()=>setdiscountPrice((price * 90) / 100))
}

const reSelect = ()=>{
    setselectItems([])
    setallTest([])
    setprice(0)
    setprices([])
    setdiscountPrice(0)
    document.querySelector("#test").value = ""
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
                    <div className="row-flex">
                        <div className="margin-right-10 line-through text-bold">
                            GHC {price}.00
                        </div> 
                        <div className="h4">GHC {discountPrice}.00</div>
                    </div>
                }
                {
                    selectItems ?
                <div className="section row">
                {
                    selectItems
                    .map((doc)=>(
                        <div className="tab">
                        {doc.test}
                         {/* <i className="icon-close" onClick={()=>Cancel(doc)}></i> */}
                        </div>
                    ))
                }
                </div>
                :""
                }
            <div className="section2">
                <div className="row-flex">
                    <div className="">
                    <select className="input width-200-min" id="test" type="text" placeholder="User Name" onChange={handleTest} >
                    <option value="">SELECT TEST</option>
                    {
                        Docs ?
                        Docs.filter(filtdocs=>{
                            if(filter === ""){
                                return selectItems
                            }else if(filter.toString().trim().toLowerCase() !== filtdocs.test.toString().trim()){
                                return filtdocs
                            }
                        }).map(doc=>(
                            <option value={doc.id} key={doc.id} > {doc.test} </option>
                        ))
                        :""
                    }
                </select>        
                    </div>
                    <div className="">
                <button className="button info text-white" onClick={reSelect}> Reselect </button>
                    </div>
                </div>
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