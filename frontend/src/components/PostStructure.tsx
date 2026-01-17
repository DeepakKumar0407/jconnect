import type { iPostRecived } from "./interfaces"
import { Link } from "react-router-dom"


const PostStructure = ({post}:{post:iPostRecived}) => {
  return (
    <div className="w-full">
      <Link to={`/profile/${post?.userId}`}>
      <div className="flex justify-baseline gap-5 items-center ">
        {post.profilePic?(<img src={post.profilePic} className="w-10 h-10 lg:w-15 lg:h-15 rounded-full"></img>):
        (<p className="bg-white text-black w-10 h-10 lg:w-15 lg:h-15 flex rounded-full justify-center items-center md:text-xl">{post.userName[0].toUpperCase()}</p>)}
        <p className="w-1/2 lg:text-xl">@{post.userName}</p>
      </div>
      </Link>
      <Link to={`/post_details/${post._id}`} className="w-full">
      <p className="mt-2 lg:text-2xl mb-2">{post.textContent}</p>
      {post.imageContent!=="null"&&<img src={post.imageContent} className="w-fit"></img>}
      {post.videoContent!=="null"&& 
      <video controls>
        <source src={post.videoContent} type="video/mp4"></source>
      </video>}
      </Link>
    </div>
  )
}
export default PostStructure