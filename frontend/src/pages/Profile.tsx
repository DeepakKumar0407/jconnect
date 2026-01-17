import { useParams } from "react-router-dom"
import CommentByUser from "../components/CommentByUser"
import PostByUser from "../components/PostByUser"
import UserProfile from "../components/UserProfile"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const Profile = () => {
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const currentUserEmail = "deepak.kumar016211@gmail.com"//jwt
  const {id} = useParams()
   const { data:user } = useQuery({
  queryKey: ['user',id],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${id}/id`,
    )
    return await response.json()
  },
  })
   const { data:userCurrent } = useQuery({
  queryKey: ['userCurrent',currentUserEmail],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${currentUserEmail}/email`,
    )
    return await response.json()
  },
  })
  useEffect(() => {
    const updateHeight = () => setYAxis(window.innerHeight)
  
    updateHeight()
    window.addEventListener("resize", updateHeight)
  
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    <div className="div overflow-auto" style={{height:`${yaxis}px`}}>
     <div className="w-full">
      {user&&userCurrent&&<UserProfile user={user} userCurrent={userCurrent}/>}
      {user&&<CommentByUser user={user}/>}
      {user&&<PostByUser user={user}/>}
    </div>
    </div>
  )
}
export default Profile