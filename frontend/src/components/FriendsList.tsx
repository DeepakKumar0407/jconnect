import { useEffect, useState } from "react"
import UserSprite from "./UserSprite"
import type { iUser, JWTStructure } from "./interfaces"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"

const FriendsList = () => {
  const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)//jwt
  const email = currentUser.userEmail
  const [friends,setFriends] = useState<iUser[]>()
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
  enabled: email.length>0
  })
  const hasUSer = typeof(user) === 'object'
  const { data } = useQuery<iUser[]>({
  queryKey: ['friends',user],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${user?._id}/friends`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },enabled:hasUSer
  })
  useEffect(()=>{
    const getFriends = async()=>{
      const unique:iUser[] = Array.from(
          new Map(data?.map((item:iUser) => [item._id, item])).values()
      );
      setFriends(unique)
    }
    getFriends()
  },[data])
  return (
    <div className="w-2/10 p-2 mt-5 border-l-2 border-b-2 border-white/20 top-0 right-0 h-full">
        <h1>Friend list</h1>
        {friends?.map((friend:iUser)=>(
         <div key={friend._id}>
          <UserSprite friend={friend} user={user}/>
         </div>
        ))}
    </div>
  )
}
export default FriendsList