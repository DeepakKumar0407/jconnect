import { useEffect, useState } from "react"
import UserSprite from "./UserSprite"

const FriendsList = () => {
  const [friends,setFriends] = useState<object>()
  // useEffect(()=>{
  //   const getFriends = async()=>{
  //     const res = await fetch('http://localhost/friends')
  //     const {followers,following} = await res.json()
  //     setFriends(state=>({
  //       ...state,
  //       ...followers,
  //       ...following
  //     }))
  //   }
  //   getFriends()
  // },[])
  return (
    <div className="w-fit md:text-base lg:text">
        FriendsList
        <UserSprite friend={{}}/>
    </div>
  )
}
export default FriendsList