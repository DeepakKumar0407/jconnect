import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-fit p-5 flex flex-col justify-baseline gap-3 md:text-base lg:text">
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="chat_room">Chat Room</Link>
        <Link to="login">Login</Link>
        <Link to="register">Register</Link>
        <Link to="post_details">PostDetails</Link>
        <Link to="profile">Profile</Link>
        <Link to="saved">Saved Posts</Link>
        <Link to="search/deepak">Search Result</Link>
        <Link to="settings">Settings</Link>
        <Link to="notifications">Notifications</Link>
        <Link to="Post">Post</Link>
    </div>
  )
}
export default Navbar