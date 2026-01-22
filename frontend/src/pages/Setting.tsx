import { useEffect, useState } from "react"
import FormUpdateUser from "../components/FormUpdateUser"
import type { JWTStructure } from "../components/interfaces"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import FormUpdatePassword from "../components/FormUpdatePassword"

const Setting = () => {
  const [field,setField] = useState<string>('')
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const [state,setState] = useState(false)
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
    <div className="div overflow-auto lg:text-xl" style={{height:`${yaxis}px`}}>
    <h1 className="mb-5">Update Profile</h1>
    <div className="flex flex-col md:flex-row justify-baseline gap-2 flex-wrap mb-5">
    <button onClick={()=>setField('profile pic')} className="p-2 border-2 border-white/20 rounded">Profile pic</button>
    <button onClick={()=>setField('name')} className="p-2 border-2 border-white/20 rounded">Name</button>
    <button onClick={()=>setField('dob')} className="p-2 border-2 border-white/20 rounded">Date of birth</button>
    <button onClick={()=>setField('phone')} className="p-2 border-2 border-white/20 rounded">Phone</button>
    <button onClick={()=>setField('bio')} className="p-2 border-2 border-white/20 rounded">Bio</button> 
    </div>
    <div className="mb-5"><FormUpdateUser userEmail={email} field={field}/></div>
    <div className="mb-5"><button onClick={()=>setState(!state)} className="p-2 border-2 border-white/20 rounded bg-red-500 hover:bg-red-400">Change Password</button> </div>
    <div className="mb-5"><FormUpdatePassword userEmail={email} state={state}/></div>
    <div><button onClick={handleLogout} className="p-2 bg-red-600 hover:bg-red-500 rounded">Logout</button></div>
    </div>
  )
}
export default Setting