import { useState } from "react"
import FormUpdateUser from "../components/FormUpdateUser"
import type { JWTStructure } from "../components/interfaces"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

const Setting = () => {
  const [field,setField] = useState<string>('')
  const navigate = useNavigate()
  const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)
  const email = currentUser.userEmail
  const handleLogout = ()=>{
    localStorage.removeItem('jwt_token')
    navigate('/login')
  }
  return (
    <div className="div">
    <button onClick={()=>setField('name')}>Name</button>
    <button onClick={()=>setField('dob')}>Date of birth</button>
    <button onClick={()=>setField('password')}>Password</button> 
    <FormUpdateUser userEmail={email} field={field}/> 
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Setting