
import { useState } from "react"
import type { iUser } from "./interfaces"
import { useMutation } from "@tanstack/react-query"


const FormRegister = () => {
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
          await fetch('http://localhost:3000/users',{
        method:'POST',
        headers: {
        'Content-Type': 'application/json'
  },
    body:JSON.stringify(userData)
    })
      }
  const {mutate} = useMutation({mutationFn:submitUser})
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(userData.password)
      if(!isValidPassword){
        throw new Error('invalid Password')
      }
      mutate(userData)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full">
      <h1>Register</h1>
      <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label><input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="name" required></input>
        <label htmlFor="username">username</label><input type="text" name="userName" value={userData.userName} onChange={handleChange} placeholder="username" required></input>
        <label htmlFor="email">email</label><input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="email" required></input>
        <label htmlFor="phone">phone</label><input type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="phone" required></input>
        <label htmlFor="dob">dob</label><input type="date" name="dob" value={userData.dob} onChange={handleChange} placeholder="dob" required></input>
        <label htmlFor="password">password</label><input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="password" required></input>
        <button>Submit</button>
      </form>
    </div>
  )
}
export default FormRegister