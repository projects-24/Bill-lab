import Link from "next/link";
import { useEffect ,useState} from "react";
const Nav = () => {
  const [mode, setmode] = useState("")
  const [user, setuser] = useState(null)
 const getMode = ()=>{
  const lMode  = JSON.parse(localStorage.getItem("mode"))
    if(lMode === "black"){
      setmode("dark")
      document.documentElement.style.setProperty('--backgroundColor', 'black');
      document.documentElement.style.setProperty('--light', '#212223');
      document.documentElement.style.setProperty('--color', '#f1f1f1');
    }else{
      setmode("light")
      document.documentElement.style.setProperty('--backgroundColor', 'white');
      document.documentElement.style.setProperty('--light', '#f1f1f1');
      document.documentElement.style.setProperty('--color', '#black');
    }
  }


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
useEffect(()=>{
  getMode()
},[])

const handleMode = ()=>{
if(localStorage.getItem("mode")){
  const lMode  = JSON.parse(localStorage.getItem("mode"))
if(lMode === "black"){
  localStorage.setItem("mode" , 
  JSON.stringify("white")
  )
  getMode()
}else{
  localStorage.setItem("mode" , 
  JSON.stringify("black")
  )
  getMode()
}
}
}

const logOut = ()=>{
  if(localStorage.getItem("mode")){
    new Promise((resolve, reject) => {
      localStorage.removeItem("user")
      resolve()
    }).then(()=>window.location.assign("/"))
  }
}

if(user){
  return ( 
    <div>
            <div className="navigationBar">
    <div>
      <Link href="/" >
     <span className="logo">
      Bill Lab
    </span>
      </Link>
    </div>
    <div>
    <Link href="/dashboard" className='navLink'>
   <i className="icon-home"></i> DASHBOARD
    </Link>
    {
      user.isAdmin ?
      <>
                <Link href="/create/user" className='navLink'>
      <i className="icon-user"></i> ADD USER
      </Link>
      <Link href="/create/test" className='navLink'>
      <i className="icon-tag"></i> NEW TEST
      </Link>
      </>
      :""
    }
          <Link href="/tests" className='navLink'>
      <i className="icon-tag"></i> ALL TEST
      </Link>
    <Link href="/register" className='navLink'>
    <i className="icon-user-following"></i> REGISTER PATIENT
    </Link>

    </div>
    <div>
      <div className="Avatar" onClick={handleMode}>
        {
          mode === "dark" ?
          <i className="lni lni-sun mode"></i>
          :
          <i className="lni lni-night mode"></i>
        }
    
      </div>
    </div>
    <button className="button info text-white" onClick={logOut}>
      Logout
    </button>

  </div>

  <div className="sideBar">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, veritatis aliquam maiores explicabo sequi saepe. Dignissimos est incidunt dolores odit atque modi cumque excepturi, enim cum animi totam vero veritatis?
  </div>
    </div>
 );
}else{
  return ""
}
}
 
export default Nav;