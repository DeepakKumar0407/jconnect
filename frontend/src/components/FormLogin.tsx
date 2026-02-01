import { useState } from "react";
import type { iLogin } from "./interfaces";
import { Link, useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate()
  const [loginError,setLoginError] = useState(false)
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
    setLoginError(false)
    const res = await fetch('http://localhost:3000/auth/login',{
           method:"POST",
        headers: {
        'Content-Type': 'application/json'
      },
        body:JSON.stringify(userData)
        })
    const token = await res.json()
    if(!res.ok){
      setLoginError(true)
      console.log('login failed')
    }
    if(token.length>0){
    localStorage.setItem('jwt_token',token)
    navigate('/home')
    }
   
  }
  return (
    <div className="w-full  md:justify-end flex justify-center align-middle items-center h-full p-3">
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col justify-baseline gap-5 bg-white/20 border-2 border-white/80 rounded items-center p-4 h-fit">
      <h1 className="">Login</h1>
      <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label><input id="email" type="email" name="email" value={userData.email} onChange={handleChange} placeholder="email" className="border-2 border-white/80 rounded p-2" required></input>
        <label htmlFor="password">Password: </label><input id="password" type="password" name="password" value={userData.password} onChange={handleChange} placeholder="password" className="border-2 border-white/80 rounded p-2" required></input>
        <div className="w-full flex justify-center"><button className="bg-green-600 hover:bg-green-500 rounded w-1/3 p-2">Log in</button></div>
      </form>
      {loginError&&<p>Login Failed</p>}
      <div className="w-full flex justify-end text-blue-700"><Link to="/register">register</Link></div>
    </div>
    </div>
  )
}
export default FormLogin