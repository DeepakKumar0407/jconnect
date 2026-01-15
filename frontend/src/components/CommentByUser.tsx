import type { iCommentRecived, iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const CommentByUser = ({user}:{user:iUser|undefined}) => {
  const { isPending,data,error } = useQuery({
  queryKey: ['comments',user?._id],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/comments/${user?._id}/user`,
    )
    return await response.json()
  },
  })
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div>
      {data?.map((comment:iCommentRecived)=>(
        <div key={comment._id}>
          <p>{comment.textContent}</p>
        </div>
      ))}
      {/* <p>cycle all comments</p>
      <p>icon</p><p>username</p>
      <p>text content</p>
      <p>image content</p> */}
    </div>
  )
}
export default CommentByUser