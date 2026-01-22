import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const FormUpdatePassword = ({userEmail}:{userEmail:string}) => {
    const [currentPassword,setCurrentPassword] =useState("")
      const [validatePassword,setValidatePassword] = useState(false)
      const [userPassword,setUserPassword] = useState<string>("")
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
            setUserPassword(data.password)
          }
          getUserData()
        },[userEmail])
         const submitPassword = async(currentPassword:BodyInit)=>{
      const response = await fetch(`http://localhost:3000/users/password`,{
      method:'POST',
      headers: {
        'Content-Type': 'text/plain',
        'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
    },
    body:currentPassword
    })
    return await response.json()
      }
  const {mutate:mutatePassword} = useMutation({mutationFn:submitPassword,onSuccess:(data)=>{
    if(data==='success'){
         setValidatePassword(true)
    }
  }})
   const handlePasswordSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(currentPassword)
    if(!isValidPassword){
      throw new Error('invalid Password')
    }
    mutatePassword(currentPassword)
  }
  const submitUser = async(userData:string)=>{
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
      const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(userPassword)
      if(!isValidPassword){
      throw new Error('invalid Password')
    }
      mutate(userPassword)
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className="w-full">
        <div>
            <h1>Update Password</h1>
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handlePasswordSubmit}>
            <label htmlFor="password">Current Password</label><input type="password" name="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} placeholder="password" required></input>
            <button>Submit</button>
            </form>
            {validatePassword&&
            <form className="w-full flex flex-col justify-baseline gap-4" onSubmit={handleSubmit}>
            <label htmlFor="password">New Password</label><input type="password" name="password" onChange={(e)=>setUserPassword(e.target.value)} placeholder="password" required></input>
            <button>Submit</button>
            </form>
            }
        </div>
        </div>
  )
}
export default FormUpdatePassword