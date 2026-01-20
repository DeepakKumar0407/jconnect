import { Link } from "react-router-dom"
import type { iPostRecived, iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const PostByUser = ({user}:{user:iUser|undefined}) => {
  const { data:posts} = useQuery<iPostRecived[]>({
  queryKey: ['posts'],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${user?._id}/user`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
  return (
    <div className="w-full ml-5 mb-22 ">
        {posts?.map((post:iPostRecived)=>(
            <div key={post._id}>
                  
      <Link to={`/post_details/${post._id}`} className="w-full">
      <p className="mt-2 lg:text-2xl mb-2">{post.textContent}</p>
      {post.imageContent!=="null"&&<img src={post.imageContent} className="w-fit"></img>}
      {post.videoContent!=="null"&& 
      <video controls>
        <source src={post.videoContent} type="video/mp4"></source>
      </video>}
      </Link>
            </div>
        ))}
    </div>
  )
}
export default PostByUser