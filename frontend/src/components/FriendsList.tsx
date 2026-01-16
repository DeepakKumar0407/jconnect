import { useEffect, useState } from "react"
import UserSprite from "./UserSprite"
import type { iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const FriendsList = () => {
  const email = "deepak.kumar016211@gmail.com"//jwt
  const [friends,setFriends] = useState<iUser[]>()
  const { data:user } = useQuery({
  queryKey: ['user',email],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${email}/email`,
    )
    return await response.json()
  },
  })
  const { data } = useQuery<iUser[]>({
  queryKey: ['friends'],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/friends`,
    )
    return await response.json()
  },
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
    <div className="min-w-1/4 max-w-fit p-2 mt-5 border-l-2 border-b-2 border-white/20 sticky top-0 right-0">
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