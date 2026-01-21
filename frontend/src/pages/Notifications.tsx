import { jwtDecode } from "jwt-decode"
import type { iNotification, JWTStructure } from "../components/interfaces"
import NotificationStructure from "../components/NotificationStructure"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const Notifications = () => {
   const [yaxis,setYAxis] = useState(window.innerHeight)
   const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)//jwt
   const email = currentUser.userEmail
  const { data:user } = useQuery({
  queryKey: ['user',email],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${email}/email`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  const { data:notifications} = useQuery<iNotification[]>({
  queryKey: ['notification'],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/notifications`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
   useEffect(() => {
      const updateHeight = () => setYAxis(window.innerHeight)
    
      updateHeight()
      window.addEventListener("resize", updateHeight)
    
      return () => window.removeEventListener("resize", updateHeight)
    }, [])
  return (
    <div className="div overflow-auto " style={{height:`${yaxis}px`}}>
      <h1 className="mb-5">Notifications</h1>
      <div className="w-full flex flex-col justify-baseline gap-5 pb-22">
      {user&&notifications?.map((notification)=>(
        <NotificationStructure notification={notification} user={user} key={notification._id}/>
      ))}
      </div>
    </div>
  )
}
export default Notifications