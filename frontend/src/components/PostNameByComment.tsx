import { useQuery } from "@tanstack/react-query"
import type { iCommentRecived } from "./interfaces"

const PostNameByComment = ({comment}:{comment:iCommentRecived}) => {
  const { data,isPending,error } = useQuery({
  queryKey: ['post',comment?.postId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${comment?.postId}`,{
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
    <div className="overflow-clip text-white/80">
        <h1>{data?.textContent}</h1>
    </div>
  )
}
export default PostNameByComment