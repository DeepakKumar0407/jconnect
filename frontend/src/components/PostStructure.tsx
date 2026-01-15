import type { iPostRecived } from "./interfaces"
import { Link } from "react-router-dom"


const PostStructure = ({post}:{post:iPostRecived}) => {
  return (
    <div className="w-full">
      <Link to={`/post_details/${post._id}`} className="w-full">
      <div className="flex justify-baseline gap-5 items-center ">
        {post.profilePic?(<img src={post.profilePic} className="w-10 h-10 rounded-4xl"></img>):
        (<p className="bg-white text-black w-10 h-10 flex rounded-4xl justify-center items-center md:text-xl">{post.userName[0].toUpperCase()}</p>)}
        <p className="w-1/2 md:text-xl">@{post.userName}</p>
      </div>
      <p className="mt-2 md:text-base mb-2">{post.textContent}</p>
      {post.imageContent!=="null"&&<img src={post.imageContent} className="w-fit"></img>}
      {post.videoContent!=="null"&& <video controls>
        <source src={post.videoContent} type="video/mp4"></source>
      </video>}
      </Link>
      
    </div>
  )
}
export default PostStructure