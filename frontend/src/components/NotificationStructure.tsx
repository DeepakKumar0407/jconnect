import { useEffect, useState } from "react"
import type { iNotification, iUser } from "./interfaces"

const NotificationStructure = ({user}:{user:iUser|undefined}) => {
 
  const [notifications,setNotifications] = useState<iNotification[]>()
  useEffect(()=>{
    const getNotification = async()=>{
      const res = await fetch('http://localhost:3000/notifications')
      const data = await res.json()
      setNotifications(data)
    }
    getNotification()
  },[])
  return (
        notifications?.map((notification:iNotification)=>(
          user?._id!==notification.userId&&
          <div key={notification._id}>
            <p>{notification.userId}</p>
          </div>
        ))
  )
}
export default NotificationStructure