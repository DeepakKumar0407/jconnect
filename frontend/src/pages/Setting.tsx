import { useEffect, useState } from "react"
import FormUpdateUser from "../components/FormUpdateUser"
import type { JWTStructure } from "../components/interfaces"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import FormUpdatePassword from "../components/FormUpdatePassword"

const Setting = () => {
  const [field,setField] = useState<string>('')
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const navigate = useNavigate()
  const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)
  const email = currentUser.userEmail
  const handleLogout = ()=>{
    localStorage.removeItem('jwt_token')
    navigate('/')
  }
  useEffect(() => {
        const updateHeight = () => setYAxis(window.innerHeight)
      
        updateHeight()
        window.addEventListener("resize", updateHeight)
      
        return () => window.removeEventListener("resize", updateHeight)
      }, [])
  return (
    <div className="div overflow-auto " style={{height:`${yaxis}px`}}>
    <button onClick={()=>setField('profile')}>Profile pic</button>
    <button onClick={()=>setField('name')}>Name</button>
    <button onClick={()=>setField('dob')}>Date of birth</button>
    <button onClick={()=>setField('phone')}>Phone</button>
    <button onClick={()=>setField('bio')}>Bio</button> 
    <FormUpdateUser userEmail={email} field={field}/>
    <FormUpdatePassword userEmail={email}/> 
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Setting