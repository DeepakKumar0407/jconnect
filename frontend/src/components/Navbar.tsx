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
    <div className="max-w-fit min-w-1/6 p-5 flex flex-col justify-baseline gap-3 flex-wrap md:text-base lg:text border-r-2 border-white/20 top-0 left-0 fixed h-full">
      <div className="flex justify-baseline gap-5 items-center">
        {user?.profilePic?(<img src={user.profilePic} className="w-10 h-10 rounded-4xl"></img>):
        (<p className="bg-white text-black w-10 h-10 flex rounded-4xl justify-center items-center md:text-xl">{user?.userName[0].toUpperCase()}</p>)}
        <p className="w-1/2 md:text-xl">{user?.name}</p>
      </div>
      <p className="md:text-xl w-full">@{user?.userName}</p>
      <hr></hr>
       <div className="flex flex-col justify-baseline gap-5">
         <Link to="/">Home</Link>
        <Link to="Post">Post</Link>
        <Link to="chat_room">Chat Room</Link>
        <Link to={`profile/${user?._id}`}>Profile</Link>
        <Link to="saved">Saved Posts</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
        <hr></hr>
        <Link to="notifications">Notifications</Link>
        <Link to="settings">Settings</Link>
        <Link to="about">About</Link>
       </div>
    </div>
  )
}
export default Navbar