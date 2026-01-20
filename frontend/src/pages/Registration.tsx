import { useEffect, useState } from "react"
import FormRegister from "../components/FormRegister"

const Registration = () => {
   const [yaxis,setYAxis] = useState(window.innerHeight)
    useEffect(() => {
      const updateHeight = () => setYAxis(window.innerHeight)
    
      updateHeight()
      window.addEventListener("resize", updateHeight)
    
      return () => window.removeEventListener("resize", updateHeight)
    }, [])
  return (
    <div className="w-full" style={{height:`${yaxis}px`}}>
      <FormRegister/>
    </div>
  )
}
export default Registration