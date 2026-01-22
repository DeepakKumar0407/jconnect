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
      setUserData(state=>({...state,name:data.name,userName:data.userName,dob:data.dob,email:data.email,bio:data.bio,phone:data.phone}))
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
    {field==='profile pic'&&
        <div>
            <p className="md:text-xl lg:text-2xl mb-2">Update {field}</p>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="profilePic">Profile pic: Select<input id="profilePic" type="file" name="profilePic" onChange={(e)=>setUserData(state=>({...state,profilePic:e.target.files?.[0]||null}))} className="hidden" required></input></label></div>
            <div className="flex justify-baseline"><button className="w-1/2 md:w-1/4 bg-green-600 hover:bg-green-500 p-2 rounded">Update</button></div>
            </form>
            <div>{userData.profilePic&&userData.profilePic!==null&&<img src={URL.createObjectURL(userData.profilePic)} className="w-1/2"></img>}</div>
        </div>
}
{field==='name'&&
        <div>
            <p className="md:text-xl lg:text-2xl mb-2">Update {field}</p>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="name">Name: </label><input id="name" type="text" name="name" value={userData.name} onChange={handleChange} placeholder="name" className="border-2 border-white/50 rounded p-2" required></input></div>
            <div className="flex justify-baseline"><button className="w-1/2 md:w-1/4 bg-green-600 hover:bg-green-500 p-2 rounded">Update</button></div>
            </form>
        </div>
}{field==='dob'&&
        <div>
            <p className="md:text-xl mb-2">Update {field}</p>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="dob">Dob: <input id="dob" type="date" name="dob" value={userData.dob} onChange={handleChange} placeholder="dob" required></input></label></div>
            <div className="flex justify-baseline"><button className="w-1/2 md:w-1/4 bg-green-600 hover:bg-green-500 p-2 rounded">Update</button></div>
            </form>
        </div>
}{field==='phone'&&
        <div>
            <p className="md:text-xl mb-2">Update {field}</p>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="phone">Phone: </label><input id="phone" type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="phone" className="border-2 border-white/50 rounded p-2" required></input></div>
            <div className="flex justify-baseline"><button className="w-1/2 md:w-1/4 bg-green-600 hover:bg-green-500 p-2 rounded">Update</button></div>
            </form>
        </div>
}{field==='bio'&&
        <div>
            <p className="md:text-xl mb-2">Update {field}</p>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <div><label htmlFor="bio"></label><textarea id="bio" name="bio" onChange={handleChange} value={userData.bio} placeholder="type something" className="border-2 border-white/50 rounded p-2" rows={5} cols={25} required></textarea></div>
            <div className="flex justify-baseline"><button className="w-1/2 md:w-1/4 bg-green-600 hover:bg-green-500 p-2 rounded">Update</button></div>
            </form>
        </div>
}
    </div>
   )
  )
}
export default FormUpdateUser