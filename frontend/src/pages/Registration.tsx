import { useEffect, useState } from "react"
import FormRegister from "../components/FormRegister"
import { Navigate } from "react-router-dom"

const Registration = () => {
   const [yaxis,setYAxis] = useState(window.innerHeight)
  const jwt = localStorage.getItem('jwt_token')
    useEffect(() => {
      const updateHeight = () => setYAxis(window.innerHeight)
    
      updateHeight()
      window.addEventListener("resize", updateHeight)
    
      return () => window.removeEventListener("resize", updateHeight)
    }, [])
  return (
    jwt?(<Navigate to="/home"/>):(
      <div className="w-full" style={{height:`${yaxis}px`}}>
      <FormRegister/>
      </div>
    )
  
  )
}
export default Registration