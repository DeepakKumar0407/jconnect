import { useEffect, useState } from "react"
import NotificationStructure from "../components/NotificationStructure"
import type { iUser } from "../components/interfaces"

const Notifications = () => {
  const email = "deepak.kumar016211@gmail.com"//jwt
  const [user,setUser] = useState<iUser>()
   useEffect(()=>{
      const getUser=async()=>{
        const res = await fetch(`http://localhost:3000/users/${email}/email`)
        const data = await res.json()
        setUser(data)
      }
      getUser()
    },[email])
  return (
    <div className="div md:text-base lg:text-xl">
      <h1>Notifications</h1>
      {user&&<NotificationStructure user={user}/>}
    </div>
  )
}
export default Notifications