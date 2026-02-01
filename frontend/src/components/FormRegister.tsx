
import { useState } from "react"
import type { iUser } from "./interfaces"
import { useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"


const FormRegister = () => {
  const [passwordError,setpasswordError] = useState(false)
  const initialData:iUser = {
    name:'',
    userName:'',
    email:'',
    phone:'',
    dob:'',
    password:''
  }
  const [userData,setUserData] = useState(initialData)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setUserData(state=>({
      ...state,
      [name]:value
    }))
  }
    const submitUser = async(userData:iUser)=>{
        const res = await fetch('http://localhost:3000/users',{
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
  },
    body:JSON.stringify(userData)
    })
    return res.json()
      }
  const {mutate,data} = useMutation({mutationFn:submitUser})
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      setpasswordError(false)
      const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(userData.password!)
      if(!isValidPassword){
        throw new Error('invalid Password')
      }
      mutate(userData)
    } catch (error) {
      setpasswordError(true)
      console.log(error)
    }
  }
  return (
     <div className="w-full  md:justify-end flex justify-center align-middle items-center h-full p-3">
    <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-baseline gap-5 bg-white/20 border-2 border-white/80 rounded items-center p-4 h-fit">
      <h1>Register</h1>
      <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label><input id="name" type="text" name="name" value={userData.name} onChange={handleChange} placeholder="name" className="border-2 border-white/80 rounded p-2" required></input>
        <label htmlFor="username">Username: </label><input id="username" type="text" name="userName" value={userData.userName} onChange={handleChange} placeholder="username" className="border-2 border-white/80 rounded p-2" required></input>
        <label htmlFor="email">Email: </label><input id="email" type="email" name="email" value={userData.email} onChange={handleChange} placeholder="email" className="border-2 border-white/80 rounded p-2" required></input>
        <label htmlFor="phone">Phone: </label><input id="phone" type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="phone" className="border-2 border-white/80 rounded p-2" required></input>
        <label htmlFor="dob">Dob: </label><input id="dob" type="date" name="dob" value={userData.dob} onChange={handleChange} placeholder="dob" className="border-2 border-white/80 rounded p-2" required></input>
        <label htmlFor="password">Password: </label><input id="password" type="password" name="password" value={userData.password} onChange={handleChange} placeholder="password" className="border-2 border-white/80 rounded p-2" required></input>
        <div className="w-full flex justify-center"><button className="bg-green-600 hover:bg-green-500 rounded w-1/3 p-2">Submit</button></div>
      </form>
      {data?.errorResponse?.keyValue.userName&&<p>username already taken</p>}
      {data?.errorResponse?.keyValue.email&&<p>email already taken</p>}
      {data?.errorResponse?.keyValue.phone&&<p>phone number already taken</p>}
      {passwordError&&<p>Invalid Password</p>}
      <div className="w-full flex justify-end text-blue-700"><Link to="/">login</Link></div>
    </div>
    </div>
  )
}
export default FormRegister