import { useEffect, useState } from "react"
import FormLogin from "../components/FormLogin"
import { Navigate } from "react-router-dom"

const Login = () => {
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const jwt = localStorage.getItem('jwt_token')
  useEffect(() => {
    const updateHeight = () => setYAxis(window.innerHeight)
  
    updateHeight()
    window.addEventListener("resize", updateHeight)
  
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    jwt?(<Navigate to='/home'/>):(
    <div className="w-full" style={{height:`${yaxis}px`}}>
      <FormLogin/>
    </div>
    )
  )
}
export default Login