'use client'

import { useState } from "react";

export interface iLogin {
  email:string;
  password:string;
}
const FormLogin = () => {
  const initialData:iLogin = {
    email:"",
    password:""
  }
  const [userData,setUserData] = useState(initialData)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setUserData(state=>({
      ...state,
      [name]:value
    }))
  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const res = await fetch('http://localhost:3000/users/login',
      {
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
      },
        body:JSON.stringify(userData)
      }
    )
    if(res.status===200){
      console.log('logged in')
    }
  }
  return (
      <div className="w-full">
      <h1>Login</h1>
      <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label><input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="email" required></input>
        <label htmlFor="password">password</label><input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="password" required></input>
        <button>submit</button>
      </form>
    </div>
  )
}
export default FormLogin