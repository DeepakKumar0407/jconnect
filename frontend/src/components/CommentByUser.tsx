import { Link } from "react-router-dom"
import type { iCommentRecived, iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"
import PostNameByComment from "./PostNameByComment"

const CommentByUser = ({user}:{user:iUser|undefined}) => {
  const { isPending,data,error } = useQuery({
  queryKey: ['comments',user?._id],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/comments/${user?._id}/user`,{
        method:'GET',
        headers:{
          'authorization':`Bearer ${localStorage.getItem('jwt_token')!}`
        }
      }
    )
    return await response.json()
  },
  })
 if (isPending) return (
    <div className="div">
      <h1>Loading...</h1>
    </div>
  )

  if (error) return (
    <div className="div">
      <h1>An error has occurred: {error.message}</h1>
    </div>
  )
  return (
    <div className="w-full flex flex-col gap-3 justify-baseline ml-5 mt-3 mb-22">
      {data?.map((comment:iCommentRecived)=>(
        <div key={comment._id} className="bg-white/20 w-1/2 overflow-clip lg:text-xl p-2 rounded">
         <Link to={`/post_details/${comment.postId}`}>
          <PostNameByComment comment={comment}/>
          <p className="mb-2">{comment.textContent}</p>
          <img src={comment.imageContent} className="w-1/2"></img>
         </Link>
        </div>
      ))}
    </div>
  )
}
export default CommentByUser