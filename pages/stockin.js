import Nav from "../components/navBar";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Axios from "axios";
import { useState } from "react";
import endpoint from "../database/endpoint";

const Stockin = () => {
    const form = useRef(null)
  const [products, setproducts] = useState("");
  const [productExist, setproductExist] = useState(false)
  const [existProduct, setexistProduct] = useState("")
  const [selectedProduct, setselectedProduct] = useState(null)

  useEffect(() => {
  Axios.get(endpoint + '/products').then((data) => {
      setproducts(data.data);
    });
  });

  useEffect(()=>{
    Axios.get(endpoint + "/stock")
    .then(docs=>{
      docs.data.filter(doc=>{
        if(doc.product === selectedProduct){
          setproductExist(true)
          setexistProduct(doc)
        }
      })
    }).catch(err=>alert(err.message))
  })
  const stockProduct = (e)=>{
    e.preventDefault()
    const current = form.current
    const date = current["date"].value
    const product = current["product"].value
    const quantity = parseInt(current["number"].value)
    const wholeSale = current["wholesale"].value
    let id = ""
    const retail = current["retail"].value
    const data = {date:date, product:product, quantity: productExist ? quantity + parseInt(existProduct.quantity) : quantity, wholeSale:wholeSale, retail:retail}
   
    if(date && product && quantity && wholeSale && retail){
        if(productExist){
          Axios.patch(endpoint + "/stock/" + existProduct.id, data)
        .then(()=>{
            alert("sucessfully Restocked product")
            window.location.reload()
        })
        .catch(err=>alert(err.message))
        }else{
          Axios.post(endpoint + "/stock", data)
        .then(()=>{
            alert("sucessfully stockin product")
            window.location.reload()
        })
        .catch(err=>alert(err.message))
        }
    }else{
        alert("Make sure to enter all details")
    }
  }
  return (
    <div>
      <div className="addHome">
        <Nav />
        <form ref={form}>
        <div className="row container">
        <div className="col sm-12 md-6 lg-6 padding">
            <img src="/stock.svg" className="fit" alt="" />
        </div>
        <div className="col sm-12 md-6 lg-6">
        <div className="width-500-max center">
            <div className="padding">
                <div className="h1">
                    In - Stock Form
                </div>
                <div>
                    Add a new product to your collection
                </div>
            </div>
            <div className="row">
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input card" name="date" type="date" placeholder="DATE" />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <select className="input card" name="product" type="text" placeholder="PRODUCT NAME" onChange={(e)=>setselectedProduct(e.target.value)}>
                    <option value="">-- PRODUCT NAME --</option>
                    {
                        products &&
                        products.map(doc=>(
                            <option  key={doc.id} value={doc.product}>{doc.product}</option>
                        ))
                    }
                </select>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input card" name="number" type="number" placeholder="QUANTITY" />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <input className="input card" name="wholesale" type="number" placeholder="WHOLESALE PRICE" />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <input className="input card" name="retail" type="number" placeholder="RETAIL PRICE" />
                </div>
                {/* <div className="col sm-12 md-12 lg-12 padding">
                <input className="input card" name="total" type="number" placeholder="TOTAL AMOUNT" />
                </div> */}
                <div className="col sm-12 md-6 lg-6 padding">
                <button className="primaryBtn btn full-width" onClick={stockProduct}>
                MAKE CHANGES
               </button>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <Link href="/">
                    <div className="outlineBtn full-width">
                   <i className="icon-chart"></i>  Back to DashBoard
                   </div>
                    </Link>
                </div>
            </div>
    
        </div>
        </div>
      </div>
        </form>
      </div>
    </div>
  );
};

export default Stockin;
