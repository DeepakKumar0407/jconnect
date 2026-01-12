import { useEffect, useState } from "react"
import type { iNotification } from "./interfaces"

const NotificationStructure = () => {
  const initialData:iNotification = {
    type:'',
    userId:'',
    id:''
  }
  const [notification,setNotification] = useState(initialData)
  useEffect(()=>{
    const getNotification = async()=>{
      const res = await fetch('http://localhost:3000/notifications')
      const data = await res.json()
      setNotification(data)
    }
    getNotification()
  },[])
  return (
    <div>
        <p>commented/liked/shared</p><p>pic of who by</p>
        <p>post title</p>
    </div>
  )
}
export default NotificationStructure