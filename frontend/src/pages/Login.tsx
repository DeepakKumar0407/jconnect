import { useEffect, useState } from "react"
import FormLogin from "../components/FormLogin"

const Login = () => {
  const [yaxis,setYAxis] = useState(window.innerHeight)
  useEffect(() => {
    const updateHeight = () => setYAxis(window.innerHeight)
  
    updateHeight()
    window.addEventListener("resize", updateHeight)
  
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    <div className="w-full" style={{height:`${yaxis}px`}}>
      <FormLogin/>
    </div>
  )
}
export default Login