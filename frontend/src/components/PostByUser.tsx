import type { iPostRecived, iUser } from "./interfaces"
import { useQuery } from "@tanstack/react-query"

const PostByUser = ({user}:{user:iUser|undefined}) => {
  const { data:posts} = useQuery<iPostRecived[]>({
  queryKey: ['posts'],
  queryFn: async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${user?._id}/user`,
    )
    return await response.json()
  },
  })
  return (
    <div>
        {posts?.map((post:iPostRecived)=>(
            <div key={post._id}>
                <p>{post.textContent}</p>
            </div>
        ))}
    </div>
  )
}
export default PostByUser