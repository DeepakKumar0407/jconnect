import { Link } from "react-router-dom"
import type { iUser } from "./interfaces"
import { HomeIcon } from "@heroicons/react/24/solid"
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { BookmarkSquareIcon } from "@heroicons/react/24/solid"
import { BellAlertIcon } from "@heroicons/react/24/solid"
import { Cog8ToothIcon } from "@heroicons/react/24/solid"
import { DocumentTextIcon } from "@heroicons/react/24/solid"
import { useQuery } from "@tanstack/react-query"

const Navbar = () => {
  const email = "deepak.kumar016211@gmail.com" //jwt
  const { data:user } = useQuery<iUser>({
  queryKey: ['user',email],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/users/${email}/email`,
    )
    return await response.json()
  },
  })
  return (
    <div className="md:w-1/5 w-fit p-5 flex flex-col justify-baseline gap-3 flex-wrap md:text-base lg:text-xl border-r-2 border-white/20 top-0 left-0">
      <div className="flex justify-between gap-2 items-center">
        {user?.profilePic?(<img src={user.profilePic} className="w-10 h-10 lg:w-20 lg:h-20 rounded-full"></img>):
        (<p className="bg-white text-black w-10 h-10 lg:w-20 lg:h-20 flex rounded-full justify-center items-center lg:text-2xl font-bold">{user?.userName[0].toUpperCase()}</p>)}
        <p className="w-2/3 lg:text-3xl font-bold">{user?.name}</p>
      </div>
      <p className="lg:text-2xl w-full">@{user?.userName}</p>
      <hr></hr>
       <div className="flex flex-col justify-baseline gap-5 lg:text-2xl">
        <Link to="/" className="flex gap-2 items-center"><HomeIcon className="icon"/> Home</Link>
        <Link to="chat_room" className="flex gap-2 items-center"><ChatBubbleLeftEllipsisIcon className="icon"/> Chat Room</Link>
        <Link to={`profile/${user?._id}`} className="flex gap-2 items-center"><UserCircleIcon className="icon"/> Profile</Link>
        <Link to="saved" className="flex gap-2 items-center"><BookmarkSquareIcon className="icon" /> Saved Posts</Link>
        <Link to="login" className="flex gap-2 items-center">Login</Link>
        <Link to="register" className="flex gap-2 items-center">Register</Link>
        <hr></hr>
        <Link to="notifications" className="flex gap-2 items-center"><BellAlertIcon className="icon"/> Notifications</Link>
        <Link to="settings" className="flex gap-2 items-center"><Cog8ToothIcon className="icon"/> Settings</Link>
        <Link to="about" className="flex gap-2 items-center"><DocumentTextIcon className="icon"/> About</Link>
       </div>
    </div>
  )
}
export default Navbar