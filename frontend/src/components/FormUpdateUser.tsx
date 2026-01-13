
import { useEffect, useState } from "react"
import type { iUser } from "./interfaces"

const FormUpdateUser = ({field,userEmail}:{field:string,userEmail:string}) => {

  const initialData:iUser = {
    name:'',
    userName:'',
    email:'',
    phone:'',
    dob:'',
    password:''
  }
  const [userData,setUserData] = useState(initialData)
  const [currentPassword,setCurrentPassword] =useState("")
  const [validatePassword,setValidatePassword] = useState(false)
  useEffect(()=>{
    const getUser = async ()=>{
        const res = await fetch(`http://localhost:3000/users/${userEmail}/email`) 
        const user = await res.json()
        setUserData(state=>({
            ...state,
            ...user,
            password:""
        }))
    }
    getUser()
  },[userEmail])
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setUserData(state=>({
      ...state,
      [name]:name==='email'?userEmail:value
    }))
  }
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
      try {
      await fetch(`http://localhost:3000/users/${userEmail}`,{
      method:'PATCH',
      headers: {
    'Content-Type': 'application/json'
  },
    body:JSON.stringify(userData)
    })
      } catch (error) {
        console.log(error)
      }
  }
  const handlePasswordSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(userData.password)
    if(!isValidPassword){
      throw new Error('invalid Password')
    }
    const res = await fetch(`http://localhost:3000/users/${userEmail}`,{
      method:'PATCH',
      headers: {
    'Content-Type': 'text/plain'
  },
    body:currentPassword
    })
    if(res.status===200){
        setValidatePassword(true)
    }else{
        console.log("invalid password")
    }
  }
  return (
   field===""?(''):(
     <div className="w-full">
    {field==='password'&&
        <div>
            <h1>Update {field}</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handlePasswordSubmit}>
            <label htmlFor="password">Current Password</label><input type="password" name="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} placeholder="password" required></input>
            <button>Submit</button>
            </form>
            {validatePassword &&
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <label htmlFor="password">New Password</label><input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="password" required></input>
            <button>Submit</button>
            </form>
            }
            
        </div>
}{field==='name'&&
        <div>
            <h1>Update {field}</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="name">name</label><input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="name" required></input></div>
            <button>Submit</button>
            </form>
        </div>
}{field==='dob'&&
        <div>
            <h1>Update {field}</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="dob">dob</label><input type="date" name="dob" value={userData.dob} onChange={handleChange} placeholder="dob" required></input></div>
            <button>Submit</button>
            </form>
        </div>
}
    </div>
   )
  )
}
export default FormUpdateUser