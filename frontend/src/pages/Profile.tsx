import { useParams } from "react-router-dom"
import CommentByUser from "../components/CommentByUser"
import PostByUser from "../components/PostByUser"
import UserProfile from "../components/UserProfile"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { JWTStructure } from "../components/interfaces"
import { jwtDecode } from "jwt-decode"

const Profile = () => {
  const [yaxis,setYAxis] = useState(window.innerHeight)
  const [selection,setSection] = useState('posts')
    const currentUser:JWTStructure = jwtDecode(localStorage.getItem('jwt_token')!)//jwt
    const email = currentUser.userEmail
  const {id} = useParams()
   const { data:user } = useQuery({
  queryKey: ['user',id],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${id}/id`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
   const { data:userCurrent } = useQuery({
  queryKey: ['userCurrent',email],
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
  useEffect(() => {
    const updateHeight = () => setYAxis(window.innerHeight)
  
    updateHeight()
    window.addEventListener("resize", updateHeight)
  
    return () => window.removeEventListener("resize", updateHeight)
  }, [])
  return (
    <div className="div overflow-auto p-2" style={{height:`${yaxis}px`}}>
     <div className="w-full">
      {user&&userCurrent&&<UserProfile user={user} userCurrent={userCurrent}/>}
      <div className="ml-5 lg:text-2xl flex justify-baseline gap-5">
        <button onClick={()=>setSection('posts')} className={`cursor-pointer pb-2 ${selection==='posts'?'border-b-2':''} border-green-600`}>Post</button>
        <button onClick={()=>setSection('comments')} className={`cursor-pointer pb-2 ${selection==='comments'?'border-b-2':''} border-green-600`}>Comments</button>
      </div>
      {selection==='posts'?
      (<div>{user&&<PostByUser user={user}/>}</div>)
      :(<div>{user&&<CommentByUser user={user}/>}</div>)}
    
    
    </div>
    </div>
  )
}
export default Profile