import { useEffect, useState } from "react"
import UserSprite from "./UserSprite"
import type { iUser } from "./interfaces"

const FriendsList = () => {
  const email = "deepak.kumar016211@gmail.com"//jwt
  const [friends,setFriends] = useState<iUser[]>()
  const [user,setUser] = useState<iUser>()
  useEffect(()=>{
    const getUser=async()=>{
      const res = await fetch(`http://localhost:3000/users/${email}/email`)
      const data = await res.json()
      setUser(data)
    }
    getUser()
  },[email])
  useEffect(()=>{
    const getFriends = async()=>{
      const res = await fetch('http://localhost:3000/users/friends')
      const data:iUser[] = await res.json()
      const unique:iUser[] = Array.from(
          new Map(data.map((item:iUser) => [item._id, item])).values()
      );
      setFriends(unique)
    }
    getFriends()
  },[])
  return (
    <div className="w-fit md:text-base lg:text">
        <h1>Friend list</h1>
        {friends?.map((friend:iUser)=>(
         <div key={friend._id}>
           <h1>first</h1>
          <UserSprite friend={friend} user={user}/>
         </div>
        ))}
    </div>
  )
}
export default FriendsList