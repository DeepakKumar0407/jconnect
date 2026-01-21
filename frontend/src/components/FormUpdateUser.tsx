
import {useState } from "react"
import type { iUser } from "./interfaces"
import { useMutation, useQuery } from "@tanstack/react-query"

const FormUpdateUser = ({field,userEmail}:{field:string,userEmail:string}) => {
  const [currentPassword,setCurrentPassword] =useState("")
  const [validatePassword,setValidatePassword] = useState(false)
  const { data } = useQuery({
  queryKey: ['user',userEmail],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userEmail}/email`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  const [userData,setUserData] = useState<iUser>({...data,password:''})
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setUserData(state=>({
      ...state,
      [name]:name==='email'?userEmail:value
    }))
  }
  const submitUser = async(userData:iUser)=>{
          await fetch(`http://localhost:3000/users/${userEmail}`,{
      method:'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
    },
    body:JSON.stringify(userData)
    })
      }
  const {mutate,status} = useMutation({mutationFn:submitUser})
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
      try {
      mutate(userData)
      } catch (error) {
        console.log(error)
      }
  }
   const submitPassword = async(currentPassword:BodyInit)=>{
          await fetch(`http://localhost:3000/users/${userEmail}`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'text/plain',
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
    },
    body:currentPassword
    })
      }
  const {mutate:mutatePassword} = useMutation({mutationFn:submitPassword})
  const handlePasswordSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(userData.password)
    if(!isValidPassword){
      throw new Error('invalid Password')
    }
    mutatePassword(currentPassword)
    if(status==='success'){
      setValidatePassword(true)
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