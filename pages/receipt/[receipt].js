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
    const [product, setproduct] = useState(null)
    useEffect(()=>{
      Axios.get(endpoint + "/sales")
      .then(docs=>{
        console.log(docs.data)
        docs.data.filter(doc=>{
          if(doc.key === receipt){
            setproduct(doc)
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
    if(product){
    return ( 
        <div className="content">
         {
            nav ?
            <Nav />
            : ""
         }
            <div className="receipt card" onClick={handlePrint}>
          <p className="row-flex space-between">
          <div className="h1">{logo}</div>
          <div class="text-bold">
          {product.day} / {product.month} / {product.year}
          </div>
          </p>
                <p>
                    <div className="h4">{product.customer}</div>
                    <p className="text-bold">{product.contact}</p>
                </p>
                <p>
                <table className="table text-center">
            <thead>
              <th>Product</th>
              <th>Price</th>
            </thead>
            <tbody>
                <tr>
                    <td>{product.product}</td>
                    <td>{product.price}</td>
                </tr>
            </tbody>
          </table>
                </p>
                <p>
                <div className="h4">Total: GHC {product.price}</div>
                </p>
            </div>
        </div>
     );
        }else{
          return ""
        }
}
 
export default Receipt;