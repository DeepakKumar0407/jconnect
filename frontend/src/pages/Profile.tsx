import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { iUser } from "../components/interfaces"
import CommentByUser from "../components/CommentByUser"
import PostByUser from "../components/PostByUser"
import UserProfile from "../components/UserProfile"

const Profile = () => {
  const currentUserEmail = "deepak.kumar016211@gmail.com"//jwt
  const {id} = useParams()
  const [user,setUser] = useState<iUser>()
  const [userCurrent,setUserCurrent] = useState<iUser>()
  useEffect(()=>{
    const getUser=async()=>{
      const res = await fetch(`http://localhost:3000/users/${id}/id`)
      const data = await res.json()
      setUser(data)
    }
    getUser()
  },[id])
  useEffect(()=>{
    const getUser=async()=>{
      const res = await fetch(`http://localhost:3000/users/${currentUserEmail}/email`)
      const data = await res.json()
      setUserCurrent(data)
    }
    getUser()
  },[currentUserEmail])
  return (
    <div className="div md:text-base lg:text-xl">
      {user&&userCurrent&&<UserProfile user={user} userCurrent={userCurrent}/>}
      {user&&<CommentByUser user={user}/>}
      {user&&<PostByUser user={user}/>}
    </div>
  )
}
export default Profile