import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { iUser } from "./interfaces"

const Navbar = () => {
  const email = "deepak.kumar016211@gmail.com" //jwt
  const [user,setUser] = useState<iUser>()
  useEffect(()=>{
    const getUser = async()=>{
      const res = await fetch(`http://localhost:3000/users/${email}/email`)
      const data = await res.json()
      setUser(data)
    }
    getUser()
  },[])
  return (
    <div className="w-fit p-5 flex flex-col justify-baseline gap-3 md:text-base lg:text">
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="chat_room">Chat Room</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
        <Link to="post_details">PostDetails</Link>
        <Link to={`profile/${user?._id}`}>Profile</Link>
        <Link to="saved">Saved Posts</Link>
        <Link to="search/deepak">Search Result</Link>
        <Link to="settings">Settings</Link>
        <Link to="notifications">Notifications</Link>
        <Link to="Post">Post</Link>
    </div>
  )
}
export default Navbar