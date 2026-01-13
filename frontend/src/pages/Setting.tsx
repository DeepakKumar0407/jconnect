import { useState } from "react"
import FormUpdateUser from "../components/FormUpdateUser"

const Setting = () => {
  const [field,setField] = useState<string>('')
  return (
    <div className="div">
    <button onClick={()=>setField('name')}>Name</button>
    <button onClick={()=>setField('dob')}>Date of birth</button>
    <button onClick={()=>setField('password')}>Password</button> 
    <FormUpdateUser userEmail="deepak.kumar016211@gmail.com" field={field}/> 
    </div>
  )
}
export default Setting