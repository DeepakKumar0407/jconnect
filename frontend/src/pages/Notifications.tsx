import NotificationStructure from "../components/NotificationStructure"
import { useQuery } from "@tanstack/react-query"

const Notifications = () => {
  const email = "deepak.kumar016211@gmail.com"//jwt
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
  return (
    <div className="div md:text-base lg:text-xl">
      <h1>Notifications</h1>
      {user&&<NotificationStructure user={user}/>}
    </div>
  )
}
export default Notifications