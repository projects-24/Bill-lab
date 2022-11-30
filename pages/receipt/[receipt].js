import logo from "../../components/logo";
import Nav from "../../components/navBar";
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import Axios from 'axios';
import endpoint from "../../database/endpoint";


const Receipt = () => {
    const [nav, setnav] = useState(true)
    const router = useRouter()
    const {receipt} = router.query
    const [patient, setpatient] = useState(null)
    useEffect(()=>{
      Axios.get(endpoint + "/patients")
      .then(docs=>{
        console.log(docs.data)
        docs.data.filter(doc=>{
          if(doc.id === receipt){
            setpatient(doc)
          }
        })
      }).catch(err=>alert(err.message))
    })
    const handlePrint = ()=>{
   new Promise((resolve, reject) => {
    setnav(false)
    setTimeout(() => {
      window.print() 
      resolve()
    }, 1000);
   }).then(()=>setnav(true))
    }
    if(patient){
    return ( 
        <div className="content">
         {
            nav ?
            <Nav />
            : ""
         }
            <div className="receipt" onClick={handlePrint}>
          <p className="row-flex space-between">
          <div className="h1">{logo}</div>
          <div class="text-bold">
          {patient.day} / {patient.month} / {patient.year}
          </div>
          </p>
                <p>
                    <div className="h4">{patient.customer}</div>
                    <p className="text-bold">{patient.contact}</p>
                </p>
                <p>
                <table className="table margin-top-30 margin-bottom-30">
            <thead>
              <th>patient</th>
              <th>Test</th>
              <th>Price</th>
              <th>Attendant</th>
            </thead>
            <tbody>
                <tr>
                    <td>{patient.fullName}</td>
                    <td>{patient.test.join(" , ") }</td>
                    <td>{patient.price}</td>
                    <td>{patient.attendant}</td>
                </tr>
            </tbody>
          </table>
                </p>
                <p className="margin-top-40 row-flex space-between">
                <div>
                <div className="row-flex">
                        <div className="margin-right-10 line-through text-bold">
                            GHC {patient.realPrice}.00
                        </div> 
                        <div className="h4">GHC {patient.price}.00</div>
                    </div>
                </div>
                <div>
                <div className="signature">
    {/* <img src="/img/signature.png" className="sigImage" alt="" /> */}
</div>
<div className="certNormal text-bold">Signature</div>
</div>
                </p>
            </div>
        </div>
     );
        }else{
          return ""
        }
}
 
export default Receipt;