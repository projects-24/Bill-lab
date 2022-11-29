import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '../components/navBar'
import React, { PureComponent, useState } from 'react';
import endpoint from '../database/endpoint';
import { useEffect, useRef } from 'react';
import Axios from "axios"


export default function Home() {
  const [gottenData, setgottenData] = useState(false)
  const [year, setyear] = useState("")
  const [month, setmonth] = useState("")
  const [day, setday] = useState("")
  const [Docs, setDocs] = useState([])
  const [patients, setpatients] = useState([])
  const [currentData, setcurrentData] = useState([])
  const [myarr, setmyarr] = useState([])
  const [todayArr, settodayAarr] = useState([])
  const [todayPrice, settodayPrice] = useState([])
  const [todayData, settodayData] = useState([])
  const [showPrint, setshowPrint] = useState(false)
  const [currentPrice, setcurrentPrice] = useState("")
  const [filter, setfilter] = useState("")
  const [print, setprint] = useState(false)
  const form = useRef(null)

 



  const filTerData = ()=>{
    new Promise((resolve, reject)=>{
      setcurrentPrice(0)
      setmyarr([])
      setDocs([])
      setcurrentData([])
      resolve()
    }).then(()=>{
    if(patients){
      const formInit = form.current
      setday(formInit["day"].value)
      setmonth(formInit["month"].value)
      setyear(formInit["year"].value)
      let Type = formInit["type"].value
      setfilter(Type)
      patients.filter(filtData =>{
        if(
        Type === "daily" ? 
        filtData.day.toString() === formInit["day"].value.toString() && filtData.month.toString() === formInit["month"].value.toString()  && filtData.year.toString() === formInit["year"].value.toString()
        : Type === "monthly" ? filtData.month.toString() === formInit["month"].value.toString()  && filtData.year.toString() === formInit["year"].value.toString()
        : Type === "yearly" ? filtData.year.toString() === formInit["year"].value.toString()
        : ""
        ){
          currentData.push(filtData)
          myarr.push(filtData.price)
          setcurrentPrice(myarr.reduce((a,b)=> a + b ,0))
          setDocs(currentData)
        }
      })
    }
          
  })
  }
 const [gottenToday , setgottenToday] = useState(false)
  useEffect(()=>{
 if(gottenData && !gottenToday){
  patients.filter(filtDocs=>{
    if(filtDocs.day === new Date().getDate() && filtDocs.month === new Date().getMonth() + 1 && filtDocs.year === new Date().getFullYear()){
      todayArr.push(filtDocs.price)
      settodayPrice(todayArr.reduce((a,b)=> a + b , 0))
      setgottenToday(true)
    }
  })
 }
  })

  useEffect(()=>{
    if(!gottenData){
      Axios.get(endpoint + "/patients")
      .then(docs=>{
        setpatients(docs.data)
        setgottenData(true)
        filTerData()
      }).catch(err=>alert(err.message))
    }
  })


const handlePrint = ()=>{
  new Promise((resolve, reject) => {
      setprint(true)
      resolve()
  }).then(()=>{
      window.print()
      setprint(false)
  })

}

 if(patients){
  return (
    <div className='content'>
      {
        showPrint &&
        <div className="print">
        <div className="printContent">
          {
            !print ?
            <div className='section'>
            <button className="button text-white success" onClick={handlePrint}>
             <i className="icon-printer" /> Print data
              
               </button>
            <button className="button danger text-white" onClick={()=>{
             setshowPrint(false)
            }}>
               Cancel
               </button>
               </div>
               :""
          }
            <div className='section h4'>
          patients for <span className="text-bold h4"> 
          {
            filter === "daily" ? <span className="text-bold h4">{day} / {month} / {year}</span> :
            filter === "monthly" ? <span className="text-bold h4">{month} / {year}</span> :
            filter === "yearly" ? <span className="text-bold h4">{year}</span> :
            ""

          }
          </span>
          </div>
        <table className="table stripped border">
                <thead>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Test</th>
                  <th>Price</th>
                  <th>date</th>
                  <th>Attendant</th>
                </thead>
                <tbody>
                  {
                    Docs.map(docs=>(
                      <tr key={docs.id}>
                        <td>{docs.fullName}</td>
                        <td>{docs.contact}</td>
                        <td>{docs.test}</td>
                        <td>{docs.price}</td>
                        <td>{docs.day} / {docs.month} / {docs.year}</td>
                        <td>{docs.attendant}</td>
                      </tr>
                    ))
                  }
                  
                </tbody>
              </table>
          </div>
        </div>
      }
      
      <Nav />
      <div className='width-700-max center'>
        <div className="padding">
        <div className='section'>
        <div className="h1">DashBoard and Analytics</div>
        <div className='section text-bold'>
          Check your daily and monthly patients
        </div>
      </div>

      <div className="row-flex space-between">
        <div className="h4">
          Overview
        </div>
       <div className='row-flex outlineBtn' onClick={()=>setshowPrint(true)}>
        <i className="icon-cloud-download"></i>  <span>Download Data</span>
        </div>
      </div>
      <div className='section'>
        <form ref={form}>
        <div className="row">
       <div className="col sm-4 md-4 lg-4">
        <div className="text-bold">Day</div>
        <select name="day" id="" defaultValue={new Date().getDate()} className='input' onChange={()=>{
          filTerData()
        }}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        </select>
        </div>
        <div className="col sm-4 md-4 lg-4 padding-right-10 padding-left-10">
        <div className="text-bold">Month</div>
        <select name="month" id="" defaultValue={new Date().getMonth() + 1} className='input'  onChange={()=>{
          filTerData()
        }}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        </div>
        <div className="col sm-4 md-4 lg-4">
        <div className="text-bold">Year</div>
        <select name="year" id="" defaultValue={new Date().getFullYear()} className='input'  onChange={()=>{
          filTerData()
    
        }}>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
        </select>
        </div>
        <div className="col sm-12 lg-12 md-12">
        <div className='section'>
        <select name="type" id="" className="input" onChange={(e)=>{
            filTerData()
          }}>
            <option value="">SELECT SEARCH TYPE</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        </div>

       </div>
        </form>
      </div>
        </div>
      <div className="row section2">
        <div className="col sm-12 md-6 lg-6 padding">
        <div className='analyticsCard cards'>
         <div className="cardContent">
         <div className="text-bold">Number Of Patients</div>
            <div className='h4'>
              {Docs.length}
            </div>
         </div>
          </div>
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <div className='analyticsCard cards'>
         <div className="cardContent">
         <div className="text-bold">Amount Gotten</div>
            <div className="">
            <div className='h4'><span>GHC</span> {currentPrice}</div>
            {/* <div className="text-small padding-left-10">
            45  <i className="icon-arrow-up text-green"></i>
            </div> */}
            </div>
         </div>
          </div>
        </div>
        {/* <div className="col sm-12 md-4 lg-4 padding">
        <div className='analyticsCard cards'>
         <div className="cardContent">
         <div className="text-bold">Daily patients</div>
            <div className="row-flex">
            <div className='h4'>
              {todayPrice}
            </div>
            <div className="text-small padding-left-10">
            45  <i className="icon-arrow-down text-red"></i>
            </div>
            </div>
         </div>
          </div>
        </div> */}
  
      </div>
{/*    
      <div style={{overflowX:"auto"}} className="card">

        <BarChart
          width={700}
          height={300}
          data={Docs}

        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#82CD47" />
          <Bar dataKey="year" fill="#579630" />
        </BarChart>
      </div> */}
      </div>
    
    </div>
  )
 }else{
  return ""
 }
}
