import {useEffect, useState } from "react"
import type { iUser } from "./interfaces"
import { useMutation } from "@tanstack/react-query"

const FormUpdateUser = ({field,userEmail}:{field:string,userEmail:string}) => {
  const initialData:iUser = {
    name: "",
    userName:"",
    email:"",
    phone: "",
    dob:"",
    profilePic:null,
    bio:''
  }
  const [userData,setUserData] = useState<iUser>(initialData)
  useEffect(()=>{
    const getUserData = async()=>{
      const res = await fetch(
        `http://localhost:3000/users/${userEmail}/email`,{
          method:'GET',
          headers:{
            'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
          }
        }
      )
      const data = await res.json()
      setUserData(state=>({...state,name:data.name,userName:data.userName,profilePic:data.profilePic,dob:data.dob,email:data.email,bio:data.bio,phone:data.phone}))
    }
    getUserData()
  },[userEmail])
  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target
    setUserData(state=>({
      ...state,
      [name]:name==='email'?userEmail:value
    }))
  }
  const submitUser = async(userData:FormData)=>{
      await fetch(`http://localhost:3000/users/${userEmail}`,{
      method:'PATCH',
      headers: {
      'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
    },
    body:userData
    })
      }
  const {mutate} = useMutation({mutationFn:submitUser})
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
      try {
      const data = new FormData
      Object.entries(userData).forEach(([key,value])=>{
        data.append(key,value)
      })
      mutate(data)
      } catch (error) {
        console.log(error)
      }
  }

  return (
   field===""?(''):(
     <div className="w-full">
    {field==='profile'&&
        <div>
            <h1>Update {field}</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="profilePic">Profile pic</label><input type="file" name="profilePic" onChange={(e)=>setUserData(state=>({...state,profilePic:e.target.files?.[0]||null}))} required></input></div>
            <button>Submit</button>
            </form>
        </div>
}
{field==='name'&&
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
}{field==='phone'&&
        <div>
            <h1>Update {field}</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="phone">Phone</label><input type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="phone" required></input></div>
            <button>Submit</button>
            </form>
        </div>
}{field==='bio'&&
        <div>
            <h1>Update {field}</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="bio">Bio</label><textarea name="bio" onChange={handleChange} value={userData.bio} placeholder="type something" required></textarea></div>
            <button>Submit</button>
            </form>
        </div>
}
    </div>
   )
  )
}
export default FormUpdateUser