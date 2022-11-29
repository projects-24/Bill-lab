import Nav from "../components/navBar";
import { useEffect,useState } from 'react';
import Link from "next/link";
import endpoint from "../database/endpoint";
import Axios from 'axios';
import Modal from '../Funcss/Components/Modal';
import Modalcontent from '../Funcss/Components/Modalcontent';
import Modalaction from '../Funcss/Components/Modalaction';
import Modalheader from '../Funcss/Components/Modalheader';
import Typography from '../Funcss/Components/Typography';
import Button from '../Funcss/Components/Button';
import { useRef } from 'react';

const Tests = () => {
    const [tests, settests] = useState([])
    const [test, settest] = useState([])
    const [modal, setmodal] = useState(false)
    const [modifyModal, setmodifyModal] = useState(false)
    const [gettests, setgettests] = useState(true)
    const [filter, setfilter] = useState("")
    const [search, setsearch] = useState("")
    const form = useRef(null)
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
        if(gettests){
            Axios.get(endpoint + '/tests').then((data) => {
                settests(data.data);
                setgettests(false)
              });
        }
        });
        const handleModify = (doc)=>{
          if(user.isAdmin){
            settest(doc)
            setmodifyModal(true)
        }else{
          alert("only admin is allowed")
        }
      }
        const handleDelete = (doc)=>{
        if(user.isAdmin){
          settest(doc)
          setmodal(true)
        }else{
          alert("only admin is allowed")
        }
        }
        const Delete = ()=>{
            Axios.delete(endpoint + "/tests/" + test.id)
            .then(()=>{
                alert(test.test + " successfully deleted")
                setgettests(true)
                setmodal(false)
            })
            .catch(err=>alert(err.message))
        }
        const Modify = ()=>{
            const current = form.current
            const getTest = current["test"].value
            const price = current["price"].value
            const data = {test:getTest, price:price}
            if(price && test){
                Axios.patch(endpoint + "/tests/" + test.id, data)
                .then(()=>{
                  alert("sucessfully updated")
                  setmodifyModal(false)
                  setgettests(true)
                })
                .catch(err=>alert(err.message))
            }else{
                alert("Make sure to enter all details")
            }
        }
    return ( 
        <div className="content">
            <Modal animation="ScaleUp" duration={1} open={modal}>
<Modalheader>
<Typography text={`Delete ${test.test}`} heading="h4"/>
</Modalheader>
<Modalcontent>
<div className="h5 padding">
    Are you sure you want to delete {test.test}
</div>
</Modalcontent>
<Modalaction funcss="text-right">
<Button color="white" bg="danger" onClick={Delete}>DELETE</Button>
<Button color="white" bg="info" onClick={()=>setmodal(false)}>Cancel</Button>
</Modalaction>
</Modal>
<Modal animation="ScaleUp" duration={1} open={modifyModal}>
<Modalheader>
<Typography text={test.test} heading="h4"/>
</Modalheader>
<Modalcontent>
<form ref={form}>
<div className="row">
    <div className="col sm-12 md-6 lg-6 padding">
    <div className="text-bold">Test Name</div>
    <input className="input" name="test" type="text" placeholder="Enter test name" defaultValue={test.test} />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
    <div className="text-bold">Price</div>
    <input className="input" name="price" type="number" placeholder="Enter test price" defaultValue={test.price}/>
    </div>
    </div>
</form>
</Modalcontent>
<Modalaction funcss="text-right">
<Button color="white" bg="success" onClick={Modify}>Make changes</Button>
<Button color="white" bg="danger" onClick={()=>setmodifyModal(false)}>Cancel</Button>
</Modalaction>
</Modal>
            <Nav />
              <div className="width-800-max center">
        <div className="padding">
         <div className="row-flex space-between">
         <div className="h1">Manage All Tests</div>

         </div>
          <div className="section text-bold">Check all test and manage tests</div>
        </div>
        <div className="section2">
            <div className="row">
                <div className="col sm-12 md-6 lg-6 padding">
            <input type="text"  className="input" placeholder="TEST" onChange={(e)=>setsearch(e.target.value)}/>
                </div>
                {/* <div className="col sm-12 md-6 lg-6 padding"  onChange={(e)=>setfilter(e.target.value)}>
                    <select name="" id="" className="input" defaultValue="In Stock">
                        <option value="">Filter</option>
                        <option value="In Stock">In Stock</option>
                        <option value="All tests">All tests</option>
                    </select>
                </div> */}
            </div>
        </div>
        <div className="padding">
          <table className="table card text-center">
            <thead>
              <th>Test</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {
                tests && 
                tests.filter(filtdocs=>{
                    if(search){
                      if(search.toString().trim().toLowerCase().includes(filtdocs.test.toString().trim().toLowerCase().slice(0, search.length))){
                        return filtdocs
                      }
                    }else{
                      return tests
                    }
                  }).map(docs=>(
                  <tr  key={docs.id}>
                    <td>{docs.test}</td>
                    <td>{docs.price}</td>
                    <td>
                    <button className="btn primaryBtn"  onClick={()=>handleModify(docs)}>
                            Modify <i className="icon-cursor"></i>
                        </button>
                    </td>
                    <td>
                    <button className="btn red text-white" onClick={()=>handleDelete(docs)}>
                            Delete <i className="icon-trash"></i>
                        </button>
                    </td>
                  </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>
      </div>
        </div>
     );
}
 
export default Tests;