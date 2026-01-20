import type { iNotification, iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const NotificationStructure = ({user}:{user:iUser|undefined}) => {
 
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