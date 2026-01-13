import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { iUser } from "../components/interfaces"

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
  console.log(typeof(user?._id))
  const handleFollow = async()=>{
    const following = await fetch('http://localhost:3000/users/follow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain"
      },
      body:user?._id
    }) 
  }
  const handleUnFollow= async()=>{
    const following = await fetch('http://localhost:3000/users/unfollow/follow',{
      method:"PATCH",
      headers:{
        "Content-Type":"text/plain"
      },
      body:user?._id
    }) 
  }
  return (
    <div className="div md:text-base lg:text-xl">
      <p>Image</p>
      <p>{user?.name}</p>
      <p>All user details</p>
      <p>Edit Profile</p>
      <p>Posts</p>
      <p>Comments made</p>
      <p>Likes made</p>
      {currentUserEmail!==user?.email&&<div>
      {userCurrent?.following?.map((follow=>(follow===user?._id?(<button onClick={handleUnFollow} key={follow}>Unfollow</button>):(<button onClick={handleFollow} key={follow}>Follow</button>))))}{userCurrent?.following?.length?(""):(<button onClick={handleFollow}>Follow</button>)}</div>}
    </div>
  )
}
export default Profile