import { useQuery } from "@tanstack/react-query"
import type { iCommentRecived } from "./interfaces"

const PostNameByComment = ({comment}:{comment:iCommentRecived}) => {
  const { data } = useQuery({
  queryKey: ['post',comment?.postId],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${comment?.postId}`,
    )
    return await response.json()
  },
  })
  return (
    <div className="overflow-clip text-white/80">
        <h1>{data?.textContent}</h1>
    </div>
  )
}
export default PostNameByComment