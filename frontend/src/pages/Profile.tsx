import { useParams } from "react-router-dom"
import CommentByUser from "../components/CommentByUser"
import PostByUser from "../components/PostByUser"
import UserProfile from "../components/UserProfile"
import { useQuery } from "@tanstack/react-query"

const Profile = () => {
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
  return (
    <div className="div md:text-base lg:text-xl">
      {user&&userCurrent&&<UserProfile user={user} userCurrent={userCurrent}/>}
      {user&&<CommentByUser user={user}/>}
      {user&&<PostByUser user={user}/>}
    </div>
  )
}
export default Profile